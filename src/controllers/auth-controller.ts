import express from "express";
import authLogic from "../logic/auth-logic";
import getError from "../helpers/errors-helper";
import Customer from "../models/Customer";

const router = express.Router();

// router.post("/register", async (req, res) => {
//     try {
//         const user = new Customer(req.body);
//         const addedUser = await authLogic.registerAsync(user);
//         if (typeof addedUser !== "object") return res.status(400).send(addedUser);
//         res.status(201).json(addedUser);
//     }
//     catch (err) {
//         res.status(500).send(getError(err as Error));
//     }
// });

router.post("/login", async (req, res) => {
    try {
        const loggedInUser = await authLogic.loginAsync(req.body);
        if (!loggedInUser) return res.status(401).send("Incorrect username or password.");
        res.json(loggedInUser);
    }
    catch (err) {
        res.status(500).send(getError(err as Error));
    }
});

export default router;