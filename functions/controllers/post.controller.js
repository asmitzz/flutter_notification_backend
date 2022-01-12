const Posts = require("../models/post.model");
const DeviceTokens = require("../models/device_token.model");

const admin = require('firebase-admin');
 

const createPost = async (req, res) => {
   const {title,description} = req.body;
   const {uid} = req.params;

    await Posts({uid,title,description}).save()

    const device_tokens = await DeviceTokens.find({});
    let tokens = device_tokens.filter((token) => {
        return token.uid != uid
    })

    tokens = tokens.map((token) => {
        return token.token
    })

    const payload = {
       notification:{
           title:"New Post notification",
           body:"",
       },
       data:{
          "message":`${uid} : created New post`,
          "route":"/"
       }
    }
   

    try {
      admin.initializeApp();

       await admin.messaging().sendToDevice(tokens, payload);
       return res.status(201).json({
        message: "Post created successfully",
       });
    } catch (error) {
        console.log({error})
    }

   
};

module.exports = { createPost };