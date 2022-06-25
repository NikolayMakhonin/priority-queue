import {IPriorityQueue, PromiseOrValue} from './contracts'
import {PairingHeap} from '@flemist/pairing-heap'
import {CustomPromise} from '@flemist/async-utils'
import {Priority, priorityCompare, priorityCreate} from 'src/priority'
import {IAbortSignalFast} from '@flemist/abort-controller-fast'

type TQueueItem<T> = {
  func: (abortSignal?: IAbortSignalFast) => PromiseOrValue<T>
  abortSignal: IAbortSignalFast
  priority: Priority
  resolve: (value: T) => void
  reject: (error: Error) => void
}

// const emptyFunc = function emptyFunc(o) {
//   return o
// }

export function queueItemLessThan(o1: TQueueItem<any>, o2: TQueueItem<any>): boolean {
  return priorityCompare(o1.priority, o2.priority) < 0
}

let nextOrder: number = 1

export class PriorityQueue implements IPriorityQueue {
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
    const promise = new CustomPromise<T>(abortSignal)

    this._queue.add({
      priority: priorityCreate(nextOrder++, priority),
      func,
      abortSignal,
      resolve : promise.resolve,
      reject  : promise.reject,
    })

    void this._process()

    return promise.promise
  }

  _processRunning: boolean
  private async _process() {
    if (this._processRunning) {
      return
    }
    this._processRunning = true

    const queue = this._queue

    while (true) {
      // eslint-disable-next-line @typescript-eslint/await-thenable
      await 0

      // void Promise.resolve().then(emptyFunc).then(next)

      if (queue.isEmpty) {
        this._processRunning = false
        break
      }

      const item = queue.deleteMin()
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
