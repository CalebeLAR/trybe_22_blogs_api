/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 */

module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      reference: {
        model: 'blog_posts',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onDelete: 'CASCADE',
      primaryKey: true,  
    },
    categoryId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      reference: {
        model: 'categories',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onDelete: 'CASCADE',
      primaryKey: true,
    }
  },{
    tableName: 'posts_categories',
    underscored: true,
    timestamps: false
  });

  PostCategory.associate = ({ BlogPost, Category }) => {
    BlogPost.belongsToMany( Category, {
      foreignKey: 'categoryId',
      otherKey: 'postId',
      as: 'categories',
      through: PostCategory
    });

    Category.belongsToMany( BlogPost, {
      foreignKey: 'postId',
      otherKey: 'categoryId',
      as: 'blogPosts',
      through: PostCategory
    })
  }

  return PostCategory;
}