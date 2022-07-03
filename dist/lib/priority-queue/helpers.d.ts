import { Priority } from "../priority";
import { IAbortSignalFast } from '@flemist/abort-controller-fast';
export declare type AwaitConcurrency = (priority?: Priority, abortSignal?: IAbortSignalFast) => Promise<void>;
export declare function createAwaitConcurrency(): AwaitConcurrency;
