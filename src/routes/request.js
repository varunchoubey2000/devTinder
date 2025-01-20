const express = require("express");
const requestRouter = express.Router()
const { UserAuth } = require("../middlewares/auth");


requestRouter.post("/sendConnectionRequest", UserAuth, async (req, res) => {
    const user = req.user
    console.log("sending a connection request")
    res.send(user.firstName + " sending a connection Request");
})

module.exports = requestRouter;