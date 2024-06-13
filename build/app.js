"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const auth_controller_1 = __importDefault(require("./controllers/auth-controller"));
const lines_controller_1 = __importDefault(require("./controllers/lines-controller"));
const customers_controller_1 = __importDefault(require("./controllers/customers-controller"));
const cors_1 = __importDefault(require("./middleware/cors"));
const app = (0, express_1.default)();
app.use(cors_1.default);
app.use(express_1.default.json());
app.use((0, express_fileupload_1.default)());
app.use("/", (0, express_rate_limit_1.default)({
    windowMs: 5000,
    max: 100,
    message: "Are You a Hacker?"
}));
app.get("/ping", (req, res) => {
    res.json("PONG");
});
app.use("/api/auth", auth_controller_1.default);
app.use("/api/line", lines_controller_1.default);
app.use("/api/customer", customers_controller_1.default);
mongoose_1.default.connect(config_1.config.mongo.url, { retryWrites: true, w: "majority" })
    .then(() => {
    console.log("connected to mongo");
    app.listen(config_1.config.server.port, () => {
        console.log(`listening to port ${config_1.config.server.port}`);
    });
})
    .catch((err) => {
    console.log(err);
    throw new Error("mongo connection failed");
});
//# sourceMappingURL=app.js.map