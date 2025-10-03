const nodemailer = require('nodemailer');
const { mailOptions } = require("../constans");


async function sendCertificateEmail(user, pdfBuffer) {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: mailOptions.username,

                pass: mailOptions.userKey,
            },
        });

        await transporter.sendMail({
            from: '"IIT Admin" <admin@iit.edu>',
            to: user.email,
            subject: 'Certificate of Participation – National Workshop',
            text: `Dear ${user.name},

We are pleased to inform you that you have successfully participated in the National Workshop on Emerging Technologies, organized by the Indian Institute of Technology (IIT) on ${new Date().toLocaleDateString()}.

Your active engagement and enthusiasm throughout the sessions were truly commendable. Please find your Certificate of Participation attached with this email.

We hope this experience contributes meaningfully to your academic and professional journey.

Warm regards,  
Workshop Coordination Team  
Indian Institute of Technology`,
            attachments: [
                {
                    filename: 'certificate.pdf',
                    content: pdfBuffer,
                },
            ],
        });



    } catch (err) {
        console.error(`Error sending email to ${user.email}:`, err);
        throw err;
    }
}


module.exports = sendCertificateEmail;