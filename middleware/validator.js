module.exports = (validate) => {
  return async (req, res, next) => {
    const error = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    next();
  };
};
