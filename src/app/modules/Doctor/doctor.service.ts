import status from "http-status";
import AppError from "../../errors/AppError";
import { TAvailabilitySlot, TDoctorService } from "./doctor.interface";
import { Availability, Doctor, DoctorService } from "./doctor.model";
import { Appointment } from "../Patient/patient.model";
// doctor service creation
const doctorService = async (payload: TDoctorService, email: string) => {
  const doctor = await Doctor.findOne({ email });
  if (!doctor) {
    throw new AppError(status.BAD_REQUEST, "Doctor does not exist");
  }
  const doctorService = await DoctorService.findOne({
    title: payload.title,
    doctorId: doctor?._id,
  });
  payload.doctorId = doctor._id;
  if (doctorService) {
    throw new AppError(status.BAD_REQUEST, "Doctor Service already exists");
  }
  const result = await DoctorService.create(payload);
  return result;
};
// doctor service update
const updateDoctorService = async (
  payload: Partial<TDoctorService>,
  id: string
) => {
  const doctorService = await DoctorService.findById(id);
  if (!doctorService) {
    throw new AppError(status.BAD_REQUEST, "Doctor Service does not exist");
  }
  const result = await DoctorService.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

// doctor service delete
const deleteService = async (id: string) => {
  const doctorService = await DoctorService.findById(id);
  if (!doctorService) {
    throw new AppError(status.BAD_REQUEST, "Doctor Service does not exist");
  }
  await DoctorService.findOneAndDelete({ _id: id });
  return null;
};

// doctor service availability creation
const createAvailability = async (
  id: string,
  payload: { availability: TAvailabilitySlot[] },
  email: string
) => {
  const doctorService = await DoctorService.findById(id);
  if (!doctorService) {
    throw new AppError(status.BAD_REQUEST, "Doctor Service does not exist");
  }
  const doctor = await Doctor.findOne({ email });
  if (!doctor) {
    throw new AppError(status.BAD_REQUEST, "Doctor does not exist");
  }
  if (doctorService.doctorId.toString() !== doctor._id.toString()) {
    throw new AppError(status.BAD_REQUEST, "Doctor does not match");
  }
  const result = await Availability.create({
    doctorId: doctor._id,
    serviceId: doctorService._id,
    availability: payload.availability,
  });
  return result;
};

//  Appointment Management (Doctor Side)
// View all appointment requests:
// GET /doctor/appointments?status=pending
// Appointment status:
// pending, accepted, cancelled, completed

// View all appointments:
const getMyAppointments = async (email: string, query: any) => {
  const queryFilter = query.status ? { status: query.status } : {};
  const doctor = await Doctor.findOne({ email });
  if (!doctor) {
    throw new AppError(status.BAD_REQUEST, "Doctor does not exist");
  }
  const appointments = await Appointment.find({
    doctorId: doctor._id,
    ...queryFilter,
  })
    .populate<{
      patientId: {
        name: string;
        email: string;
        phone: string;
        age: number;
        gender: "male" | "female" | "other";
      };
      serviceId: {
        title: string;
        description: string;
        price: number;
        duration: string;
      };
    }>({
      path: "patientId",
      select: "name email phone age gender",
    })
    .populate({
      path: "serviceId",
      select: "title description price duration",
    });

  const result = appointments.map((app) => ({
    status: app.status,
    selectedDate: app.selectedDate,
    timeSlot: app.timeSlot,
    patient: {
      name: app.patientId.name,
      email: app.patientId.email,
      phone: app.patientId.phone,
      age: app.patientId.age,
      gender: app.patientId.gender,
    },
    service: {
      title: app.serviceId.title,
      description: app.serviceId.description,
      price: app.serviceId.price,
    },
  }));
  return result;
};

// Accept or cancel an appointment:
// PATCH /doctor/appointments/:id/status

const acceptOrCancelAppointment = async (id: string, newStatus: string) => {
  const appointment = await Appointment.findById(id);
  if (!appointment) {
    throw new AppError(status.BAD_REQUEST, "Appointment does not exist");
  }
  if (appointment.status !== newStatus) {
    throw new AppError(status.BAD_REQUEST, "Invalid status");
  }
  appointment.status = newStatus;
  await appointment.save();
  return null;
};

export const doctorServices = {
  doctorService,
  updateDoctorService,
  deleteService,
  createAvailability,
  getMyAppointments,
  acceptOrCancelAppointment,
};
