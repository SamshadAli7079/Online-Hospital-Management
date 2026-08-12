const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const Doctor = require("./models/Doctor");

const doctors = [
    {
        name: "Dr. Priya Singh",
        email: "priya@medicare.com",
        password: "Priya@123",
        phone: "9876543211",
        department: "Neurology",
        specialization: "Neurologist"
    },
    {
        name: "Dr. Amit Kumar",
        email: "amit@medicare.com",
        password: "Amit@123",
        phone: "9876543212",
        department: "Orthopedics",
        specialization: "Orthopedic Doctor"
    },
    {
        name: "Dr. Neha Verma",
        email: "neha@medicare.com",
        password: "Neha@123",
        phone: "9876543213",
        department: "Dermatology",
        specialization: "Dermatologist"
    },
    {
        name: "Dr. Arjun Reddy",
        email: "arjun@medicare.com",
        password: "Arjun@123",
        phone: "9876543214",
        department: "Pediatrics",
        specialization: "Pediatrician"
    },
    {
        name: "Dr. Anjali Mehta",
        email: "anjali@medicare.com",
        password: "Anjali@123",
        phone: "9876543215",
        department: "Gynecology",
        specialization: "Gynecologist"
    }
];

async function createDoctors() {

    try {

        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Connected Successfully!\n");

        for (const doctorData of doctors) {

            const existingDoctor =
                await Doctor.findOne({
                    email: doctorData.email
                });

            if (existingDoctor) {

                console.log(
                    `${doctorData.name} already exists`
                );

                continue;
            }

            const hashedPassword =
                await bcrypt.hash(
                    doctorData.password,
                    10
                );

            const doctor =
                new Doctor({

                    name: doctorData.name,
                    email: doctorData.email,
                    password: hashedPassword,
                    phone: doctorData.phone,
                    department: doctorData.department,
                    specialization: doctorData.specialization

                });

            await doctor.save();

            console.log(
                `Created: ${doctorData.name}`
            );

            console.log(
                `Email: ${doctorData.email}`
            );

            console.log(
                `Password: ${doctorData.password}\n`
            );
        }

        await mongoose.connection.close();

        console.log("Done!");

    } catch (error) {

        console.log("Error creating doctors:");
        console.log(error.message);

    }

}

createDoctors();