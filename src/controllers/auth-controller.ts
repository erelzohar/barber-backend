import express from "express";
import authLogic from "../logic/auth-logic";
import getError from "../helpers/errors-helper";
import Customer from "../models/Customer";
import verifyAdmin from "../middleware/verifyAdmin";

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
        if (!loggedInUser) return res.status(401).send(".שם או סיסמא שגויים");
        res.json(loggedInUser);
    }
    catch (err) {
        res.status(500).send(getError(err as Error));
    }
});

router.post("/change-pass/:_id",verifyAdmin, async (req, res) => {
    try {
        const admin_id = req.params._id;
        const updatedAdmin = await authLogic.changePassword(admin_id,req.body.oldPassword,req.body.newPassword);
        if (!updatedAdmin) return res.status(401).send(".סיסמא שגויה");
        res.json(updatedAdmin);
    }
    catch (err) {
        res.status(500).send(getError(err as Error));
    }
});

export default router;