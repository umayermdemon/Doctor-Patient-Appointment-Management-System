import { z } from "zod";

const registerPatientValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }).min(3).max(50),
    email: z.string({ required_error: "Email is required" }).email(),
    phone: z.string({ required_error: "Phone is required" }).min(10).max(15),
    password: z.string({ required_error: "Password is required" }).min(6),
    age: z.number({ required_error: "Age is required" }).min(18).max(100),
    gender: z.enum(["male", "female", "other"], {
      required_error: "Gender is required",
    }),
  }),
});

const createAppointmentValidationSchema = z.object({
  body: z.object({
    serviceId: z.string({ required_error: "Service Id is required" }),
    selectedDate: z.string({ required_error: "Selected Date is required" }),
    timeSlot: z.string({ required_error: "Time Slot is required" }),
  }),
});

export const patientValidationSchema = {
  registerPatientValidationSchema,
  createAppointmentValidationSchema,
};
