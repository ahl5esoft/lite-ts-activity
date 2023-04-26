import { deepStrictEqual } from 'assert';
import { Mock } from 'lite-ts-mock';
import { IUserService } from 'lite-ts-user';

import { ActivityServiceBase } from './service-base';

class Self extends ActivityServiceBase {
    public closeOn = 20;
    public hideOn = 30;
    public openOn = 10;
}

describe('src/service-base.ts', () => {
    describe('.getRemainTime(uow: IUnitOfWork)', () => {
        it('> now', async () => {
            const mockUserService = new Mock<IUserService>();
            const self = new Self(null, mockUserService.actual);

            mockUserService.expectReturn(
                r => r.getNow(),
                9
            );

            const res = await self.getRemainTime(null);
            deepStrictEqual(res, [0, 0]);
        });

        it('< now', async () => {
            const mockUserService = new Mock<IUserService>();
            const self = new Self(null, mockUserService.actual);

            mockUserService.expectReturn(
                r => r.getNow(),
                15
            );

            const res = await self.getRemainTime(null);
            deepStrictEqual(res, [15, 5]);
        });
    });
});