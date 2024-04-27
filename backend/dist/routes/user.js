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
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const zod_1 = require("../zod");
const db_1 = require("../db");
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const middleware_1 = __importDefault(require("../middleware"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.userRouter = express_1.default.Router();
exports.userRouter.use(express_1.default.json());
const Mongo_URL = process.env.Mongo_URL;
const JWT_Secret = process.env.JWT_Secret;
if (!Mongo_URL) {
    throw new Error("Cannot connect to database: URL not defined");
}
if (!JWT_Secret) {
    throw new Error("JWT_Secret Not Set in env file");
}
mongoose_1.default.connect(Mongo_URL).then(() => {
    console.log("Database Connected Successfully");
}).catch((e) => {
    console.log("Error Connecting To Database", e);
});
exports.userRouter.get('/test', (req, res) => {
    res.json({ msg: "hello From User" });
});
exports.userRouter.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userName = req.body.userName;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const password = req.body.password;
        const check = yield zod_1.signupuserSchema.safeParse({ userName, firstName, lastName, password });
        if (!check.success)
            res.status(404).json({ error: check.error.errors });
        const existingUser = yield db_1.UserModel.findOne({
            userName: req.body.userName
        });
        if (existingUser) {
            res.json({ message: "Email already taken / Incorrect inputs" });
        }
        const user = yield db_1.UserModel.create({
            userName, firstName, lastName, password
        });
        const userId = user._id;
        const token = yield jsonwebtoken_1.default.sign({ userId }, JWT_Secret);
        const balance = Math.floor(1 + Math.random() * 10000);
        yield db_1.AccountModel.create({
            userId,
            balance
        });
        res.json({ message: "User Created Successfully", token: token });
        console.log(`SignUp Successful ${firstName}`);
    }
    catch (e) {
        console.error("Error in Signup");
        throw (e);
    }
}));
exports.userRouter.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, password } = req.body;
        const check = zod_1.signinuserSchema.safeParse({ userName, password });
        if (!check.success)
            res.status(404).json({ error: check.error.errors });
        const existingUser = yield db_1.UserModel.findOne({ userName, password });
        if (!existingUser) {
            res.status(404).json({ message: "No User With Given Credentials Found" });
            return;
        }
        const userId = existingUser._id;
        const token = jsonwebtoken_1.default.sign({ userId }, JWT_Secret);
        res.status(200).json({ token: token });
        console.log(`SignIn Successful ${existingUser.firstName}`);
    }
    catch (e) {
        console.error("Error in Signin");
        throw (e);
    }
}));
exports.userRouter.put('/update', middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password, firstName, lastName } = req.body;
        const check = zod_1.updateBody.safeParse({ password, firstName, lastName });
        if (!check.success)
            res.status(404).json({ error: check.error.errors });
        yield db_1.UserModel.updateOne({ _id: req.userId }, req.body);
        res.status(200).json({ message: "Update Successful" });
        console.log("Update Successful");
    }
    catch (err) {
        res.status(404).json({ message: "Update Failed" });
        return;
    }
}));
exports.userRouter.get('/bulk', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const filter = ((_a = req.query.filter) === null || _a === void 0 ? void 0 : _a.toString()) || "";
    const users = yield db_1.UserModel.find({
        $or: [
            { firstName: { $regex: filter, $options: 'i' } },
            { lastName: { $regex: filter, $options: 'i' } }
        ]
    }).exec();
    const queriedUser = users.map(user => ({
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id
    }));
    res.status(200).json({
        user: queriedUser
    });
    console.log(queriedUser);
}));
