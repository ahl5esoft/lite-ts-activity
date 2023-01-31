import { deepStrictEqual, strictEqual } from 'assert';
import { Mock } from 'lite-ts-mock';

import { ConditionActivityService as Self } from './condition-activity-service';
import { IValueService } from './i-value-service';

describe('src/condition-activity-service.ts', () => {
    describe('.getRemainTime(uow: IUnitOfWork)', () => {
        it('ok', async () => {
            const mockValueService = new Mock<IValueService>();
            const self = new Self(mockValueService.actual, {
                contrastValueType: 1,
                closeConditions: [
                    [{
                        count: 10,
                        op: '>',
                        valueType: 2,
                    }]
                ],
                hideConditions: [
                    [{
                        count: 9,
                        op: '>',
                        valueType: 3,
                    }]
                ],
                openConditions: [
                    [{
                        count: 0,
                        op: '>',
                        valueType: 4,
                    }]
                ]
            }, async () => {
                return 1;
            });

            mockValueService.expectReturn(
                r => r.checkConditions(null, [
                    [{
                        count: 0,
                        op: '>',
                        valueType: 4,
                    }]
                ]),
                true
            );

            mockValueService.expectReturn(
                r => r.checkConditions(null, [
                    [{
                        count: 10,
                        op: '>',
                        valueType: 2,
                    }]
                ]),
                false
            );

            mockValueService.expectReturn(
                r => r.getCount(null, 1),
                1
            );

            const res = await self.getRemainTime(null);
            deepStrictEqual(res, [9, 10]);

            strictEqual(self.closeOn, 11);
            strictEqual(self.hideOn, 10);
            strictEqual(self.openOn, 1);
        });
    });
});