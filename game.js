const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "The series Friends is set in which city?",
        choice1: "Los Angeles",
        choice2: "New York city",
        choice3: "Miami",
        choice4: "Seattle",
        answer: 2
    },
    {
        question: "What pet did Ross own?",
        choice1: "A dog named Keith",
        choice2: "A rabbit called Lancelot",
        choice3: "A monkey named Marcel",
        choice4: "A lizard named Alistair",
        answer: 3
    },
    {
        question: "What is Monica skilled at?",
        choice1: "Bricklaying",
        choice2: "Cooking",
        choice3: "American football",
        choice4: "Singing",
        answer: 2
    },
    {
        question: "Monica briefly dates billionaire Pete Becker. Which country does he take her for their first date?",
        choice1: "France",
        choice2: "Italy",
        choice3: "England",
        choice4: "Greece",
        answer: 2
    },
    {
        question: "Rachel was popular in high school. Her prom date Chip ditched her for which girl at school?",
        choice1: "Sally Roberts",
        choice2: "Amy Welsh",
        choice3: "Valerie Thompson",
        choice4: "Emily Foster",
        answer: 2
    },
    {
        question: "What’s the name of the 1950s-themed diner where Monica worked as a waitress?",
        choice1: "Marilyn & Audrey",
        choice2: "Twilight Galaxy",
        choice3: "Moondance Diner",
        choice4: "Marvin’s",
        answer: 3
    },
    {
        question: "What’s the name of Joey’s penguin?",
        choice1: "Snowflake",
        choice2: "Waddle",
        choice3: "Huggsy",
        choice4: "Bobber",
        answer: 3
    },
    {
        question: "Which cartoon character was on Phoebe’s thermos that Ursula threw under a bus?",
        choice1: "Pebbles Flintstone",
        choice2: "Yogi Bear",
        choice3: "Judy Jetson",
        choice4: "Bullwinkle",
        answer: 3
    },
    {
        question: "What’s the name of Janice’s first husband?",
        choice1: "Gary Litman",
        choice2: "Sid Goralnik",
        choice3: "Rob Bailystock",
        choice4: "Nick Layster",
        answer: 1
    },
    {
        question: "What song is Phoebe best known for?",
        choice1: "Smelly Cat",
        choice2: "Smelly Dog",
        choice3: "Smelly Rabbit",
        choice4: "Smelly Worm",
        answer: 1
    }

];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    //console.log(availableQuestions);
    getNewQuestion();
};

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        return window.location.assign("/end.html");
    }
    questionCounter++;
    questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        // console.log(e.target);
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        let classToApply = "incorrect";
        if(selectedAnswer == currentQuestion.answer) {
            classToApply = "correct";
        }
        //let classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        
        if(classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }
        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);


    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

startGame();
