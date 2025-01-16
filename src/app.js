const express = require("express");
const connectDB = require("./config/database")
const User = require("./models/user");
const user = require("./models/user");
const app = express();

app.use(express.json())

app.post("/signup", async (req, res) => {

    const user = new User(req.body)
    try {
        await user.save();
        res.send("user added successfully")
    } catch (err) {
        res.status(400).send("Error saving the user" + err.message)
    }

})

app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;


    try {
        const users = await User.findOne({ emailId: userEmail })
        res.send(users)
        //     const users = await User.find({ emailId: userEmail })
        //     if (users.length === 0) {
        //         res.status(400).send("User not found")
        //     }
        //     else {
        //         res.send(users)

        //     }
    } catch (error) {
        res.status(400).send("something went wrong")
    }
})
app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        res.status(400).send("something went wrong")
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

