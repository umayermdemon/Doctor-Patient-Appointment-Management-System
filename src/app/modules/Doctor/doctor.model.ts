import { model, Schema } from "mongoose";
import { TAvailability, TDoctor, TDoctorService } from "./doctor.interface";

// doctor schema
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

// service schema
const doctorServiceSchema = new Schema<TDoctorService>({
  doctorId: {
    type: Schema.Types.ObjectId,
    ref: "Doctor",
  },
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

// availability schema
const availabilitySchema = new Schema<TAvailability>({
  doctorId: {
    type: Schema.Types.ObjectId,
    ref: "Doctor",
  },
  serviceId: {
    type: Schema.Types.ObjectId,
    ref: "DoctorService",
  },
  availability: [
    {
      day: { type: String, required: true },
      slots: [
        {
          start: { type: String, required: true },
          end: { type: String, required: true },
        },
      ],
    },
  ],
});

export const Availability = model<TAvailability>(
  "Availability",
  availabilitySchema
);
