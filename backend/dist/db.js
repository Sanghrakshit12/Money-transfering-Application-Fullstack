"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountModel = exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const UserSchema = new Schema({
    userName: {
        type: String,
        required: true,
        min: 3
    },
    firstName: {
        type: String,
        required: true,
        min: 3
    },
    lastName: {
        type: String,
        required: true,
        min: 3
    },
    password: {
        type: String,
        required: true,
        min: 6
    }
});
const BankSchema = new Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'UserSchema',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});
exports.UserModel = mongoose_1.default.model('User', UserSchema);
exports.AccountModel = mongoose_1.default.model('Account', BankSchema);
