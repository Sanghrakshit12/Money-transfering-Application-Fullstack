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
const JWT_Secret = "MoneyTransferX-2024";
function AuthMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.headers) {
            return res.status(401).json({ message: 'No headers found in the request' });
        }
        const Auth_Header = req.headers.authorization;
        console.log(Auth_Header);
        if (!Auth_Header || !Auth_Header.startsWith("Bearer ")) {
            res.status(404).json({ message: "User Not Authenticated" });
            return;
        }
        const token = Auth_Header.split(' ')[1];
        try {
            const decoded = yield jsonwebtoken_1.default.verify(token, JWT_Secret);
            console.log(decoded);
            if (decoded && decoded.userId) {
                req.userId = decoded.userId;
            }
            else {
                res.status(404).json({ message: "UserID cannot be Loaded" });
                return;
            }
            next();
        }
        catch (err) {
            console.log(err);
            res.status(404).json({ message: "User Not Authenticated" });
            return;
        }
    });
}
exports.default = AuthMiddleware;
