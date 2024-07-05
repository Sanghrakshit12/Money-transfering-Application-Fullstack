"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/v1', routes_1.mainRouter);
app.get('/', (req, res) => {
    res.json({ msg: "hello From MoneyTransferX backend" });
});
app.listen(3000, () => {
    console.log("Server Running on Port 3000");
});
