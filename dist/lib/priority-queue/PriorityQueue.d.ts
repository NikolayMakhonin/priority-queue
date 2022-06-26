import { IPriorityQueue, IPriorityQueueTask, PromiseOrValue, Task } from './contracts';
import { Priority } from "../priority";
import { IAbortSignalFast } from '@flemist/abort-controller-fast';
declare type TQueueItem<T> = {
    func: (abortSignal?: IAbortSignalFast) => PromiseOrValue<T>;
    abortSignal: IAbortSignalFast;
    priority: Priority;
    resolve: (value: T) => void;
    reject: (error: Error) => void;
    readyToRun: boolean;
};
export declare function queueItemLessThan(o1: TQueueItem<any>, o2: TQueueItem<any>): boolean;
export declare class PriorityQueue implements IPriorityQueue, IPriorityQueueTask {
    private readonly _queue;
    constructor();
    run<T>(func: (abortSignal?: IAbortSignalFast) => PromiseOrValue<T>, priority?: Priority, abortSignal?: IAbortSignalFast): Promise<T>;
    runTask<T>(func: (abortSignal?: IAbortSignalFast) => PromiseOrValue<T>, priority?: Priority, abortSignal?: IAbortSignalFast): Task<T>;
    private _run;
    _inProcess: boolean;
    private _process;
}
export {};
