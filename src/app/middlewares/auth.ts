import status from "http-status";
import AppError from "../errors/AppError";
import catchAsync from "../utils/catchAsync";
import { TUserRole } from "../modules/Auth/auth.interface";
import { Doctor } from "../modules/Doctor/doctor.model";
import { Patient } from "../modules/Patient/patient.model";
import { verifyToken } from "../modules/Auth/auth.utils";
import { JwtPayload } from "jsonwebtoken";

const auth = (...requiredRole: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(
        status.UNAUTHORIZED,
        "You are not authorized! Please login"
      );
    }
    let decoded;
    try {
      decoded = verifyToken(token);
    } catch (error) {
      throw new AppError(status.UNAUTHORIZED, "Invalid token");
    }
    const { role, email } = decoded as JwtPayload;
    let user;
    if (role === "doctor") {
      const doctor = await Doctor.findOne({ email });
      if (!doctor) {
        throw new AppError(status.UNAUTHORIZED, "You are not authorized!");
      }
      user = doctor;
    } else {
      const patient = await Patient.findOne({ email });
      if (!patient) {
        throw new AppError(status.UNAUTHORIZED, "You are not authorized!");
      }
      user = patient;
    }
    if (requiredRole && !requiredRole.includes(role)) {
      throw new AppError(status.UNAUTHORIZED, "You are not authorized!");
    }
    req.user = user;
    next();
  });
};

export default auth;
