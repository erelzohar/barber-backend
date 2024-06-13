import Admin from "../models/Admin"


async function getAdminDetailsAsync(){
    return Admin.findOne().exec();
}



export default {
    getAdminDetailsAsync
}