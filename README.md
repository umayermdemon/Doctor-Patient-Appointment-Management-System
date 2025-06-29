# Doctor-Patient Appointment Management System

A Node.js/Express/MongoDB-based backend for managing doctor-patient appointments, doctor services, and availability. Patients can search for doctors, view profiles, book appointments, and see their appointment history. Doctors can manage their services and availability.

---

## Features

- **Doctor Management:** Register, view, and manage doctors.
- **Service Management:** Doctors can add/update services they provide.
- **Availability Management:** Doctors can set available days and time slots for each service.
- **Patient Management:** Register, view, and manage patients.
- **Appointment Booking:** Patients can book appointments for available slots.
- **Appointment Status:** Track status (`pending`, `accepted`, `cancelled`, `completed`).
- **Filtering:** Patients can filter doctors by hospital, specialization, and service.
- **Slot Validation:** Prevents double-booking and ensures only available slots can be booked.

---

## Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** (with Mongoose)
- **TypeScript**

---

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone <your-repo-url>
   cd Doctor_Patient Appointment Management System
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the server:**

   ```bash
   npm run dev
   ```

4. **Open the application:**

   ```bash
   http://localhost:5000
   ```

5. **Register a doctor:**

   ```bash
   POST /api/doctor/register
   ```

6. **Register a service for a doctor:**

   ```bash
   POST /api/doctor/services
   ```

7. **Set doctor availability:**

   ```bash
   POST /api/doctor/availability
   PATCH /api/doctor/availability/:id
   ```

8. **Search for doctors:**

   ```bash
   GET /api/doctors?hospitalName=XYZ&specialization=Cardiology&serviceName=ECG
   ```

9. **View a doctor's profile:**

   ```bash
   GET /api/doctors/:id
   ```

10. **Search for patients:**

    ```bash
    GET /api/patient/doctors?hospitalName=XYZ&specialization=Cardiology&serviceName=ECG
    ```

11. **View a patient's profile:**

    ```bash
    GET /api/patient/doctors/:id
    ```

12. **Book an appointment:**

    ```bash
    POST /api/patient/appointments
    ```

13. **View patient appointment history:**

    ```bash
    GET /api/patient/appointments
    ```

14. **Accept or cancel an appointment:**

    ```bash
    PATCH /api/patient/appointments/:id/status
    ```

15. **View doctor appointment history:**

    ```bash
    GET /api/doctor/appointments?status=pending
    ```

16. **Accept or cancel a doctor's appointment:**
    ```bash
    PATCH /api/doctor/appointments/:id/status
    ```

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
