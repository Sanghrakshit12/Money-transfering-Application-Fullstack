"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountRouter = void 0;
const express_1 = __importDefault(require("express"));
const middleware_1 = __importDefault(require("../middleware"));
const db_1 = require("../db");
const zod_1 = require("../zod");
const mongoose_1 = __importDefault(require("mongoose"));
exports.accountRouter = express_1.default.Router();
exports.accountRouter.get('/balance', middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const owner = yield db_1.AccountModel.findOne({
            userId
        });
        res.status(200).json({ Balance: owner === null || owner === void 0 ? void 0 : owner.balance });
        console.log("Balance fetched Successfully");
    }
    catch (err) {
        res.status(404).json({ message: "Error Getting Balance" });
        console.log(err);
    }
}));
exports.accountRouter.post('/transfer', middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    const { to, amount } = req.body;
    const check = zod_1.transferBody.safeParse({ to, amount });
    if (!check.success) {
        yield session.abortTransaction();
        return res.status(400).json({ error: check.error.errors });
    }
    const userId = req.userId;
    let owner;
    try {
        owner = yield db_1.AccountModel.findOne({ userId }).session(session);
        if (!owner || owner.balance === undefined) {
            throw new Error("Account doesn't exist or balance is undefined");
        }
        if (owner.balance < amount) {
            return res.status(400).json({ message: "Insufficient balance" });
        }
        const receiver = yield db_1.AccountModel.findOne({ userId: to }).session(session);
        if (!receiver) {
            throw new Error("Recipient account doesn't exist");
        }
        yield db_1.AccountModel.updateOne({ userId }, { $inc: { balance: -amount } }).session(session);
        yield db_1.AccountModel.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);
        yield session.commitTransaction();
        res.status(200).json({ message: "Transfer successful" });
        console.log(`Transfer successful to ${receiver.userId} from ${owner.userId}`);
    }
    catch (error) {
        console.error("Error in transaction:", error);
        yield session.abortTransaction();
        res.status(500).json({ message: "Internal server error" });
    }
    finally {
        session.endSession();
    }
}));
