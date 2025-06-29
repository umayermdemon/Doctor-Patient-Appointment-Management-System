import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { doctorServices } from "./doctor.service";

// doctor service creation
const doctorService = catchAsync(async (req, res) => {
  const { email } = req.user;
  const result = await doctorServices.doctorService(req.body, email);
  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Doctor Service created successfully",
    data: result,
  });
});
// doctor service update
const updateDoctorService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await doctorServices.updateDoctorService(req.body, id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Doctor Service updated successfully",
    data: result,
  });
});

// doctor service delete
const deleteService = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await doctorServices.deleteService(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Doctor Service deleted successfully",
    data: result,
  });
});

// doctor service availability creation
const createAvailability = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { email } = req.user;
  const result = await doctorServices.createAvailability(id, req.body, email);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Availability created successfully",
    data: result,
  });
});

// get my appointments
const getMyAppointments = catchAsync(async (req, res) => {
  const { email } = req.user;
  const query = { ...req.query };
  console.log(query);
  const result = await doctorServices.getMyAppointments(email, query);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "My appointments retrieved successfully",
    data: result,
  });
});

export const doctorControllers = {
  doctorService,
  updateDoctorService,
  deleteService,
  createAvailability,
  getMyAppointments,
};
