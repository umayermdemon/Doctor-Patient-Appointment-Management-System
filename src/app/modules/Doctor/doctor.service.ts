import status from "http-status";
import AppError from "../../errors/AppError";
import { TDoctorService } from "./doctor.interface";
import { DoctorService } from "./doctor.model";

const doctorService = async (payload: TDoctorService) => {
  const doctorService = await DoctorService.findOne({ title: payload.title });
  if (doctorService) {
    throw new AppError(status.BAD_REQUEST, "Doctor Service already exists");
  }
  const result = await DoctorService.create(payload);
  return result;
};

export const doctorServices = {
  doctorService,
};
