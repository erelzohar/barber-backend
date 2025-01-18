import Line, { LineModel } from "../models/Line";


async function getAllLinesAsync(admin_id:string) {
    return Line.find({admin_id,timestamp:{$gt:new Date().getTime()}}).exec();
}
async function getLinesHistoryAsync(admin_id:string) {
    return Line.find({admin_id,timestamp:{$lt:new Date().getTime()}}).exec();
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
    return await line.save();
}


export default {
    getAllLinesAsync,
    getLinesHistoryAsync,
    deleteLineAsync,
    addLineAsync,
    getLineById
}