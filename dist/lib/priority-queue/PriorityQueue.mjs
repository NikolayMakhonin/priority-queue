import { __awaiter } from 'tslib';
import { PairingHeap } from '@flemist/pairing-heap';
import { CustomPromise } from '@flemist/async-utils';
import { priorityCompare, priorityCreate } from '../priority/Priority.mjs';

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
        return this._run(false, func, priority, abortSignal);
    }
    runTask(func, priority, abortSignal) {
        return this._run(true, func, priority, abortSignal);
    }
    _run(taskMode, func, priority, abortSignal) {
        const promise = new CustomPromise(abortSignal);
        const item = {
            priority: priorityCreate(nextOrder++, priority),
            func,
            abortSignal,
            resolve: promise.resolve,
            reject: promise.reject,
            readyToRun: !taskMode,
        };
        this._queue.add(item);
        if (taskMode) {
            const _this = this;
            return {
                result: promise.promise,
                setReadyToRun(readyToRun) {
                    item.readyToRun = readyToRun;
                    if (readyToRun && !_this._inProcess) {
                        _this._inProcess = true;
                        void _this._process();
                    }
                },
            };
        }
        if (!this._inProcess) {
            this._inProcess = true;
            void this._process();
        }
        return promise.promise;
    }
    _process() {
        return __awaiter(this, void 0, void 0, function* () {
            const queue = this._queue;
            while (true) {
                // eslint-disable-next-line @typescript-eslint/await-thenable
                yield 0;
                // void Promise.resolve().then(emptyFunc).then(next)
                if (queue.isEmpty) {
                    this._inProcess = false;
                    break;
                }
                let item = queue.getMin();
                if (item.readyToRun) {
                    queue.deleteMin();
                }
                else {
                    let nextNode;
                    for (const node of queue.nodes()) {
                        if (node.item.readyToRun) {
                            nextNode = node;
                            break;
                        }
                    }
                    if (!nextNode) {
                        this._inProcess = false;
                        break;
                    }
                    item = nextNode.item;
                    queue.delete(nextNode);
                }
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
