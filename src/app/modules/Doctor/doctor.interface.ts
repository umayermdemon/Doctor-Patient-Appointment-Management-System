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
  title: string;
  description: string;
  price: number;
  duration: number;
};
