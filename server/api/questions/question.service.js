const pool = require("../../config/database");

module.exports = {
  questionAsked: (data, callback) => {
    console.log("Question Data:", data);

    pool.query(
      `INSERT INTO question (question, question_description, post_id, user_id, timestamp) VALUES (?, ?, ?, ?, ?)`,
      [
        data.question,
        data.question_description,
        data.post_id,
        data.user_id,
        data.timestamp,
      ],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },

  getUserIDByEmail: (email, callback) => {
    console.log(email);
    pool.query(
      "SELECT * FROM registration WHERE user_email = ?",
      [email],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        if (result.length === 0) {
          return callback(null, null); // User not found
        }
        return callback(null, result[0].user_id);
      }
    );
  },
};
