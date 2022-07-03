'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var priorityQueue_PriorityQueue = require('./PriorityQueue.cjs');
require('tslib');
require('@flemist/pairing-heap');
require('@flemist/async-utils');
require('../priority/Priority.cjs');

function createAwaitConcurrency() {
    const priorityQueue = new priorityQueue_PriorityQueue.PriorityQueue();
    return function awaitConcurrency(priority, abortSignal) {
        return priorityQueue.run(void 0, priority, abortSignal);
    };
}

exports.createAwaitConcurrency = createAwaitConcurrency;
