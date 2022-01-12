const mongoose = require("mongoose");
const {nanoid} = require("nanoid");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        index:1
    },
    salt:{
        type:String,
    },
    encry_password:{
       type:String,
       required:true,
    },
},{ timestamps:true })

UserSchema.virtual("password")
.set(function(password){
    this._password = password;
    this.salt = nanoid();
    this.encry_password = this.securePassword(password);
})
.get(function(){
    return this._password
})

UserSchema.methods = {
    authenticate:function(plainPassword){
        return this.securePassword(plainPassword) === this.encry_password;
    },
    securePassword:function(plainPassword){
        if(!plainPassword) return "";
        try {
            return crypto
            .createHmac("sha256",this.salt)
            .update(plainPassword)
            .digest("hex");
        } catch (error) {
            return "";
        }
    }
}

const User = new mongoose.model("User",UserSchema);

module.exports = User;