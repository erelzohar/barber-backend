import { UploadedFile } from "express-fileupload";
import Category from "../models/Category";
import Product, { ProductModel } from "../models/Product";
import path from "path";
import ScentCategory from "../models/ScentCategory";
import mongoose from "mongoose";
import safeDelete from "../helpers/files-helper";
import { randomUUID } from "crypto";

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


async function addProductAsync(product: ProductModel, images: UploadedFile[] = null) {
    product.images = ["logo-donaroma.webp"];
    let absolutePath;
    const errors = product.validateSync();
    if (errors) throw errors.message;
    if (images?.length > 0) {
        product.images = [];
        images.forEach(async i => {
            const extension = i.name.substr(i.name.lastIndexOf("."));
            const imageName = product._id + randomUUID() + extension;
            absolutePath = path.join(__dirname, "..", "assets", "images", imageName);
            product.images.push(imageName);
            await i.mv(absolutePath);
        })
    }

    return (await (await product.save()).populate('category')).populate('scentCategory');
}
async function updateProductAsync(product: ProductModel, images: UploadedFile[], imagesToDelete: string[]) {
    if (images?.length > 0) {
        let absolutePath;
        console.log(images);
        
        if (product.images[0] === "logo-donaroma.webp") product.images.splice(0,1);
        images.forEach(async i => {            
            const extension = i.name.substr(i.name.lastIndexOf("."));
            const imageName = product._id + randomUUID() + extension;
            absolutePath = path.join(__dirname, "..", "assets", "images", imageName);
            product.images.push(imageName);
            await i.mv(absolutePath);
        })
    }
    console.log(imagesToDelete);
    
    if (imagesToDelete?.length) {
        imagesToDelete.forEach(i => {
            if (i==="logo-donaroma.webp") return;
            let absolutePath = path.join(__dirname, "..", "assets", "images", i);
            safeDelete(absolutePath);
        });
    }
    if (!product.images || product.images?.length === 0) product.images = ["logo-donaroma.webp"];
    return Product.findByIdAndUpdate(new mongoose.Types.ObjectId(product._id), { ...product }, { new: true, runValidators: true }).populate("category").populate("scentCategory").exec();

}

async function deleteProductAsync(_id: string) {
    const product = await Product.findById(_id).exec()
    product.images?.forEach(i => {
        if (i==="logo-donaroma.webp") return;
        let absolutePath = path.join(__dirname, "..", "assets", "images", i);
        safeDelete(absolutePath);
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
    updateProductAsync,
}