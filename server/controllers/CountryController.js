const { Country } = require('../models');

class CountryController {
  static async getAllData (req, res, next) {
    try {
      const countries = await Country.findAll({ attributes: ['id', 'name', 'cases', 'deaths', 'recovered'] });
      res.status(200).json(countries);
    } catch (err) {
      next(err);
    }
    
  }
};

module.exports = CountryController;