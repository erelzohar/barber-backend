import path from "path";
import htmlBuilder from "../helpers/html-builder";
import Order, { OrderModel } from "../models/Order";
import nodemailer from 'nodemailer';
import Product from "../models/Product";
import mongoose from "mongoose";

function getAllOrdersAsync() {
    return Order.find().exec();
}


async function createOrderAsync(order: OrderModel) {
    const errors = order.validateSync();
    if (errors) throw new Error(errors.message);
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "donaromastore@gmail.com",
            pass: "hmxtuensenhjvrfm",
        },
    });
    const mailOptions = {
        from: "donaromastore@gmail.com",
        to: [order.email, "trtkpp@gmail.com"],
        subject: 'Don aroma store | new order !',
        attachments: [{
            filename: 'mailimage-6.png',
            path: path.join(__dirname, "..", "assets", "images", "mailimage-6.png"),
            cid: 'logo'
        },
        {
            filename: 'mailimage-4.png',
            path: path.join(__dirname, "..", "assets", "images", "mailimage-4.png"),
            cid: 'image4'
        },
        {
            filename: 'mailimage-3.png',
            path: path.join(__dirname, "..", "assets", "images", "mailimage-3.png"),
            cid: 'image3'
        },
        {
            filename: 'mailimage-2.png',
            path: path.join(__dirname, "..", "assets", "images", "mailimage-2.png"),
            cid: 'image2'
        },
        {
            filename: 'mailimage-1.png',
            path: path.join(__dirname, "..", "assets", "images", "mailimage-1.png"),
            cid: 'image1'
        },],
        html: await htmlBuilder.createOrderHtmlAsync(order)
    };
    await transporter.sendMail(mailOptions);

    order.items.forEach(async i => {
        const updatedProduct = await Product.findById(i.productId);
        updatedProduct.stock = updatedProduct.stock - i.quantity;
        if (updatedProduct.stock < 0) updatedProduct.stock = 0;
        await Product.findByIdAndUpdate(new mongoose.Types.ObjectId(i.productId), { stock: updatedProduct.stock });
        i.productId = new mongoose.Types.ObjectId(i.productId);
    });
    return order.save();
}



export default {
    getAllOrdersAsync,
    createOrderAsync
}