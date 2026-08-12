const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({

    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true
    },

    patientName: {
        type: String,
        required: true
    },

    phone: String,
    email: String,
    age: Number,
    department: String,

    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true
    },

    date: String,
    time: String,
    problem: String,

    status: {
        type: String,
        default: "Pending"
    },

    // NEW
    prescription: {
        type: String,
        default: ""
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Appointment", appointmentSchema);