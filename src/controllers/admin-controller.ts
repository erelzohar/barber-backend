import express from "express";
import logic from "../logic/admin-logic";
import getError from "../helpers/errors-helper";
import Admin from "../models/Admin";
import path from "path";
import { UploadedFile } from "express-fileupload";
import verifyAdmin from "../middleware/verifyAdmin";

const router = express.Router();

router.get("/:_id", async (req, res) => {
    try {
        const admin_id = req.params._id;
        const admin = await logic.getAdminDetailsAsync(admin_id);
        const securedAdmin = admin.toObject();
        delete securedAdmin.password;
        res.json(securedAdmin);
    }
    catch (err) {
        res.status(500).json(getError(err as Error));
    }
});
// router.get("/", async (req, res) => {
//     try {
//         const admin = await logic.getAllAdminsAsync();
//         const securedAdmin = admin.toObject();
//         delete securedAdmin.username;
//         delete securedAdmin.password;
//         res.json(securedAdmin);
//     }
//     catch (err) {
//         res.status(500).json(getError(err as Error));
//     }
// });

router.post("/",verifyAdmin, async (req, res) => {
    try {
        if (req.body._id) { //update            
            const adminToUpsert = new Admin(req.body);
            if (req.body.vacations) adminToUpsert.vacations = JSON.parse(req.body.vacations);
            if (req.body.workingDays) adminToUpsert.workingDays = JSON.parse(req.body.workingDays);
            if (req.body.imagesNames) adminToUpsert.imagesNames = JSON.parse(req.body.imagesNames);
            if (req.body.message) adminToUpsert.message = JSON.parse(req.body.message);
            if (req.body.descriptions) adminToUpsert.descriptions = JSON.parse(req.body.descriptions);
            if (req.body.socials) adminToUpsert.socials = JSON.parse(req.body.socials);
            if (req.body.address) adminToUpsert.address = JSON.parse(req.body.address);
            const imagesToDelete = req.body.imagesToDelete ? JSON.parse(req.body.imagesToDelete) : null;
            let images = req.files && req.files.images ? req.files.images : null;
            let logoImage = req.files && req.files.logoImage ? req.files.logoImage : null;
            if ((images as UploadedFile)?.name) images = [(images as UploadedFile)];
            const response = await logic.updateAdminAsync(adminToUpsert, logoImage as UploadedFile, images as UploadedFile[], imagesToDelete);
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
        //if (!name || name === "ariel-logo.webp" || name === "undefined") return res.sendFile(path.join(__dirname, "..", "assets", "images", "ariel-logo.webp"));
        res.writeHead(302, {
            'Location': await logic.getImageAsync(name)
        });
        res.end();

    }
    catch (err) {
        return res.sendFile(path.join(__dirname, "..", "assets", "images", "ariel-logo.webp"));
    }
});


export default router;