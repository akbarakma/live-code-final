const { User } = require('../models');
const createError = require('../helpers/createError');
const { generateToken } = require('../helpers/jwt');

class UserController {
  static async login (req, res, next) {
    try {
      const { username, password } = req.body;
      const userRegistered = await User.findOne({ where: { username } });
      if (!userRegistered) {
        throw createError(400, 'Wrong Email/Password');
      }
      if (password !== userRegistered.password) {
        throw createError(400, 'Wrong Email/Password');
      }
      const token = generateToken({ id: userRegistered.id });
      const obj = {
        token,
        id: userRegistered.id,
        username: userRegistered.username
      };
      res.status(200).json(obj);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;