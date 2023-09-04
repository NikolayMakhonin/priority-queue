import { __awaiter } from 'tslib';
import { PriorityQueue } from './PriorityQueue.mjs';
import './helpers.mjs';
import '@flemist/pairing-heap';
import '@flemist/async-utils';
import '../priority/Priority.mjs';

describe('priority-queue > PriorityQueue', function () {
    this.timeout(60 * 60 * 1000);
    it('1 million', function () {
        return __awaiter(this, void 0, void 0, function* () {
            new PriorityQueue();
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
