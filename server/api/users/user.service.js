const pool = require("../../config/database");

module.exports = {
  register: (data, callback) => {
    console.log("Registration Data:", data);
    pool.query(
      `INSERT INTO registration (user_name, user_email, user_password) VALUES (?, ?, ?)`,
      [data.userName, data.email, data.password],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },

  profile: (data, callback) => {
    console.log("Profile Data:", data);
    pool.query(
      `INSERT INTO profile (user_id, first_name, last_name) VALUES (?, ?, ?)`,
      [data.userId, data.firstName, data.lastName],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },

  userById: (id, callback) => {
    pool.query(
      `SELECT registration.user_id, user_name, user_email, first_name, last_name FROM registration LEFT JOIN profile ON registration.user_id = profile.user_id WHERE registration.user_id = ?`,
      [id],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result[0]);
      }
    );
  },

  userById1: (id, callback) => {
    pool.query(
      `SELECT registration.user_id, user_name, user_email, question, question_description, post_id FROM registration LEFT JOIN question ON registration.user_id = question.user_id WHERE registration.user_id = ?`,
      [id],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },



  userAllInfo: (callback) => {
    pool.query(
      `SELECT registration.user_id, user_name, user_email, question_id, question, question_description, post_id, timestamp FROM registration LEFT JOIN question ON registration.user_id = question.user_id ORDER BY timestamp DESC`,
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },

  getUserByEmail: (email, callback) => {
    pool.query(
      `SELECT r.*, p.profile_picture FROM registration r
       LEFT JOIN profile p ON r.user_id = p.user_id
       WHERE r.user_email = ?`,
      [email],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result[0]);
      }
    );
  },
  

  getAllUsers: (callback) => {
    pool.query(
      `SELECT user_id, user_name, user_email FROM registration`,
      [],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },
};
