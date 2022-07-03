import { Priority } from "../priority";
import { IAbortSignalFast } from '@flemist/abort-controller-fast';
export declare type AwaitPriority = (priority?: Priority, abortSignal?: IAbortSignalFast) => Promise<void>;
export declare function createAwaitPriority(): AwaitPriority;
export declare const awaitPriorityDefault: AwaitPriority;
