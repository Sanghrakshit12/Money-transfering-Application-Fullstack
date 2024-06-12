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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_Secret = process.env.JWT_Secret;
if (!JWT_Secret) {
    throw new Error("JWT_Secret environment variable is not defined");
}
function AuthMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.headers.authorization) {
            return res.status(401).json({ message: 'Authorization header not found' });
        }
        const authHeader = req.headers.authorization;
        if (!authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Invalid authorization format" });
        }
        const token = authHeader.split(' ')[1];
        try {
            const decoded = yield jsonwebtoken_1.default.verify(token, JWT_Secret);
            if (decoded && decoded.userId) {
                req.userId = decoded.userId;
                next();
            }
            else {
                return res.status(401).json({ message: "Invalid token payload" });
            }
        }
        catch (err) {
            console.error("Token verification error:", err);
            return res.status(401).json({ message: "Token verification failed" });
        }
    });
}
exports.default = AuthMiddleware;
