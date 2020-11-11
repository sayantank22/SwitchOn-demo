const jwt = require('jsonwebtoken');

const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    let token;

    // check if authorization header exists
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        token = req.headers.authorization.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id).select('-password');

        next();
      } catch (error) {
        console.error(error);
        res.status(401);
        throw new Error('Token is not valid');
      }
    }

    // Check if no token
    if (!token) {
      res.status(401);
      throw new Error('No token, authorization denied');
    }
  } catch (error) {
    res.status(401).json({
      status: 'fail',
      message: error.message,
    });
  }
};

module.exports = auth;
