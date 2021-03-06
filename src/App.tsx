import "./App.css";
import { words } from "./words";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Tooltip, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  tooltip: {
    fontSize: "1em",
  },
});

const shuffledIndex = (genre: string): any => {
  let arr = [];
  for (let i = 0; i < words.length; i++) {
    if (genre === "なし" || words[i][0] === genre) arr.push(i);
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
};

const App = () => {
  const classes = useStyles();
  const genres = [
    "なし",
    "新規",
    "CRM",
    "ECモール",
    "SNS",
    "デザイン",
    "ビジネス",
  ];

  const [count, setCount] = useState(0);
  const [isAnswerShow, setIsAnswerShow] = useState(false);
  const [genre, setGenre] = useState("なし");
  const [correctAnswers, setCorrectAnswers] = useState<number[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<number[]>([]);
  const [quiz, setQuiz] = useState<any>([]);

  const resetQuiz = () => {
    setCount(0);
    alert(
      "正解率 " +
        Math.round(
          (correctAnswers.length /
            (correctAnswers.length + wrongAnswers.length)) *
            100 *
            10
        ) /
          10 +
        "%"
    );
  };

  useEffect(() => {
    setQuiz(shuffledIndex(genre));
    setCorrectAnswers([]);
    setWrongAnswers([]);
    setIsAnswerShow(false);
  }, [genre]);

  return quiz.length === 0 ? (
    <></>
  ) : (
    <div className="App">
      <div className="left">
        {wrongAnswers.map((wrongAnswer) => (
          <Tooltip
            className="pointer"
            classes={{ tooltip: classes.tooltip }}
            title={words[wrongAnswer][2]}
            placement="right-end"
          >
            <p className="tooltip">{words[wrongAnswer][1]}</p>
          </Tooltip>
        ))}
      </div>
      <div className="center">
        <div className="correct-rate">
          進捗率:
          {correctAnswers.length + wrongAnswers.length === 0
            ? 0
            : Math.round(
                ((correctAnswers.length + wrongAnswers.length) / quiz.length) *
                  100 *
                  10
              ) / 10}
          % ({correctAnswers.length + wrongAnswers.length} &thinsp;/ &thinsp;
          {quiz.length})
          <br />
          正解率:
          {correctAnswers.length + wrongAnswers.length === 0
            ? 0
            : Math.round(
                (correctAnswers.length /
                  (correctAnswers.length + wrongAnswers.length)) *
                  100 *
                  10
              ) / 10}
          % ({correctAnswers.length} / &thinsp;
          {correctAnswers.length + wrongAnswers.length})
        </div>
        <div className="genres">
          {genres.map((g) => (
            <div
              className={`genre ${g === genre && "current"}`}
              onClick={() => setGenre(g)}
            >
              {g}
            </div>
          ))}
        </div>
        <h1 className="quiz">{words[quiz[count]][1]}</h1>
        {isAnswerShow ? (
          <>
            <div className="result">
              <FontAwesomeIcon
                className="pointer"
                icon={faXmark}
                color="red"
                size="3x"
                onClick={() => {
                  setIsAnswerShow(false);
                  setWrongAnswers([quiz[count], ...wrongAnswers]);
                  if (count + 1 < quiz.length) {
                    setCount(count + 1);
                  } else {
                    resetQuiz();
                  }
                }}
              />
              <FontAwesomeIcon
                className="pointer"
                icon={faCheck}
                color="green"
                size="3x"
                onClick={() => {
                  setIsAnswerShow(false);
                  setCorrectAnswers([quiz[count], ...correctAnswers]);
                  if (count + 1 < quiz.length) {
                    setCount(count + 1);
                  } else {
                    resetQuiz();
                  }
                }}
              />
            </div>

            <h4 className="answer">{words[quiz[count]][2]}</h4>
          </>
        ) : (
          <div className="button" onClick={() => setIsAnswerShow(true)}>
            答えを見る
          </div>
        )}
      </div>
      <div className="right">
        {correctAnswers.map((correctAnswer) => (
          <Tooltip
            className="pointer"
            classes={{ tooltip: classes.tooltip }}
            title={words[correctAnswer][2]}
            placement="left-end"
          >
            <p className="tooltip">{words[correctAnswer][1]}</p>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};

export default App;
