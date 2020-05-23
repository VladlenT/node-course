const jwt = require('jsonwebtoken');
const User = require('../models/user');
const secret = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, secret);

    req.user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

    next();
  } catch (e) {
    res.status(401).send({ error: 'Invalid token' });
  }
};

module.exports = auth;
