const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const bcrypt = require("bcryptjs");

const Patient = require("./models/Patient");
const Appointment = require("./models/Appointment");
const Admin = require("./models/Admin");
const Doctor = require("./models/Doctor");
const LabReport = require("./models/LabReport");

const app = express();


// =====================================================
// MIDDLEWARE
// =====================================================

app.use(cors());
app.use(express.json());


// =====================================================
// MONGODB CONNECTION
// =====================================================

mongoose.connect(process.env.MONGO_URI)

    .then(() => {

        console.log("MongoDB Connected Successfully!");

    })

    .catch((error) => {

        console.log("MongoDB Connection Error:");
        console.log(error.message);

    });


// =====================================================
// TEST ROUTE
// =====================================================

app.get("/", (req, res) => {

    res.send("MediCare Hospital Backend is Running!");

});


// =====================================================
// PATIENT REGISTER API
// =====================================================

app.post("/api/patients/register", async (req, res) => {

    try {

        const {
            name,
            email,
            phone,
            password,
            age,
            gender,
            address
        } = req.body;


        if (
            !name ||
            !email ||
            !phone ||
            !password ||
            !age ||
            !gender ||
            !address
        ) {

            return res.status(400).json({

                message: "All fields are required"

            });

        }


        const existingPatient =
            await Patient.findOne({ email });


        if (existingPatient) {

            return res.status(400).json({

                message: "Email already registered"

            });

        }


        const hashedPassword =
            await bcrypt.hash(password, 10);


        const patient = new Patient({

            name,
            email,
            phone,
            password: hashedPassword,
            age,
            gender,
            address

        });


        await patient.save();


        res.status(201).json({

            message: "Patient registered successfully",

            patient: {

                id: patient._id,
                name: patient.name,
                email: patient.email,
                phone: patient.phone,
                age: patient.age,
                gender: patient.gender,
                address: patient.address

            }

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Server error",
            error: error.message

        });

    }

});


// =====================================================
// PATIENT LOGIN API
// =====================================================

app.post("/api/patients/login", async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;


        if (!email || !password) {

            return res.status(400).json({

                message:
                    "Email and password are required"

            });

        }


        const patient =
            await Patient.findOne({ email });


        if (!patient) {

            return res.status(401).json({

                message:
                    "Invalid email or password"

            });

        }


        const isPasswordCorrect =
            await bcrypt.compare(
                password,
                patient.password
            );


        if (!isPasswordCorrect) {

            return res.status(401).json({

                message:
                    "Invalid email or password"

            });

        }


        res.status(200).json({

            message: "Login successful",

            patient: {

                id: patient._id,
                name: patient.name,
                email: patient.email,
                phone: patient.phone,
                age: patient.age,
                gender: patient.gender,
                address: patient.address

            }

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Server error",
            error: error.message

        });

    }

});


// =====================================================
// DOCTOR REGISTER API
// =====================================================

app.post("/api/doctors/register", async (req, res) => {

    try {

        const {
            name,
            email,
            phone,
            password,
            department,
            specialization,
            experience,
            availability
        } = req.body;


        if (
            !name ||
            !email ||
            !phone ||
            !password ||
            !department ||
            !specialization
        ) {

            return res.status(400).json({

                message:
                    "Please fill all required fields"

            });

        }


        const existingDoctor =
            await Doctor.findOne({ email });


        if (existingDoctor) {

            return res.status(400).json({

                message:
                    "Doctor email already registered"

            });

        }


        const hashedPassword =
            await bcrypt.hash(password, 10);


        const doctor = new Doctor({

            name,
            email,
            phone,
            password: hashedPassword,
            department,
            specialization,

            experience:
                experience || 0,

            availability:
                availability ||
                "Available Today"

        });


        await doctor.save();


        res.status(201).json({

            message:
                "Doctor registered successfully",

            doctor: {

                id: doctor._id,
                name: doctor.name,
                email: doctor.email,
                phone: doctor.phone,
                department: doctor.department,
                specialization: doctor.specialization,
                experience: doctor.experience,
                availability: doctor.availability

            }

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Server error",
            error: error.message

        });

    }

});


// =====================================================
// GET ALL DOCTORS API
// =====================================================

app.get("/api/doctors", async (req, res) => {

    try {

        const doctors =
            await Doctor.find()
                .select("-password")
                .sort({ createdAt: -1 });


        res.status(200).json({

            doctors: doctors

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message:
                "Unable to load doctors",

            error: error.message

        });

    }

});


