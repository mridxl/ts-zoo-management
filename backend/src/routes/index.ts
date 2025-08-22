import { Router } from "express";
import authRouter from "./authRoutes";
import animalRouter from "./animalRoutes";

const router = Router();

router.use('/auth', authRouter);
router.use('/animal', animalRouter);