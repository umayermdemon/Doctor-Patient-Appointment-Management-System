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

export type TDoctorService = {
  doctorId: Types.ObjectId;
  title: string;
  description: string;
  price: number;
  duration: number;
};

export type TAvailabilitySlot = {
  day: string;
  slots: { start: string; end: string }[];
};

export type TAvailability = {
  doctorId: Types.ObjectId;
  serviceId: Types.ObjectId;
  availability: TAvailabilitySlot[];
};
