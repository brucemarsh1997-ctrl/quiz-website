const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;

const quizData = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Rome", correct: false }
        ]
    },
    {
        question: "Which language runs in a web browser?",
        answers: [
            { text: "Java", correct: false },
            { text: "C", correct: false },
            { text: "Python", correct: false },
            { text: "JavaScript", correct: true }
        ]
    }
];

function startQuiz() {
    currentQuestionIndex = 0;
    showQuestion(quizData[currentQuestionIndex]);
}

function showQuestion(data) {
    questionElement.innerText = data.question;
    answerButtonsElement.innerHTML = ''; // Clear old buttons
    nextButton.classList.add('hide');

    data.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(button, answer.correct));
        answerButtonsElement.appendChild(button);
    });
}

function selectAnswer(selectedBtn, isCorrect) {
    // Disable all buttons after selection
    const allButtons = answerButtonsElement.querySelectorAll('.btn');
    allButtons.forEach(btn => btn.disabled = true);

    if (isCorrect) {
        selectedBtn.classList.add('correct');
    } else {
        selectedBtn.classList.add('wrong');
        // Optional: Highlight the correct one so the user learns
        findCorrectButton().classList.add('correct');
    }

    nextButton.classList.remove('hide');
}

function findCorrectButton() {
    const buttons = answerButtonsElement.querySelectorAll('.btn');
    const currentAnswers = quizData[currentQuestionIndex].answers;
    let correctIndex = currentAnswers.findIndex(a => a.correct);
    return buttons[correctIndex];
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        showQuestion(quizData[currentQuestionIndex]);
    } else {
        questionElement.innerText = "Quiz Finished!";
        answerButtonsElement.innerHTML = '';
        nextButton.innerText = "Restart";
        nextButton.onclick = () => location.reload();
    }
});

startQuiz();