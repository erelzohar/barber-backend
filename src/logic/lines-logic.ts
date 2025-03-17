import Admin from "../models/Admin";
import Line, { LineModel } from "../models/Line";

// , timestamp: { $gt: new Date().getTime() } 
async function getAllLinesAsync(admin_id: string) {
    return Line.find({ admin_id }).exec();
}
async function getLinesHistoryAsync(admin_id: string, history_time: string) {
    await Line.deleteMany({ admin_id, timestamp: { $lt: (new Date().getTime() - (+history_time)) } }).exec();
    return Line.find({ admin_id, timestamp: { $lt: new Date().getTime() } }).exec();
}
async function getLineById(_id: string) {
    return Line.findById(_id).exec();
}
async function deleteLineAsync(_id: string) {
    return Line.deleteOne({ _id }).exec();
}
async function addLineAsync(line: LineModel) {
    const errors = line.validateSync();
    if (errors) throw errors;
    if (await Line.findOne({ admin_id: line.admin_id, timestamp: line.timestamp }).exec()) {
        throw new Error("התור לא זמין אנא נסה תור אחר");
    }

    return await line.save();
}


export default {
    getAllLinesAsync,
    getLinesHistoryAsync,
    deleteLineAsync,
    addLineAsync,
    getLineById
}