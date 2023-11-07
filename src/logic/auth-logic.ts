import getNewToken from "../helpers/jwt-helper";
import hash from "../helpers/crypto-helper";
import Customer, { CustomerModel } from "../models/Customer";
import { Credentials } from "models/Credentials";


async function registerAsync(user: CustomerModel) {
    try {
        user.password = hash(user.password);
        const errors = user.validateSync();
        if (errors) return errors.message;

        await user.save();
        user.token = getNewToken(user);
        delete user.password;
        return user;
    }
    catch (err) {
        return "Email allready exits.";
    }

}

async function loginAsync(credentials: Credentials) {

    credentials.password = hash(credentials.password);

    const user = await Customer.findOne({ "email": credentials.email, "password": credentials.password });
    if (!user) return null;
    if (user) user.token = getNewToken(user);
    delete user.password;
    return user;
}

export default {
    registerAsync,
    loginAsync
};