// =====================================================
// DOCTOR LOGIN API
// =====================================================

app.post("/api/doctors/login", async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;


        if (!email || !password) {

            return res.status(400).json({

                message:
                    "Email and password are required"

            });

        }


        const doctor =
            await Doctor.findOne({ email });


        if (!doctor) {

            return res.status(401).json({

                message:
                    "Invalid email or password"

            });

        }


        const isPasswordCorrect =
            await bcrypt.compare(
                password,
                doctor.password
            );


        if (!isPasswordCorrect) {

            return res.status(401).json({

                message:
                    "Invalid email or password"

            });

        }


        res.status(200).json({

            message:
                "Doctor login successful",

            doctor: {

                id: doctor._id,
                name: doctor.name,
                email: doctor.email,
                phone: doctor.phone,
                department: doctor.department,
                specialization:
                    doctor.specialization

            }

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Server error",
            error: error.message

        });

    }

});


// =====================================================
// CREATE DOCTOR
// =====================================================

app.post("/api/doctors", async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            phone,
            department,
            specialization,
            experience,
            availability
        } = req.body;


        if (
            !name ||
            !email ||
            !password ||
            !phone ||
            !department ||
            !specialization ||
            experience === undefined
        ) {

            return res.status(400).json({

                message:
                    "All fields are required"

            });

        }


        const existingDoctor =
            await Doctor.findOne({ email });


        if (existingDoctor) {

            return res.status(400).json({

                message:
                    "Doctor with this email already exists"

            });

        }


        // Password hash
        const hashedPassword =
            await bcrypt.hash(password, 10);


        const doctor = new Doctor({

            name,
            email,

            password:
                hashedPassword,

            phone,
            department,
            specialization,
            experience,

            availability:
                availability ||
                "Available Today"

        });


        await doctor.save();


        res.status(201).json({

            message:
                "Doctor created successfully",

            doctor: {

                id: doctor._id,
                name: doctor.name,
                email: doctor.email,
                phone: doctor.phone,
                department: doctor.department,
                specialization:
                    doctor.specialization,
                experience:
                    doctor.experience,
                availability:
                    doctor.availability

            }

        });

    }

    catch (error) {

        console.error(
            "Create Doctor Error:",
            error
        );

        res.status(500).json({

            message:
                "Unable to create doctor",

            error: error.message

        });

    }

});


// =====================================================
// ADMIN - UPDATE DOCTOR
// =====================================================

app.patch("/api/doctors/:doctorId", async (req, res) => {

    try {

        const {
            doctorId
        } = req.params;


        const {
            experience,
            availability
        } = req.body;


        const doctor =
            await Doctor.findByIdAndUpdate(

                doctorId,

                {
                    experience:
                        experience,

                    availability:
                        availability
                },

                {
                    new: true,
                    runValidators: true
                }

            )
            .select("-password");


        if (!doctor) {

            return res.status(404).json({

                message:
                    "Doctor not found"

            });

        }


        res.status(200).json({

            message:
                "Doctor updated successfully",

            doctor: doctor

        });

    }

    catch (error) {

        console.error(
            "Update Doctor Error:",
            error
        );

        res.status(500).json({

            message:
                "Unable to update doctor",

            error: error.message

        });

    }

});


// =====================================================
// ADMIN - DELETE DOCTOR
// =====================================================

app.delete("/api/doctors/:doctorId", async (req, res) => {

    try {

        const {
            doctorId
        } = req.params;


        const doctor =
            await Doctor.findByIdAndDelete(
                doctorId
            );


        if (!doctor) {

            return res.status(404).json({

                message:
                    "Doctor not found"

            });

        }


        res.status(200).json({

            message:
                "Doctor deleted successfully"

        });

    }

    catch (error) {

        console.error(
            "Delete Doctor Error:",
            error
        );


        res.status(500).json({

            message:
                "Unable to delete doctor",

            error: error.message

        });

    }

});


// =====================================================
// APPOINTMENT BOOKING API
// =====================================================

