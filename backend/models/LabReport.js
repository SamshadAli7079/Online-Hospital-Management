const mongoose = require("mongoose");

const labReportSchema = new mongoose.Schema(
    {
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
            required: true
        },

        appointmentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Appointment",
            required: true
        },

        testName: {
            type: String,
            required: true
        },

        testDate: {
            type: String,
            required: true
        },

        result: {
            type: String,
            required: true
        },

        status: {
            type: String,
            default: "Completed"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("LabReport", labReportSchema);