import {PriorityQueue} from './PriorityQueue'
import {Priority} from 'src/priority'
import {IAbortSignalFast} from '@flemist/abort-controller-fast'

export type AwaitConcurrency
  = (priority?: Priority, abortSignal?: IAbortSignalFast) => Promise<void>

export function createAwaitConcurrency(): AwaitConcurrency {
  const priorityQueue = new PriorityQueue()
  return function awaitConcurrency(priority?: Priority, abortSignal?: IAbortSignalFast) {
    return priorityQueue.run(void 0, priority, abortSignal)
  }
}
