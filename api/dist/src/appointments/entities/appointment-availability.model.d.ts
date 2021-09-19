import { Model } from 'sequelize-typescript';
export interface IAppointmentAvailability {
    appointmentDate: Date | string;
    numberOfAppointments: number;
}
export declare class AppointmentAvailability extends Model<AppointmentAvailability, IAppointmentAvailability> implements IAppointmentAvailability {
    appointmentDate: Date | string;
    numberOfAppointments: number;
}
