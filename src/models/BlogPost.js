/**
 * 
 * @param {import('sequelize').Sequelize} Sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 */

module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', 
  {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    content: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    published: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updated: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.DATE,
    },
    userId: {
      // field: 'user_id',
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  },
    {
    tableName: 'blog_posts',
    timestamps: false,
    underscored: true,
  });

  BlogPost.associate = (model) => {
    BlogPost.belongsTo(model.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  }

  // BlogPost.associate = (model) => {
  //   BlogPost.hasMany(model.Category, {
  //     foreignKey: 'category_id',
  //     as: 'categories'
  //   });
  // }

  return BlogPost;
}