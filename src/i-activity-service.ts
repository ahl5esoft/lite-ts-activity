import { IUnitOfWork } from './i-unit-of-work';

export interface IActivityService<T> {
    readonly closeOn: number;
    readonly hideOn: number;
    readonly openOn: number;
    readonly entry: T;

    getRemainTime(uow: IUnitOfWork): Promise<[number, number]>;
}