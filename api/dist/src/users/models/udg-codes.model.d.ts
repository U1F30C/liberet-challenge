import { Model } from 'sequelize-typescript';
import { UdgCommunityCodeTypes } from '../../constants/udg-community-code-types';
export interface IUdgCode {
    userId: number;
    code: string;
    type: UdgCommunityCodeTypes;
}
export declare class UdgCode extends Model<UdgCode, IUdgCode> implements IUdgCode {
    userId: number;
    code: string;
    type: UdgCommunityCodeTypes;
}
