import { IUnitOfWork } from 'lite-ts-db';
import { EnumFactoryBase } from 'lite-ts-enum';
import { IUserService, UserFactoryBase } from 'lite-ts-user';

import { ActivityConditionService } from './condition-service';
import { ActivityData } from './data';
import { IActivityFactory } from './i-factory';
import { ActivityRangeService } from './range-service';
import { ActivityServiceBase } from './service-base';

export class ActivityFactory implements IActivityFactory {
    private m_Service: Promise<{ [viewNo: number]: ActivityServiceBase[] }>;
    protected get service() {
        this.m_Service ??= new Promise<{ [viewNo: number]: ActivityServiceBase[] }>(async (s, f) => {
            try {
                const items = await this.m_EnumFactory.build({
                    app: 'activity',
                    areaNo: UserFactoryBase.areaNo,
                    ctor: ActivityData,
                }).items;
                s(
                    items.reduce((memo, r) => {
                        memo[r.viewNo] ??= [];
                        memo[r.viewNo].push(
                            r.condition ? new ActivityConditionService(r, this.m_UserService) : new ActivityRangeService(r, this.m_UserService)
                        );
                        return memo;
                    }, {} as { [viewNo: number]: ActivityServiceBase[] })
                );
            } catch (ex) {
                delete this.m_Service;
                f(ex);
            }
        });
        return this.m_Service;
    }

    public constructor(
        private m_UserService: IUserService,
        private m_EnumFactory: EnumFactoryBase,
    ) { }

    public async build(uow: IUnitOfWork, viewNo: number) {
        const service = await this.service;
        for (const r of service[viewNo] ?? []) {
            const remainTime = await r.getRemainTime(uow);
            if (remainTime[0])
                return r;
        }
    }
}