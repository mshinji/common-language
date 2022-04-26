import "./App.css";
import { words } from "./words";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

const shuffledIndex = () => {
  let arr = [];
  for (let i = 0; i < words.length; i++) {
    arr.push(i);
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
};

const index = shuffledIndex();

const App = () => {
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
          <p>{words[wrongAnswer][1]}</p>
        ))}
      </div>
      <div className="center">
        <h4>
          正解率:{" "}
          {correctAnswers.length + wrongAnswers.length === 0
            ? 0
            : Math.round(
                (correctAnswers.length /
                  (correctAnswers.length + wrongAnswers.length)) *
                  100 *
                  10
              ) / 10}
          %
        </h4>
        <h3 className="category">{words[index[count]][0]}</h3>
        <h1 className="quiz">{words[index[count]][1]}</h1>
        {isAnswerShow ? (
          <>
            <div className="result">
              <FontAwesomeIcon
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
          <p>{words[correctAnswer][1]}</p>
        ))}
      </div>
    </div>
  );
};

export default App;