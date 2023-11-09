const gridContainer = document.querySelector(".grid-container");
let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let score = 0;
let timerInterval;
let timeInSeconds = 0;
const maxScore = 10000;
const minTime = 120;
let highestScore = localStorage.getItem("highestScore") || 0;

function startTimer() {
  timerInterval = setInterval(function () {
    timeInSeconds++;
    updateTimerDisplay();
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function updateTimerDisplay() {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;

  const formattedTime = `${padZero(minutes)}:${padZero(seconds)}`;
  document.querySelector(".timer").textContent = formattedTime;
}

function padZero(number) {
  return number.toString().padStart(2, "0");
}

document.querySelector(".score").textContent = score;

fetch("https://raw.githubusercontent.com/MorganEJLA/json-files/main/cards.json")
  .then((res) => res.json())
  .then((data) => {
    cards = [...data, ...data];
    shuffleCards();
    generateCards();
  });

function shuffleCards() {
  let currentIndex = cards.length,
    randomIndex,
    temporaryValue;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  }
}

function generateCards() {
  for (let card of cards) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.setAttribute("data-name", card.name);
    cardElement.innerHTML = `
      <div class="front">
        <img class="front-image" src=${card.image} />
      </div>
      <div class="back"></div>
    `;
    gridContainer.appendChild(cardElement);
    cardElement.addEventListener("click", flipCard);
  }
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flipped");
  this.querySelector(".front").classList.add("show");

  if (!firstCard) {
    firstCard = this;
    if (!timerInterval) {
      startTimer();
    }
  } else {
    secondCard = this;
    lockBoard = true;

    checkForMatch();
  }
}

function checkForMatch() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;

  if (isMatch) {
    disableCards();
    score++;
    document.querySelector(".score").textContent = score;
    if (score === cards.length / 2) {
      gameWon();
    } else {
      resetBoard();
    }
  } else {
    setTimeout(() => {
      unflipCards();
    }, 500);
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    firstCard.querySelector(".front").classList.remove("show");
    secondCard.querySelector(".front").classList.remove("show");
    resetBoard();
  }, 500);
}

function calculateScore(timeInSeconds) {
  return Math.max(0, maxScore - (timeInSeconds - minTime) * 100);
}

function displayHighestScore() {
  const highestScoreSpan = document.querySelector(".highest-score");
  highestScoreSpan.textContent = highestScore || 0;
}

function resetBoard() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function gameWon() {
  stopTimer();

  const timeTaken = timeInSeconds;
  const finalScore = calculateScore(timeTaken);

  document.querySelector(".score").textContent = finalScore;

  if (finalScore > (highestScore || 0)) {
    highestScore = finalScore;
    localStorage.setItem("highestScore", highestScore);
  }
  displayHighestScore();
}

function restart() {
  resetBoard();
  shuffleCards();
  score = 0;
  document.querySelector(".score").textContent = score;

  // Stop the timer if it's running
  if (timerInterval) {
    stopTimer();
  }

  resetTimer();
  startTimer();

  gridContainer.innerHTML = "";
  generateCards();
}
function resetTimer() {
  stopTimer();
  timeInSeconds = 0;
  updateTimerDisplay();
}
// Initialize the highest score display
displayHighestScore();
