import {PriorityQueue} from './PriorityQueue'
import {priorityCreate} from 'src/priority'
import {createTestVariants} from '@flemist/test-variants'
import {IAbortSignalFast, IAbortControllerFast, AbortControllerFast, AbortError} from '@flemist/abort-controller-fast'
import {ITimeController, TimeControllerMock} from '@flemist/time-controller'
import {delay} from '@flemist/async-utils'

xdescribe('priority-queue > PriorityQueue', function _describe() {
  it('base', async function () {
    const queue = new PriorityQueue()
    const log = []

    let whileCount = 0
    async function test(index: number, order: number) {
      do {
        log.push('run' + index)
        // console.log('run' + index)
        await queue.run(() => {
          log.push('tick' + index)
          // console.log('tick' + index)
        }, priorityCreate(order))
        log.push('check' + index)
        // console.log('check' + index)
      } while ((whileCount++) % 2 === 0)

      log.push('end' + index)
      // console.log('end' + index)
    }

    const promises = []
    const count = 10
    for (let i = 0; i < count; i++) {
      promises.push(test(i, count - 1 - i))
    }

    await Promise.all(promises)

    for (let i = 0; i < count; i++) {
      assert.strictEqual(log[i], 'run' + i)
    }

    console.log(log.join('\r\n'))

    let prevIndex = count - 1
    for (let i = count; i < log.length; i++) {
      const index = parseInt(log[i].match(/\d+/), 10)
      assert.ok(index === prevIndex || index === prevIndex - 1)
      prevIndex = index
      // console.log(index)
    }
  })
  
  type FuncParams = {
    name: string,
    startTime: number,
    runTime: number,
    abortTime: number,
    abortController: IAbortControllerFast
    order: number,
  }

  function createFunc(
    name: string,
    results: string[],
    delayTime: number,
    timeController: ITimeController,
    timeStart: number,
  ) {
    return function func(abortSignal?: IAbortSignalFast) {
      results.push(`${timeController.now() - timeStart}-2: ${name} start`)
      if (delayTime != null) {
        return delay(delayTime, abortSignal, timeController)
          .then(function delayThen() {
            results.push(`${timeController.now() - timeStart}-3: ${name} end`)
            return name
          })
      }
      if (abortSignal?.aborted) {
        throw abortSignal.reason
      }
      results.push(`${timeController.now() - timeStart}-3: ${name} end`)
      return name
    }
  }
  
  function enqueueFunc(
    results: string[],
    funcParams: FuncParams,
    timeController: ITimeController,
    timeStart: number,
    priorityQueue: PriorityQueue,
  ) {
    const func = createFunc(funcParams.name, results, funcParams.runTime, timeController, timeStart)
    
    function enqueue() {
      results.push(`${timeController.now() - timeStart}-1: ${funcParams.name} enqueue`)
      const promise = priorityQueue.run(func, priorityCreate(funcParams.order), funcParams.abortController?.signal)
      assert.ok(typeof promise.then === 'function')
      promise
        .then(
          function runThen(result) {
            results.push(`${timeController.now() - timeStart}-3: ${funcParams.name} result: ${result}`)
          },
          function runError(err) {
            if (typeof err !== 'string') {
              results.push('ERROR: ' + err.stack)
            }
            else {
              results.push(`${timeController.now() - timeStart}-3: ${funcParams.name} aborted: ${err}`)
            }
          },
        )
    }
    
    if (funcParams.abortTime != null) {
      timeController.setTimeout(function abortTimerCallback() {
        funcParams.abortController.abort(funcParams.name)
      }, funcParams.startTime + funcParams.abortTime)
    }
    timeController.setTimeout(enqueue, funcParams.startTime)
  }

  function awaitTime(timeController: TimeControllerMock, time: number, awaitsPerTime: number) {
    let i = 0
    let j = 0
    function next() {
      if (j >= awaitsPerTime) {
        i++
        if (i >= time) {
          return
        }
        timeController.addTime(1)
        j = 0
      }
      timeController.addTime(0)
      j++
      return Promise.resolve().then(next)
    }
    return next()
    // for (let i = 0; i < time; i++) {
    //   for (let j = 0; j < awaitsPerTime; j++) {
    //     // eslint-disable-next-line @typescript-eslint/await-thenable
    //     timeController.addTime(0)
    //     await 0
    //   }
    //   timeController.addTime(1)
    // }
  }

  function getExpectedResults(funcsParams: FuncParams[]) {
    const len = funcsParams.length

    const resultsExpected = []

    const state = []
    for (let i = 0; i < len; i++) {
      state[i] = null
    }

    let time = 0
    let index = 0
    let startedFuncParamsIndex: number
    let startedFuncParamsEndTime: number
    let startedFuncParamsAbortTime: number
    let startedFuncParams: FuncParams

    while (time < 10) {
      for (let i = 0; i < len; i++) {
        const funcParams = funcsParams[i]
        if (state[i] === null) {
          if (time === funcParams.startTime) {
            state[i] = 'enqueued'
            resultsExpected[index++] = `${funcParams.startTime}-1: ${funcParams.name} enqueue`
          }
        }
      }

      for (let i = 0; i < len; i++) {
        const funcParams = funcsParams[i]
        if (state[i] === 'started' || state[i] === 'enqueued') {
          if (funcParams.abortTime != null && time === funcParams.startTime + funcParams.abortTime) {
            state[i] = 'aborted'
            resultsExpected[index++] = `${time}-3: ${funcParams.name} aborted: ${funcParams.name}`
            if (startedFuncParams === funcParams) {
              startedFuncParams = null
              startedFuncParamsIndex = null
            }
          }
        }
      }

      if (startedFuncParams && time === startedFuncParamsEndTime) {
        state[startedFuncParamsIndex] = 'completed'
        resultsExpected[index++] = `${time}-3: ${startedFuncParams.name} end`
        resultsExpected[index++] = `${time}-3: ${startedFuncParams.name} result: ${startedFuncParams.name}`
        startedFuncParams = null
        startedFuncParamsIndex = null
      }

      if (!startedFuncParams) {
        for (let i = 0; i < len; i++) {
          if (state[i] === 'enqueued') {
            const funcParams = funcsParams[i]
            if (
              !startedFuncParams
              || funcParams.order < startedFuncParams.order
              || funcParams.order === startedFuncParams.order && funcParams.startTime < startedFuncParams.startTime
            ) {
              startedFuncParamsIndex = i
              startedFuncParams = funcParams
            }
          }
        }
        if (startedFuncParams) {
          startedFuncParamsAbortTime = startedFuncParams.abortTime == null
            ? null
            : startedFuncParams.startTime + startedFuncParams.abortTime
          state[startedFuncParamsIndex] = 'started'
          if (time !== startedFuncParamsAbortTime) {
            resultsExpected[index++] = `${time}-2: ${startedFuncParams.name} start`
            startedFuncParamsEndTime = time + (startedFuncParams.runTime || 0)
          }
        }
        else {
          time++
        }
      }
      else {
        time++
      }
    }

    return resultsExpected
  }

  function compare(o1, o2) {
    if (o1 < o2) {
      return -1
    }
    if (o1 > o2) {
      return 1
    }
    return 0
  }

  const testVariants = createTestVariants(async function testVariant({
    abortTime1,
    abortTime2,
    abortTime3,

    order1,
    order2,
    order3,

    delayRun1,
    delayRun2,
    delayRun3,

    delayStart1,
    delayStart2,
    delayStart3,
  }: {
    abortTime1: number,
    abortTime2: number,
    abortTime3: number,

    order1: number,
    order2: number,
    order3: number,

    delayRun1: number,
    delayRun2: number,
    delayRun3: number,

    delayStart1: number,
    delayStart2: number,
    delayStart3: number,
  }) {
    const results = []
    const timeController = new TimeControllerMock()
    const priorityQueue = new PriorityQueue()
    const funcsParams: FuncParams[] = [
      {
        name           : 'func1',
        startTime      : delayStart1,
        runTime        : delayRun1,
        abortTime      : abortTime1,
        abortController: abortTime1 == null ? null :new AbortControllerFast(),
        order          : order1,
      },
      {
        name           : 'func2',
        startTime      : delayStart2,
        runTime        : delayRun2,
        abortTime      : abortTime2,
        abortController: abortTime2 == null ? null :new AbortControllerFast(),
        order          : order2,
      },
      {
        name           : 'func3',
        startTime      : delayStart3,
        runTime        : delayRun3,
        abortTime      : abortTime3,
        abortController: abortTime3 == null ? null : new AbortControllerFast(),
        order          : order3,
      },
    ]
    const len = funcsParams.length

    const timeStart = timeController.now()

    for (let i = 0; i < len; i++) {
      const funcParams = funcsParams[i]
      enqueueFunc(results, funcParams, timeController, timeStart, priorityQueue)
    }

    assert.strictEqual(results.length, 0)

    await awaitTime(timeController, 9, 15)

    const expectedResults = getExpectedResults(funcsParams)

    // if (!arrayEquals(results, expectedResults)) {
    assert.deepStrictEqual(
      results.sort(compare),
      expectedResults.sort(compare),
    )
    // }

    results.length = 0
    timeController.addTime(1000000)
    await awaitTime(timeController, 1, 20)
    assert.strictEqual(results.length, 0)
  })

  function arrayEquals<T>(a1: T[], a2: T[]): boolean {
    const set1 = new Set(a1)
    const set2 = new Set(a2)

    let result = true
    set1.forEach(o => {
      result &&= set2.has(o)
    })
    set2.forEach(o => {
      result &&= set1.has(o)
    })

    return result
  }

  xit('custom 1', async function () {
    this.timeout(300000)

    await testVariants({
      abortTime1 : [null],
      abortTime2 : [null],
      abortTime3 : [null],
      order1     : [0],
      order2     : [0],
      order3     : [0],
      delayRun1  : [2],
      delayRun2  : [2],
      delayRun3  : [2],
      delayStart1: [2],
      delayStart2: [2],
      delayStart3: [2],
    })()
  })

  xit('custom 2', async function () {
    this.timeout(300000)

    await testVariants({
      abortTime1 : [null],
      abortTime2 : [null],
      abortTime3 : [0],
      order1     : [0],
      order2     : [0],
      order3     : [0],
      delayRun1  : [null],
      delayRun2  : [1],
      delayRun3  : [null],
      delayStart1: [0],
      delayStart2: [0],
      delayStart3: [1],
    })()
  })
  
  xit('custom 3', async function () {
    this.timeout(300000)

    await testVariants({
      abortTime1 : [null],
      abortTime2 : [null],
      abortTime3 : [0],
      order1     : [0],
      order2     : [0],
      order3     : [0],
      delayRun1  : [null],
      delayRun2  : [null],
      delayRun3  : [null],
      delayStart1: [0],
      delayStart2: [0],
      delayStart3: [0],
    })()
  })

  xit('custom 4', async function () {
    this.timeout(300000)

    await testVariants({
      abortTime1 : [null],
      abortTime2 : [null],
      abortTime3 : [0],
      order1     : [0],
      order2     : [0],
      order3     : [0],
      delayRun1  : [null],
      delayRun2  : [null],
      delayRun3  : [null],
      delayStart1: [0],
      delayStart2: [0],
      delayStart3: [0],
    })()
  })
  
  xit('profiling', async function _it_profiling() {
    this.timeout(1200000)

    await testVariants({
      abortTime1: [0, 1],
      abortTime2: [0, 1],
      abortTime3: [0, 2],

      order1: [0, 1, 2],
      order2: [0, 1, 2],
      order3: [0, 1, 2],

      delayRun1: [null, 1, 2],
      delayRun2: [null, 1, 2],
      delayRun3: [null, 1, 2],

      delayStart1: [0, 1, 2],
      delayStart2: [0, 1, 2],
      delayStart3: [0, 1, 2],
    })()
  })

  it('variants', async function () {
    this.timeout(1200000)

    const isBrowser = typeof window !== 'undefined'

    await testVariants({
      abortTime1: isBrowser ? [null, 2] : [null, 0, 1, 2],
      abortTime2: isBrowser ? [null, 1] : [null, 0, 1, 2],
      abortTime3: isBrowser ? [null, 0] : [null, 0, 1, 2],

      order1: [0, 1, 2],
      order2: [0, 1, 2],
      order3: [0, 1, 2],

      delayRun1: [null, 1, 2],
      delayRun2: [null, 1, 2],
      delayRun3: [null, 1, 2],

      delayStart1: isBrowser ? [1, 2] : [0, 1, 2],
      delayStart2: isBrowser ? [0, 2] : [0, 1, 2],
      delayStart3: isBrowser ? [0, 1] : [0, 1, 2],
    })()
  })
})
