const { Report } = require('../models');
const createError = require('../helpers/createError');

const authorization = async (req, res, next) => {
  try {
    const UserId = Number(req.UserData.id);
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      throw createError(400, 'Params must be a number');
    }
    const reportData = await Report.findOne({ where: { id } });
    if (!reportData) {
      throw createError(404, 'Error not Found');
    }
    if (reportData.UserId !== UserId) {
      throw createError(403, 'You are forbidden to do that');
    }
    req.reports = reportData.dataValues;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authorization;