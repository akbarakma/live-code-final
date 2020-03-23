const { Report, Country } = require('../models');

class ReportController {
  static async getReport (req, res, next) {
    try {
      const UserId = req.UserData.id;
      const reports = await Report.findAll({ where: { UserId }, attributes: ['cases'], include: [{ model: Country }] });
      res.status(200).json(reports);
    } catch (err) {
      next(err);
    }
  }
  static async postReport (req, res, next) {
    try {
      const UserId = req.UserData.id;
      const { cases, CountryId } = req.body;
      const countryData = await Country.findOne({ where: { id: CountryId } });
      if (!countryData) {
        throw createError(404, 'Error not Found');
      }
      const casesCount = countryData.cases += cases;
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
      console.log(req.reports);
      const CountryId = req.reports.cases;
      const countryData = await Country.findOne({ where: { id: CountryId } });
      if (!countryData) {
        throw createError(404, 'Error not Found');
      }
      const casesCount = countryData.cases -= req.reports.cases;
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