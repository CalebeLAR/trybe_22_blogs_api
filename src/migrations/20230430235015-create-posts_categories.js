module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('posts_categories', {
      post_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        reference: {
          model: 'blog_posts',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true,  
      },
      category_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        reference: {
          model: 'categories',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true,
      },
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('posts_categories');
  }
};
