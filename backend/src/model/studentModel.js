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
        trim:true
    },
    mobile: {
        type: String,
        required: true,
        trim:true
    },
    address: {
        type: String,
         trim:true
    },
    fatherName: {
        type: String,
         trim:true
    },
    motherName: {
        type: String,
         trim:true
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
