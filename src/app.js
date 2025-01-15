const express = require("express");
const app = express();


app.use("/user", (req, res, next) => {
    console.log("Handling the routes user")
    // res.send("Response!!")
    next();
},
    (req, res, next) => {
        // console.log("Handling the routes user 2")
        // res.send("2nd Response here..!!")
        next();
    },
    (req, res, next) => {
        // console.log("Handling the routes user 3")
        // res.send("3nd Response here..!!")
        next()
    },
    (req, res) => {
        console.log("Handling the routes user 4")
        res.send("4nd Response here..!!")
    },
),




    app.listen(777, () => {
        console.log("Server is successfully listening on port 777 ...")
    });