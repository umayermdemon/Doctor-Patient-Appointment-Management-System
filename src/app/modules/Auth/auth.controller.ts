import { Request, Response } from "express";

const registerDoctor = async (req: Request, res: Response) => {
  console.log("Registering doctor with data:");
};

export const authControllers = {
  registerDoctor,
};
