const sequelize = require('../config/database');

const User = require('./User');
const Group = require('./Group');
const Donation = require('./Donation');
const Community = require('./Community');
const Comment = require('./Comment');

// Define Associations

// User -> Group (Group - A foreign key to group id in groups table)
Group.hasMany(User, { foreignKey: 'group_id' });
User.belongsTo(Group, { foreignKey: 'group_id' });

// Donation -> User (User id - foreign key to user id in users)
User.hasMany(Donation, { foreignKey: 'user_id' });
Donation.belongsTo(User, { foreignKey: 'user_id' });

// Community -> User (User - foreign key to user id)
User.hasMany(Community, { foreignKey: 'user_id' });
Community.belongsTo(User, { foreignKey: 'user_id' });

// Comment -> User (User - foreign key to user id)
User.hasMany(Comment, { foreignKey: 'user_id' });
Comment.belongsTo(User, { foreignKey: 'user_id' });

// Comment -> Community
Community.hasMany(Comment, { foreignKey: 'community_id' });
Comment.belongsTo(Community, { foreignKey: 'community_id' });

module.exports = {
  sequelize,
  User,
  Group,
  Donation,
  Community,
  Comment,
};
