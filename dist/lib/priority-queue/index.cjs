'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var priorityQueue_PriorityQueue = require('./PriorityQueue.cjs');
var priorityQueue_priorityQueueDefault = require('./priorityQueueDefault.cjs');
require('tslib');
require('@flemist/pairing-heap');
require('@flemist/async-utils');
require('../priority/Priority.cjs');



exports.PriorityQueue = priorityQueue_PriorityQueue.PriorityQueue;
exports.priorityQueueDefault = priorityQueue_priorityQueueDefault.priorityQueueDefault;
