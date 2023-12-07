import Order, { OrderModel } from "../models/Order";
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: "donaromastore@gmail.com",
        pass: "hmxtuensenhjvrfm",
    },
});
function createOrderHtml(order: OrderModel) {
    return `<div style="height:100%;width:100%">
    <div style="display:flex;text-align:center;align-items:center;flex-direction:column;height:100%;width:100&;">
        <h1>
            הזמנה מס' ${order.orderNumber}
        </h1>
        <div style="display:flex;width:100%;flex-direction:column;height:100%;">
            <div 
            style="display:flex;width:100%;justify-content:space-around;align-item:center;direction:rtl;border:1px solid rgba(0, 0, 0, 0.399);background-color: rgb(200, 200, 200);margin:1rem 1rem 0 1rem;font-weight:bold">
                <p>שם המוצר</p>
                <p>פרטי המוצר</p>
                <p>כמות</p>
            </div>

            ${order.products.forEach(p => `<div 
            style="display:flex;width:100%;justify-content:space-around;align-item:center;direction:rtl;border:1px solid rgba(0, 0, 0, 0.399);background-color: rgb(226, 225, 225);margin:0 1rem 1rem 1rem">
                <p>${p.product}</p>
                <p> מל צבע ניחוח</p>
                <p> ${p.qunantity}</p>
            </div>`)}

        </div>
    </div>
    <div style="direction:rtl;">
        <span style="display:flex;width:100%;justify-content:space-around">
            <p style="font-weight:bold">איש קשר :</p>
            <p style="margin:3px;"> ${order.fullName}</p>
            <p style="direction:ltr;margin:3px;">${order.email}</p>
            <p style="direction:ltr;margin:3px;"> ${order.phone}</p>
        </span>

        <p>${order.street + " " + order.streetNum + " " + order.city + " " + (order.aptNum ? order.aptNum : '')}</p>
        <p>${order.deliveryType === "express" ? "משלוח אקספרס עד 3 ימי עסקים" : order.deliveryType === "regular" ? "משלוח רגיל עד 8 ימי עסקים" : "איסוף עצמי"}</p>
        <p> סה"כ : ${order.totalSum}&#8362;</p>
    </div>
</div>`
}
function getAllOrdersAsync() {
    return Order.find().exec();
}
function createOrderAsync(order: OrderModel) {
    const errors = order.validateSync();
    if (errors) throw new Error(errors.message);
    console.log(order);
    
    const mailOptions = {
        from: "donaromastore@gmail.com",
        to: 'trtkpp@gmail.com',
        subject: 'Don aroma store | new order !',
        html: createOrderHtml(order)
    };
    transporter.sendMail(mailOptions);
    return order.save();
}



export default {
    getAllOrdersAsync,
    createOrderAsync
}