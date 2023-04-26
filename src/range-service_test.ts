import { strictEqual } from 'assert';

import { ActivityData } from './data';
import { ActivityRangeService as Self } from './range-service';

describe('src/range-service.ts', () => {
    it('.closeOn', () => {
        const self = new Self({
            range: {
                closeOn: 1,
                hideOn: 2,
                openOn: 3,
            }
        } as ActivityData, null);
        strictEqual(self.closeOn, 1);
    });

    it('.hideOn', () => {
        const self = new Self({
            range: {
                closeOn: 1,
                hideOn: 2,
                openOn: 3,
            }
        } as ActivityData, null);
        strictEqual(self.hideOn, 2);
    });

    it('.openOn', () => {
        const self = new Self({
            range: {
                closeOn: 1,
                hideOn: 2,
                openOn: 3,
            }
        } as ActivityData, null);
        strictEqual(self.openOn, 3);
    });
});