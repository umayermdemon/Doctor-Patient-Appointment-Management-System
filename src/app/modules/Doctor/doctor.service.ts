import status from "http-status";
import AppError from "../../errors/AppError";
import { TAvailabilitySlot, TDoctorService } from "./doctor.interface";
import { Availability, Doctor, DoctorService } from "./doctor.model";
// doctor service creation
const doctorService = async (payload: TDoctorService, email: string) => {
  const doctorService = await DoctorService.findOne({ title: payload.title });
  if (doctorService) {
    throw new AppError(status.BAD_REQUEST, "Doctor Service already exists");
  }
  const doctor = await Doctor.findOne({ email });
  if (!doctor) {
    throw new AppError(status.BAD_REQUEST, "Doctor does not exist");
  }
  payload.doctorId = doctor._id;
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
export const doctorServices = {
  doctorService,
  updateDoctorService,
  deleteService,
  createAvailability,
};
