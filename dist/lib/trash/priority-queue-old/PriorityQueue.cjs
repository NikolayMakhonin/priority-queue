'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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
        this._process();
        return promise.promise;
    }
    _process() {
        if (this._processRunning) {
            return;
        }
        this._processRunning = true;
        const _this = this;
        const queue = this._queue;
        function next() {
            if (queue.isEmpty) {
                _this._processRunning = false;
                return;
            }
            const item = queue.deleteMin();
            if (item.abortSignal && item.abortSignal.aborted) {
                item.reject(item.abortSignal.reason);
            }
            else {
                try {
                    const result = item.func && item.func(item.abortSignal);
                    if (result && typeof result.then === 'function') {
                        result
                            .then(item.resolve, item.reject)
                            .then(next);
                        return;
                    }
                    item.resolve(result);
                }
                catch (err) {
                    item.reject(err);
                }
            }
            void Promise.resolve().then(next);
        }
        void Promise.resolve().then(next);
    }
}

exports.PriorityQueue = PriorityQueue;
exports.queueItemLessThan = queueItemLessThan;
