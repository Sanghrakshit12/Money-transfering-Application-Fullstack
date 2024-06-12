import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

export interface AuthenticatedRequest extends Request {
    userId?: string;
}
const JWT_Secret = process.env.JWT_Secret as string;

if (!JWT_Secret) {
    throw new Error("JWT_Secret environment variable is not defined");
}

export default async function AuthMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: 'Authorization header not found' });
    }

    const authHeader = req.headers.authorization;

    if (!authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Invalid authorization format" });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = await jwt.verify(token, JWT_Secret) as JwtPayload;

        if (decoded && decoded.userId) {
            req.userId = decoded.userId;
            next();
        } else {
            return res.status(401).json({ message: "Invalid token payload" });
        }
    } catch (err) {
        console.error("Token verification error:", err);
        return res.status(401).json({ message: "Token verification failed" });
    }
}
