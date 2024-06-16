import Admin, { AdminModel } from "../models/Admin"


async function getAdminDetailsAsync() {
    return Admin.findOne().exec();
}

async function updateAdminAsync(admin: AdminModel) {
    return Admin.findByIdAndUpdate(admin._id, { ...admin },{ new: true, runValidators: true });
}

export default {
    getAdminDetailsAsync,
    updateAdminAsync
}