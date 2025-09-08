import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {NextFunction, Response, Request} from "express";

dotenv.config()

interface JwtPayload {
    userId: number
    username: string
    iat?: number
    exp: number
}

export interface AuthRequest extends Request {
    user?: JwtPayload
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction): void {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ok: false, error: 'No or invalid Authorization header' });
        return;
    }

    const authToken = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(authToken, process.env.JWT_SECRET as string) as JwtPayload;
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ok: false, error: "Invalid or expired token" });
        return;
    }
}