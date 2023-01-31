import { IValueCondition } from './i-value-condition';

export interface IConditionActivity {
    readonly contrastValueType: number;
    readonly closeConditions: IValueCondition[][];
    readonly hideConditions: IValueCondition[][];
    readonly openConditions: IValueCondition[][];
}