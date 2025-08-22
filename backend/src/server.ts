import express from "express";
import cors from "cors";
import config from "./config/config";
import router from "./routes";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/v1",router);

app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);
});
