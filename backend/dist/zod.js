"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transferBody = exports.updateBody = exports.signinuserSchema = exports.signupuserSchema = void 0;
const zod_1 = __importStar(require("zod"));
exports.signupuserSchema = zod_1.default.object({
    userName: (0, zod_1.string)().min(3, { message: " UserName must be of length 3" }).email("Invalid email"),
    firstName: (0, zod_1.string)().min(3, { message: "firstName must be of length 3" }),
    lastName: (0, zod_1.string)().min(3, { message: "lastName must be of length 3" }),
    password: (0, zod_1.string)().min(6, { message: "password must be of length 6" })
});
exports.signinuserSchema = zod_1.default.object({
    userName: (0, zod_1.string)().email(),
    password: (0, zod_1.string)()
});
exports.updateBody = zod_1.default.object({
    password: zod_1.default.string().optional(),
    firstName: zod_1.default.string().optional(),
    lastName: zod_1.default.string().optional(),
});
exports.transferBody = zod_1.default.object({
    to: (0, zod_1.string)(),
    amount: (0, zod_1.number)()
});
