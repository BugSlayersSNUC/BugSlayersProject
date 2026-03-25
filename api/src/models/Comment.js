const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Comment = sequelize.define('Comment', {
  comment_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false, // foreign key to users
  },
  community_id: {
    type: DataTypes.INTEGER,
    allowNull: false, // foreign key to communities
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE, // datetime
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'Comments',
  timestamps: false,
});

module.exports = Comment;
