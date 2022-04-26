import "./App.css";
import { words } from "./words";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Tooltip, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  tooltip: {
    fontSize: "1em",
  },
});

const shuffledIndex = () => {
  let arr = [];
  for (let i = 0; i < words.length; i++) {
    if (words[i][0] === "新規") arr.push(i);
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
};

const index = shuffledIndex();

const App = () => {
  const classes = useStyles();

  const [count, setCount] = useState(0);
  const [isAnswerShow, setIsAnswerShow] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState<number[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<number[]>([]);

  const keyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const key = e.code;
    if (key === "Space") {
    }
  };

  return (
    <div className="App" onKeyDown={keyDownHandler}>
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
                ((correctAnswers.length + wrongAnswers.length) / words.length) *
                  100 *
                  10
              ) / 10}
          % ({correctAnswers.length + wrongAnswers.length} &thinsp;/ &thinsp;
          {words.length})
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
        <h3 className="category">{words[index[count]][0]}</h3>
        <h1 className="quiz">{words[index[count]][1]}</h1>
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
                  setWrongAnswers([index[count], ...wrongAnswers]);
                  if (count + 1 < words.length) {
                    setCount(count + 1);
                  } else {
                    setCount(0);
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
                  setCorrectAnswers([index[count], ...correctAnswers]);
                  if (count + 1 < words.length) {
                    setCount(count + 1);
                  } else {
                    setCount(0);
                  }
                }}
              />
            </div>

            <h4 className="answer">{words[index[count]][2]}</h4>
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
