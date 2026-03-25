const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Group = sequelize.define('Group', {
  group_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  group_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'Groups',
  timestamps: false,
});

module.exports = Group;
