import Customer, { CustomerModel } from "../models/Customer";



function getAllCustomersAsync(){
    return Customer.find().exec();
}
async function deleteCustomerAsync(_id: string) {
    return Customer.deleteOne({ _id }).exec();
}
async function addCustomerAsync(customer: CustomerModel) {
    const errors = customer.validateSync();
    if (errors) throw errors;
    return await customer.save();
}


export default {
    getAllCustomersAsync,
    deleteCustomerAsync,
    addCustomerAsync
}