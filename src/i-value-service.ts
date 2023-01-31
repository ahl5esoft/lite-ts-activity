import { IUnitOfWork } from './i-unit-of-work';
import { IValueCondition } from './i-value-condition';

export interface IValueService {
    checkConditions(uow: IUnitOfWork, conditions: IValueCondition[][]): Promise<boolean>;
    getCount(uow: IUnitOfWork, valueType: number): Promise<number>;
}