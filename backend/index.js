require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db');
const { PORT } = require('./src/constans');


connectDB().then(() => {
    app.listen(PORT, (err) => {
        if (err) console.log("Error in server setup")
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.log("Database connection failed", err);
});