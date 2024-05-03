import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express';

export interface AuthenticatedRequest extends Request {
    userId?: string;
}

const JWT_Secret = "MoneyTransferX-2024"
export default async function AuthMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: 'No headers found in the request' });
    }
    const Auth_Header = req.headers.authorization
    console.log(Auth_Header)
    if (!Auth_Header.startsWith("Bearer ")) {
        res.status(404).json({ message: "User Not Authenticated1" })
        return
    }
    const token = Auth_Header.split(' ')[1];
    try {
        const decoded = await jwt.verify(token, JWT_Secret) as JwtPayload
        if (decoded && decoded.userId) {
            req.userId = decoded.userId
        }
        else {
            res.status(404).json({ message: "UserID cannot be Loaded" })
            return
        }
        next()
    }
    catch (err) {
        console.log(err)
        res.status(404).json({ message: "User Not Authenticated2" })
        return
    }
}



