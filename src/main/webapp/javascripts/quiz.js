const quizId = parseInt(getUrlParameter("qid"));
const player = { nickname: getUrlParameter("nick"), points: 0 };
const timer = $("#timer");
var timeout = false;
var haveAnswered = false;

RESTQuiz.getQuiz(quizId, function (data, error, textStatus, jqXHR) {
    if (!error) {
        startQuestion(0, data.questions, 0);
    } else {
        console.log(error);
    }
});

/**
 * Start question function handles resetting HTML page and inserting new questions.
 * @param {int} iterator    - iterator to use with questions array.
 * @param {Array} questions - array of questions to go through.
 * @param {int} duration    - the time until next question.
 */
function startQuestion(iterator, questions, duration) {
    setTimeout(function () {
        reset();
        if (questions[iterator]) {
            insertQuestion(questions[iterator]);
            startCountdown(questions[iterator].duration);
        }

        if (questions[iterator + 1]) {
            startQuestion(iterator + 1, questions, questions[iterator].duration * 1000);
        } else {
            setTimeout(showScoreboard, questions[iterator].duration * 1000);
        }
    }, duration);
}

/**
 * Insert data from question onto the HTML site.
 * @param {object} question - an object containing the data to insert.
 */
function insertQuestion(question) {
    if (question) {
        const image         = $("#image"),
              questionDiv   = $("#question"),
              answer        = $(".answer");

        if (question.imageURL) {
            image.attr("src", question.imageURL);
        }
        if (question.question) {
            questionDiv.text(question.question);
        }

        if (question.answers) {
            answer.each(function (index) {
                if (question.answers[index]) {
                    $(this).removeClass("disabled");
                    $(this).text(question.answers[index]);
                    $(this).on("click", function () {
                        submit(index, question);
                    });
                } else {
                    $(this).text("");
                    $(this).addClass("disabled");
                }
            });
        }
    }
}

/**
 * Starts a countdown to visualize how much time a user have to answer the question.
 * @param {int} duration - the time to start the timer on.
 */
function startCountdown(duration) {
    const end = new Date();
    end.setSeconds(end.getSeconds() + duration);
    timer.text(("0" + duration).slice(-2));
    const intervalId = setInterval(function () {
        var timeLeft = Countdown.remainingTime(end);
        if (timeLeft.total <= 0) {
            timeout = true;
            clearInterval(intervalId);
        } else {
            timer.text(("0" + Math.floor(timeLeft.total / 1000)).slice(-2));
        }
    }, 500);
}

/**
 * Submit an answer, runs when user clicks an answer.
 * @param {int} answerIndex - the index of the answer the user submitted.
 * @param {object} question - question object to get data.
 */
function submit(answerIndex, question) {
    if (!haveAnswered) {
        haveAnswered = true;
        const answers = $(".answer");
        if (answerIndex === question.correctAnswerIndex) {
            $(answers[answerIndex]).addClass("positive");
            player.points += question.points;
            RESTQuiz.partiallyUpdateQuiz(quizId, { playerList: [ player ] }, function (data, error, textStatus, jqXHR) {
                if (error) {
                    console.log(error);
                }
            });
        } else {
            if (answerIndex !== -1) {
                $(answers[answerIndex]).addClass("negative");
                $(answers[question.correctAnswerIndex]).addClass("positive");
            }
        }
    }
}

/**
 * Display scoreboard, at the end of the quiz.
 */
function showScoreboard() {
    const scoreboard = $("#scoreboard");
    RESTQuiz.getQuiz(quizId, function (data, error, textStatus, jqXHR) {
        if (!error) {
            $.each(data.playerList, function (index, element) {
                scoreboard.append(
                    '<tr>\n' +
                    '    <td>' + element.nickname + '</td>\n' +
                    '    <td>' + element.points + '</td>\n' +
                    '</tr>');
            });
            $(".ui.modal").modal("show");
        } else {
            console.log(error);
        }
    });
}

/**
 * Reset HTML.
 */
function reset() {
    const image         = $("#image"),
          questionDiv   = $("#question"),
          timer         = $("#timer"),
          answer        = $(".answer");

    image.attr("src", "assets/images/questionDefault.png");
    questionDiv.text("Looks like somebody forgot to add a question.");
    timer.text("\u221e");
    $.each(answer, function (index, element) {
        $(this).addClass("disabled");
        $(this).removeClass("positive");
        $(this).removeClass("negative");
        $(this).text("Missing answer.");
    });

    timeout = false;
    haveAnswered = false;
}