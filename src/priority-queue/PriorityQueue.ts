import {IPriorityQueue, IPriorityQueueTask, PromiseOrValue, Task} from './contracts'
import {PairingHeap, PairingNode} from '@flemist/pairing-heap'
import {CustomPromise} from '@flemist/async-utils'
import {Priority, priorityCompare, priorityCreate} from 'src/priority'
import {IAbortSignalFast} from '@flemist/abort-controller-fast'

type TQueueItem<T> = {
  func: (abortSignal?: IAbortSignalFast) => PromiseOrValue<T>,
  abortSignal: IAbortSignalFast
  priority: Priority
  resolve: (value: T) => void
  reject: (error: Error) => void
  readyToRun: boolean
}

// const emptyFunc = function emptyFunc(o) {
//   return o
// }

export function queueItemLessThan(o1: TQueueItem<any>, o2: TQueueItem<any>): boolean {
  return priorityCompare(o1.priority, o2.priority) < 0
}

let nextOrder: number = 1

export class PriorityQueue implements IPriorityQueue, IPriorityQueueTask {
  private readonly _queue: PairingHeap<TQueueItem<any>>

  constructor() {
    this._queue = new PairingHeap<TQueueItem<any>>({
      lessThanFunc: queueItemLessThan,
    })
  }

  run<T>(
    func: (abortSignal?: IAbortSignalFast) => PromiseOrValue<T>,
    priority?: Priority,
    abortSignal?: IAbortSignalFast,
  ): Promise<T> {
    const task = this.enqueue(func, priority, abortSignal)
    task.setReadyToRun(true)
    return task.result
  }

  enqueue<T>(
    func: (abortSignal?: IAbortSignalFast) => PromiseOrValue<T>,
    priority?: Priority,
    abortSignal?: IAbortSignalFast,
  ): Task<T> {
    const promise = new CustomPromise<T>(abortSignal)

    const item: TQueueItem<T> = {
      priority  : priorityCreate(nextOrder++, priority),
      func,
      abortSignal,
      resolve   : promise.resolve,
      reject    : promise.reject,
      readyToRun: void 0,
    }
    
    this._queue.add(item)

    const _this = this

    function setReadyToRun(readyToRun: boolean) {
      item.readyToRun = readyToRun
      if (readyToRun) {
        void _this._process()
      }
    }

    return {
      result: promise.promise,
      setReadyToRun,
    }
  }

  _inProcess: boolean
  private async _process() {
    if (this._inProcess) {
      return
    }
    this._inProcess = true

    const queue = this._queue

    while (true) {
      // eslint-disable-next-line @typescript-eslint/await-thenable
      await 0

      // void Promise.resolve().then(emptyFunc).then(next)

      let nextNode: PairingNode<TQueueItem<any>>
      for (const node of queue.nodes()) {
        if (node.item.readyToRun) {
          nextNode = node
          break
        }
      }

      if (!nextNode) {
        this._inProcess = false
        break
      }

      const item = nextNode.item
      queue.delete(nextNode)

      if (item.abortSignal && item.abortSignal.aborted) {
        item.reject(item.abortSignal.reason)
      }
      else {
        try {
          let result = item.func && item.func(item.abortSignal)
          if (result && typeof result.then === 'function') {
            result = await result
          }
          item.resolve(result)
        }
        catch (err) {
          item.reject(err)
        }
      }
    }
  }
}
