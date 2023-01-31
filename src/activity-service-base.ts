import { IActivityService } from './i-activity-service';
import { IUnitOfWork } from './i-unit-of-work';

export abstract class ActivityServiceBase implements IActivityService {
    protected remainTime: [number, number];

    public abstract get closeOn(): number;
    public abstract get hideOn(): number;
    public abstract get openOn(): number;

    public constructor(
        protected getNowFunc: () => Promise<number>,
    ) { }

    public async getRemainTime(_: IUnitOfWork) {
        if (!this.remainTime) {
            const now = await this.getNowFunc();
            this.remainTime = this.openOn > now ? [0, 0] : [
                this.hideOn - now < 0 ? 0 : this.hideOn - now,
                this.closeOn - now < 0 ? 0 : this.closeOn - now
            ];
        }

        return this.remainTime;
    }
}