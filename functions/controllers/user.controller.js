const Users = require("../models/user.model");
const DeviceTokens = require("../models/device_token.model");

const signup = async (req, res) => {
   const { email,password,device_token } = req.body;
   await Users({email,password}).save(async(err, user) => {
    if (err) {
      return res.status(400).json({
        message: "Not able to save user in DB",
      });
    }
    if (user) {
       await DeviceTokens({uid:user._id,token:device_token}).save();
       console.log(await DeviceTokens.find({}))
       return res.status(200).json({success:true})
    }
  });
};

const signin = async(req,res) => {
  const { email,password } = req.body;

  const user = await Users.findOne({email});

  // authenticate user
  if(!user.authenticate(password)){
      return res.status(401).json({ message:"Sorry, your password was incorrect. Please double-check your password"})
  }
  const { _id } = user;

  // send response to frontend
  return res.status(200).json({ uid:_id })
}

module.exports = { signup,signin };