import htmlBuilder from "helpers/html-builder";
import Order, { OrderModel } from "../models/Order";
import nodemailer from 'nodemailer';

function getAllOrdersAsync() {
    return Order.find().exec();
}


async function createOrderAsync(order: OrderModel) {
    const errors = order.validateSync();
    if (errors) throw new Error(errors.message);
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: "donaromastore@gmail.com",
            pass: "hmxtuensenhjvrfm",
        },
    });
    const mailOptions = {
        from: "donaromastore@gmail.com",
        to: 'trtkpp@gmail.com',
        subject: 'Don aroma store | new order !',
        html: htmlBuilder.createOrderHtml(order)
    };
    await transporter.sendMail(mailOptions);
    return order.save();
}



export default {
    getAllOrdersAsync,
    createOrderAsync
}