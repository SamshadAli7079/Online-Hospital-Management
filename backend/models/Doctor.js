
const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    department: {
        type: String,
        required: true
    },

    specialization: {
        type: String,
        required: true
    },

    experience: {
        type: Number,
        default: 0
    },

    availability: {
        type: String,
        default: "Available Today"
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Doctor", doctorSchema);


