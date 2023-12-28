
import { Request, Response, NextFunction } from "express";

export default function useCors(req: Request, res: Response, next: NextFunction) {
    const allowedOrigins = ["https://www.donaroma-il.com", "https://meshulam.co.il"];
    if (process.env.NODE_ENV === "production") {
        if (req.method === "GET") return next();
        if (allowedOrigins.includes(req.headers.origin)) res.header("Access-Control-Allow-Origin", req.headers.origin);
        else return res.status(403).json('Not allowed');
    }
    else res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,Authorization");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "POST,DELETE,PUT");
        return res.sendStatus(200);
    }
    next();
}