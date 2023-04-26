import { ActivityServiceBase } from './service-base';

export class ActivityRangeService extends ActivityServiceBase {
    public get closeOn() {
        return this.enumItem.range.closeOn;
    }

    public get hideOn() {
        return this.enumItem.range.hideOn;
    }

    public get openOn() {
        return this.enumItem.range.openOn;
    }
}