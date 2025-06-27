import express, { Request, Response } from "express";
const app = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Doctor–Patient Appointment Management System Server is running!");
});

export default app;
