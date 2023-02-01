import { ActivityServiceBase } from './activity-service-base';
import { IConditionActivity } from './i-condition-activity';
import { IUnitOfWork } from './i-unit-of-work';
import { IValueService } from './i-value-service';

export class ConditionActivityService<T extends IConditionActivity> extends ActivityServiceBase<T> {
    public closeOn = 0;
    public hideOn = 0;
    public openOn = 0;

    public constructor(
        protected valueService: IValueService,
        activity: T,
        getNowFunc: () => Promise<number>,
    ) {
        super(activity, getNowFunc);
    }

    public async getRemainTime(uow: IUnitOfWork) {
        if (!this.remainTime) {
            let ok = await this.valueService.checkConditions(uow, this.activity.openConditions);
            if (!ok)
                return;

            ok = await this.valueService.checkConditions(uow, this.activity.closeConditions);
            if (ok)
                return;

            const beginOn = await this.valueService.getCount(uow, this.activity.contrastValueType);
            this.closeOn = beginOn + this.activity.closeConditions[0][0].count;
            this.hideOn = beginOn + this.activity.hideConditions[0][0].count;
            this.openOn = beginOn + this.activity.openConditions[0][0].count;
        }

        return super.getRemainTime(uow);
    }
}