import { Model, ModelCtor } from 'sequelize-typescript';
import { CreateOptions } from 'sequelize/types';
import { OdataQueryParams, Querist, QueryCustomizer } from '../querying/querist';
export declare class BaseService<T extends Model, U> {
    private querist;
    set: ModelCtor<T>;
    constructor(set: ModelCtor<T>, querist: Querist<T>);
    findById(id: number): Promise<T>;
    findAll(query: OdataQueryParams, customize?: QueryCustomizer): Promise<any>;
    insert(toInsert: U, options?: CreateOptions): Promise<T>;
    update(id: number, newData: Partial<U>): Promise<[number, T[]]>;
}
