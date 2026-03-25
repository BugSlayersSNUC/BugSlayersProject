const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  uid: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
    comment: 'Firebase UID — links a Firebase Auth user to this DB row',
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  group_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  points: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
}, {
  tableName: 'Users',
  timestamps: false,
});

module.exports = User;
