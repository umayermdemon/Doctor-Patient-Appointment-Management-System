import status from "http-status";
import AppError from "../../errors/AppError";
import { TDoctor } from "../Doctor/doctor.interface";
import { Doctor } from "../Doctor/doctor.model";
import bcrypt from "bcrypt";
import { TPatient } from "../Patient/patient.interface";
import { Patient } from "../Patient/patient.model";

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

const registerPatient = async (payload: TPatient) => {
  const patient = await Patient.findOne({ email: payload.email });
  if (patient) {
    throw new AppError(status.BAD_REQUEST, "Patient already exists");
  }
  const hashedPassword = await bcrypt.hash(payload?.password, 12);
  const patientData = {
    ...payload,
    password: hashedPassword,
  };
  const result = await Patient.create(patientData);
  return result;
};

export const authService = {
  registerDoctor,
  registerPatient,
};
