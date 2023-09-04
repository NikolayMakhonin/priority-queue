import { __awaiter } from 'tslib';
import { PairingHeap } from '@flemist/pairing-heap';
import { CustomPromise } from '@flemist/async-utils';
import { priorityCompare, priorityCreate } from '../../priority/Priority.mjs';

// const emptyFunc = function emptyFunc(o) {
//   return o
// }
function queueItemLessThan(o1, o2) {
    return priorityCompare(o1.priority, o2.priority) < 0;
}
let nextOrder = 1;
class PriorityQueue {
    constructor() {
        this._queue = new PairingHeap({
            lessThanFunc: queueItemLessThan,
        });
    }
    run(func, priority, abortSignal) {
        const promise = new CustomPromise(abortSignal);
        this._queue.add({
            priority: priorityCreate(nextOrder++, priority),
            func,
            abortSignal,
            resolve: promise.resolve,
            reject: promise.reject,
        });
        void this._process();
        return promise.promise;
    }
    _process() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._processRunning) {
                return;
            }
            this._processRunning = true;
            const queue = this._queue;
            while (true) {
                // eslint-disable-next-line @typescript-eslint/await-thenable
                yield 0;
                // void Promise.resolve().then(emptyFunc).then(next)
                if (queue.isEmpty) {
                    this._processRunning = false;
                    break;
                }
                const item = queue.deleteMin();
                if (item.abortSignal && item.abortSignal.aborted) {
                    item.reject(item.abortSignal.reason);
                }
                else {
                    try {
                        let result = item.func && item.func(item.abortSignal);
                        if (result && typeof result.then === 'function') {
                            result = yield result;
                        }
                        item.resolve(result);
                    }
                    catch (err) {
                        item.reject(err);
                    }
                }
            }
        });
    }
}

export { PriorityQueue, queueItemLessThan };
