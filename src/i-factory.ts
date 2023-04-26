import { IUnitOfWork } from 'lite-ts-db';

import { ActivityServiceBase } from './service-base';

export interface IActivityFactory {
    build(uow: IUnitOfWork, viewNo: number): Promise<ActivityServiceBase>;
}