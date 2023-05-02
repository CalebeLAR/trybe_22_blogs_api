const { BlogPost, Category, PostCategory } = require('../models');

const valideCategoryIds = async (categoryIds) => {
  const categories = await Category.findAll({ attributes: ['id'] });
  const allCategoriesId = categories.map((category) => category.id);

  const isValid = categoryIds.every((id) => allCategoriesId.includes(id));
  return isValid;
};

const bulkInsert = (categoryIds, postId) => 
  categoryIds.map((categId) => ({ postId, categoryId: categId }));

const createBlogPost = async (blogPost, payload) => {
  try {
    const { title, content, categoryIds } = blogPost;
    const { id: userId } = payload;
    
    const isValid = await valideCategoryIds(categoryIds);
    if (!isValid) {
      return { type: 'CATEGORY_NOT_FOUND', message: 'one or more "categoryIds" not found' };
    }

    const newBlogPost = await BlogPost.create({ title, content, userId });
    const arrPosts = bulkInsert(categoryIds, newBlogPost.dataValues.id);
    await PostCategory.bulkCreate(arrPosts);
    
    return { type: false, message: newBlogPost.dataValues };
  } catch (err) {
    return { type: 'INTERNAL_ERROR', message: err.message };
  }
};

module.exports = {
  createBlogPost,
};