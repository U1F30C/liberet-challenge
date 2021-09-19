import { PaginationWrapper } from 'src/shared/querying/querist';
import { ClientDTO, ClientService } from './services/clients.service';
import { IClient, Client } from './models/client.model';
import { ClientUserRegistrationService } from './services/client-user-registration.service';
export declare class ClientController {
    private clientService;
    private clientUserRegistrationService;
    constructor(clientService: ClientService, clientUserRegistrationService: ClientUserRegistrationService);
    findAll(query: any): Promise<PaginationWrapper<Client>>;
    findOne(id: string): Promise<ClientDTO>;
    findAllFullData(query: any): Promise<PaginationWrapper<Client>>;
    update(id: number, client: Partial<IClient>): Promise<any>;
}
