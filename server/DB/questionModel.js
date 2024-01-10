const db = require("./mysql_pool");

const getAllQuestions = () => {
  return db.execute(`
   SELECT * FROM questionare.questions;
     `);
};
const getAnswersOptions = (answer_id) => {
  return db.execute(
    `
        SELECT answer_value, answer_id
        FROM questionare.answers_type
        where answer_id = ?
            `,
    [answer_id]
  );
};
const insertAnswer = (question_id, answered_value) => {
  return db.execute(
    `
        insert into results (question_id,answered_value)
        values (?,?);
        `,
    [question_id, answered_value]
  );
};
const addQuestion = (questionVal, answerType, rightAnswer) => {
  return db.execute(
    `
        insert into questions (question,answer_type,right_answer)
        values (?,?,?);
        `,
    [questionVal, answerType, rightAnswer]
  );
};
const rightAnswer = (q_id) => {
  return db.execute(
    `
        SELECT right_answer
        FROM questionare.questions
        where right_answer = ?
        `,
    [q_id]
  );
};
const getVotes = (ansered_value) => {
  return db.execute(
    `
    SELECT 
    count(if(ansered_value = ?,1,null)) as count
    FROM questionare.results;
    `,
    [ansered_value]
  );
};
const countResults = (question_id, answered_value) => {
  console.log(question_id, answered_value);
  return db.execute(
    `
    SELECT 
    count(if( question_id= ? and answered_value = ?,1,null)) as count
    FROM questionare.results
    ;
    `,
    [question_id, answered_value]
  );
};

module.exports.getAllQuestions = getAllQuestions;
module.exports.getVotes = getVotes;
module.exports.rightAnswer = rightAnswer;
module.exports.addQuestion = addQuestion;
module.exports.getAnswersOptions = getAnswersOptions;
module.exports.insertAnswer = insertAnswer;
module.exports.countResults = countResults;
