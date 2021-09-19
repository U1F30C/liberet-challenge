import { IAppointment } from 'src/appointments/entities/appointment.model';
import { BaseService } from 'src/shared/base/base.service';
import { PaginationWrapper, Querist } from 'src/shared/querying/querist';
import { IUser } from 'src/users/models/user.model';
import { IClient, Client } from '../models/client.model';
export declare type ClientDTO = Omit<IClient, 'appointments'> & IUser & {
    age: number;
    appointments: (IAppointment & {
        patient: {
            fullName: any;
        };
    })[];
};
export declare class ClientService extends BaseService<Client, IClient> {
    constructor(clientModel: typeof Client, querist: Querist<Client>);
    update(clientId: number, newData: Partial<IClient>): any;
    insert(toInsert: IClient): Promise<Client>;
    private findClientByUserId;
    findClientByUserIdExpand(userId: number): Promise<ClientDTO>;
    findAllWithFullData(query: any): Promise<PaginationWrapper<Client>>;
    toDto(client: Client): ClientDTO;
    calculateAge(birthday: Date): number;
}
