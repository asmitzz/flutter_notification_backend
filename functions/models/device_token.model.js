const mongoose = require("mongoose");

const DeviceTokenSchema = new mongoose.Schema({
    uid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    token:{
        type:String,
        required:true
    }
},{ timestamps:true })

const DeviceTokens = new mongoose.model("DeviceToken",DeviceTokenSchema);

module.exports = DeviceTokens;