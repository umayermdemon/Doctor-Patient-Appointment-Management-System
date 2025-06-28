import { model, Schema } from "mongoose";
import { TDoctor, TDoctorService } from "./doctor.interface";

const doctorSchema = new Schema<TDoctor>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  hospitalName: {
    type: String,
    required: true,
  },
  hospitalFloor: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "doctor",
  },
});

export const Doctor = model<TDoctor>("Doctor", doctorSchema);

const doctorServiceSchema = new Schema<TDoctorService>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
});

export const DoctorService = model<TDoctorService>(
  "DoctorService",
  doctorServiceSchema
);
