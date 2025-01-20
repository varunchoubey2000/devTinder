const express = require("express");
const app = express();
const connectDB = require("./config/database")
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

const authRouter = require("../src/routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);


connectDB().then(() => {
    console.log("Database connection established");
    app.listen(777, () => {
        console.log("Server is successfully listening on port 777 ...")
    });
}).catch(err => {
    console.error("Database cannot be connected")
})

// app.get("/user", async (req, res) => {
//     const userEmail = req.body.emailId;


//     try {
//         const users = await User.findOne({ emailId: userEmail })
//         res.send(users)
//         //     const users = await User.find({ emailId: userEmail })
//         //     if (users.length === 0) {
//         //         res.status(400).send("User not found")
//         //     }
//         //     else {
//         //         res.send(users)

//         //     }
//     } catch (error) {
//         res.status(400).send("something went wrong")
//     }
// })
// app.get("/feed", async (req, res) => {
//     try {
//         const users = await User.find({})
//         res.send(users)
//     } catch (error) {
//         res.status(400).send("something went wrong")
//     }
// })
// app.delete("/user", async (req, res) => {
//     const userId = req.body.userId;
//     try {
//         const user = await User.findByIdAndDelete(userId)
//         res.send("user Deleted successfully!! ")
//     } catch (error) {
//         res.status(400).send("something went wrong")
//     }
// })

// app.patch("/user/:userId", async (req, res) => {
//     const userId = req.params?.userId.trim();
//     const data = req.body;

//     try {
//         const ALLOWED_UPDATES = ["photoURL", "about", "gender", "age", "skills"]
//         const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));
//         if (!isUpdateAllowed) {
//             throw new Error("update not allowed")
//         }
//         if (data?.skills.length > 10) {
//             throw new Error("skills can not be more than 10")
//         }

//         const user = await User.findByIdAndUpdate({ _id: userId }, data, {
//             returnDocument: "after",
//             runValidators: true,
//         })
//         console.log(user)
//         res.send("User Updated Successfully");
//     } catch (err) {
//         res.status(400).send("UPDATED FAILED" + err.message)
//     }
// })
