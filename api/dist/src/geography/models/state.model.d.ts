import { Model } from 'sequelize-typescript';
export interface IState {
    id: number;
    key: string;
    name: string;
}
export declare class State extends Model<State, IState> implements IState {
    id: number;
    key: string;
    name: string;
}
