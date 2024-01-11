const questionService = require("../DB/questionModel");

const addQuestion = async (req, res) => {
  const { question_val, answer_type, right_answer } = req.body;
  if(!question_val || !answer_type) return
  try {
    const result = await questionService.addQuestion(
      question_val,
      answer_type,
      right_answer
    );

    res.status(201).json(result[0].insertId);
  } catch (error) {
    console.error(error);
  }
};
const getVotes = async (req, res) => {
  const { q_id, answer_id } = req.params;
  console.log(q_id, answer_id);
  try {
    const answersCount = await questionService.getVotes(q_id);
    const { count } = answersCount[0][0];
    const rightAnswerRes = await questionService.rightAnswer(answer_id);
    console.log(rightAnswerRes[0]);
    // const { right_answer } = rightAnswerRes[0][0];
    const resObj = { count, right_answer: null };
    res.status(200).send(resObj);
  } catch (error) {
    console.error(error);
  }
};
const insertAnswer =async(req, res)=>{
  const { question_id, answer_value } = req.body;
  console.log("question_id",question_id);
  try {
    const results = await questionService.insertAnswer(question_id?.toString(), answer_value?.toString())
    const count = await questionService.countResults(question_id?.toString(), answer_value?.toString())
    console.log("count",count[0]);
    res.status(201).json(count[0][0])
  } catch (error) {
    console.error(error);
  }
}
const getQuestions = async (req, res) => {
  try {
    const results = await questionService.getAllQuestions();
    let questions = results[0];
    let resArr = [];
    for (let i = 0; i < questions.length; i++) {
      const answerOptions = await questionService.getAnswersOptions(
        questions[i].answer_type
      );
      resArr.push({
        answerOptions: answerOptions[0].map((option) => ({
          answerValue: option.answer_value?.toString(),
          answerId: option.answer_id?.toString(),
        })),
        question: { ...questions[i] },
      });
    }
    await res.status(200).send(resArr);
  } catch (error) {
    console.error(error);
  }
};
const getAnswersTypes = async (req, res)=>{
  const results = await questionService.getAnswersTypes()
  const mapedRes = results[0].map((answer)=>answer.answer_id)
  let unique = [...new Set(mapedRes)];
  console.log(unique);
  res.status(200).json(unique)
}

module.exports.getQuestions = getQuestions;
module.exports.getVotes = getVotes;
module.exports.addQuestion = addQuestion;
module.exports.insertAnswer = insertAnswer;
module.exports.getAnswersTypes = getAnswersTypes;
