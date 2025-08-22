import type { NextFunction, Request, Response } from "express";
import config from "../config/config";
import { verify, type JwtPayload } from "jsonwebtoken";
import { CustomError } from "../utlis";

// Define the JWT payload interface
interface AdminJwtPayload extends JwtPayload {
    id: string;
}

// Type guard to check if decoded token has the expected structure
function isAdminJwtPayload(payload: string | JwtPayload): payload is AdminJwtPayload {
    return typeof payload === 'object' && payload !== null && 'id' in payload && typeof payload.id === 'string';
}

const JWT_SECRET = config.JWT_SECRET;

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    
    const payload = req.headers.authorization;

    if (!JWT_SECRET) {
        res.status(500).json({ error: "Server misconfiguration: JWT_SECRET is missing" });
        return ;
    }

    if (!payload || !payload.startsWith("Bearer ")) {
        const error = new CustomError("Unauthorized");
        error.statusCode = 401;
        next(error)
        return;
    }

    const token = payload.split(" ")[1];

    if(!token) {
        const error = new CustomError("Unauthorized");
        error.statusCode = 401;
        next(error)
        return;
    }

    try {
        const decoded = verify(token, JWT_SECRET);

        if (!isAdminJwtPayload(decoded)) {
            const error = new CustomError("Invalid token payload");
            error.statusCode = 401;
            next(error);
            return;
        }
        
        req.adminId = decoded.id;
        next();
    } catch (err) {
        const error = new CustomError("Unauthorized");
        error.statusCode = 401;
        next(error);
        return;
    }
} 