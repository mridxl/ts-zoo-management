import type { NextFunction, Request, Response } from "express";
import config from "../config/config";
import { verify } from "jsonwebtoken";
import { CustomError } from "../utlis";

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
        const decoded = verify(token, JWT_SECRET) as { id: string };
        req.body.adminId = decoded.id;
        next();
    } catch (err) {
        const error = new CustomError("Unauthorized");
        error.statusCode = 401;
        next(error)
        return;
    }
} 