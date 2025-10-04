const mongoose = require('mongoose');
const { SchemaName } = require('../constans');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    fatherName: {
        type: String,
    },
    motherName: {
        type: String,
    },
    isParticipated: {
        type: Boolean,
        default: false,
    },
    certificateSent: {
        type: Boolean,
        default: false,
    },
    dateOfParticipation: {
        type: Date,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model(SchemaName.student, userSchema);
