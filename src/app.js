const express = require("express");
const app = express();
const connectDB = require("./config/database")
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());

const authRouter = require("../src/routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

connectDB().then(() => {
    console.log("Database connection established");
    app.listen(777, () => {
        console.log("Server is successfully listening on port 777 ...")
    });
}).catch(err => {
    console.error("Database cannot be connected")
})
