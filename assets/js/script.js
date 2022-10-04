var questionSource = [
    {
        question: "Commonly used date types DO NOT include:",
        choices: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        answer: "3. alerts"
    },
    {
        question: "The condition in an if / else statement is enclosed within _____.",
        choices: ["1. parenthesis", "2. curly brackets", "3. quotes", "4. square brackets"],
        answer: "1. parenthesis"
    },
    {
        question: "Arrays in JavaScript can be used to store _____.",
        choices: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        answer: "4. all of the above"
    },
    {
        question: "String values must be enclosed within _____ when being assigned to variables.",
        choices: ["1. commas", "2. quotes", "3. curly brackets", "4. parenthesis"],
        answer: "2. quotes"
    },
    {
        question: "A very useful tool used during development and debugging for printing content ot the debugger is:",
        choices: ["1. JavaScript", "2. terminal / bash", "3. for loops", "4. console.log"],
        answer: "4. console.log"
    }
];
var timer = document.getElementById("timer");
var secondsLeft = 60;
var questionNumber = 0;
var totalScore = 0;
var questionCount = 1;

var finish = document.querySelector("#finish");
function countdown() {
    var timerInterval = setInterval(function () {
      secondsLeft--;
      timer.textContent = "Time left: " + secondsLeft + " seconds";

        if (secondsLeft <= 0){
            clearInterval(timerInterval);
            timer.textContent = "Time is up!";
            finish.textContent = "Time is up!";
            gameOver();

        } else  if(questionCount >= questionSource.length +1) {
            clearInterval(timerInterval);
            gameOver();
            } 
}, 1000);
}
//intro page for quiz- no questions will appear
var introPage =document.querySelector("#intro");
var questionPage = document.querySelector("#questionPage");
function startQuiz () {
    introPage.style.display = "none";
    questionPage.style.display = "block";
    questionNumber = 0
    countdown();
    showQuestion(questionNumber);
}
//page will display questions and multiple choice answers to choose from
var reactButtons = document.querySelectorAll(".choices")
var askQuestion = document.querySelector("#askQuestion");
var answerBtn1 = document.querySelector("#answer-btn1");
var answerBtn2 = document.querySelector("#answer-btn2");
var answerBtn3 = document.querySelector("#answer-btn3");
var answerBtn4 = document.querySelector("#answer-btn4");

function showQuestion (n) {
    askQuestion.textContent = questionSource[n].question;
    answerBtn1.textContent = questionSource[n].choices[0];
    answerBtn2.textContent = questionSource[n].choices[1];
    answerBtn3.textContent = questionSource[n].choices[2];
    answerBtn4.textContent = questionSource[n].choices[3];
    questionNumber = n;
}
//checks if selected answer is correct
var checkLine = document.querySelector("#checkLine");
function checkAnswer(event) {
event.preventDefault();
checkLine.style.display = "block";
setTimeout(function () {
    checkLine.style.display = 'none';
}, 1000);

if (questionSource[questionNumber].answer == event.target.value) {
    checkLine.textContent = "Correct!"; 
    totalScore = totalScore + 1;

} else {
    secondsLeft = secondsLeft - 10;
    checkLine.textContent = "Wrong! The correct answer is " + questionSource[questionNumber].answer;
}
//next page with next question 
if (questionNumber < questionSource.length -1) {

        showQuestion(questionNumber +1);
    } else {
    gameOver();
}
questionCount++;
}
//once all questions are answered or timer is up, game over page appears
var scoreCheck = document.querySelector("#scoreCheck");
//shows final score
var finalScore = document.querySelector("#finalScore");
function gameOver() {

    questionPage.style.display = "none";
    scoreBoard.style.display = "block";
    console.log(scoreBoard);
    finalScore.textContent = "Your final score is :" + totalScore ;
    timer.style.display = "none"; 
};
//gets current score and iniials from local storage
function getScore () {
    var currentList =localStorage.getItem("ScoreList");
    if (currentList !== null ){
        latestList = JSON.parse(currentList);
        return latestList;
    } else {
    latestList = [];
    }
return latestList;
};
var scoreRecord = document.querySelector("#scoreRecord");
function renderScore () {
scoreRecord.innerHTML = " ";
scoreRecord.style.display ="block";
var highScores = sort();
//will only show top 5 rankings
var topFive = highScores.slice(0,5);
for (var i = 0; i < topFive.length; i++) {
    var item = topFive[i];
    var list = document.createElement("list");
list.textContent = item.user + " - " + item.score;
list.setAttribute("data-index", i);
scoreRecord.appendChild(list);
}};

function sort () {
    var unsortedList = getScore();
    if (getScore == null ){
        return;
    } else{
    unsortedList.sort(function(a,b){
        return b.score - a.score;
    })
    return unsortedList;
    }};
    function addItem (n) {
        var addedList = getScore();
        addedList.push(n);
        localStorage.setItem("ScoreList", JSON.stringify(addedList));
        };
        
        var userInitial = document.querySelector("#initial");
        function saveScore () {
        var scoreItem ={
            user: userInitial.value,
            score: totalScore
        }
        addItem(scoreItem);
        renderScore();
        }
//start button for quiz
var startBtn = document.querySelector("#start-quiz-button");
    startBtn.addEventListener("click", startQuiz);
//click on any answer button (1-4) to go to next question
var reactButtons = document.querySelectorAll(".choices");
    reactButtons.forEach(function(click){
    click.addEventListener("click", checkAnswer);
});


var scoreBoard = document.querySelector("#submitPage");
var submitBtn = document.querySelector("#submit-btn");
var highScorePage = document.querySelector("#highScorePage");
var scoreBoard = document.querySelector("#submitPage");
submitBtn.addEventListener("click", function(event) {
    event.preventDefault();
    scoreBoard.style.display = "none";
    introPage.style.display = "none";
    highScorePage.style.display = "block";
    questionPage.style.display ="none";
    saveScore();
    });
    //check highscore list
    scoreCheck.addEventListener("click", function(event) {
        event.preventDefault();
        scoreBoard.style.display = "none";
        introPage.style.display = "none";
        highScorePage.style.display = "block";
        questionPage.style.display ="none";
        renderScore();
        });
//go back to main page
var backBtn = document.querySelector("#back-btn");
backBtn.addEventListener("click",function(event){
    event.preventDefault();
    scoreBoard.style.display = "none";
    introPage.style.display = "block";
    highScorePage.style.display = "none";
    questionPage.style.display ="none";
    location.reload();
});
//clears local storage
var clearBtn = document.querySelector("#clear-btn");
clearBtn.addEventListener("click",function(event) {
event.preventDefault();
localStorage.clear();
renderScore();
});