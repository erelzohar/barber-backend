import express from "express";
import logic from "../logic/admin-logic";
import getError from "../helpers/errors-helper";
import Admin from "../models/Admin";
import path from "path"
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
        if (req.body._id){
            const adminToUpsert = new Admin(req.body);
            if (req.body.vacations) adminToUpsert.vacations = JSON.parse(req.body.vacations);
            if (req.body.workingDays) adminToUpsert.workingDays = JSON.parse(req.body.workingDays);
            const response = await logic.updateAdminAsync(adminToUpsert);            
            res.json(response);
        }
    }
    catch (err) {
        res.status(500).json(getError(err as Error));
    }
});
router.get("/img/:imgName", async (req, res) => {
    try {
        const name = req.params.imgName;
        if (!name || name === "ariel-logo.webp" || name === "undefined") return res.sendFile(path.join(__dirname, "..", "assets", "images", "ariel-logo.webp"));
        res.writeHead(302, {
            'Location': await logic.getImageAsync(name)
        });
        res.end();
        
    }
    catch (err) {
        return res.sendFile(path.join(__dirname, "..", "assets", "images", "ariel-logo.webp"));
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