app.post("/api/appointments", async (req, res) => {

    try {

        const {
            patientId,
            patientName,
            phone,
            email,
            age,
            department,
            doctor,
            date,
            time,
            problem
        } = req.body;


        if (
            !patientId ||
            !patientName ||
            !phone ||
            !email ||
            !age ||
            !department ||
            !doctor ||
            !date ||
            !time
        ) {

            return res.status(400).json({

                message:
                    "Please fill all required fields"

            });

        }


        const doctorExists =
            await Doctor.findById(doctor);


        if (!doctorExists) {

            return res.status(404).json({

                message:
                    "Doctor not found"

            });

        }


        const appointment =
            new Appointment({

                patientId,
                patientName,
                phone,
                email,
                age,
                department,
                doctor,
                date,
                time,
                problem

            });


        await appointment.save();


        res.status(201).json({

            message:
                "Appointment booked successfully",

            appointment:
                appointment

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message:
                "Server error",

            error:
                error.message

        });

    }

});


// =====================================================
// GET ALL APPOINTMENTS
// =====================================================

app.get("/api/appointments", async (req, res) => {

    try {

        const appointments =
            await Appointment
                .find()
                .populate(
                    "doctor",
                    "name email phone department specialization"
                )
                .sort({ createdAt: -1 });


        res.status(200).json({

            appointments:
                appointments

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message:
                "Unable to load appointments",

            error:
                error.message

        });

    }

});


// =====================================================
// DOCTOR - GET OWN APPOINTMENTS
// =====================================================

app.get(
    "/api/doctors/:doctorId/appointments",
    async (req, res) => {

        try {

            const {
                doctorId
            } = req.params;


            const appointments =
                await Appointment
                    .find({
                        doctor:
                            doctorId
                    })
                    .populate(
                        "doctor",
                        "name email phone department specialization"
                    )
                    .sort({
                        createdAt: -1
                    });


            res.status(200).json({

                appointments:
                    appointments

            });

        }

        catch (error) {

            console.log(error);

            res.status(500).json({

                message:
                    "Unable to load doctor appointments",

                error:
                    error.message

            });

        }

    }
);


// =====================================================
// DOCTOR - UPDATE APPOINTMENT STATUS
// =====================================================

app.patch(
    "/api/appointments/:appointmentId/status",
    async (req, res) => {

        try {

            const {
                appointmentId
            } = req.params;


            const {
                status
            } = req.body;


            if (!status) {

                return res.status(400).json({

                    message:
                        "Status is required"

                });

            }


            const appointment =
                await Appointment.findByIdAndUpdate(

                    appointmentId,

                    {
                        status:
                            status
                    },

                    {
                        new: true
                    }

                );


            if (!appointment) {

                return res.status(404).json({

                    message:
                        "Appointment not found"

                });

            }


            res.status(200).json({

                message:
                    "Appointment status updated successfully",

                appointment:
                    appointment

            });

        }

        catch (error) {

            console.log(error);

            res.status(500).json({

                message:
                    "Unable to update appointment status",

                error:
                    error.message

            });

        }

    }
);


// =====================================================
// GET PATIENT APPOINTMENTS
// =====================================================

app.get(
    "/api/appointments/:patientId",
    async (req, res) => {

        try {

            const {
                patientId
            } = req.params;


            const appointments =
                await Appointment.find({

                    patientId:
                        patientId

                })
                .populate(
                    "doctor",
                    "name email phone department specialization"
                )
                .sort({
                    createdAt: -1
                });


            res.status(200).json({

                appointments:
                    appointments

            });

        }

        catch (error) {

            console.log(error);

            res.status(500).json({

                message:
                    "Unable to load patient appointments",

                error:
                    error.message

            });

        }

    }
);


// =====================================================
// ADMIN LOGIN API
// =====================================================

app.post("/api/admin/login", async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;


        if (!email || !password) {

            return res.status(400).json({

                message:
                    "Email and password are required"

            });

        }


        const admin =
            await Admin.findOne({
                email
            });


        if (!admin) {

            return res.status(401).json({

                message:
                    "Invalid admin email or password"

            });

        }


        const isPasswordCorrect =
            await bcrypt.compare(
                password,
                admin.password
            );


        if (!isPasswordCorrect) {

            return res.status(401).json({

                message:
                    "Invalid admin email or password"

            });

        }


        res.status(200).json({

            message:
                "Admin login successful",

            admin: {

                id:
                    admin._id,

                name:
                    admin.name,

                email:
                    admin.email

            }

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            message:
                "Server error",

            error:
                error.message

        });

    }

});


// =====================================================
// ADMIN - GET ALL APPOINTMENTS
// =====================================================

