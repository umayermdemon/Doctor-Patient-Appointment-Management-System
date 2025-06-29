import { Types } from "mongoose";

export type TDoctor = {
  name: string;
  email: string;
  phone: string;
  password: string;
  specialization: string;
  hospitalName: string;
  hospitalFloor: string;
  role: "doctor";
};

export type TAvailabilitySlot = {
  day: string;
  slots: { start: string; end: string }[];
};

export type TDoctorService = {
  title: string;
  description: string;
  price: number;
  duration: number;
  doctorId: Types.ObjectId;
  availability?: TAvailabilitySlot[];
};
