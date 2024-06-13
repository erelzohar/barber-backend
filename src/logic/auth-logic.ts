import getNewToken from "../helpers/jwt-helper";
import hash from "../helpers/crypto-helper";
import { Credentials } from "../models/Credentials";
import Admin from "../models/Admin";


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
    if (admin) admin.token = getNewToken(admin);
    admin = admin.toObject();
    delete admin.password;
    
    return admin;
}

export default {
    // registerAsync,
    loginAsync
};