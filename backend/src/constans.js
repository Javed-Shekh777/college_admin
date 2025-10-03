const PORT = process.env.PORT || 8080;


 
const SchemaName = {
    user: "User",
    student: "Student",
    certificate: "Certificate"
};

 

 

const SALT = parseInt(process.env.SALT);
const MONGODB_URL = `${process.env.DB_URL}/${process.env.DATABASE}`;
const allowedOrigins = ["http://10.118.125.127:5173/", process.env.FRONTEND];

const Tokens = {
    acessToken: process.env.ACCESS_TOKEN,
    accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY,
    refreshToken: process.env.REFRESH_TOKEN,
    refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY,
    webToken: process.env.WEB_TOKEN,
    webTokenExpiry: process.env.WEB_TOKEN_EXPIRY
};

const mailOptions = {
    username: process.env.AUTH_EMAIL,
    userKey: process.env.AUTH_KEY,
    ownerName: process.env.OWNER_NAME,
    ownerEmail: process.env.OWNER_EMAIL
};

module.exports = { SchemaName, SALT, Tokens, MONGODB_URL, PORT, allowedOrigins, mailOptions};
 