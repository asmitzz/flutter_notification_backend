const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    uid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
},{ timestamps:true })

const User = new mongoose.model("Post",PostSchema);

module.exports = User;