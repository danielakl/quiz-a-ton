const quizId = parseInt(getUrlParameter("qid"));
const player = { nickname: getUrlParameter("nick"), points: 0 };
var timeout = false;
var haveAnswered = false;
var currentQuestion = {};

const restQuestion = new RESTQuestion(quizId);
restQuestion.getQuestions(function (questions, error, textStatus, jqXHR) {
    if (!error) {
        console.dir(questions);
        for (var i = 0; i < questions.length; i++) {
            currentQuestion = questions[i];
            insertQuestion();
            startCountdown();
            setTimeout(function () {
                if (timeout) {
                    submit(-1);
                    reset();
                }
            }, currentQuestion.duration * 1000);
        }
    } else {
        console.log(error);
    }
});

/**
 * Insert data from a Question.
 */
function insertQuestion() {
    if (currentQuestion) {
        const image         = $("#image"),
              questionDiv   = $("#question"),
              answer        = $(".answer");

        if (currentQuestion.imageURL) {
            image.attr("src", currentQuestion.imageURL);
        }
        if (currentQuestion.question) {
            questionDiv.text(currentQuestion.question);
        }

        if (currentQuestion.answers) {
            answer.each(function (index) {
                if (currentQuestion.answers[index]) {
                    $(this).removeClass("disabled");
                    $(this).text(currentQuestion.answers[index]);
                    $(this).on("click", function () {
                        submit(index);
                    });
                } else {
                    $(this).text("");
                    $(this).addClass("disabled");
                }
            });
        }
    }
}

function startCountdown() {
    const timer = $("#timer");
    const end = new Date();
    end.setSeconds(end.getSeconds() + currentQuestion.duration);
    const intervalId = setInterval(function () {
        var timeLeft = Countdown.remainingTime(end);
        if (timeLeft.total <= 0) {
            clearInterval(intervalId);
            timeout = true;
        } else {
            timer.text(Math.floor(timeLeft.total / 1000));
        }
    }, 500);
}

function submit(answerIndex) {
    if (!haveAnswered) {
        haveAnswered = true;
        const answers = $(".answer");
        if (answerIndex === currentQuestion.correctAnswerIndex) {
            $(answers[answerIndex]).addClass("green");
            player.points = player.points + currentQuestion.points;
            RESTQuiz.partiallyUpdateQuiz(quizId, { playerList: [ player ] }, function (data, error, textStatus, jqXHR) {
                if (error) {
                    console.log(textStatus);
                }
            });
        } else {
            if (answerIndex !== -1) {
                $(answers[answerIndex]).addClass("negative");
                $(answers[currentQuestion.correctAnswerIndex]).addClass("positive");
            }
        }
    }
}

function reset() {
    const image         = $("#image"),
          questionDiv   = $("#question"),
          timer         = $("#timer"),
          answer        = $(".answer");

    image.attr("src", "assets/images/questionDefault.png");
    questionDiv.text("Looks like somebody forgot to add a question.");
    timer.text("\u221e");
    answer.each(function () {
        $(this).addClass("disabled");
        $(this).removeClass("positive");
        $(this).removeClass("negative");
        $(this).text("Missing answer.");
    });

    timeout = false;
    haveAnswered = false;
}