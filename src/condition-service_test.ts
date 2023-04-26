import { strictEqual } from 'assert';
import { IUnitOfWork } from 'lite-ts-db';
import { Mock } from 'lite-ts-mock';
import { IUserService, UserValue } from 'lite-ts-user';
import { ValueService } from 'lite-ts-value';

import { ActivityConditionService as Self } from './condition-service';
import { ActivityData } from './data';

describe('src/condition-service.ts', () => {
    it('.initTime(uow: IUnitOfWork)', async () => {
        const mockUserService = new Mock<IUserService>();
        const self = new Self({
            condition: {
                contrastValueType: 1,
                close: [
                    [{
                        count: 2,
                    }]
                ],
                hide: [
                    [{
                        count: 3,
                    }]
                ],
                open: [
                    [{
                        count: 4,
                    }]
                ],
            }
        } as ActivityData, mockUserService.actual);

        const mockValueService = new Mock<ValueService>();
        mockUserService.expectReturn(
            r => r.getModule(UserValue),
            mockValueService.actual
        );

        mockValueService.expectReturn(
            r => r.checkConditions(null, [
                [{
                    count: 4,
                }]
            ] as any),
            true
        );

        mockValueService.expectReturn(
            r => r.checkConditions(null, [
                [{
                    count: 2,
                }]
            ] as any),
            false
        );

        mockValueService.expectReturn(
            r => r.getCount(null, 1),
            10
        );

        const fn = Reflect.get(self, 'initTime').bind(self) as (_: IUnitOfWork) => Promise<void>;
        await fn(null);

        strictEqual(self.openOn, 14);
        strictEqual(self.closeOn, 12);
        strictEqual(self.hideOn, 13);
    });
});