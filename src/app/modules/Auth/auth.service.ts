import status from "http-status";
import AppError from "../../errors/AppError";
import { TDoctor } from "../Doctor/doctor.interface";
import { Doctor } from "../Doctor/doctor.model";
import bcrypt from "bcrypt";
import { TPatient } from "../Patient/patient.interface";
import { Patient } from "../Patient/patient.model";
import { TLogin } from "./auth.interface";
import jwt, { Secret } from "jsonwebtoken";
import { createToken } from "./auth.utils";
import config from "../../config";

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

const login = async (payload: TLogin) => {
  const doctor = await Doctor.findOne({ email: payload.email });

  if (doctor) {
    const isPasswordMatch = await bcrypt.compare(
      payload.password,
      doctor.password!
    );
    if (!isPasswordMatch) {
      throw new AppError(status.UNAUTHORIZED, "Invalid password");
    }
    const jwtPayload = {
      name: doctor.name,
      email: doctor.email,
      role: doctor.role,
    };
    const accessToken = createToken(
      jwtPayload,
      config.jwt.accessTokenSecret as Secret,
      config.jwt.accessTokenExpiresIn as string
    );
    return { accessToken };
  } else {
    const patient = await Patient.findOne({ email: payload.email });
    if (patient) {
      const isPasswordMatch = await bcrypt.compare(
        payload.password,
        patient.password!
      );
      if (!isPasswordMatch) {
        throw new AppError(status.UNAUTHORIZED, "Invalid password");
      }
      const jwtPayload = {
        name: patient.name,
        email: patient.email,
        role: patient.role,
      };
      const accessToken = createToken(
        jwtPayload,
        config.jwt.accessTokenSecret as Secret,
        config.jwt.accessTokenExpiresIn as string
      );
      return { accessToken };
    }
  }
  throw new AppError(status.UNAUTHORIZED, "Invalid credentials");
};

export const authService = {
  registerDoctor,
  registerPatient,
  login,
};
