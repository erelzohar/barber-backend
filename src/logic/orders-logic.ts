import Order, { OrderModel } from "../models/Order";



function getAllOrdersAsync() {
    return Order.find().exec();
}
function createOrderAsync(order: OrderModel) {
    const errors = order.validateSync();
    if (errors) throw new Error(errors.message);
    return order.save();
}



export default {
    getAllOrdersAsync,
    createOrderAsync
}