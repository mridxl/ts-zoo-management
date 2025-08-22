import express from "express";
import cors from "cors";
import config from "./config/config";
import router from "./routes";
import errorMiddleware from "./middlewares/errorMiddleware";

const app = express();
declare global {
  namespace Express {
    interface Request {
      adminId?: string;
    }
  }
}

app.use(cors());

app.use(express.json());

app.use("/api/v1",router);

app.use(errorMiddleware)

const PORT = config.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}).on('error', (err: Error) => {
    console.error('Failed to start server:', err.message);
    process.exit(1);
});
