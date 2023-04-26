import { ok, strictEqual } from 'assert';
import { EnumFactoryBase } from 'lite-ts-enum';
import { Mock } from 'lite-ts-mock';
import { UserFactoryBase } from 'lite-ts-user';

import { ActivityConditionService } from './condition-service';
import { ActivityData } from './data';
import { ActivityFactory as Self } from './factory';
import { ActivityRangeService } from './range-service';
import { ActivityServiceBase } from './service-base';

describe('src/factory.ts', () => {
    describe('.service[protected]', () => {
        it('condition', async () => {
            const mockEnumFactory = new Mock<EnumFactoryBase>();
            const self = new Self(null, mockEnumFactory.actual);

            const mockEnum = new Mock<ActivityData>({
                items: [{
                    condition: {},
                    viewNo: 1
                }]
            });
            mockEnumFactory.expectReturn(
                r => r.build({
                    app: 'activity',
                    areaNo: UserFactoryBase.areaNo,
                    ctor: ActivityData,
                }),
                mockEnum.actual
            );

            const task = Reflect.get(self, 'service') as Promise<{ [viewNo: number]: ActivityServiceBase[] }>;
            const res = await task;
            ok(res?.[1]?.[0] instanceof ActivityConditionService);
        });

        it('range', async () => {
            const mockEnumFactory = new Mock<EnumFactoryBase>();
            const self = new Self(null, mockEnumFactory.actual);

            const mockEnum = new Mock<ActivityData>({
                items: [{
                    range: {},
                    viewNo: 1
                }]
            });
            mockEnumFactory.expectReturn(
                r => r.build({
                    app: 'activity',
                    areaNo: UserFactoryBase.areaNo,
                    ctor: ActivityData,
                }),
                mockEnum.actual
            );

            const task = Reflect.get(self, 'service') as Promise<{ [viewNo: number]: ActivityServiceBase[] }>;
            const res = await task;
            ok(res?.[1]?.[0] instanceof ActivityRangeService);
        });
    });

    it('.build(uow: IUnitOfWork, viewNo: number)', async () => {
        const self = new Self(null, null);

        const mockActivityService = new Mock<ActivityServiceBase>();
        Reflect.set(self, 'm_Service', {
            1: [mockActivityService.actual]
        });

        mockActivityService.expectReturn(
            r => r.getRemainTime(null),
            [11, 1]
        );

        const res = await self.build(null, 1);
        strictEqual(res, mockActivityService.actual);
    });
});