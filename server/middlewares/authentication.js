const { User } = require('../models');
const { verifyToken } = require('../helpers/jwt');
const createError = require('../helpers/createError');

const authentication = async (req, res, next) => {
  try {
    const { token } = req.headers;
    const decoded = verifyToken(token);
    const user = await User.findOne({ where: { id: decoded.id } });
    if (!user) {
      throw createError(403, 'You are forbidden to do that');
    }
    req.UserData = decoded;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authentication;