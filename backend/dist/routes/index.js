"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("./user");
const account_1 = require("./account");
exports.mainRouter = express_1.default.Router();
exports.mainRouter.get('/', (req, res) => {
    res.json({ msg: "hello From routes2" });
});
exports.mainRouter.use('/user', user_1.userRouter);
exports.mainRouter.use('/accounts', account_1.accountRouter);
