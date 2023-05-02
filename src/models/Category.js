/**
 * 
 * @param {import('sequelize').Sequelize} Sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 */

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    name: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING,
    }
  },{
    tableName: 'categories',
    timestamps: false,
  });

  // Category.associate = (model) => {
  //   Category.hasMany(model.BlogPosts, {
  //     foreignKey: 'category_id',
  //     as: 'blogPosts'
  //   });
  // }

  return Category;
}