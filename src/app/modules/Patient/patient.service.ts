import status from "http-status";
import AppError from "../../errors/AppError";
import { Availability, Doctor, DoctorService } from "../Doctor/doctor.model";
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
export const patientServices = {
  getAllDoctors,
  getDoctorProfile,
};
