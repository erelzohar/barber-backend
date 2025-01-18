import Admin, { AdminModel } from "../models/Admin"
import { UploadedFile } from "express-fileupload";
import imagesHelper from "../helpers/images-helper";


async function getAdminDetailsAsync(id: string) {
    return Admin.findById(id).exec();
}
async function getAllAdminsAsync() {
    return Admin.find().exec();
}

async function updateAdminAsync(admin: AdminModel, logoImage: UploadedFile = null, images: UploadedFile[] = null, imagesToDelete: string[] = null) {
    if (images?.length > 0) {
        for (let i of images) {
            const imageName = await imagesHelper.addS3ImageAsync(i);
            if (imageName) admin.imagesNames.push(imageName); // Push the imageName into the array
            
        }
    }
    if (logoImage) {
        const logoImgName = await imagesHelper.addS3ImageAsync(logoImage);
        if (logoImgName) {
            imagesHelper.deleteS3ImageAsync(admin.logoImgName);
            admin.logoImgName = logoImgName;
        }
    }
    if (imagesToDelete?.length) {
        imagesToDelete.forEach(i => {
            imagesHelper.deleteS3ImageAsync(i);
        });
    }

    return Admin.findByIdAndUpdate(admin._id, { ...admin }, { new: true, runValidators: true });
}
async function getImageAsync(imageName: string) {
    const url = await imagesHelper.getS3ImageAsync(imageName);
    return url;
}
export default {
    getAdminDetailsAsync,
    updateAdminAsync,
    getImageAsync,
    getAllAdminsAsync
}