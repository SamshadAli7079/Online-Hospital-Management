const mongoose = require("mongoose");
require("dotenv").config();

const Doctor = require("./models/Doctor");

async function checkDoctors() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Connected!\n");

        const doctors = await Doctor.find()
            .select("_id name email department specialization");

        console.log("Doctors in Database:");
        console.log(doctors);

        await mongoose.connection.close();

    } catch (error) {
        console.log("Error:");
        console.log(error.message);
    }
}

checkDoctors();