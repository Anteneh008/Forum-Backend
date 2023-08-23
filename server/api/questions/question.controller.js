const pool = require("../../config/database");
const {
  questionAsked,
  getUserIDByEmail,
  userById,
} = require("./question.service");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  insertQuestion: (req, res) => {
    const { question, question_description, email } = req.body;

    const post_id = uuidv4();
    console.table(req.body);
    // Validate the incoming data
    if (!question) {
      return res.status(400).json({ msg: "Not all fields have been provided" });
    }



    const currentTime = new Date();

 
    getUserIDByEmail(email, (err, user_id) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "Error fetching user_id" });
      }

      if (!user_id) {
        return res.status(404).json({ msg: "User not found" });
      }

      const questionData = {
        question,
        question_description,
        post_id,
        user_id,
        timestamp: currentTime, // Include the timestamp
      };

      // Insert the question into the database
      questionAsked(questionData, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ msg: "database connection err" });
        }
        return res.status(200).json({
          msg: "question added successfully",
          results,
        });
      });
    });
  },
};
