"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function useCors(req, res, next) {
    const allowedOrigins = ["https://www.donaroma-il.com", "https://meshulam.co.il"];
    if (process.env.NODE_ENV === "production") {
        if (req.method === "GET") {
            res.header("Access-Control-Allow-Origin", "*");
        }
        else if (allowedOrigins.includes(req.headers.origin))
            res.header("Access-Control-Allow-Origin", req.headers.origin);
        else
            return res.status(403).json('Not allowed');
    }
    else
        res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,Authorization");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT");
        return res.sendStatus(200);
    }
    next();
}
exports.default = useCors;
//# sourceMappingURL=cors.js.map