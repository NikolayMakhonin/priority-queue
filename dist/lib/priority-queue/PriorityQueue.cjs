'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var pairingHeap = require('@flemist/pairing-heap');
var asyncUtils = require('@flemist/async-utils');
var priority_Priority = require('../priority/Priority.cjs');

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
        const task = this.runTask(func, priority, abortSignal);
        task.setReadyToRun(true);
        return task.result;
    }
    runTask(func, priority, abortSignal) {
        const promise = new asyncUtils.CustomPromise(abortSignal);
        const item = {
            priority: priority_Priority.priorityCreate(nextOrder++, priority),
            func,
            abortSignal,
            resolve: promise.resolve,
            reject: promise.reject,
            readyToRun: void 0,
        };
        this._queue.add(item);
        const _this = this;
        function setReadyToRun(readyToRun) {
            item.readyToRun = readyToRun;
            if (readyToRun) {
                void _this._process();
            }
        }
        return {
            result: promise.promise,
            setReadyToRun,
        };
    }
    _process() {
        return tslib.__awaiter(this, void 0, void 0, function* () {
            if (this._inProcess) {
                return;
            }
            this._inProcess = true;
            const queue = this._queue;
            while (true) {
                // eslint-disable-next-line @typescript-eslint/await-thenable
                yield 0;
                // void Promise.resolve().then(emptyFunc).then(next)
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
                const item = nextNode.item;
                queue.delete(nextNode);
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
