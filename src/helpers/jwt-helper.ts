import { config } from "../config";
import jwt from "jsonwebtoken";
import { AdminModel } from "../models/Admin";

export default function getNewToken(payload:AdminModel) { // (payload will be the user object)
    return jwt.sign({ payload }, config.server.jwtKey,{expiresIn:"30d"});
}
