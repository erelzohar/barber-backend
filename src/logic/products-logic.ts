import { UploadedFile } from "express-fileupload";
import Category from "../models/Category";
import Product, { ProductModel } from "../models/Product";
import ScentCategory from "../models/ScentCategory";
import mongoose, { ObjectId } from "mongoose";
import { randomUUID } from "crypto";
import { config } from "../config";
import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { CartAction } from "../models/CartAction";


const s3 = new S3Client({
    credentials: {
        accessKeyId: config.aws.accessKey,
        secretAccessKey: config.aws.secret
    },
    region: config.aws.region
});

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
    const errors = product.validateSync();
    if (errors) throw errors.message;
    if (images?.length > 0) {
        product.images = [];
        images.forEach(async i => {
            const extension = '.webp'
            const imageName = product._id + randomUUID() + extension;
            product.images.push(imageName);
            const buffer = await sharp(i.data)
                .resize(1500, 1500, {
                    fit: 'contain',
                    background:{r: 0, g: 0, b: 0, alpha: 0}
                })
                .toFormat("webp")
                .webp({ quality: 60 })
                .toBuffer()
            const command = new PutObjectCommand({
                Bucket: config.aws.bucketName,
                Key: imageName,
                Body: buffer,
                ContentType: "image/webp"
            });
            await s3.send(command);
        })
    }    
    return (await (await product.save()).populate('category')).populate('scentCategory');
}
async function updateProductAsync(product: ProductModel, images: UploadedFile[], imagesToDelete: string[]) {
    if (images?.length > 0) {
        if (product.images[0] === "logo-donaroma.webp") product.images.splice(0, 1);
        images.forEach(async i => {
            const extension = '.webp';
            const imageName = product._id + randomUUID() + extension;
            product.images.push(imageName);
            const buffer = await sharp(i.data)
                .resize(700, 700, {
                    fit: 'contain',
                    background:{r: 0, g: 0, b: 0, alpha: 0}
                })
                .toFormat("webp")
                .webp({ quality: 60 })
                .toBuffer();
            const command = new PutObjectCommand({
                Bucket: config.aws.bucketName,
                Key: imageName,
                Body: buffer,
                ContentType: i.mimetype
            });
            await s3.send(command);
        });
    }


    if (imagesToDelete?.length) {
        imagesToDelete.forEach(i => {
            if (i === "logo-donaroma.webp") return;
            const params = {
                Bucket: config.aws.bucketName,
                Key: i
            };
            const command = new DeleteObjectCommand(params);
            s3.send(command);
        });
    }
    if (!product.images || product.images?.length === 0) product.images = ["logo-donaroma.webp"];
    return Product.findByIdAndUpdate(new mongoose.Types.ObjectId(product._id), { ...product }, { new: true, runValidators: true }).populate("category").populate("scentCategory").exec();

}

async function deleteProductAsync(_id: string) {
    const product = await Product.findById(_id).exec();
    product.images?.forEach(i => {
        if (i === "logo-donaroma.webp") return;
        const params = {
            Bucket: config.aws.bucketName,
            Key: i
        }
        const command = new DeleteObjectCommand(params);
        s3.send(command);
    })
    return Product.deleteOne({ _id }).exec();
}

async function getImageAsync(imageName: string) {
    const getObjectParams = {
        Bucket: config.aws.bucketName,
        Key: imageName
    }
    const command = new GetObjectCommand(getObjectParams)
    const url = await getSignedUrl(s3, command, { expiresIn: 1800 });    
    return url;
}
async function updateStock(action:CartAction) {
    return Product.findByIdAndUpdate(new mongoose.Types.ObjectId(action.productId), { stock:action.updatedStock }, { new: true, runValidators: true }).populate("category").populate("scentCategory").exec();

}
export default {
    getAllProductsAsync,
    addProductAsync,
    getCategoriesNProductsAsync,
    getCategoriesAsync,
    getScentCategoriesAsync,
    deleteProductAsync,
    updateProductAsync,
    getImageAsync,
    updateStock
}