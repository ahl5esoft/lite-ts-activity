import { IConditionActivity } from './i-condition-activity';
import { IRangeActivity } from './i-range-activity';

export interface IActivity extends Partial<{
    condition: IConditionActivity;
    range: IRangeActivity;
}> { }