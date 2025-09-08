import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {NextFunction, Response, Request} from "express";

dotenv.config()

interface JwtPayload {
    id: number
    email: string
    iat?: number
    exp: number
}

export interface AuthRequest extends Request {
    user?: JwtPayload
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction): void {
    // Get the Authorization header
    const authHeader = req.headers["authorization"];

    // Check if header exists and starts with 'Bearer '
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ok: false, error: 'No or invalid Authorization header' });
        return;
    }

    const authToken = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(authToken, process.env.JWT_SECRET as string) as JwtPayload;
        // Attach decoded payload to request object for use in routes
        req.user = decoded;
        // Proceed to the next middleware/route
        next();
    } catch (error) {
        // Handle invalid or expired token
        res.status(401).json({ok: false, error: "Invalid or expired token" });
        return;
    }
}