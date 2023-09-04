'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var pairingHeap = require('@flemist/pairing-heap');
var asyncUtils = require('@flemist/async-utils');
var priority_Priority = require('../../priority/Priority.cjs');

// const emptyFunc = function emptyFunc(o) {
//   return o
// }
function queueItemLessThan(o1, o2) {
    return priority_Priority.priorityCompare(o1.priority, o2.priority) < 0;
}
let nextOrder = 1;
class PriorityQueue {
    constructor() {
        this._queue = new pairingHeap.PairingHeap({
            lessThanFunc: queueItemLessThan,
        });
    }
    run(func, priority, abortSignal) {
        const promise = new asyncUtils.CustomPromise(abortSignal);
        this._queue.add({
            priority: priority_Priority.priorityCreate(nextOrder++, priority),
            func,
            abortSignal,
            resolve: promise.resolve,
            reject: promise.reject,
        });
        void this._process();
        return promise.promise;
    }
    _process() {
        return tslib.__awaiter(this, void 0, void 0, function* () {
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

exports.PriorityQueue = PriorityQueue;
exports.queueItemLessThan = queueItemLessThan;
