import { ActivityServiceBase } from './activity-service-base';
import { IConditionActivity } from './i-condition-activity';
import { IUnitOfWork } from './i-unit-of-work';
import { IValueService } from './i-value-service';

export class ConditionActivityService<T extends IConditionActivity> extends ActivityServiceBase {
    public closeOn = 0;
    public hideOn = 0;
    public openOn = 0;

    public constructor(
        protected valueService: IValueService,
        protected entry: T,
        getNowFunc: () => Promise<number>,
    ) {
        super(getNowFunc);
    }

    public async getRemainTime(uow: IUnitOfWork) {
        if (!this.remainTime) {
            let ok = await this.valueService.checkConditions(uow, this.entry.openConditions);
            if (!ok)
                return;

            ok = await this.valueService.checkConditions(uow, this.entry.closeConditions);
            if (ok)
                return;

            const beginOn = await this.valueService.getCount(uow, this.entry.contrastValueType);
            this.closeOn = beginOn + this.entry.closeConditions[0][0].count;
            this.hideOn = beginOn + this.entry.hideConditions[0][0].count;
            this.openOn = beginOn + this.entry.openConditions[0][0].count;
        }

        return super.getRemainTime(uow);
    }
}