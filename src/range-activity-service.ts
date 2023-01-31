import { ActivityServiceBase } from './activity-service-base';
import { IRangeActivity } from './i-range-activity';

export class RangeActivityService<T extends IRangeActivity> extends ActivityServiceBase<T> {
    public get closeOn() {
        return this.entry.closeOn;
    }

    public get hideOn() {
        return this.entry.hideOn;
    }

    public get openOn() {
        return this.entry.openOn;
    }

    public constructor(
        entry: T,
        getNowFunc: () => Promise<number>,
    ) {
        super(entry, getNowFunc);
    }
}