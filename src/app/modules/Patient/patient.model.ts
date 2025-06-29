import { model, Schema } from "mongoose";
import { TAppointment, TPatient } from "./patient.interface";

// patient schema
const patientSchema = new Schema<TPatient>({
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
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
  },
  role: {
    type: String,
    default: "patient",
  },
});

export const Patient = model<TPatient>("Patient", patientSchema);

// appointment schema
const appointmentSchema = new Schema<TAppointment>({
  doctorId: {
    type: Schema.Types.ObjectId,
    ref: "Doctor",
  },
  serviceId: {
    type: Schema.Types.ObjectId,
    ref: "DoctorService",
  },
  patientId: {
    type: Schema.Types.ObjectId,
    ref: "Patient",
  },
  selectedDate: {
    type: String,
    required: true,
  },
  timeSlot: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "cancelled", "completed"],
    default: "pending",
  },
});

export const Appointment = model<TAppointment>(
  "Appointment",
  appointmentSchema
);
