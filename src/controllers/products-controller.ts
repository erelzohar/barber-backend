import express from "express";
import productsLogic from "../logic/products-logic";
import Product from "../models/Product";
import { UploadedFile } from "express-fileupload";
import getError from "../helpers/errors-helper";
import path from "path";
import verifyAdmin from "../middleware/verifyAdmin";
import Sale from "../models/Sale";

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
        if (req.body.images) req.body.images = JSON.parse(req.body.images);
        if (req.body.sales) req.body.sales = JSON.parse(req.body.sales);
        if (req.body.category !== "650acfabc4c0c3b0a4da8ad3") {
            req.body.scentCategory = null;
            req.body.level = null;
        }
        const imagesToDelete = req.body.imagesToDelete ? JSON.parse(req.body.imagesToDelete) : null;
        let images = req.files && req.files.images ? req.files.images : null;
        if ((images as UploadedFile)?.name) images = [(images as UploadedFile)];

        const productToUpsert = new Product(req.body);
        
        if (productToUpsert.description?.length < 2) productToUpsert.description = productToUpsert.name + " מבית דון ארומה";
        if (req.body._id) {
            const updatedProduct = await productsLogic.updateProductAsync(productToUpsert, (images as UploadedFile[]), imagesToDelete);
            
            return res.json(updatedProduct);
        }
        const addedProduct = await productsLogic.addProductAsync(productToUpsert, (images as UploadedFile[]));
        res.json(addedProduct);
    }
    catch (err) {
        res.status(500).json(getError(err as Error));
    }
});
router.get("/sales", async (req, res) => {
    try {
        const sales = await productsLogic.getAllSalesAsync();        
        res.json(sales);
    }
    catch (err) {
        res.status(500).json(getError(err as Error));
    }
});
router.post("/sales", verifyAdmin, async (req, res) => {
    try {
        const sale = new Sale(req.body);
        const addedSale = await productsLogic.addSaleAsync(sale);
        res.json(addedSale);
    }
    catch (err) {
        res.status(500).json(getError(err as Error));
    }
});
router.delete("/sales/:saleId", verifyAdmin, async (req, res) => {
    try {
        const _id = req.params.saleId;
        const deleted = await productsLogic.deleteSaleAsync(_id);
        res.sendStatus(204);
    }
    catch (err) {
        res.status(500).json(getError(err as Error));
    }
});
router.get("/img/:imgName", async (req, res) => {
    try {
        const name = req.params.imgName;
        if (!name || name === "logo-donaroma.webp" || name === "undefined") return res.sendFile(path.join(__dirname, "..", "assets", "images", "logo-donaroma.webp"));
        res.writeHead(302, {
            'Location': await productsLogic.getImageAsync(name)
        });
        res.end();

    }
    catch (err) {
        return res.sendFile(path.join(__dirname, "..", "assets", "images", "logo-donaroma.webp"));
    }
});





export default router;