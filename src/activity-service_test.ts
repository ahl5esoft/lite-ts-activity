import { deepStrictEqual, strictEqual } from 'assert';
import { Mock } from 'lite-ts-mock';

import { ActivityService as Self } from './activity-service';
import { ConditionActivityService } from './condition-activity-service';
import { IActivityService } from './i-activity-service';
import { RangeActivityService } from './range-activity-service';

describe('src/activity-service.ts', () => {
    describe('.closeOn', () => {
        it('ok', () => {
            const self = new Self({
                condition: {} as any,
            }, null, null);

            Reflect.set(self, 'm_ActivityService', {
                closeOn: 1
            });

            const res = self.closeOn;
            strictEqual(res, 1);
        });
    });

    describe('.hideOn', () => {
        it('ok', () => {
            const self = new Self({
                condition: {} as any,
            }, null, null);

            Reflect.set(self, 'm_ActivityService', {
                hideOn: 1
            });

            const res = self.hideOn;
            strictEqual(res, 1);
        });
    });

    describe('.openOn', () => {
        it('ok', () => {
            const self = new Self({
                condition: {} as any,
            }, null, null);

            Reflect.set(self, 'm_ActivityService', {
                openOn: 1
            });

            const res = self.openOn;
            strictEqual(res, 1);
        });
    });

    describe('.getRemainTime(uow: IUnitOfWork)', () => {
        it('cnodition', async () => {
            const self = new Self({
                condition: {} as any,
            }, null, null);

            const activityService = Reflect.get(self, 'm_ActivityService');
            strictEqual(activityService.constructor, ConditionActivityService);

            const mockActivityService = new Mock<IActivityService<any>>();
            Reflect.set(self, 'm_ActivityService', mockActivityService.actual);

            mockActivityService.expectReturn(
                r => r.getRemainTime(null),
                [1, 2]
            );

            const res = await self.getRemainTime(null);
            deepStrictEqual(res, [1, 2]);
        });

        it('range', async () => {
            const self = new Self({
                range: {} as any,
            }, null, null);

            const activityService = Reflect.get(self, 'm_ActivityService');
            strictEqual(activityService.constructor, RangeActivityService);

            const mockActivityService = new Mock<IActivityService<any>>();
            Reflect.set(self, 'm_ActivityService', mockActivityService.actual);

            mockActivityService.expectReturn(
                r => r.getRemainTime(null),
                [1, 2]
            );

            const res = await self.getRemainTime(null);
            deepStrictEqual(res, [1, 2]);
        });
    });
});