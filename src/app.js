const express = require("express");
const app = express();



app.get("/user", (req, res) => {
    res.send({ name: "Varun", lastName: "Choubey" })
})

app.post("/user", (req, res) => {
    console.log("Save data to the database")
    res.send("Data successfully saved to the database")
})

app.delete("/user", (req, res) => {
    res.send("deleted successFully!")
})

app.use("/test", (req, res) => {
    res.send("Hello from the server")
})


app.listen(777, () => {
    console.log("Server is successfully listening on port 777 ...")
});