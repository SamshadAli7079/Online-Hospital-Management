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

    // ================= APPOINTMENT STATUS =================

    status: {
        type: String,
        default: "Pending"
    },

    // ================= PAYMENT DETAILS =================

    paymentStatus: {
        type: String,
        enum: ["Pending", "Paid", "Failed"],
        default: "Pending"
    },

    paymentAmount: {
        type: Number,
        default: 500
    },

    paymentId: {
        type: String,
        default: ""
    },

    // ================= PRESCRIPTION =================

    prescription: {
        type: String,
        default: ""
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Appointment", appointmentSchema);