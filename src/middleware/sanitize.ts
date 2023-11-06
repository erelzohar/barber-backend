import stripTags from "striptags";
import {Request,Response,NextFunction} from "express";

export default function sanitize(request:Request, response:Response, next:NextFunction) {
    for(const prop in request.body) {
        if(typeof request.body[prop] === "string") {
            request.body[prop] = stripTags(request.body[prop]);
        }
    }
    next();
}

