const errorHandler = require("../utils/errorHandler");
const User = require("../model/userModel");
const { successResponse, errorResponse } = require("../utils/response");
const generateCertificate = require("../utils/generateCertificate");
const sendCertificateEmail = require("../helper/sendCertificateEmail");

exports.getUsers = async (req, res) => {
    try {

        let users;
        const isParticipated = req.query.isParticipated;
        if (isParticipated) {
            users = await User.find({ isParticipated: isParticipated === 'true' });
        } else {
            users = await User.find();
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
            return errorResponse(res, "Invalid user ID format");
        }


        console.log(userIds);
        const users = await User.find({ _id: { $in: userIds }, isParticipated: true });
        console.log(users);

        if (!users || users.length === 0) {
            return errorResponse(res, "No participated users found", 404);
        }

        // const results = await Promise.allSettled(users.map(async (user) => {
        //     try {
        //         const pdf = await generateCertificate(user);
        //         await sendCertificateEmail(user, pdf);
        //         return { email: user.email, status: 'sent' };
        //     } catch (err) {
        //         return { email: user.email, status: 'failed', error: err.message };
        //     }
        // }));

        // return successResponse(res, "Certificates processed", results);


        await Promise.all(users.map(async (user) => {
            try {
                const pdf = await generateCertificate(user);
                await sendCertificateEmail(user, pdf);

                // Optionally mark as sent
                await User.findByIdAndUpdate(user._id, { certificateSent: true });
            } catch (err) {
                console.error(`Error for ${user.email}:`, err.message);
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
        const user = await User.findByIdAndDelete(id);
        return successResponse(res, "User deleted successfully");


    } catch (error) {
        return errorResponse(res, "Something went wrong", 500);
    }
}


