const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Donation = sequelize.define('Donation', {
  donation_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    // foreign key to users
    allowNull: false,
  },
  place: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  time: {
    type: DataTypes.DATE, // Date time
    allowNull: false,
  },
  points: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'Donations',
  timestamps: false,
});

module.exports = Donation;
