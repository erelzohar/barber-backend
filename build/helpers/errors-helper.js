"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getError(err) {
    // On production:
    if (process.env.NODE_ENV === "production") {
        return "Some error occurred, please try again later.";
    }
    if (typeof err === 'string')
        return err;
    // On development:
    return err.message;
}
exports.default = getError;
//# sourceMappingURL=errors-helper.js.map