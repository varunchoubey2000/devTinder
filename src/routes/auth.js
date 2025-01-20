const express = require("express");
const authRouter = express.Router();

const { validateSignupData } = require("../utils/validation")

const User = require("../models/user");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
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

authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body
        const user = await User.findOne({ emailId: emailId })
        if (!user) {
            throw new Error("EmailId id not present in the DB")
        }

        const isPasswordValid = await user.validatePassword(password)

        if (isPasswordValid) {
            // create a JWT Token
            const token = await user.getJWT();

            // add the Token to cookie $ send the response back to the user 
            res.cookie("token", token, {
                expires: new Date(Date.now() + 8 * 3600000)
            });

            res.send("Login Successfully")
        } else {
            throw new Error("Password not correct")
        }

    } catch (err) {
        res.status(400).send("Error : " + err.message);
    }
})

authRouter.post("/logout", async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
    })
    res.send("Logout successful!!");
})



module.exports = authRouter;