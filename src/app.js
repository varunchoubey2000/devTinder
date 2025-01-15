const express = require("express");
const app = express();



app.get("/user/:userID/:name/:password", (req, res) => {
    console.log(req.params)
    res.send({ name: "Varun", lastName: "Choubey" })
})




app.listen(777, () => {
    console.log("Server is successfully listening on port 777 ...")
});