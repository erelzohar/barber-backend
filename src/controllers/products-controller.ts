import express from "express";
import productsLogic from "../logic/products-logic";
import Product from "../models/Product";
import { UploadedFile } from "express-fileupload";
import getError from "../helpers/errors-helper";
import path from "path";
import fs from 'fs';
import verifyAdmin from "../middleware/verifyAdmin";
import mongoose from "mongoose";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const products = await productsLogic.getAllProductsAsync();
        res.json(products);
    }
    catch (err) {
        res.status(500).json(getError(err as Error));
    }
});
router.delete("/:productId", verifyAdmin, async (req, res) => {
    try {
        const _id = req.params.productId;
        const deleted = await productsLogic.deleteProductAsync(_id);
        res.sendStatus(204);
    }
    catch (err) {
        res.status(500).json(getError(err as Error));
    }
});

router.get("/categories", async (req, res) => {
    try {
        const categories = await productsLogic.getCategoriesAsync();
        res.json(categories);
    }
    catch (err) {
        res.status(500).json(getError(err as Error));
    }
});
router.get("/scent-categories", async (req, res) => {
    try {
        const categories = await productsLogic.getScentCategoriesAsync();
        res.json(categories);
    }
    catch (err) {
        res.status(500).json(getError(err as Error));
    }
});
router.get("/categories-ex", async (req, res) => {
    try {
        const categories = await productsLogic.getCategoriesNProductsAsync();
        res.json(categories);
    }
    catch (err) {
        res.status(500).json(getError(err as Error));
    }
});

router.post("/", verifyAdmin, async (req, res) => {
    try {
        if (req.body.scents) req.body.scents = JSON.parse(req.body.scents);
        if (req.body.colors) req.body.colors = JSON.parse(req.body.colors);
        if (req.body.category !== "650acfabc4c0c3b0a4da8ad3") {
            req.body.scentCategory = null;
            req.body.level = null;
        }
        const image = req.files && req.files.image ? req.files.image : null;
        const productToUpsert = new Product(req.body);
        if (productToUpsert.description?.length < 2) productToUpsert.description = productToUpsert.name + " מבית דון ארומה";
            console.log(productToUpsert.category === new mongoose.Schema.Types.ObjectId("650acfabc4c0c3b0a4da8ad3"));
            


        if (req.body._id) {
            const updatedProduct = await productsLogic.updateProductAsync(productToUpsert, image as UploadedFile);
            return res.json(updatedProduct);
        }

        const addedProduct = await productsLogic.addProductAsync(productToUpsert, image as UploadedFile);
        res.json(addedProduct);
    }
    catch (err) {
        console.log(err);

        res.status(500).json(getError(err as Error));
    }
});

router.get("/img/:imgName", async (req, res) => {
    try {
        const name = req.params.imgName;
        if (!name) return res.sendFile(path.join(__dirname, "..", "assets", "images", "logo-donaroma.webp"));
        let absolutePath = path.join(__dirname, "..", "assets", "images", name);
        if (!fs.existsSync(absolutePath)) {
            absolutePath = path.join(__dirname, "..", "assets", "images", "logo-donaroma.webp");
        }
        res.sendFile(absolutePath);
    }
    catch (err) {
        res.status(500).json(getError(err as Error));
    }
});
export default router;