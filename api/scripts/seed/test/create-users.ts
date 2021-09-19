import { sequelizeInstance } from "../../db-connection";
import { IUser, User } from "../../../src/users/models/user.model";
import {
  IService,
  Service,
  ServiceType,
} from "../../../src/services/service.model";
import { Wallet } from "../../../src//wallet/wallet.model";
import { Log } from "../../../src//logs/log.model";
import { ActiveService } from "../../../src//services/active-services/active-service.model";

sequelizeInstance.addModels([User, Service, Wallet, Log, ActiveService]);

function generateUsers(): Partial<IUser>[] {
  return [
    {
      name: "Eva",
      lastName: "Lucia",
      email: "email@domain.com",
    },
  ];
}

function generateServices(): Partial<IService>[] {
  return [
    {
      name: "Campaña de marketing",
      serviceType: ServiceType.Enableable,
      cost: "1",
    },
    {
      name: "Añadir producto",
      serviceType: ServiceType.Immediate,
      cost: "5",
    },
  ];
}

async function createUsers() {
  const users = generateUsers();
  await User.bulkCreate(<any[]>users);

  const services = generateServices();

  await Service.bulkCreate(<any[]>services);
}

createUsers().then(console.log).catch(console.error);
