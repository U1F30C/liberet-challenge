import { Appointment } from 'src/appointments/entities/appointment.model';
import { ProfileDTO } from '../dtos/profile.dto';
import { Client } from '../models/client.model';
import { IMinor, Minor } from '../models/minor.model';
export declare class ProfileService {
    private clientModel;
    private minorModel;
    private appointmentModel;
    constructor(clientModel: typeof Client, minorModel: typeof Minor, appointmentModel: typeof Appointment);
    getProfile(clientId: number): Promise<ProfileDTO>;
    patchProfile(userId: number, body: Partial<ProfileDTO>): Promise<void>;
    addMinor(minor: IMinor, userId: number): Promise<any>;
    validateMinor(minor: IMinor): Promise<void>;
    validateExistingClient(minor: IMinor): Promise<void>;
    validateDuplicatedMinor(minor: IMinor): Promise<void>;
    getMinors(userId: number): Promise<any>;
    updateMinor(minor: IMinor, userId: number): Promise<void>;
    deleteMinor(minorId: number, userId: number): Promise<void>;
    private validateMinorOwnership;
    private validateDeletion;
    validateRelationships(minorId: number): Promise<void>;
}
