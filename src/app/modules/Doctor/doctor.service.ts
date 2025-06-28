import status from "http-status";
import AppError from "../../errors/AppError";
import { TDoctorService } from "./doctor.interface";
import { DoctorService } from "./doctor.model";

const doctorService = async (payload: TDoctorService) => {
  const doctorService = await DoctorService.findOne({ title: payload.title });
  if (doctorService) {
    throw new AppError(status.BAD_REQUEST, "Doctor Service already exists");
  }
  const result = await DoctorService.create(payload);
  return result;
};

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

const deleteService = async (id: string) => {
  const doctorService = await DoctorService.findById(id);
  if (!doctorService) {
    throw new AppError(status.BAD_REQUEST, "Doctor Service does not exist");
  }
  await DoctorService.findOneAndDelete({ _id: id });
  return null;
};

export const doctorServices = {
  doctorService,
  updateDoctorService,
  deleteService,
};
