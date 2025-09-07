import jwt from "jsonwebtoken"
import dotenv from "dotenv";

dotenv.config();

function validateToken(token: string): boolean | null {
    try {
        const s = process.env.JWT_SECRET || ""
        const verify = jwt.verify(token, s)
        return !!verify;
    } catch (error) {
        return null;
    }
}