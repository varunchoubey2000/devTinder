const mongoose = require("mongoose")

const connectionRequestSchema = new mongoose.Schema({

    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["ignored", "interested", "accepted", "rejected"],
            message: `{VALUE} is incorrect status type`
        }
    }

}, {
    timestamps: true
})

//ConnectionRequest.find({fromUserId: , toUserId: })

connectionRequestSchema.index({ fromUserId: 1 , toUserId: 1});

connectionRequestSchema.pre("save", function (next) {
    const connectionRequest = this;

    //check if the fromUserId is same as to toUserId
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error("cannot send connection request to yourself!..")
    }
    next();
})


const ConnectionRequestModel = new mongoose.model("connectionRequest", connectionRequestSchema)

module.exports = ConnectionRequestModel