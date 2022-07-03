import { PriorityQueue } from './PriorityQueue.mjs';
import 'tslib';
import '@flemist/pairing-heap';
import '@flemist/async-utils';
import '../priority/Priority.mjs';

function createAwaitConcurrency() {
    const priorityQueue = new PriorityQueue();
    return function awaitConcurrency(priority, abortSignal) {
        return priorityQueue.run(void 0, priority, abortSignal);
    };
}

export { createAwaitConcurrency };
