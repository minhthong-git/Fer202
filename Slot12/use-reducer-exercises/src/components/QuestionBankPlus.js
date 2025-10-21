import React, { useReducer, useEffect } from "react";
import { Button, Container, Card, ProgressBar } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const initialState = {
  questions: [
    {
      id: 1,
      question: "What is the capital of Australia?",
      options: ["Sydney", "Canberra", "Melbourne", "Perth"],
      answer: "Canberra",
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      id: 3,
      question: "What is the largest ocean on Earth?",
      options: [
        "Atlantic Ocean",
        "Indian Ocean",
        "Pacific Ocean",
        "Arctic Ocean",
      ],
      answer: "Pacific Ocean",
    },
  ],
  currentQuestion: 0,
  selectedOption: "",
  score: 0,
  showScore: false,
  feedback: "", // Thông báo đúng/sai
  timeLeft: 10, // 10 giây mỗi câu
  highScore: parseInt(localStorage.getItem("highScore")) || 0, // lưu điểm cao
};

function quizReducer(state, action) {
  switch (action.type) {
    case "SELECT_OPTION":
      return { ...state, selectedOption: action.payload };

    case "NEXT_QUESTION": {
      const currentQ = state.questions[state.currentQuestion];
      const isCorrect = state.selectedOption === currentQ.answer;

      const newScore = isCorrect ? state.score + 1 : state.score;
      const feedback = isCorrect
        ? "✅ Correct! 🎉"
        : `❌ Incorrect! The correct answer is ${currentQ.answer}.`;

      const next = state.currentQuestion + 1;
      const isEnd = next === state.questions.length;

      // cập nhật highScore khi kết thúc
      let updatedHighScore = state.highScore;
      if (isEnd && newScore > state.highScore) {
        localStorage.setItem("highScore", newScore);
        updatedHighScore = newScore;
      }

      return {
        ...state,
        score: newScore,
        currentQuestion: next,
        selectedOption: "",
        feedback,
        showScore: isEnd,
        timeLeft: 10,
        highScore: updatedHighScore,
      };
    }

    case "TICK":
      if (state.timeLeft <= 1) {
        // Hết giờ, tự qua câu tiếp
        const next = state.currentQuestion + 1;
        const isEnd = next === state.questions.length;
        return {
          ...state,
          feedback: "⏰ Time's up! Moving to next question.",
          currentQuestion: next,
          selectedOption: "",
          showScore: isEnd,
          timeLeft: 10,
        };
      }
      return { ...state, timeLeft: state.timeLeft - 1 };

    case "RESTART_QUIZ":
      return { ...initialState, highScore: state.highScore };

    default:
      return state;
  }
}

// Component chính
function QuestionBankPlus() {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const {
    questions,
    currentQuestion,
    selectedOption,
    score,
    showScore,
    feedback,
    timeLeft,
    highScore,
  } = state;

  // Bộ đếm ngược 10s mỗi câu
  useEffect(() => {
    if (showScore) return;
    const timer = setInterval(() => {
      dispatch({ type: "TICK" });
    }, 1000);
    return () => clearInterval(timer);
  }, [showScore, timeLeft]);

  const handleOptionSelect = (option) =>
    dispatch({ type: "SELECT_OPTION", payload: option });

  const handleNextQuestion = () => dispatch({ type: "NEXT_QUESTION" });
  const handleRestartQuiz = () => dispatch({ type: "RESTART_QUIZ" });

  // Tiến trình quiz
  const progress =
    ((currentQuestion + 1) / questions.length) * 100 > 100
      ? 100
      : ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Container className="mt-4">
      <Card className="p-4 shadow">
        {showScore ? (
          <div className="text-center">
            <h2>
              Your Score: {score} / {questions.length}
            </h2>
            <h4>🏆 High Score: {highScore}</h4>
            <Button variant="primary" onClick={handleRestartQuiz}>
              Restart Quiz
            </Button>
          </div>
        ) : (
          <div>
            <h4>
              Question {currentQuestion + 1}/{questions.length}
            </h4>
            <ProgressBar
              now={progress}
              className="mb-3"
              variant={progress < 50 ? "warning" : "success"}
            />

            <h5>{questions[currentQuestion].question}</h5>
            <p>
              ⏱ Time left:{" "}
              <span style={{ color: timeLeft <= 5 ? "red" : "green" }}>
                {timeLeft}s
              </span>
            </p>

            <div className="mt-3">
              {questions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  variant={
                    selectedOption === option
                      ? "success"
                      : "outline-secondary"
                  }
                  className="m-2"
                  onClick={() => handleOptionSelect(option)}
                >
                  {option}
                </Button>
              ))}
            </div>

            {/* Hiển thị phản hồi */}
            {feedback && (
              <div className="mt-3" style={{ fontSize: "18px" }}>
                {feedback.includes("Correct") ? (
                  <FaCheckCircle color="green" />
                ) : feedback.includes("Incorrect") ? (
                  <FaTimesCircle color="red" />
                ) : (
                  "⏰"
                )}{" "}
                {feedback}
              </div>
            )}

            <Button
              variant="primary"
              className="mt-3"
              disabled={!selectedOption}
              onClick={handleNextQuestion}
            >
              {currentQuestion === questions.length - 1
                ? "Finish Quiz"
                : "Next Question"}
            </Button>
          </div>
        )}
      </Card>
    </Container>
  );
}

export default QuestionBankPlus;
