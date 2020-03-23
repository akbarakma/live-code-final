const router = require('express').Router();
const UserController = require('../controllers/UserController');
const authentication = require('../middlewares/authentication');
const CountryController = require('../controllers/CountryController');
const ReportController = require('../controllers/ReportController');
const authorization = require('../middlewares/auhtorization');

router.post('/login', UserController.login);
router.use(authentication);
router.get('/countries', CountryController.getAllData);
router.get('/reports', ReportController.getReport);
router.post('/reports', ReportController.postReport);
router.delete('/reports/:id', authorization, ReportController.deleteReport);

module.exports = router;