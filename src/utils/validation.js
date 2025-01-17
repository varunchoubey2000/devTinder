const validator = require("validator")

const validateSignupData = (req) => {

    const { firstName, lastName, emailId, password } = req.body
    if (!firstName || !lastName) {
        throw new Error("Name is not Valid!!")
    } else if (firstName.length < 4 || lastName.length > 50) {
        throw new Error("FirstName should be 4-50 characters")
    } else if (!validator.isEmail(emailId)) {
        throw new Error("Email is not valid!")
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Please enter a strong password")
    }

}
module.exports = {
    validateSignupData
}