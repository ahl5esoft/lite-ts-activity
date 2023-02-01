import { ActivityServiceBase } from './activity-service-base';
import { IRangeActivity } from './i-range-activity';

export class RangeActivityService<T extends IRangeActivity> extends ActivityServiceBase<T> {
    public get closeOn() {
        return this.activity.closeOn;
    }

    public get hideOn() {
        return this.activity.hideOn;
    }

    public get openOn() {
        return this.activity.openOn;
    }

    public constructor(
        activity: T,
        getNowFunc: () => Promise<number>,
    ) {
        super(activity, getNowFunc);
    }
}