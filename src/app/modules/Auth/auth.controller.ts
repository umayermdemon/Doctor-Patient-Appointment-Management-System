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

const registerPatient = catchAsync(async (req, res) => {
  const result = await authService.registerPatient(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Patient registered successfully",
    data: result,
  });
});

const login = catchAsync(async (req, res) => {
  const result = await authService.login(req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Login successful",
    data: result,
  });
});

export const authControllers = {
  registerDoctor,
  registerPatient,
  login,
};
