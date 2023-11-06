import { config } from "../config"
import { Request, Response, NextFunction } from "express";
import { JwtPayload, verify } from "jsonwebtoken";

function verifyAdmin(req: Request, res: Response, next: NextFunction) {

    //"Bearer the-token"
    try {
        if (!req.headers.authorization) return res.status(403).send("You are not an admin.");
        const token = req.headers.authorization.split(" ")[1];
        const verified = verify(token, config.server.jwtKey);
        if ((verified as JwtPayload).exp < (Date.now() / 1000)) return res.status(403).send("Your login session has expired.");
        if (!(verified as JwtPayload).payload.isAdmin) return res.status(403).send("You are not an admin.");
    }
    catch (err: any) {
        return res.status(403).send("Your login session has expired.");
    }
    next();
}


export default verifyAdmin;