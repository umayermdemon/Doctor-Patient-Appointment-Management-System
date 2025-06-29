// Sample Doctor Data
export const doctors = [
  {
    _id: "64a1b2c3d4e5f6a7b8c9d0e1",
    name: "Dr. John Doe",
    email: "john.doe@example.com",
    phone: "0123456789",
    password: "hashedpassword",
    specialization: "Cardiology",
    hospitalName: "Dhaka Heart Institute",
    hospitalFloor: "3rd Floor",
    role: "doctor",
  },
  {
    _id: "64a1b2c3d4e5f6a7b8c9d0e2",
    name: "Dr. Jane Smith",
    email: "jane.smith@example.com",
    phone: "0987654321",
    password: "hashedpassword",
    specialization: "Neurology",
    hospitalName: "City Hospital",
    hospitalFloor: "2nd Floor",
    role: "doctor",
  },
];

// Sample Patient Data
export const patients = [
  {
    _id: "74b1b2c3d4e5f6a7b8c9d0e1",
    name: "Alice Patient",
    email: "alice.patient@example.com",
    phone: "01711111111",
    password: "hashedpassword",
    age: 30,
    gender: "female",
    role: "patient",
  },
  {
    _id: "74b1b2c3d4e5f6a7b8c9d0e2",
    name: "Bob Patient",
    email: "bob.patient@example.com",
    phone: "01822222222",
    password: "hashedpassword",
    age: 40,
    gender: "male",
    role: "patient",
  },
];

// Sample Doctor Service Data
export const doctorServices = [
  {
    _id: "84c1b2c3d4e5f6a7b8c9d0e1",
    doctorId: "64a1b2c3d4e5f6a7b8c9d0e1",
    title: "ECG",
    description: "Electrocardiogram test",
    price: 500,
    duration: "30 minutes",
  },
  {
    _id: "84c1b2c3d4e5f6a7b8c9d0e2",
    doctorId: "64a1b2c3d4e5f6a7b8c9d0e2",
    title: "EEG",
    description: "Electroencephalogram test",
    price: 700,
    duration: "45 minutes",
  },
];

// Sample Availability Data
export const availabilities = [
  {
    doctorId: "64a1b2c3d4e5f6a7b8c9d0e1",
    serviceId: "84c1b2c3d4e5f6a7b8c9d0e1",
    availability: [
      {
        day: "Monday",
        slots: [
          { start: "10:00", end: "12:00" },
          { start: "16:00", end: "18:00" },
        ],
      },
      {
        day: "Wednesday",
        slots: [{ start: "09:00", end: "11:00" }],
      },
    ],
  },
  {
    doctorId: "64a1b2c3d4e5f6a7b8c9d0e2",
    serviceId: "84c1b2c3d4e5f6a7b8c9d0e2",
    availability: [
      {
        day: "Tuesday",
        slots: [{ start: "14:00", end: "16:00" }],
      },
    ],
  },
];
