import { Doctor } from "../Doctor/doctor.model";

const getAllDoctors = async () => {
  const doctors = await Doctor.find();
  return doctors;
};

export const patientServices = {
  getAllDoctors,
};
