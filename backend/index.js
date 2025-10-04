require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db');
const { PORT } = require('./src/constans');
const { seedInitialData } = require('./src/helper/seeder');


connectDB().then(() => {
    app.listen(PORT, async (err) => {
        if (err) console.log("Error in server setup")
        console.log(`Server is running on port ${PORT}`);
        await seedInitialData();
    });
}).catch((err) => {
    console.log("Database connection failed", err);
});