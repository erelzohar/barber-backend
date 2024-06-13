"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const jsonwebtoken_1 = require("jsonwebtoken");
function verifyAdmin(req, res, next) {
    try {
        if (!req.headers.authorization)
            return res.status(403).send("You are not an admin.");
        const token = req.headers.authorization.split(" ")[1];
        const verified = (0, jsonwebtoken_1.verify)(token, config_1.config.server.jwtKey);
        if (verified.exp < (Date.now() / 1000))
            return res.status(403).send("Your login session has expired.");
        if (!verified.payload.isAdmin)
            return res.status(403).send("You are not an admin.");
    }
    catch (err) {
        return res.status(403).send("Your login session has expired.");
    }
    next();
}
exports.default = verifyAdmin;
//# sourceMappingURL=verifyAdmin.js.map