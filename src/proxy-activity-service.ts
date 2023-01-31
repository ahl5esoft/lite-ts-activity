import { ConditionActivityService } from './condition-activity-service';
import { IActivity } from './i-activity';
import { IActivityService } from './i-activity-service';
import { IUnitOfWork } from './i-unit-of-work';
import { IValueService } from './i-value-service';
import { RangeActivityService } from './range-activity-service';

export class ActivityService<T extends IActivity> implements IActivityService {
    private m_ActivityService: IActivityService;

    public get closeOn() {
        return this.m_ActivityService.closeOn;
    }

    public get hideOn() {
        return this.m_ActivityService.hideOn;
    }

    public get openOn() {
        return this.m_ActivityService.openOn;
    }

    public constructor(
        protected entry: T,
        protected valueService: IValueService,
        getNowFunc: () => Promise<number>,
    ) {
        this.m_ActivityService = entry.condition ? new ConditionActivityService(
            this.valueService,
            entry.condition,
            getNowFunc,
        ) : new RangeActivityService(
            entry.range,
            getNowFunc,
        );
    }

    public async getRemainTime(uow: IUnitOfWork) {
        return this.m_ActivityService.getRemainTime(uow);
    }
}