const express = require("express");
const bcrypt = require("bcrypt");
const connectDB = require("./config/database")
const { validateSignupData } = require("./utils/validation")
const User = require("./models/user");
const user = require("./models/user");
const app = express();

app.use(express.json())

app.post("/signup", async (req, res) => {
    try {
        //validation of data 
        validateSignupData(req)
        // Encrypt the password
        const { firstName, lastName, emailId, password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);
        console.log(passwordHash)



        const user = new User({
            firstName, lastName, emailId, password: passwordHash
        })
        await user.save();
        res.send("user added successfully")
    } catch (err) {
        res.status(400).send("Error: " + err.message)
    }

})




app.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body
        const user = await User.findOne({ emailId: emailId })
        if (!user) {
            throw new Error("EmailId id not present in the DB")
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (isPasswordValid) {
            res.send("Login Successfully")
        } else {
            throw new Error("Password not correct")
        }

    } catch (err) {
        res.status(400).send("Error : " + err.message);
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
app.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    try {
        const user = await User.findByIdAndDelete(userId)
        res.send("user Deleted successfully!! ")
    } catch (error) {
        res.status(400).send("something went wrong")
    }
})

app.patch("/user/:userId", async (req, res) => {
    const userId = req.params?.userId.trim();
    const data = req.body;

    try {
        const ALLOWED_UPDATES = ["photoURL", "about", "gender", "age", "skills"]
        const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));
        if (!isUpdateAllowed) {
            throw new Error("update not allowed")
        }
        if (data?.skills.length > 10) {
            throw new Error("skills can not be more than 10")
        }

        const user = await User.findByIdAndUpdate({ _id: userId }, data, {
            returnDocument: "after",
            runValidators: true,
        })
        console.log(user)
        res.send("User Updated Successfully");
    } catch (err) {
        res.status(400).send("UPDATED FAILED" + err.message)
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

