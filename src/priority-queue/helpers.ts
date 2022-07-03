import {PriorityQueue} from './PriorityQueue'
import {Priority} from 'src/priority'
import {IAbortSignalFast} from '@flemist/abort-controller-fast'

export type AwaitPriority
  = (priority?: Priority, abortSignal?: IAbortSignalFast) => Promise<void>

export function createAwaitPriority(): AwaitPriority {
  const priorityQueue = new PriorityQueue()
  return function awaitPriority(priority?: Priority, abortSignal?: IAbortSignalFast) {
    return priorityQueue.run(void 0, priority, abortSignal)
  }
}
