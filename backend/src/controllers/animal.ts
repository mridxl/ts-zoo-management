import type { NextFunction, Request, Response } from "express";
import { CustomError } from "../utlis";
import { prisma } from "../prisma";
import z from "zod";
import { HealthStatus, Gender } from "@prisma/client";
import type { Animal } from "@prisma/client";

const animalSchema = z.object({
  name: z.string(),
  species: z.string(),
  age: z.number().int().nonnegative(),
  gender: z.nativeEnum(Gender),
  health_status: z.nativeEnum(HealthStatus).optional(),
  arrival_date: z.date().optional(),
  enclosureId: z.string().optional(),
});

const updateAnimalSchema = animalSchema.partial();

export const addAnimal = async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    const parsedData = animalSchema.safeParse(body);

    if (!parsedData.success) {
        const error = new CustomError("Invalid Inputs");
        error.statusCode = 400;
        next(error)
        return;
    }

    try {
        const animal: Animal = await prisma.animal.create({
            data: parsedData.data
        })

        res.status(201).json({
            status: "success",
            message: "Animal Added Successfully",
            data: animal
        })
    } catch (err) {
        const error = new CustomError("Something went wrong");
        error.statusCode = 500;
        next(error)
        return;
    }
};

export const getAnimals = async (req: Request, res: Response, next: NextFunction) => {  
    const { species, health_status, } = req.query;

    try {
        const animals : Animal[] = await prisma.animal.findMany({
            where: {
                ...(species ? { species: species as string} : {}),
                ...(health_status?  {health_status: health_status as HealthStatus } : {}),
            }
        })

        res.status(200).json({
            status: "success",
            count: animals.length,
            data: animals,
        })
    } catch (err) {
        const error = new CustomError("Something went wrong");
        error.statusCode = 500;
        next(error)
        return;
    }
}

export const getAnimal = async (req: Request, res: Response, next: NextFunction) => {  
    const { id } = req.params;

    try {
        const animal: Animal | null = await prisma.animal.findUnique({
            where: {
                id
            }
        })

        res.status(200).json({
            status: "success",
            data: animal,
        })
    } catch (err) {
        const error = new CustomError("Something went wrong");
        error.statusCode = 500;
        next(error)
        return;
    }
}

export const updateAnimal = async (req: Request, res: Response, next: NextFunction) => {  
    const { id } = req.params;

    const parsedData = updateAnimalSchema.safeParse(req.body);

    if (!parsedData.success) {
        const error = new CustomError("Invalid Inputs");
        error.statusCode = 400;
        next(error)
        return;
    }

    try {
        const animal: Animal = await prisma.animal.update({
            where: {
                id
            },
            data: parsedData.data,
        })

        res.status(200).json({
            status: "success",
            message: "Animal Updated Successfully",
            data: animal,
        })
    } catch (err) {
        const error = new CustomError("Something went wrong");
        error.statusCode = 500;
        next(error)
        return;
    }
}

export const deleteAnimal = async (req: Request, res: Response, next: NextFunction) => {  
    const { id } = req.params;

    try {
        const animal: Animal = await prisma.animal.delete({
            where: {
                id
            }
        })

        res.status(200).json({
            status: "success",
            message: "Animal Deleted Successfully",
            data: animal,
        })
    } catch (err) {
        const error = new CustomError("Something went wrong");
        error.statusCode = 500;
        next(error)
        return;
    }
}