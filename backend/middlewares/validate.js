const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (error) {
    // Zod'un fırlattığı karmaşık hatayı sadeleştirip kullanıcıya dönüyoruz
    return res.status(400).json({
      status: 'fail',
      errors: error.errors.map(err => err.message)
    });
  }
};

module.exports = validate;