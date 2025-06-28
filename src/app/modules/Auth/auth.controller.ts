import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { authService } from "./auth.service";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";

const registerDoctor = catchAsync(async (req, res) => {
  const result = await authService.registerDoctor(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Doctor registered successfully",
    data: result,
  });
});

export const authControllers = {
  registerDoctor,
};
