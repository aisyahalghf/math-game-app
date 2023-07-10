import { useCallback, useEffect, useState } from "react";
import BackgroundPage from "../componen/BackgroundPage";
import Navbar from "../componen/Navbar";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import generateQuestion from "../componen/GenerateQuestions";
const MAX_QUESTION = 10;
const operands = ["+", "-", "x", ":"];

const QuestionPage = () => {
  const [question, setQuestion] = useState({
    numb1: 0,
    numb2: 0,
    op: "",
    answer: 0,
  });
  const [answer, setAnswer] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isCorrectAnswer, setIsCorrectsAnswer] = useState({
    isCorrect: "",
    rightAnswer: "",
  });
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  // const generateQuestion = useCallback(() => {
  //   let numb1 = Math.round(Math.random() * 10);
  //   let numb2 = Math.round(Math.random() * 10);
  //   const op = Math.round(Math.random() * 3);
  //   let result = 0;

  //   switch (operands[op]) {
  //     case "+":
  //       result = numb1 + numb2;
  //       break;
  //     case "-":
  //       if (numb1 < numb2) {
  //         let temp = numb1;
  //         numb1 = numb2;
  //         numb2 = temp;
  //       }
  //       result = numb1 - numb2;
  //       break;
  //     case "x":
  //       result = numb1 * numb2;
  //       break;
  //     case ":":
  //       result = numb1 / numb2;
  //       do {
  //         numb1 = Math.round(Math.random() * 10);
  //         numb2 = Math.round(Math.random() * 10);
  //         result = numb1 / numb2;
  //       } while (Math.abs(Math.floor(result)) !== result || numb2 === 0);

  //       break;
  //   }

  //   setQuestion({
  //     numb1,
  //     numb2,
  //     op: operands[op],
  //     answer: result,
  //   });
  // }, []);

  useEffect(() => {
    const userScore = answers.filter((val) => val === true);
    setScore(userScore.length);
    if (answers.length === MAX_QUESTION) {
      Swal.fire({
        title: "Good Job!",
        text: `you got score ${userScore.length}/10`,
        icon: "success",
        showCancelButton: true,
        cancelButtonText: "See Leader Board",
        confirmButtonColor: "#173B3A",
        cancelButtonColor: "#d33",
        confirmButtonText: "Retry Quiz!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/quiz");
          setAnswers([]);
          setScore(0);
          setIsCorrectsAnswer({});
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          navigate("/");
        }
      });
    } else {
      let result = generateQuestion();
      setQuestion({
        numb1: result.numb1,
        numb2: result.numb2,
        op: result.op,
        answer: result.answer,
      });
    }
  }, [answers.length, MAX_QUESTION, question.answer]);

  const handleAnswerQuestion = (e) => {
    setAnswer(Number(e.target.value));
  };

  const handleAnswersQuestionList = () => {
    if (Number(answer) === question.answer) {
      setAnswers([...answers, true]);
      setIsCorrectsAnswer({ isCorrect: true });
    } else {
      setAnswers([...answers, false]);
      setIsCorrectsAnswer({ isCorrect: false, rightAnswer: question.answer });
    }
    setAnswer(0);
  };

  return (
    <div className=" h-screen md:h-screen">
      <Navbar score={score} />
      <section className="relative ">
        <BackgroundPage />
        <div className="relative container mx-auto text-[#D9D9D9] flex justify-center  items-center h-screen ">
          <div className=" border-2 shadow shadow-slate-200 py-10 px-5 md:px-20 bg-transparent rounded-lg flex flex-col gap-10 w-full md:w-[500px] xl:w-[700px]   ">
            <div className=" text-2xl ">
              {answers.length + 1} of {MAX_QUESTION} Questions.
            </div>
            <p className=" text-3xl font-bold ">
              Please answers this question :
            </p>

            <div className=" flex justify-center gap-5">
              <p className=" text-5xl font-extrabold  ">
                {question.numb1} {question.op} {question.numb2} =
              </p>
              <input
                value={answer}
                className="border rounded-md bg-transparent w-[80px] text-4xl font-extrabold text-center"
                onChange={handleAnswerQuestion}
              />
            </div>
            <div className=" flex justify-center ">
              <button
                className=" text-2xl border rounded-lg w-fit px-5 py-1 hover:bg-[#D9D9D9] hover:text-[#173B3A] "
                onClick={handleAnswersQuestionList}
              >
                submit
              </button>
            </div>

            {isCorrectAnswer.isCorrect === true ? (
              <p className=" text-sm italic flex justify-end text-green-200 ">
                Your answers is correct
              </p>
            ) : isCorrectAnswer.isCorrect === false ? (
              <div className="flex flex-col  items-end text-sm italic">
                <p className="   text-red-400 ">
                  Your answers is incorrect <br />
                </p>
                <p className="text-green-200">{`The correct answers is ${isCorrectAnswer.rightAnswer}`}</p>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
};

export default QuestionPage;
