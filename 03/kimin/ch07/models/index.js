'use strict';

const Sequelize = require('sequelize');

const User = require('./user');
const Post = require('./post');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Post = Post;

// 각 모델의 static init() 호출
User.init(sequelize);
Post.init(sequelize);

// 테이블 관계 연결
User.associate(db);
Post.associate(db);

module.exports = db;
