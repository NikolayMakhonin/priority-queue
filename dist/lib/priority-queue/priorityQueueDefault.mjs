import { PriorityQueue } from './PriorityQueue.mjs';
import 'tslib';
import '@flemist/pairing-heap';
import '@flemist/async-utils';
import '../priority/Priority.mjs';

const priorityQueueDefault = new PriorityQueue();

export { priorityQueueDefault };
