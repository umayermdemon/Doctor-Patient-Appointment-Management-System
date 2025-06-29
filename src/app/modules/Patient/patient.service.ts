import status from "http-status";
import moment from "moment";
import AppError from "../../errors/AppError";
import { Availability, Doctor, DoctorService } from "../Doctor/doctor.model";
import { TAppointment } from "./patient.interface";
import { Appointment, Patient } from "./patient.model";
import { get } from "mongoose";
type TDoctorFilter = {
  hospitalName?: string;
  specialization?: string;
  serviceName?: string;
};
// get all doctors by filter
const getAllDoctors = async (filter: TDoctorFilter) => {
  const query: any = {};
  if (filter.hospitalName) query.hospitalName = filter.hospitalName;
  if (filter.specialization) query.specialization = filter.specialization;
  if (filter.serviceName) {
    const doctorServices = await DoctorService.find({
      title: filter.serviceName,
    });
    const doctorIds = doctorServices.map((service) => service.doctorId);
    query._id = { $in: doctorIds };
  }
  const doctors = await Doctor.find(query);
  return doctors;
};

// get doctor profile with services and availability
const getDoctorProfile = async (id: string) => {
  const doctor = await Doctor.findById(id);
  if (!doctor) {
    throw new AppError(status.BAD_REQUEST, "Doctor does not exist");
  }
  const services = await DoctorService.find({ doctorId: doctor._id });
  const availability = await Availability.find({ doctorId: doctor._id });

  const servicesWithAvailability = services.map((service) => {
    const serviceAvailability = availability.find(
      (item) => item.serviceId.toString() === service._id.toString()
    );
    console.log(service.toObject());
    return {
      ...service.toObject(),
      availability: serviceAvailability ? serviceAvailability.availability : [],
      remainingSlots: serviceAvailability
        ? serviceAvailability.availability.reduce(
            (sum, day) => sum + (day.slots ? day.slots.length : 0),
            0
          )
        : 0,
    };
  });

  return {
    doctor: {
      name: doctor.name,
      hospitalName: doctor.hospitalName,
      hospitalFloor: doctor.hospitalFloor,
      specialization: doctor.specialization,
    },
    services: servicesWithAvailability,
  };
};

// appointment creation
const createAppointment = async (payload: TAppointment, email: string) => {
  const patient = await Patient.findOne({ email });
  if (!patient) {
    throw new AppError(status.BAD_REQUEST, "Patient does not exist");
  }
  const service = await DoctorService.findOne({
    _id: payload.serviceId,
  });
  if (!service) {
    throw new AppError(status.BAD_REQUEST, "Service does not exist");
  }
  const doctor = await Doctor.findOne({
    _id: service.doctorId,
  });
  if (!doctor) {
    throw new AppError(status.BAD_REQUEST, "Doctor does not exist");
  }
  // --- Day check logic ---
  const dateDay = moment(payload.selectedDate, "DD/MM/YYYY").format("dddd");
  const slotDay = payload.timeSlot.split(":")[0].trim();
  if (dateDay.toLowerCase() !== slotDay.toLowerCase()) {
    throw new AppError(
      status.BAD_REQUEST,
      "Selected date and time slot day do not match."
    );
  }
  // --- End day check logic ---

  // // --- Check slot exists in availability ---
  // const availability = await Availability.findOne({
  //   doctorId: doctor._id,
  //   serviceId: payload.serviceId,
  // });
  // if (!availability) {
  //   throw new AppError(
  //     status.BAD_REQUEST,
  //     "No availability found for this doctor and service."
  //   );
  // }

  // // availability array
  // const dayAvailability = availability.availability.find(
  //   (a) => a.day.toLowerCase() === slotDay.toLowerCase()
  // );
  // console.log(dayAvailability);

  // if (!dayAvailability) {
  //   throw new AppError(
  //     status.BAD_REQUEST,
  //     "Doctor is not available on this day."
  //   );
  // }

  // const slotTime = payload.timeSlot.split(":")[1].trim(); // "10:00 AM - 12:00 PM"
  // const [start, end] = slotTime.split("-").map((s) => s.trim().split(" ")[0]); // "10:00", "12:00"

  // // Check slot exists
  // const slotExists = dayAvailability.slots.some(
  //   (slot) => slot.start === start && slot.end === end
  // );
  // console.log(slotExists);

  // if (!slotExists) {
  //   throw new AppError(
  //     status.BAD_REQUEST,
  //     "Requested time slot is not available."
  //   );
  // }
  // --- End check slot exists in availability ---

  payload.doctorId = doctor._id;
  payload.patientId = patient._id;
  const isExistsAppointment = await Appointment.findOne({
    doctorId: doctor._id,
    serviceId: payload.serviceId,
    selectedDate: payload.selectedDate,
    timeSlot: payload.timeSlot,
    status: { $in: ["pending", "accepted"] },
  });
  if (isExistsAppointment) {
    throw new AppError(status.BAD_REQUEST, "This slot is already booked.");
  }

  const appointment = await Appointment.create(payload);
  return appointment;
};

// get my appointments
const getMyAppointments = async (email: string) => {
  const patient = await Patient.findOne({ email });
  if (!patient) {
    throw new AppError(status.BAD_REQUEST, "Patient does not exist");
  }
  const appointments = await Appointment.find({
    patientId: patient._id,
  })
    .populate<{
      doctorId: {
        name: string;
        email: string;
        hospitalName: string;
        hospitalFloor: string;
        specialization: string;
      };
      serviceId: {
        title: string;
        description: string;
        price: number;
        duration: string;
      };
    }>({
      path: "doctorId",
      select: "name email hospitalName hospitalFloor specialization",
    })
    .populate({
      path: "serviceId",
      select: "title description price duration",
    });

  const result = appointments.map((app) => ({
    status: app.status,
    selectedDate: app.selectedDate,
    timeSlot: app.timeSlot,
    doctor: {
      name: app.doctorId.name,
      email: app.doctorId.email,
      hospitalName: app.doctorId.hospitalName,
      hospitalFloor: app.doctorId.hospitalFloor,
      specialization: app.doctorId.specialization,
    },
    service: {
      title: app.serviceId.title,
      description: app.serviceId.description,
      price: app.serviceId.price,
    },
  }));
  return result;
};
export const patientServices = {
  getAllDoctors,
  getDoctorProfile,
  createAppointment,
  getMyAppointments,
};
