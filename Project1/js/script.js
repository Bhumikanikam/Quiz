// Quiz data
const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        correct: 2 // Index of the correct answer (0-based)
    },
    {
        question: "Which programming language is known as the backbone of web development?",
        options: ["Python", "C++", "JavaScript", "Ruby"],
        correct: 2
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Jupiter", "Saturn", "Mars"],
        correct: 1
    },
    {
        question: "Who wrote 'Pride and Prejudice'?",
        options: ["Charles Dickens", "Jane Austen", "Mark Twain", "J.K. Rowling"],
        correct: 1
    },
    {
        question: "What is the square root of 64?",
        options: ["6", "8", "10", "12"],
        correct: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;

// DOM Elements
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");

// Load a question
function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;

    // Clear previous options
    optionsEl.innerHTML = "";

    // Load new options
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option");
        button.dataset.index = index;
        optionsEl.appendChild(button);

        // Add click event to check the answer
        button.addEventListener("click", selectOption);
    });
}

// Handle option selection
function selectOption(e) {
    const selectedBtn = e.target;
    const selectedIndex = parseInt(selectedBtn.dataset.index);
    const correctIndex = quizData[currentQuestionIndex].correct;

    // Disable all options
    Array.from(optionsEl.children).forEach((button) => {
        button.disabled = true;
        if (parseInt(button.dataset.index) === correctIndex) {
            button.classList.add("correct");
        } else {
            button.classList.add("wrong");
        }
    });

    // Update score
    if (selectedIndex === correctIndex) {
        score++;
    }
}

// Load the next question
function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        // Display the final score
        questionEl.textContent = `Quiz Completed! Your score is ${score} out of ${quizData.length}.`;
        optionsEl.innerHTML = "";
        nextBtn.style.display = "none";
    }
}

// Event Listener for Next Button
nextBtn.addEventListener("click", nextQuestion);

// Initial Load
loadQuestion();
