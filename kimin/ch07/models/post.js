'use strict';

const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      body: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      hit: {
        type: Sequelize.INTEGER.UNSIGNED,
        defaultValue: 0,
      },
    }, {
      sequelize,
      modelName: 'Post',
      underscored: true,
      timestamps: true,
      paranoid: true,
    });
  }
  static associate(db) {
    Post.belongsTo(db.User, {
      foreignKey: 'user_id',
      targetKey: 'id',
    });
  }
}