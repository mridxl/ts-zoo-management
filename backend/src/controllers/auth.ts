import type { NextFunction, Request, Response } from "express";
import z from "zod";
import { CustomError } from "../utlis";
import { prisma } from "../prisma";
import { compare, hash } from "bcryptjs";
import config from "../config/config";
import { sign } from "jsonwebtoken";

const JWT_SECRET = config.JWT_SECRET;

const registerSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string().min(6)
});

export const register = async (req: Request, res: Response, next: NextFunction) => {
    const parsedData = registerSchema.safeParse(req.body);

    // zod validation
    if (!parsedData.success) {
        const error = new CustomError("Invalid Inputs");
        error.statusCode = 400;
        next(error)
        return;
    }
    try {
        const adminExist = await prisma.admin.findUnique({
            where: {
                email: parsedData.data.email
            }
        })

        if (adminExist) {
            const error = new CustomError("Email Address already exists");
            error.statusCode = 400;
            next(error)
            return;
        }

        const hashedPassword = await hash( parsedData.data.password, 10);

        const admin = await prisma.admin.create({
            data: {
                name: parsedData.data.name,
                email: parsedData.data.email,
                password: hashedPassword
            }
        })  

        if (!admin) {
            const error = new CustomError("Something went wrong");
            error.statusCode = 500;
            next(error)
            return;
        }

        res.status(201).json({
            status: "success",
            message: "Admin Created Successfully"
        })
    } catch (err) {
        const error = new CustomError("Something went wrong");
        error.statusCode = 500;
        next(error)
        return;
    }
}

const loginSchema = z.object({
    email: z.string(),
    password: z.string().min(6)
});

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const parsedData = loginSchema.safeParse(req.body);

    // zod validation
    if (!parsedData.success) {
        const error = new CustomError("Invalid Inputs");
        error.statusCode = 400;
        next(error)
        return;
    }   

    try {   
        const admin = await prisma.admin.findUnique({
            where: {
                email: parsedData.data.email
            }
        })

        if (!admin) {
            const error = new CustomError("Invalid Credentials");
            error.statusCode = 400;
            next(error)
            return;
        }

        const isPasswordValid = await compare(parsedData.data.password, admin.password);

        if (!isPasswordValid) {
            const error = new CustomError("Invalid Credentials");
            error.statusCode = 400;
            next(error)
            return;
        }

        const token = sign({ id: admin.id }, JWT_SECRET as string);

        res.status(200).json({
            status: "success",
            message: "Login Successful",
            token
        })
    } catch (err) {
        const error = new CustomError("Something went wrong");
        error.statusCode = 500;
        next(error)
        return;
    }
}   
