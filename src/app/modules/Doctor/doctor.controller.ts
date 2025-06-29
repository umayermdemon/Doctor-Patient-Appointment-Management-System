import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { doctorServices } from "./doctor.service";

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

const setAvailability = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { email } = req.user;
  const result = await doctorServices.setAvailability(id, req.body, email);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Availability updated successfully",
    data: result,
  });
});

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

export const doctorControllers = {
  doctorService,
  updateDoctorService,
  deleteService,
  setAvailability,
};
