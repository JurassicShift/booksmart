const User = require('../models/user');
const { cloudinary } = require('../../cloudinaryConfig.js');

 const checkUsernameAvailability = async (req, res, next) => {
    const { username } = req.body;
    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({
        msg: "Username already in use",
        obj: user
      });
    }
  
    next();
  };

   const checkEmailAvailability = async (req, res, next) => {

    const { useremail } = req.body;
    const user = await User.findOne({ useremail });
  
    if (user) {
      return res.status(400).json({
        msg: "Email already in use",
        obj: user
      });
    }
  
    next(); 
  };

  const isAuthenticated = (req, res, next) => {
    if (req.session.isAuthenticated && req.session.user_id) {
      next(); 
    } else {
      res.status(401).send({
        msg: "Not authorised",
        obj: {}
      });
    }
  };

  const dataCheck = async (req, res, next) => {
    const userId = req.session.user_id;
    const userObj = await User.findById(userId);
    if(userObj.userimage.url && userObj.userimage.filename) {
      cloudinary.uploader.destroy(userObj.userimage.filename);
    }  
    next();
  };

  module.exports = {
    checkUsernameAvailability,
    checkEmailAvailability,
    isAuthenticated,
    dataCheck
  }
  
  