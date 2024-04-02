'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcrypt')
const { SALT_ROUND } = require('../config/server-config');
const serverConfig = require('../config/server-config');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Role, {through: 'User_Roles', as: 'role'});
    }
  }
  User.init({
    email:{ 
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: { 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8,50]
      }
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(function encrypt(user) {
    const encryptedPassword = bcrypt.hashSync(user.password, +serverConfig.SALT_ROUND);
    user.password = encryptedPassword;

  });
  return User;
}; 