// === QUIZ LOGIC ===
const quizQuestions = [
  {
    question: "What is the main ingredient in pizza?",
    options: { a: "Cheese", b: "Rice", c: "Chocolate" },
    answer: "a"
  },
  {
    question: "Which of these is a common dessert?",
    options: { a: "Pasta", b: "Ice Cream", c: "Soup" },
    answer: "b"
  },
  {
    question: "What drink is often served with breakfast?",
    options: { a: "Coffee", b: "Soda", c: "Wine" },
    answer: "a"
  }
];

let currentQuestion = 0;
let score = 0;

function showQuestion() {
  const q = quizQuestions[currentQuestion];
  document.getElementById("question").textContent = q.question;
  
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
  
  for (const key in q.options) {
    const btn = document.createElement("button");
    btn.textContent = `${key}) ${q.options[key]}`;
    btn.onclick = () => checkAnswer(key);
    optionsDiv.appendChild(btn);
  }
}

function checkAnswer(selected) {
  const correct = quizQuestions[currentQuestion].answer;
  const result = document.getElementById("result");
  
  if (selected === correct) {
    score++;
    result.textContent = "Correct!";
    result.style.color = "green";
  } else {
    result.textContent = "Wrong!";
    result.style.color = "red";
  }

  currentQuestion++;
  
  setTimeout(() => {
    result.textContent = "";
    if (currentQuestion < quizQuestions.length) {
      showQuestion();
    } else {
      document.getElementById("question").textContent = "Quiz Completed!";
      document.getElementById("options").innerHTML = "";
      document.getElementById("score").textContent = `Your score: ${score} / ${quizQuestions.length}`;
    }
  }, 1000);
}

window.onload = () => {
  showQuestion();
  showImage();
};

// === IMAGE CAROUSEL ===
const images = [
  "images/dish1.jpg",
  "images/dish2.jpg",
  "images/dish3.jpg"
];

let index = 0;

function showImage() {
  document.getElementById("carouselImage").src = images[index];
}

function nextImage() {
  index = (index + 1) % images.length;
  showImage();
}

function prevImage() {
  index = (index - 1 + images.length) % images.length;
  showImage();
}

// === JOKE FETCH ===
function fetchJoke() {
  fetch("https://v2.jokeapi.dev/joke/Food?type=single")
    .then(res => res.json())
    .then(data => {
      document.getElementById("jokeDisplay").textContent = data.joke || getRandomFallbackJoke();
    })
    .catch(err => {
      document.getElementById("jokeDisplay").textContent = getRandomFallbackJoke();
    });
}

function getRandomFallbackJoke() {
  const jokes = [
    "Why did the tomato turn red? Because it saw the salad dressing!",
    "I'm on a seafood diet. I see food and I eat it.",
    "Why don’t eggs tell jokes? They’d crack each other up.",
    "What do you call cheese that isn't yours? Nacho cheese.",
    "Why did the cookie go to the hospital? Because it felt crummy."
  ];
  return jokes[Math.floor(Math.random() * jokes.length)];
}

