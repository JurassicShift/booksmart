const User = require('../models/user');

 const checkUsernameAvailability = async (req, res, next) => {
    const { username } = req.body;
    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: 'Username is already in use.' });
    }
  
    next();
  };

   const checkEmailAvailability = async (req, res, next) => {
    const { useremail } = req.body;
    const user = await User.findOne({ useremail });
  
    if (user) {
      return res.status(400).json({ error: 'Email is already in use.' });
    }
  
    next(); 
  };

  const isAuthenticated = (req, res, next) => {
    
    if (req.session.isAuthenticated && req.session.user_id) {
      next(); 
    } else {
      res.status(401).send({ message: 'Unauthorized' });
    }
  };

  module.exports = {
    checkUsernameAvailability,
    checkEmailAvailability,
    isAuthenticated
  }
  
  