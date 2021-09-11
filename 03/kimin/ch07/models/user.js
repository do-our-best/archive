'use strict';

const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      age: {
        type: Sequelize.INTEGER.UNSIGNED,
      },
      info: {
        type: Sequelize.TEXT,
      },
      is_admin: {
        type: Sequelize.TINYINT,
        defaultValue: 0,
      },
    }, {
      sequelize,
      modelName: 'User',
      underscored: true,
      timestamps: true,
      paranoid: true, // deleted_at
    });
  }
  static associate(db) {
    User.hasMany(db.Post, {
      foreignKey: 'user_id',
      sourceKey: 'id',
    });
  }
}