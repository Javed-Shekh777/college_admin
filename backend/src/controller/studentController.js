const errorHandler = require("../utils/errorHandler");
const Student = require("../model/studentModel");
const { successResponse, errorResponse } = require("../utils/response");
const generateCertificate = require("../utils/generateCertificate");
const sendCertificateEmail = require("../helper/sendCertificateEmail");



exports.addStudent = async (req, res) => {
    console.log(req.body);
    const { name, email, mobile, address, isParticipated, fatherName, motherName } = req.body;

    // Basic validation
    if (!name || !email || !mobile || !address || !fatherName || !motherName) {
        return errorResponse(res, 'All fields are required', 400);
    }

    if (!/^\d{10}$/.test(mobile)) {
        return errorResponse(res, 'Mobile number must be 10 digits', 400);
    }

    try {
        const student = new Student({ name, email, mobile, address, isParticipated, fatherName, motherName });
        await student.save();
        return successResponse(res, 'Student added successfully', student);
    } catch (err) {
        return errorResponse(res, 'Failed to add student', 500);
    }
};


exports.getUsers = async (req, res) => {
    try {

        let users;
        const isParticipated = req.query.isParticipated;
        if (isParticipated) {
            users = await Student.find({ isParticipated: isParticipated === 'true' });
        } else {
            users = await Student.find();
        }

        if (!users || users.length === 0) {
            return errorResponse(res, "No users found", 404);
        }

        return successResponse(res, "Users fetched successfully", users);


    } catch (error) {
        return errorResponse(res, "Something went wrong", 500);
    }
}


exports.sendCertificates = async (req, res) => {
    try {

        const { userIds } = req.body;

        if (!Array.isArray(userIds) || userIds.some(id => typeof id !== 'string')) {
            return errorResponse(res, "Invalid Student ID format");
        }


        console.log(userIds);
        const users = await Student.find({ _id: { $in: userIds }, isParticipated: true });
        console.log(users);

        if (!users || users.length === 0) {
            return errorResponse(res, "No participated users found", 404);
        }

        // const results = await Promise.allSettled(users.map(async (Student) => {
        //     try {
        //         const pdf = await generateCertificate(Student);
        //         await sendCertificateEmail(Student, pdf);
        //         return { email: Student.email, status: 'sent' };
        //     } catch (err) {
        //         return { email: Student.email, status: 'failed', error: err.message };
        //     }
        // }));

        // return successResponse(res, "Certificates processed", results);


        await Promise.all(users.map(async (Student) => {
            try {
                const pdf = await generateCertificate(Student);
                await sendCertificateEmail(Student, pdf);

                // Optionally mark as sent
                await Student.findByIdAndUpdate(Student._id, { certificateSent: true });
            } catch (err) {
                console.error(`Error for ${Student.email}:`, err.message);
            }
        }));



        return successResponse(res, "Certificates sent successfully");
    } catch (error) {

        return errorResponse(res, "Something went wrong", 500);
    }
};


exports.deleteUser = async (req, res) => {
    try {

        let id = req.body.id || req?.query?.id;

        if (!id) {
            return errorResponse(res, "Id is required", 404);
        }
        const Student = await Student.findByIdAndDelete(id);
        return successResponse(res, "Student deleted successfully");


    } catch (error) {
        return errorResponse(res, "Something went wrong", 500);
    }
}


