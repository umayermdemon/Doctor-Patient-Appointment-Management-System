import { model, Schema } from "mongoose";
import { TDoctor } from "./doctor.interface";

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
});

export const Doctor = model<TDoctor>("Doctor", doctorSchema);
