const errorHandler = (err, req, res, next) => {
  if (err.name === 'BadRequestError') {
    res.status(400).json({
      errors: [err.message],
      message: 'Bad Request Error, code: 400'
    })
  } else if (err.name === 'JsonWebTokenError') {
    res.status(403).json({
      errors: ['You are forbidden to do that'],
      message: 'Forbidden Error, code: 403'
    })
  } else if (err.name === 'NotFoundError') {
    res.status(404).json({
      errors: [err.message],
      message: 'Not Found Error, code: 404'
    })
  } else if (err.name === 'SequelizeValidationError') {
    let msg = [];
    err.errors.forEach(x => {
      msg.push(x.message);
    })
    res.status(400).json({
      errors: msg,
      message: 'Bad Request Error, code: 400'
    })
  }
  else {
    console.log(err);
    res.status(500).json({
      errors: ['Internal Server Error'],
      message: '500, Internal Server Error'
    })
  }
};

module.exports = errorHandler;