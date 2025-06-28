import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { doctorServices } from "./doctor.service";

const doctorService = catchAsync(async (req, res) => {
  const result = await doctorServices.doctorService(req.body);
  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Doctor Service created successfully",
    data: result,
  });
});

export const doctorControllers = {
  doctorService,
};
