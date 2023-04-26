import { IUnitOfWork } from 'lite-ts-db';
import { IUserService } from 'lite-ts-user';
import { ActivityData } from './data';

export abstract class ActivityServiceBase {
    private m_RemainTime: Promise<[number, number]>;

    public abstract get closeOn(): number;
    public abstract get hideOn(): number;
    public abstract get openOn(): number;

    public constructor(
        public enumItem: ActivityData,
        protected userService: IUserService,
    ) { }

    public async getRemainTime(uow: IUnitOfWork) {
        this.m_RemainTime ??= new Promise<[number, number]>(async (s, f) => {
            try {
                await this.initTime(uow);

                const now = await this.userService.getNow();
                s(
                    this.openOn > now ? [0, 0] : [
                        this.hideOn - now < 0 ? 0 : this.hideOn - now,
                        this.closeOn - now < 0 ? 0 : this.closeOn - now
                    ]
                );
            } catch (ex) {
                delete this.m_RemainTime;
                f(ex);
            }
        });
        return this.m_RemainTime;
    }

    protected async initTime(_: IUnitOfWork) { }
}