const { Report, Country } = require('../models');
const createError = require('../helpers/createError');

class ReportController {
  static async getReport (req, res, next) {
    try {
      const UserId = req.UserData.id;
      const reports = await Report.findAll({ where: { UserId }, attributes: ['cases', 'id'], include: [{ model: Country }] });
      res.status(200).json(reports);
    } catch (err) {
      next(err);
    }
  }
  static async postReport (req, res, next) {
    try {
      const UserId = req.UserData.id;
      const { cases, CountryId } = req.body;
      if (!Number.isInteger(Number(cases))) {
        throw createError(400, 'Cases must be integer');
      } else if (!Number.isInteger(Number(CountryId))) {
        throw createError(400, 'CountryId must be integer');
      }
      const countryData = await Country.findOne({ where: { id: CountryId } });
      if (!countryData) {
        throw createError(404, 'Error not Found');
      }
      const casesCount = countryData.cases += Number(cases);
      await Country.update({ cases: casesCount },{ where: { id: CountryId } });
      const obj = { cases, UserId, CountryId };
      const createData = await Report.create(obj);
      res.status(201).json(createData);
    } catch (err) {
      next(err);
    }
  }
  static async deleteReport (req, res, next) {
    try {
      const CountryId = req.reports.cases;
      const countryData = await Country.findOne({ where: { id: CountryId } });
      if (!countryData) {
        throw createError(404, 'Error not Found');
      }
      const casesCount = countryData.cases -= Number(req.reports.cases);
      await Country.update({ cases: casesCount },{ where: { id: req.reports.CountryId } });
      const id = Number(req.params.id);
      await Report.destroy({ where: { id } });
      res.status(200).json({
        country: countryData,
        report: 'Successfully delete'
      });
    } catch (err) {
      next(err);
    }
  }
};

module.exports = ReportController;