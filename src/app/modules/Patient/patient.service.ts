import { Doctor, DoctorService } from "../Doctor/doctor.model";
// Filters:
// By hospital, specialization, service name
type TDoctorFilter = {
  hospitalName?: string;
  specialization?: string;
  serviceName?: string;
};

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

export const patientServices = {
  getAllDoctors,
};
