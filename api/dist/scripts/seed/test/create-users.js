"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_connection_1 = require("../../db-connection");
const bcrypt_1 = require("bcrypt");
const user_model_1 = require("../../../src/users/models/user.model");
db_connection_1.sequelizeInstance.addModels([user_model_1.User]);
function generateUsers(password) {
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
    const password = await bcrypt_1.hash("password", 10);
    const users = generateUsers(password);
    await user_model_1.User.bulkCreate(users, { updateOnDuplicate: ["email"] });
}
createUsers();
//# sourceMappingURL=create-users.js.map