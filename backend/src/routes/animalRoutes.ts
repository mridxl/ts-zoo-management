import { Router } from "express";
import { addAnimal, deleteAnimal, getAnimal, getAnimals, updateAnimal } from "../controllers/animal";
import { authMiddleware } from "../middlewares/authMiddleware";

const animalRouter = Router();

animalRouter.post("/add", authMiddleware, addAnimal);
animalRouter.get("/", authMiddleware, getAnimals);
animalRouter.get("/:id", authMiddleware, getAnimal);
animalRouter.patch("/:id", authMiddleware, updateAnimal);
animalRouter.delete("/:id", authMiddleware, deleteAnimal);

export default animalRouter;