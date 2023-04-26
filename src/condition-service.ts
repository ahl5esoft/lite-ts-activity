import { IUnitOfWork } from 'lite-ts-db';
import { UserValue } from 'lite-ts-user';
import { ValueService } from 'lite-ts-value';

import { ActivityServiceBase } from './service-base';

export class ActivityConditionService extends ActivityServiceBase {
    public closeOn = 0;
    public hideOn = 0;
    public openOn = 0;

    protected async initTime(uow: IUnitOfWork) {
        const valueService = this.userService.getModule<ValueService, UserValue>(UserValue);
        let ok = await valueService.checkConditions(uow, this.enumItem.condition.open);
        if (!ok)
            return;

        ok = await valueService.checkConditions(uow, this.enumItem.condition.close);
        if (ok)
            return;

        const beginOn = await valueService.getCount(uow, this.enumItem.condition.contrastValueType);
        this.closeOn = beginOn + this.enumItem.condition.close[0][0].count;
        this.hideOn = beginOn + this.enumItem.condition.hide[0][0].count;
        this.openOn = beginOn + this.enumItem.condition.open[0][0].count;
    }
}