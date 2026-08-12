const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const Admin = require("./models/Admin");

async function createAdmin() {

    try {

        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Connected Successfully!");

        const existingAdmin =
            await Admin.findOne({
                email: "admin@medicare.com"
            });

        if (existingAdmin) {

            console.log("Admin already exists!");

            process.exit();

        }

        const hashedPassword =
            await bcrypt.hash("Admin@123", 10);

        const admin = new Admin({

            name: "MediCare Admin",

            email: "admin@medicare.com",

            password: hashedPassword

        });

        await admin.save();

        console.log("Admin created successfully!");
        console.log("Email: admin@medicare.com");
        console.log("Password: Admin@123");

        process.exit();

    } catch (error) {

        console.log("Error:", error.message);

        process.exit(1);

    }

}

createAdmin();