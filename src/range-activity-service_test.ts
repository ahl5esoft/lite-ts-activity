import { strictEqual } from 'assert';

import { RangeActivityService as Self } from './range-activity-service';

describe('src/range-activity-service.ts', () => {
    describe('.closeOn', () => {
        it('ok', () => {
            const self = new Self({
                closeOn: 1,
                hideOn: 2,
                openOn: 3,
            }, null);
            strictEqual(self.closeOn, 1);
        });
    });

    describe('.hideOn', () => {
        it('ok', () => {
            const self = new Self({
                closeOn: 1,
                hideOn: 2,
                openOn: 3,
            }, null);
            strictEqual(self.hideOn, 2);
        });
    });

    describe('.openOn', () => {
        it('ok', () => {
            const self = new Self({
                closeOn: 1,
                hideOn: 2,
                openOn: 3,
            }, null);
            strictEqual(self.openOn, 3);
        });
    });
});