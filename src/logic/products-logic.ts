import { UploadedFile } from "express-fileupload";
import Category from "../models/Category";
import Product, { ProductModel } from "../models/Product";
import path from "path";
import ScentCategory from "../models/ScentCategory";
import mongoose from "mongoose";
import safeDelete from "../helpers/files-helper";

function getAllProductsAsync() {
    return Product.find().populate("category").populate("scentCategory").exec();

}
function getCategoriesAsync() {
    return Category.find().exec();
}
function getScentCategoriesAsync() {
    return ScentCategory.find().exec();
}
function getCategoriesNProductsAsync() {
    return Category.find().populate("products").exec();
}

async function addProductAsync(product: ProductModel, image: UploadedFile) {
    product.imageName = "logo-donaroma.webp";
    let absolutePath;
    if (image) {
        const extension = image.name.substr(image.name.lastIndexOf("."));
        product.imageName = product._id + extension;
        absolutePath = path.join(__dirname, "..", "assets", "images", "products", product.imageName);
    }
    if (!product.scentCategory) product.scentCategory = null;
    const errors = product.validateSync();
    if (errors) throw errors.message;
    if (image) await image.mv(absolutePath);
    return (await (await product.save()).populate('category')).populate('scentCategory');
}
async function updateProductAsync(product: ProductModel, image: UploadedFile) {
    if (image) {
        if (product.imageName !== "logo-donaroma.webp") {
            const deletePath = path.join(__dirname, "..", "assets", "images", "products", product.imageName);
            safeDelete(deletePath);
        }
        const extension = image.name.substr(image.name.lastIndexOf("."));
        product.imageName = product._id + extension;
        const absolutePath = path.join(__dirname, "..", "assets", "images", "products", product.imageName);
        await image.mv(absolutePath);
    }
    return Product.findByIdAndUpdate(new mongoose.Types.ObjectId(product._id), { ...product }, { new: true }).populate("category").populate("scentCategory").exec();

}

async function deleteProductAsync(_id: string) {
    const imgFormats = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    imgFormats.forEach(f => {
        const fileName = _id + f;
        const filePath = path.join(__dirname, "..", "assets", "images", "products", fileName);
        safeDelete(filePath);
    })
    return Product.deleteOne({ _id }).exec();
}

export default {
    getAllProductsAsync,
    addProductAsync,
    getCategoriesNProductsAsync,
    getCategoriesAsync,
    getScentCategoriesAsync,
    deleteProductAsync,
    updateProductAsync
}