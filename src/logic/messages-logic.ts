import Message from "../models/Message";



function getAllMessagesAsync(){
    return Message.find().exec();
}




export default {
    getAllMessagesAsync
}