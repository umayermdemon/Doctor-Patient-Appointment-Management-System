import express, { Request, Response } from "express";
import router from "./app/routes";
import cors from "cors";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
const app = express();

// parsers
app.use(express.json());
app.use(cors());
app.use(cookieParser());
// api routes
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Doctor–Patient Appointment Management System Server is running!");
});

// not found handler
app.use(notFound);

// error handler
app.use(globalErrorHandler);

export default app;
