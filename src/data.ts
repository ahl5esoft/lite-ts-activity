import { EnumCcItem } from 'lite-ts-enum';
import { ValueCondition } from 'lite-ts-value';

export class ActivityData extends EnumCcItem {
    public viewNo: number;
    public condition?: {
        contrastValueType: number;
        close: ValueCondition[][];
        hide: ValueCondition[][];
        open: ValueCondition[][];
    };
    public range?: {
        closeOn: number;
        hideOn: number;
        openOn: number;
    };
}