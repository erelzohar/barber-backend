import getNewToken from "../helpers/jwt-helper";
import hash from "../helpers/crypto-helper";
import { Credentials } from "../models/Credentials";
import Admin from "../models/Admin";
import adminLogic from "./admin-logic";


// async function registerAsync(user: CustomerModel) {
//     try {
//         user.password = hash(user.password);
//         const errors = user.validateSync();
//         if (errors) return errors.message;

//         await user.save();
//         user.token = getNewToken(user);
//         delete user.password;
//         return user;
//     }
//     catch (err) {
//         return "Email allready exits.";
//     }

// }

async function loginAsync(credentials: Credentials) {
    credentials.password = hash(credentials.password);

    let admin = await Admin.findOne({ username: credentials.username, password: credentials.password });
    if (!admin) return null;
    admin.token = getNewToken(admin);
    admin = admin.toObject();
    delete admin.password;

    return admin;
}
async function changePassword(_id: string, oldPassword: string, newPassword: string) {
    oldPassword = hash(oldPassword);

    let admin = await Admin.findOne({ _id, password: oldPassword });
    if (!admin) return null;
    admin.password = hash(newPassword);
    const updatedAdmin = await adminLogic.updateAdminAsync(admin);
    admin = updatedAdmin.toObject();
    delete admin.password;
    return admin;
}

export default {
    // registerAsync,
    loginAsync,
    changePassword
};