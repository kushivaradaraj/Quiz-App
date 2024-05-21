let questions = [
    {
        question: 'Which HTML tag is used to define an inline style?',
        choice1: '<script>',
        choice2: '<css>',
        choice3: '<style>',
        choice4: '<span>',
        answer: 3,
    },
    {
        question: 'Which property is used to change the text color in CSS?',
        choice1: 'text-color',
        choice2: 'font-color',
        choice3: 'text-style',
        choice4: 'color',
        answer: 4,
    },
    {
        question: 'Which of the following is the correct way to comment in HTML?',
        choice1: '// Comment',
        choice2: '<!-- Comment -->',
        choice3: '/* Comment */',
        choice4: '<! Comment>',
        answer: 2,
    },
    {
        question: 'Which HTML attribute is used to define inline styles?',
        choice1: 'style',
        choice2: 'class',
        choice3: 'font',
        choice4: 'styles',
        answer: 1,
    },
    {
        question: 'How can you make a numbered list?',
        choice1: '<dl>',
        choice2: '<list>',
        choice3: '<ul>',
        choice4: '<ol>',
        answer: 4,
    },
    {
        question: 'Which HTML element is used to specify a footer for a document or section?',
        choice1: '<bottom>',
        choice2: '<footer>',
        choice3: '<section>',
        choice4: '<div>',
        answer: 2,
    },
    {
        question: 'What is the correct HTML element for the largest heading?',
        choice1: '<h6>',
        choice2: '<head>',
        choice3: '<h1>',
        choice4: '<heading>',
        answer: 3,
    },
    {
        question: 'Which HTML element is used to define important text?',
        choice1: '<important>',
        choice2: '<b>',
        choice3: '<strong>',
        choice4: '<i>',
        answer: 3,
    },
    {
        question: 'Which HTML element is used to define a paragraph?',
        choice1: '<p>',
        choice2: '<paragraph>',
        choice3: '<para>',
        choice4: '<text>',
        answer: 1,
    },
    {
        question: 'How do you create a hyperlink in HTML?',
        choice1: '<a href="url">Link</a>',
        choice2: '<a>Link</a>',
        choice3: '<link href="url">Link</link>',
        choice4: '<href="url">Link</a>',
        answer: 1,
    },
];

let currentQuestionIndex = 0;
let shuffledQuestions = [];
let score = 0;

document.getElementById('startButton').addEventListener('click', startQuiz);
document.getElementById('playAgainButton').addEventListener('click', playAgain);
document.getElementById('endGameButton').addEventListener('click', endGame);

function startQuiz() {
    document.querySelector('.container').style.display = 'none';
    shuffledQuestions = shuffleArray(questions.slice());
    currentQuestionIndex = 0;
    score = 0;
    displayNextQuestion();
}

function playAgain() {
    document.getElementById('end-container').style.display = 'none';
    document.querySelector('.container').style.display = 'block';
    startQuiz(); // Restart the quiz
}

function endGame() {
    window.location.href = "./index.html"; // Redirect to home page
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function displayNextQuestion() {
    if (currentQuestionIndex >= shuffledQuestions.length) {
        endQuiz();
        return;
    }

    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    document.getElementById('quiz-container').style.display = 'block';
    document.getElementById('question').innerText = currentQuestion.question;
    document.getElementById('choice-text-1').innerText = currentQuestion.choice1;
    document.getElementById('choice-text-2').innerText = currentQuestion.choice2;
    document.getElementById('choice-text-3').innerText = currentQuestion.choice3;
    document.getElementById('choice-text-4').innerText = currentQuestion.choice4;

    document.getElementById('question-number').innerText = `${currentQuestionIndex + 1}/${questions.length}`;
    document.getElementById('score').innerText = `Score: ${score}`;
    updateProgressBar();

    document.getElementById('choice1').className = 'choice';
    document.getElementById('choice2').className = 'choice';
    document.getElementById('choice3').className = 'choice';
    document.getElementById('choice4').className = 'choice';
}

function selectChoice(choice) {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    if (choice === currentQuestion.answer) {
        score += 10;  // Increase score by 10 for correct answers
        document.getElementById(`choice${choice}`).classList.add('correct');
    } else {
        document.getElementById(`choice${choice}`).classList.add('incorrect');
        document.getElementById(`choice${currentQuestion.answer}`).classList.add('correct');
    }

    setTimeout(() => {
        currentQuestionIndex++;
        displayNextQuestion();
    }, 200);
}

function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    const progressPercentage = document.getElementById('progress-percentage');
    const progress = (currentQuestionIndex / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressPercentage.innerText = `${Math.round(progress)}%`;
}

function endQuiz() {
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('end-container').style.display = 'block';
    document.getElementById('results').innerText = `Your final score is ${score}`;
}
