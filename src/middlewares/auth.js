const adminAuth = (req, res, next) => {
    console.log("Auth admin Getting checked")
    const Token = "varun";
    const isAuthorized = Token == "varun";
    if (!isAuthorized) {
        res.status(401).send("Unathorized Data")
    }
    next()
}
const UserAuth = (req, res, next) => {
    console.log("User Auth Getting checked")
    const Token = "varun";
    const isAuthorized = Token == "varun";
    if (!isAuthorized) {
        res.status(401).send("Unathorized Data")
    }
    next() 
}

module.exports = {
    adminAuth, UserAuth
}