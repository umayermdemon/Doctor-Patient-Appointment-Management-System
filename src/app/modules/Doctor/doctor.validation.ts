import { z } from "zod";

const registerDoctorValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }).min(3).max(50),
    email: z.string({ required_error: "Email is required" }).email(),
    phone: z.string({ required_error: "Phone is required" }).min(10).max(15),
    password: z.string({ required_error: "Password is required" }).min(6),
    specialization: z
      .string({ required_error: "Specialization is required" })
      .min(3)
      .max(50),
    hospitalName: z
      .string({ required_error: "Hospital Name is required" })
      .min(3)
      .max(50),
    hospitalFloor: z
      .string({ required_error: "Hospital Floor is required" })
      .min(3)
      .max(50),
  }),
});

const doctorServiceValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: "Title is required" }).min(3),
    description: z.string({ required_error: "Description is required" }).min(3),
    price: z.number({ required_error: "Price is required" }).min(1),
    duration: z
      .number({ required_error: "Duration is required" })
      .min(1)
      .max(100),
  }),
});

const createAvailabilityValidationSchema = z.object({
  body: z.object({
    doctorId: z.string({ required_error: "Doctor Id is required" }),
    serviceId: z.string({ required_error: "Service Id is required" }),
    availability: z.array(
      z.object({
        day: z.string({ required_error: "Day is required" }),
        slots: z.array(
          z.object({
            start: z.string({ required_error: "Start is required" }),
            end: z.string({ required_error: "End is required" }),
          })
        ),
      })
    ),
  }),
});

export const doctorValidationSchema = {
  registerDoctorValidationSchema,
  doctorServiceValidationSchema,
  createAvailabilityValidationSchema,
};
