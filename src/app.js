const express = require("express");
const connectDB = require("./config/database")
const User = require("./models/user")
const app = express();

app.post("/signup", async (req, res) => {
    const user = new User({
        firstName: "Akshay",
        lastName: "saini",
        emailId: "akshay@saini.com",
        password: "akshay@123"
    })
    try {
        await user.save();
        res.send("user added successfully")
    } catch (err) {
        res.status(400).send("Error saving the user",err.message)
    }
    
})

connectDB().then(() => {
    console.log("Database connection established");
    app.listen(777, () => {
        console.log("Server is successfully listening on port 777 ...")
    });
}).catch(err => {
    console.error("Database cannot be connected")
})

