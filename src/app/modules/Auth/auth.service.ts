import status from "http-status";
import AppError from "../../errors/AppError";
import { TDoctor } from "../Doctor/doctor.interface";
import { Doctor } from "../Doctor/doctor.model";
import bcrypt from "bcrypt";

const registerDoctor = async (payload: TDoctor) => {
  const doctor = await Doctor.findOne({ email: payload.email });
  if (doctor) {
    throw new AppError(status.BAD_REQUEST, "Doctor already exists");
  }
  const hashedPassword = await bcrypt.hash(payload?.password, 12);
  const doctorData = {
    ...payload,
    password: hashedPassword,
  };
  const result = await Doctor.create(doctorData);
  return result;
};

export const authService = {
  registerDoctor,
};
