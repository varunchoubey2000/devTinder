const express = require("express");
const userRouter = express.Router();
const { UserAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionReq")




userRouter.get("/api/user/requests", UserAuth, async (req, res) => {
    console.log("Middleware passed, fetching requests...");
    try {
        const loggedInUser = req.user

        const connectionRequest = await ConnectionRequest.find({

            toUserId: loggedInUser._id,

        })
        console.log("connectionRequest", connectionRequest);
        res.json({
            message: "Data fetched Successfully",
            data: connectionRequest,
        })
    } catch (err) {
        res.status(400).send("ERROR: " + err.message)
    }
})




module.exports = userRouter;