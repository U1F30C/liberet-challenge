import { sequelizeInstance } from "../../db-connection";
import { hash } from "bcrypt";
import { User } from "../../../src/users/models/user.model";

sequelizeInstance.addModels([User]);

function generateUsers(password: string) {
  return [
    {
      name: "Eva",
      lastName: "Lucia",
      email: "email@domain.com",
      role: "SuperAdmin",
      password: password,
      active: true,
      isEmailValidated: true,
    },
    {
      name: "Jesus",
      lastName: "Castio",
      email: "email@SuperAdmin.com",
      role: "SuperAdmin",
      password: password,
      active: true,
      isEmailValidated: true,
    },
    {
      name: "Orlando",
      lastName: "Marter",
      email: "email@Chemist.com",
      role: "Chemist",
      password: password,
      active: true,
      isEmailValidated: true,
    },
    {
      name: "Raul",
      lastName: "Rabine",
      email: "email@Finances.com",
      role: "Finances",
      password: password,
      active: true,
      isEmailValidated: true,
    },
    {
      name: "Fernanda",
      lastName: "Ortega",
      email: "email@Client.com",
      role: "Client",
      password: password,
      active: true,
      isEmailValidated: true,
    },
    {
      name: "Florentino",
      lastName: "Escalante",
      email: "email@Receptionist.com",
      role: "Receptionist",
      password: password,
      active: true,
      isEmailValidated: true,
    },
  ];
}

async function createUsers() {
  const password = await hash("password", 10);
  const users = generateUsers(password);
  await User.bulkCreate(<any[]>users, { updateOnDuplicate: ["email"] });
}

createUsers();
