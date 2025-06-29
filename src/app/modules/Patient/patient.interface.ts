import { Types } from "mongoose";

export type TPatient = {
  name: string;
  email: string;
  phone: string;
  password: string;
  age: number;
  gender: "male" | "female" | "other";
  role: "patient";
};

// POST /appointments (create appointment)
export type TAppointment = {
  doctorId: Types.ObjectId;
  serviceId: Types.ObjectId;
  patientId: Types.ObjectId;
  selectedDate: string; // "20/06/2025"
  // Monday: 10:00 - 12:00 (time slot pattern)
  timeSlot: string;
  status: "pending" | "accepted" | "cancelled" | "completed";
};
