import express from "express";
import cors from "cors";
import config from "./config/config";

const app = express();

app.use(cors());

app.use(express.json());


app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);
});
