import { IUnitOfWork } from './i-unit-of-work';

export interface IActivityService {
    readonly closeOn: number;
    readonly hideOn: number;
    readonly openOn: number;

    getRemainTime(uow: IUnitOfWork): Promise<[number, number]>;
}