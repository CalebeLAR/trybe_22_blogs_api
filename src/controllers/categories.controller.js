const categoriesService = require('../services/categories.service');
const mapErros = require('./mapError');
const { validateCategory } = require('./validations/categories.schema.validation');

const createCategory = async (req, res) => {
    try {
      const category = req.body;
 
      const error = validateCategory(category);
      if (error.type) return res.status(mapErros(error.type)).json({ message: error.message });

      const { type, message } = await categoriesService.createCategory(category);
      if (type) return res.status(mapErros(type)).json({ message });

      res.status(201).json(message);
    } catch (err) {
      res.status(400).json(err.message);
    }
};

module.exports = {
  createCategory,
};