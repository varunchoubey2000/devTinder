const mongoose = require("mongoose");
const validator = require("validator")
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
    firstName: {

        type: String,
        required: true,
        minLength: 4,
        maxLength: 50,

    },
    lastName: {
        type: String

    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email address: " + value)
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Enter a strong password: " + value)
            }
        }
    },
    gender: {
        type: String,

        enum: {
            values: ["male", "female", "other"],
            message: `{VALUE} is not valid gender type`
        },

        // validate(value) {
        //     if (!["male", "female", "others"].includes(value)) {
        //         throw new Error("Gender data is not valid");
        //     }
        // }
    },
    age: {
        type: Number,
        min: 18,
    },
    photoURL: {
        type: String,
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("Invalid URL: " + value)
            }
        }
    },
    about: {
        type: String,
        default: "This is default about of the User"
    },
    skills: {
        type: [String]
    }

}, { timestamps: true })

userSchema.index({ firstName: 1 })

userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790", {
        expiresIn: "1d",
    });
    console.log("TOKEN IS HERE: ", token)
    return token
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash)
    return isPasswordValid;
}



module.exports = mongoose.model("User", userSchema)