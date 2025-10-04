const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./utils/errorHandler");
const app = express();
const studentRoutes = require("./routes/studentRoute");
const userRoutes = require("./routes/userRoute");

const { allowedOrigins } = require("./constans");
const path = require("path");

const corsOptions = {
    credentials: true,
    methods: ["POST", "GET", "DELETE", "PUT", "PATCH"],
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));



app.use("/api/user", userRoutes);
app.use("/api/student", studentRoutes);




app.use(errorHandler);

module.exports = app;