'use strict';

var tslib = require('tslib');
var priorityQueue_PriorityQueue = require('./PriorityQueue.cjs');
require('./helpers.cjs');
require('@flemist/pairing-heap');
require('@flemist/async-utils');
require('../priority/Priority.cjs');

describe('priority-queue > PriorityQueue', function () {
    this.timeout(60 * 60 * 1000);
    it('1 million', function () {
        return tslib.__awaiter(this, void 0, void 0, function* () {
            new priorityQueue_PriorityQueue.PriorityQueue();
            const promises = Array.from({ length: 3000000 }, (_, i) => {
                // return queue.run(() => {
                // return null
                // return new Promise(resolve => setTimeout(resolve, 0))
                let resolve;
                const promise = new Promise(_resolve => {
                    resolve = _resolve;
                });
                resolve(null);
                return promise;
                // })
            });
            yield Promise.allSettled(promises);
            console.log('COMPLETED');
        });
    });
});
