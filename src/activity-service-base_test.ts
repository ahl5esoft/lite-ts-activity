import { deepStrictEqual } from 'assert';

import { ActivityServiceBase } from './activity-service-base';

class Self extends ActivityServiceBase<any> {
    public constructor(
        public closeOn: number,
        public hideOn: number,
        public openOn: number,
        getNowFunc: () => Promise<number>,
    ) {
        super({}, getNowFunc);
    }
}

describe('src/activity-service-base.ts', () => {
    describe('.getRemainTime(_: IUnitOfWork)', () => {
        it('openOn < now', async () => {
            const self = new Self(0, 0, 0, async () => {
                return 1;
            });

            const res = await self.getRemainTime(null);
            deepStrictEqual(res, [0, 0]);
        });

        it('openOn = now', async () => {
            const self = new Self(0, 0, 1, async () => {
                return 1;
            });

            const res = await self.getRemainTime(null);
            deepStrictEqual(res, [0, 0]);
        });

        it('ok', async () => {
            const self = new Self(3, 4, 0, async () => {
                return 1;
            });

            const res = await self.getRemainTime(null);
            deepStrictEqual(res, [3, 2]);
        });
    });
});