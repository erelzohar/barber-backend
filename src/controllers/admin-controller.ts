import express from "express";
import logic from "../logic/admin-logic";
import getError from "../helpers/errors-helper";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const admin = await logic.getAdminDetailsAsync();
        const securedAdmin = admin.toObject();
        delete securedAdmin.username;
        delete securedAdmin.password;
        res.json(securedAdmin);
    }
    catch (err) {
        res.status(500).json(getError(err as Error));
    }
});

router.post("/", async (req, res) => {
    try {
    }
    catch (err) {
        res.status(500).json(getError(err as Error));
    }
});

router.delete("/:lineId", async (req, res) => {
    try {
    }
    catch (err) {
        res.status(500).json(getError(err as Error));
    }
});

export default router;