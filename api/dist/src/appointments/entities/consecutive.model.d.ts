import { Model } from 'sequelize-typescript';
export interface IConsecutive {
    batch: string;
    day: string;
    current: number;
}
export declare class Consecutive extends Model<IConsecutive> implements IConsecutive {
    batch: string;
    day: string;
    current: number;
}
