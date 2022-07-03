'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var priorityQueue_PriorityQueue = require('./PriorityQueue.cjs');
require('tslib');
require('@flemist/pairing-heap');
require('@flemist/async-utils');
require('../priority/Priority.cjs');

const priorityQueueDefault = new priorityQueue_PriorityQueue.PriorityQueue();

exports.priorityQueueDefault = priorityQueueDefault;
