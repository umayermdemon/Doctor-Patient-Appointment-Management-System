import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { patientServices } from "./patient.service";

// get all doctors by filter
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

// get doctor profile with services and availability
const getDoctorProfile = catchAsync(async (req, res) => {
  const { id } = req.params;
  const doctor = await patientServices.getDoctorProfile(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Doctor profile retrieved successfully",
    data: doctor,
  });
});

export const patientControllers = {
  getAllDoctors,
  getDoctorProfile,
};
