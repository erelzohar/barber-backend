import express from "express";
import logic from "../logic/lines-logic";
import getError from "../helpers/errors-helper";
import Line from "../models/Line";
import mongoose from "mongoose";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const lines = await logic.getAllLinesAsync();
        lines.forEach(async (line, index) => {
            if (+line.timestamp < new Date().getTime()) {                
                await logic.deleteLineAsync(line._id);
                lines.splice(index, 1);
            }
        });
        res.json(lines);
    }
    catch (err) {
        res.status(500).json(getError(err as Error));
    }
});
router.get("/:lineId", async (req, res) => {
    try {
        const id = req.params.lineId;
        if (!mongoose.isValidObjectId(id)) return res.sendStatus(404);
        const line = await logic.getLineById(id);
        res.json(line);
    }
    catch (err) {
        res.status(500).json(getError(err as Error));
    }
});

router.post("/", async (req, res) => {
    try {
        const newLine = new Line(req.body);
        const response = await logic.addLineAsync(newLine);
        res.json(response);
    }
    catch (err) {
        res.status(500).json(getError(err as Error));
    }
});

router.delete("/:lineId", async (req, res) => {
    try {
        const _id = req.params.lineId;
        await logic.deleteLineAsync(_id);
        res.sendStatus(204);
    }
    catch (err) {
        res.status(500).json(getError(err as Error));
    }
});

export default router;