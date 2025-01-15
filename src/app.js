const express = require("express");
const app = express();

const { adminAuth, UserAuth } = require('./middlewares/auth')

app.use("/admin", adminAuth);
// app.use("/user", UserAuth)

app.post("/user/login", (req, res) => {
    res.send("User logged in successfully!!")
})

app.get("/user/data", UserAuth, (req, res) => {

    res.send("User Data send")
})
app.get("/admin/getAllData", (req, res) => {

    res.send("All Data sent")
})


app.get("/admin/deleteUser", (req, res) => {
    res.send("Deleted Data")
})





app.listen(777, () => {
    console.log("Server is successfully listening on port 777 ...")
});