import { FindAndCountOptions, Sequelize } from 'sequelize';
import { Model, ModelCtor } from 'sequelize-typescript';
export interface OdataQueryParams {
    $select?: string;
    $filter?: string;
    $skip?: string;
    $top?: string;
    $orderby?: string;
}
export interface PaginationWrapper<T> {
    skip: number;
    top: number;
    elements: T[];
    totalCount: number;
}
export declare function isValidOdataQuery(query: OdataQueryParams): boolean;
export declare type QueryCustomizer = (query: FindAndCountOptions, sequelize: Sequelize) => void;
export declare class Querist<T extends Model> {
    private sequelize;
    static MaxRows: number;
    static DefaultQueryString: string;
    constructor(sequelize: Sequelize);
    query(oDataQuery: OdataQueryParams, set: ModelCtor<T>, customize?: QueryCustomizer): Promise<PaginationWrapper<any>>;
}
