import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import expressValidator from "express-validator";
import swaggerDoc from "../swaggerDoc";
import { Application, Request, Response } from "express";
import { userRouter } from "./routes/user";
import { authRouter } from "./routes/auth";
import { requestLoggerConfig } from "./util/requestLogger";
import { errorLoggerConfig } from "./util/errorLogger";

export const port: Number = parseInt(process.env.SERVER_PORT) || 3000;
const app: Application = express();

app.use(cors());
app.use(expressValidator());
if (process.env.NODE_ENV != "test") app.use(requestLoggerConfig);
if (process.env.NODE_ENV != "test") app.use(errorLoggerConfig);
app.use(bodyParser.json());
if (process.env.NODE_ENV == "dev") app.use(bodyParser.urlencoded({ extended: true }));
if (process.env.NODE_ENV != "production") swaggerDoc(app);
app.use("/users", userRouter);
app.use("/auth", authRouter);

app.use((req: Request, res: Response) => {
    res.status(404).send({
        status: 404,
        message: "Invalid route"
    });
});

export { app };