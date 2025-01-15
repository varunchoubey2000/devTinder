const express = require("express");
const app = express();

app.use("/", (err, req, res, next) => {
    if (err) {
        res.status(500).send("Something went wrong")
    }
})

app.use("/getUserData", (req, res) => {
    try {
        throw new Error("dvbcs");
        res.send("User Data send")
    } catch (err) {
        res.status(500).send("Some Error contact support Team")
    }


})


app.get("/admin/deleteUser", (req, res) => {
    res.send("Deleted Data")
})

app.listen(777, () => {
    console.log("Server is successfully listening on port 777 ...")
});