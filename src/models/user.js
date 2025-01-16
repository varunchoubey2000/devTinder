const mongoose = require("mongoose");
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
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        validate(value) {
            if (!["male", "female", "others"].include(value)) {
                throw new Error("Gender data is not valid");
            }
        }
    },
    age: {
        type: Number,
        min: 18,
    },
    photoURL: {
        type: String,
    },
    about: {
        type: String,
        default: "This is default about of the User"
    },
    skills: {
        type: [String]
    }

}, { timestamps: true })

module.exports = mongoose.model("User", userSchema)