const { Category } = require('../models');

const createCategory = async (category) => {
  try {
    const alreadyExist = await Category.findOne({ where: { name: category.name } });
    if (alreadyExist) {
      return { type: 'CATEGORY_ALREADY_REGISTERED', message: 'Category already exists' };
    }

    const newCategorie = await Category.create(category);

    return { type: null, message: newCategorie.dataValues };
  } catch (err) {
    return { type: 'INTERNAL_ERROR', message: err.message };
  }
};

const getCategories = async () => {
  try {
    const categories = await Category.findAll({ order: [['id', 'ASC']] });
    if (!categories.length) return { type: null, message: 'table categories is empty' };

    return { type: null, message: categories };
  } catch (err) {
    return { type: 'INTERNAL_ERROR', message: err.message };
  }
};

module.exports = {
  createCategory,
  getCategories,
};