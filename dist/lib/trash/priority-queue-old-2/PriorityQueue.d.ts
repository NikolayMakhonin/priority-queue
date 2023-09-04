import { IPriorityQueue, PromiseOrValue } from './contracts';
import { Priority } from "../../priority";
import { IAbortSignalFast } from '@flemist/abort-controller-fast';
declare type TQueueItem<T> = {
    func: (abortSignal?: IAbortSignalFast) => PromiseOrValue<T>;
    abortSignal: IAbortSignalFast;
    priority: Priority;
    resolve: (value: T) => void;
    reject: (error: Error) => void;
};
export declare function queueItemLessThan(o1: TQueueItem<any>, o2: TQueueItem<any>): boolean;
export declare class PriorityQueue implements IPriorityQueue {
    private readonly _queue;
    constructor();
    run<T>(func: (abortSignal?: IAbortSignalFast) => PromiseOrValue<T>, priority?: Priority, abortSignal?: IAbortSignalFast): Promise<T>;
    _processRunning: boolean;
    private _process;
}
export {};