app.get(
    "/api/admin/appointments",
    async (req, res) => {

        try {

            const appointments =
                await Appointment
                    .find()
                    .populate(
                        "doctor",
                        "name email phone department specialization"
                    )
                    .sort({
                        createdAt: -1
                    });


            res.status(200).json({

                appointments:
                    appointments

            });

        }

        catch (error) {

            console.error(error);

            res.status(500).json({

                message:
                    "Unable to fetch appointments",

                error:
                    error.message

            });

        }

    }
);


// =====================================================
// ADMIN - UPDATE APPOINTMENT STATUS
// =====================================================

app.put(
    "/api/admin/appointments/:id",
    async (req, res) => {

        try {

            const {
                status
            } = req.body;


            if (!status) {

                return res.status(400).json({

                    message:
                        "Status is required"

                });

            }


            const appointment =
                await Appointment.findByIdAndUpdate(

                    req.params.id,

                    {
                        status:
                            status
                    },

                    {
                        new: true,
                        runValidators: true
                    }

                );


            if (!appointment) {

                return res.status(404).json({

                    message:
                        "Appointment not found"

                });

            }


            res.status(200).json({

                message:
                    "Appointment status updated",

                appointment:
                    appointment

            });

        }

        catch (error) {

            console.log(error);

            res.status(500).json({

                message:
                    "Unable to update appointment",

                error:
                    error.message

            });

        }

    }
);


// =====================================================
// ADMIN - GET ALL PATIENTS
// =====================================================

app.get(
    "/api/admin/patients",
    async (req, res) => {

        try {

            const patients =
                await Patient.find()
                    .select("-password")
                    .sort({
                        createdAt: -1
                    });


            res.status(200).json({

                patients:
                    patients

            });

        }

        catch (error) {

            console.log(error);

            res.status(500).json({

                message:
                    "Unable to load patients",

                error:
                    error.message

            });

        }

    }
);


// =====================================================
// PATIENT - GET OWN APPOINTMENTS
// =====================================================

app.get(
    "/api/patients/:patientId/appointments",
    async (req, res) => {

        try {

            const {
                patientId
            } = req.params;


            const appointments =
                await Appointment.find({

                    patientId:
                        patientId

                })
                .populate(
                    "doctor",
                    "name email phone department specialization"
                )
                .sort({
                    createdAt: -1
                });


            res.status(200).json({

                appointments:
                    appointments

            });

        }

        catch (error) {

            console.log(error);

            res.status(500).json({

                message:
                    "Unable to load patient appointments",

                error:
                    error.message

            });

        }

    }
);


// =====================================================
// PATIENT - CANCEL APPOINTMENT
// =====================================================

app.put(
    "/api/patients/appointments/:id/cancel",
    async (req, res) => {

        try {

            const appointment =
                await Appointment.findByIdAndUpdate(

                    req.params.id,

                    {
                        status:
                            "Cancelled"
                    },

                    {
                        new: true,
                        runValidators: true
                    }

                );


            if (!appointment) {

                return res.status(404).json({

                    message:
                        "Appointment not found"

                });

            }


            res.status(200).json({

                message:
                    "Appointment cancelled successfully",

                appointment:
                    appointment

            });

        }

        catch (error) {

            console.log(error);

            res.status(500).json({

                message:
                    "Unable to cancel appointment",

                error:
                    error.message

            });

        }

    }
);

// =====================================================
// ADMIN - ADD LAB REPORT
// =====================================================

app.post("/api/lab-reports", async (req, res) => {

    try {

        const {
            patientId,
            appointmentId,
            testName,
            testDate,
            result
        } = req.body;

        if (
            !patientId ||
            !appointmentId ||
            !testName ||
            !testDate ||
            !result
        ) {
            return res.status(400).json({
                message: "All lab report fields are required"
            });
        }

        const report = new LabReport({

            patientId,
            appointmentId,
            testName,
            testDate,
            result,
            status: "Completed"

        });

        await report.save();

        res.status(201).json({

            message: "Lab report added successfully",

            report: report

        });

    } catch (error) {

        console.error("Add Lab Report Error:", error);

        res.status(500).json({

            message: "Unable to add lab report",

            error: error.message

        });

    }

});
// =====================================================
// SERVER
// =====================================================

const PORT =
    process.env.PORT || 5000;
// =====================================================
// DOCTOR - SAVE PRESCRIPTION
// =====================================================

