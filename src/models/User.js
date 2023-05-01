/**
 * 
 * @param {import('sequelize').Sequelize} Sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 */

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    displayName: {
      allowNull: false,
      // field: 'display_name',
      type: DataTypes.STRING,
    },
    email: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    image: {
      allowNull: false,
      type: DataTypes.STRING,
    }
  },{
    tableName: 'users',
    timestamps: false,
    underscored: true,
  });

  // User.associate = (model) => {
  //   User.hasMany(model.BlogPosts, {
  //     foreignKey: 'user_id',
  //     as: 'blogPosts'
  //   });
  // }

  return User;
}