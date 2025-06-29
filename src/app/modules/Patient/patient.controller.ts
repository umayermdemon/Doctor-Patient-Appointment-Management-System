import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { patientServices } from "./patient.service";

const getAllDoctors = catchAsync(async (req, res) => {
  const doctors = await patientServices.getAllDoctors();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "All doctors retrieved successfully",
    data: doctors,
  });
});

export const patientControllers = {
  getAllDoctors,
};
