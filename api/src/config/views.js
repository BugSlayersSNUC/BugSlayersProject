const sequelize = require('./database');

const syncReportingViews = async () => {
  await sequelize.query('DROP VIEW IF EXISTS UserPoints');
  await sequelize.query(`
    CREATE VIEW UserPoints AS
    SELECT
      u.user_id,
      COALESCE(SUM(d.points), 0) AS total_points
    FROM Users u
    LEFT JOIN Donations d ON d.user_id = u.user_id
    GROUP BY u.user_id
  `);

  await sequelize.query('DROP VIEW IF EXISTS GroupTotal');
  await sequelize.query(`
    CREATE VIEW GroupTotal AS
    SELECT
      g.group_id,
      g.group_name,
      COUNT(u.user_id) AS member_count,
      COALESCE(SUM(up.total_points), 0) AS total_points
    FROM Groups g
    LEFT JOIN Users u ON u.group_id = g.group_id
    LEFT JOIN UserPoints up ON up.user_id = u.user_id
    GROUP BY g.group_id, g.group_name
  `);

  await sequelize.query('DROP VIEW IF EXISTS CommunityWithComments');
  await sequelize.query(`
    CREATE VIEW CommunityWithComments AS
    SELECT
      c.community_id,
      c.title,
      c.description,
      c.user_id,
      c.upvotes,
      c.date,
      cm.comment_id,
      cm.user_id AS comment_user_id,
      cm.text AS comment_text,
      cm.date AS comment_date
    FROM Communities c
    LEFT JOIN Comments cm ON cm.community_id = c.community_id
  `);
};

module.exports = { syncReportingViews };
