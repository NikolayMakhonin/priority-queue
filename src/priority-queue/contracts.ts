import {IAbortSignalFast} from '@flemist/abort-controller-fast'
import {Priority} from 'src/priority'

export type PromiseOrValue<T> = T | Promise<T>

export type TCompare<T> = (o1: T, o2: T) => number

export type Task<T> = {
  result: Promise<T>,
  setReadyToRun: (readyToRun: boolean) => void,
}

export interface IPriorityQueue {
  run<T>(
    func: (abortSignal?: IAbortSignalFast) => PromiseOrValue<T>,
    priority?: Priority,
    abortSignal?: IAbortSignalFast,
  ): Promise<T>;
}

export interface IPriorityQueueTask {
  runTask<T>(
    func: (abortSignal?: IAbortSignalFast) => PromiseOrValue<T>,
    priority?: Priority,
    abortSignal?: IAbortSignalFast,
  ): Task<T>;
}
