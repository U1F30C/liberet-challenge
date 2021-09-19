import { Model } from 'sequelize-typescript';
import { State } from './state.model';
export interface IMunicipality {
    id: number;
    key: string;
    name: string;
    stateId: number;
}
export declare class Municipality extends Model<Municipality, IMunicipality> implements IMunicipality {
    id: number;
    key: string;
    name: string;
    stateId: number;
    state: State;
}
