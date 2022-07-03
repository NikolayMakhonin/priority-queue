import { PriorityQueue } from './PriorityQueue.mjs';
import 'tslib';
import '@flemist/pairing-heap';
import '@flemist/async-utils';
import '../priority/Priority.mjs';

function createAwaitPriority() {
    const priorityQueue = new PriorityQueue();
    return function awaitPriority(priority, abortSignal) {
        return priorityQueue.run(void 0, priority, abortSignal);
    };
}

export { createAwaitPriority };
