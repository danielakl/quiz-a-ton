//Setup required values to start a quiz
const link = window.location.href,
    quizId = link.substring(link.indexOf("qId") + 4, link.indexOf("nick")),
    nickname = link.substring(link.indexOf("nick") + 5);

//Quiz variables, defined later
var quiz,
    playerIndex,
    questions,
    currentQuestion = 0,

//HTML spans for time, defined later
    minutes,
    seconds,
    cdInterval,

//HTML elements for quesiton, defined later
    image,
    questionText,
    durationText,
    answerButtons;


//Get the Quiz to be played and give variables a proper value
    getUpdatedQuizAndQuestions();
    $(document).ready(function () {
        minutes = $("#cdMinutes");
        seconds = $("#cdSeconds");
        cdInterval = setInterval(function () {
            setTime();
        }, 1000);
    });

//Set the HTML spans to the remaining time and chech for finish
function setTime() {
    var time = Countdown.remaining(quiz.startTime);
    if (time.total > 0) {
        minutes.html(time.minutes + " minutes and ");
        seconds.html(time.seconds + " seconds");
    } else {
        clearInterval(cdInterval);
        findPlayerIndex();
        startQuiz();
    }
}

//Increases the score for  the player and patches it to the server, not the best thing to do, but works for now
function increaseScore() {
    var patchQuiz = {
        players: [{
            nickname: nickname,
            score: quiz.players[playerIndex].score + 1
        }]
    };
    RESTQuiz.partiallyUpdateQuiz(quizId, patchQuiz, function () {
        getUpdatedQuizAndQuestions();
    });
}

//Find the players index in the quiz' players array
function findPlayerIndex() {
    getUpdatedQuizAndQuestions();
    for (var i = 0; i < quiz.players.length; i++) {
        if (nickname === quiz.players[i].nickname) {
            playerIndex = i;
            break;
        }
    }
}

//gets the updates quiz and its questions from server
function getUpdatedQuizAndQuestions() {
    RESTQuiz.getQuiz(quizId, function (data) {
        quiz = data;
        questions = quiz.questions;
    });
}

//just a simple start function
function startQuiz() {
    appendQuestionBody();
    displayQuestion(currentQuestion);
}

//Changes the html elements to match a question
function displayQuestion(questionIndex) {
    var question = questions[questionIndex];
    image.attr("src", question.imageUrl);
    durationText.text(question.duration/1000);
    questionText.text(question.question);
    disableAnswers(false);
    answerButtons[0].text(question.answers[0]);
    answerButtons[1].text(question.answers[1]);
    if (question.answers[2] === "" && question.answers[3] === "") {
        answerButtons[2].addClass("disabled");
        answerButtons[3].addClass("disabled");
        answerButtons[2].text("");
        answerButtons[3].text("");
    } else {
        answerButtons[2].removeClass("disabled");
        answerButtons[3].removeClass("disabled");
        answerButtons[2].text(question.answers[2]);
        answerButtons[3].text(question.answers[3]);
    }
    setAnswerListeners(question.correctIndex);
    countdownDuration(question.duration, function () {
        answerButtons[question.correctIndex].addClass("green");
        setTimeout(function () {
            if ((questionIndex === questions.length - 1)) {
                window.open("http://localhost:8080/ProjectQuiz/scoreboard.html?qId=" + quizId, "_blank");
                setTimeout(function () {
                    RESTQuiz.deleteQuiz(quizId, function () {
                        window.location = "http://localhost:8080/ProjectQuiz";
                    });
                }, 15000);
            } else {
                answerButtons[question.correctIndex].removeClass("green");
                currentQuestion++;
                displayQuestion(currentQuestion);
            }
        }, 2000);

    });
}

//Changes the content of the page when quiz is strating
function appendQuestionBody() {
    $("#mainSegment").html("<button id='sbBtn' class='ui blue circular fluid button'>ScoreBoard</button><img id=\"image\" class=\"ui compact centered image\" src=\"\">\n" +
        "    <div class=\"ui segments\">\n" +
        "        <div class=\"ui segment\">\n" +
        "            <div id=\"question\" class=\"ui blue centered large header\"></div>\n" +
        "            <div id=\"duration\" class=\"ui blue centered large header\"></div>\n" +
        "        </div>\n" +
        "        <div class=\"ui secondary segment\">\n" +
        "            <div class=\"ui two buttons\">\n" +
        "                <button id=\"answer1\" class=\"answer ui blue button\"></button>\n" +
        "                <button id=\"answer2\" class=\"answer ui blue button\"></button>\n" +
        "            </div>\n" +
        "            <div class=\"ui two buttons\">\n" +
        "                <button id=\"answer3\" class=\"answer ui blue button\"></button>\n" +
        "                <button id=\"answer4\" class=\"answer ui blue button\"></button>\n" +
        "            </div>\n" +
        "        </div>\n" +
        "    </div>");

    image = $("#image");
    questionText = $("#question");
    durationText = $("#duration");
    answerButtons = [$("#answer1"), $("#answer2"), $("#answer3"), $("#answer4")];
    $("#sbBtn").click(function () {
        window.open("http://localhost:8080/ProjectQuiz/scoreboard.html?qId=" + quizId, "_blank");
    });
}

//set listeners for buttons to react to question answers
function setAnswerListeners(correctIndex) {
    for (var i = 0; i < answerButtons.length; i++) {
        if (i === correctIndex) {
            answerButtons[i].click(function () {
                disableAnswers(true);
                increaseScore();
            });
        } else {
            answerButtons[i].click(function () {
                disableAnswers(true);
            });
        }
    }
}

//Function for disabling and enabling the answerbuttons
function disableAnswers(disable) {
    if (disable) {
        for (var i = 0; i < answerButtons.length; i++) {
            answerButtons[i].addClass("disabled");
        }
    } else {
        for (i = 0; i < answerButtons.length; i++) {
            answerButtons[i].removeClass("disabled");
        }
    }
}

//Question countdown
function countdownDuration(duration, next) {
    var cd = (duration/1000) + 1;
    var interval = setInterval(function () {
        cd -= 1;
        durationText.text(cd);
        if (cd <= 0) {
            clearInterval(interval);
            next();
        }
    }, 1000);
}

