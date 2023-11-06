import { config } from "../config";
import jwt from "jsonwebtoken";
import { CustomerModel } from "../models/Customer";

export default function getNewToken(payload:CustomerModel) { // (payload will be the user object)
    return jwt.sign({ payload }, config.server.jwtKey,{expiresIn:"3h"});
}
