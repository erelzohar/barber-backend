import Message, { MessageModel } from "../models/Message";



function getAllMessagesAsync(){
    return Message.find().exec();
}

function updateMessageAsync(message:MessageModel){    
    return Message.findByIdAndUpdate(message._id,message,{new:true,runValidators:true});
}


export default {
    getAllMessagesAsync,
    updateMessageAsync
}