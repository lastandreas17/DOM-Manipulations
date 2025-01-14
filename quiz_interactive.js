const questions = [
  {
    question: "What is the output of 2 + '2' in JavaScript?",
    options: ["22", "4", "NaN", "Error"],
    answer: 0, // Correct answer is the index of "22"
  },
  {
    question: "Which keyword declares a constant variable?",
    options: ["let", "const", "var", "final"],
    answer: 1, // Correct answer is the index of "const"
  },
  {
    question: "What is the capital of Indonesia?",
    options: ["Yogyakarta", "Jakarta", "Bekasi", "Bandung"],
    answer: 1, // Correct answer is the index of "Jakarta"
  },
];

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;

// Elements
const quizContainer = document.querySelector("#quiz-container");
const nextButton = document.querySelector("#next");
const resultEl = document.querySelector("#result");
const timerContainer = document.querySelector("#timer");

let timer;
let timeLeft = 10;

// Load Question
function loadQuestion() {
  const questionData = questions[currentQuestionIndex];

  quizContainer.innerHTML = "";
  timeLeft = 10;
  updateTimer();

  const questionElement = document.createElement("h2");
  questionElement.textContent = questionData.question;
  quizContainer.appendChild(questionElement);

  questionData.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.addEventListener("click", () => checkAnswer(index, button));
    quizContainer.appendChild(button);
  });

  clearInterval(timer);
  timer = setInterval(countDown, 1000);
}

// Timer Functions
function countDown() {
  if (timeLeft > 0) {
    timeLeft--;
    updateTimer();
  } else {
    clearInterval(timer);
    nextQuestion();
  }
}

function updateTimer() {
  timerContainer.textContent = `Time Left: ${timeLeft} seconds`;
}

// Check Answer
function checkAnswer(selectedIndex, button) {
  const questionData = questions[currentQuestionIndex];

  clearInterval(timer);

  // Disable all buttons after selection
  Array.from(quizContainer.querySelectorAll("button")).forEach(btn => btn.disabled = true);

  if (selectedIndex === questionData.answer) {
    button.style.backgroundColor = "green";
    score += 1;
  } else {
    button.style.backgroundColor = "red";
    const correctButton = Array.from(quizContainer.querySelectorAll("button"))[questionData.answer];
    correctButton.style.backgroundColor = "green";
  }

  nextButton.disabled = false;
}

// Load Next Question
function nextQuestion() {
  currentQuestionIndex++;
  nextButton.disabled = true;

  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

// Show Final Result
function showResult() {
  quizContainer.innerHTML = `<h2>Quiz Completed!</h2><p>Your score is: ${score} / ${questions.length}</p>`;
  timerContainer.textContent = "";
}

// Initialize Quiz
nextButton.addEventListener("click", nextQuestion);
loadQuestion();
