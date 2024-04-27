"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testRouter = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.testRouter = express_1.default.Router();
exports.testRouter.get('/', (req, res) => {
    res.json({ msg: "test Successful " });
});
