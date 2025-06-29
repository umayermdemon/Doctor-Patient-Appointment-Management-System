import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { patientServices } from "./patient.service";
// Filters:
// By hospital, specialization, service name

const getAllDoctors = catchAsync(async (req, res) => {
  const query = { ...req.query };
  const doctors = await patientServices.getAllDoctors(query);
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