app.patch("/api/appointments/:appointmentId/prescription", async (req, res) => {

    try {

        const { appointmentId } = req.params;
        const { prescription } = req.body;

        if (!prescription || prescription.trim() === "") {

            return res.status(400).json({
                message: "Prescription is required"
            });

        }

        const appointment =
            await Appointment.findByIdAndUpdate(

                appointmentId,

                {
                    prescription: prescription
                },

                {
                    new: true,
                    runValidators: true
                }

            );

        if (!appointment) {

            return res.status(404).json({
                message: "Appointment not found"
            });

        }

        res.status(200).json({

            message: "Prescription saved successfully",

            appointment: appointment

        });

    } catch (error) {

        console.error(
            "Prescription Error:",
            error
        );

        res.status(500).json({

            message: "Unable to save prescription",

            error: error.message

        });

    }

});
// =====================================================
// ADMIN - GET PRESCRIPTION
// =====================================================

app.get("/api/admin/appointments/:appointmentId/prescription", async (req, res) => {

    try {

        const { appointmentId } = req.params;

        const appointment = await Appointment.findById(appointmentId);

        if (!appointment) {

            return res.status(404).json({
                message: "Appointment not found"
            });

        }

        res.status(200).json({

            prescription: appointment.prescription || ""

        });

    } catch (error) {

        console.error("Get Prescription Error:", error);

        res.status(500).json({

            message: "Unable to get prescription",

            error: error.message

        });

    }

});
// =====================================================
// GET SINGLE APPOINTMENT / PATIENT DETAILS
// =====================================================

app.get("/api/appointments/details/:appointmentId", async (req, res) => {

    try {

        const appointment =
            await Appointment
                .findById(req.params.appointmentId)
                .populate(
                    "doctor",
                    "name email phone department specialization"
                );

        if (!appointment) {

            return res.status(404).json({
                message: "Appointment not found"
            });

        }

        res.status(200).json({

            appointment: appointment

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            message: "Unable to load appointment details",

            error: error.message

        });

    }

});
// =====================================================
// ADMIN - CREATE LAB REPORT
// =====================================================

app.post("/api/admin/lab-reports", async (req, res) => {

    try {

        const {
            patientId,
            appointmentId,
            testName,
            testDate,
            result
        } = req.body;

        if (
            !patientId ||
            !appointmentId ||
            !testName ||
            !testDate ||
            !result
        ) {

            return res.status(400).json({
                message: "All lab report fields are required"
            });

        }

        const labReport = new LabReport({

            patientId,
            appointmentId,
            testName,
            testDate,
            result,
            status: "Completed"

        });

        await labReport.save();

        res.status(201).json({

            message: "Lab report created successfully",

            labReport: labReport

        });

    } catch (error) {

        console.error("Lab Report Error:", error);

        res.status(500).json({

            message: "Unable to create lab report",

            error: error.message

        });

    }

});
// =====================================================
// GET PATIENT LAB REPORTS
// =====================================================

app.get("/api/patients/:patientId/lab-reports", async (req, res) => {

    try {

        const reports = await LabReport.find({
            patientId: req.params.patientId
        })
        .populate(
            "appointmentId",
            "patientName doctor date time"
        )
        .sort({
            createdAt: -1
        });

        res.status(200).json({
            reports: reports
        });

    } catch (error) {

        console.error("Lab Reports Error:", error);

        res.status(500).json({
            message: "Unable to load lab reports",
            error: error.message
        });

    }

});
// =====================================================
// DOCTOR - ADD LAB REPORT
// =====================================================

app.post("/api/lab-reports", async (req, res) => {

    try {

        const {
            patientId,
            appointmentId,
            testName,
            testDate,
            result,
            status
        } = req.body;

        if (
            !patientId ||
            !appointmentId ||
            !testName ||
            !testDate ||
            !result
        ) {
            return res.status(400).json({
                message: "Please fill all lab report fields"
            });
        }

        const labReport = new LabReport({

            patientId,
            appointmentId,
            testName,
            testDate,
            result,
            status: status || "Completed"

        });

        await labReport.save();

        res.status(201).json({

            message: "Lab report added successfully",

            report: labReport

        });

    } catch (error) {

        console.error(
            "Add Lab Report Error:",
            error
        );

        res.status(500).json({

            message: "Unable to add lab report",

            error: error.message

        });

    }

});
app.listen(PORT, () => {

    console.log(
        `Server running on http://localhost:${PORT}`
    );

});