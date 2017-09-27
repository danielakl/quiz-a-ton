const quizTable = $("#quizTable");

reloadQuizTable();
setInterval(reloadQuizTable, 60000);

/**
 * Empty and rebuild quiz table, and add key listeners.
 */
function reloadQuizTable() {
    RESTQuiz.getQuizzes(function (data, error, textStatus, jqXHR) {
        if (data) {
            clearTable(data);

            // Insert all quizzes into table.
            insertData(data);

            // Add join button listeners.
            $(".joinButton").on("click", function () {
                const nickname = $("#nickname").val();
                RESTQuiz.partiallyUpdateQuiz($(this).val(),
                    {
                        playerList: [{
                            nickname: nickname,
                            points: 0
                        }]
                    }, function (data, error, textStatus, jqXHR) {
                        if (error) {
                            console.log(error);
                        }
                    });
                window.location.href = "http://localhost:8080/quiz/quiz.html?qid=" + $(this).val() + "&nick=" + nickname;
            });

            // Add scoreboard button listeners.
            $(".scoreboardButton").on("click", function () {
                window.location.href = "http://localhost:8080/quiz/score.html?qid=" + $(this).val();
            });
        }
    });
}

/**
 * Clear data from quiz table.
 * @param {Array} data - Array of data.
 */
function clearTable(data) {
    // Clear current data set.
    quizTable.empty();

    if (data.length === 0) {
        quizTable.html('<tr class="negative"><td><strong>No upcoming quizzes.</strong></td></tr>');
    }
}

/**
 * Insert data into the quiz table.
 * @param {Array} data - Array of data to insert.
 */
function insertData(data) {
    $.each(data, function (index, element) {
        // Calculate time until quiz starts.
        const status = getTimeStatus(element);

        quizTable.append('<tr class="' + status.color + '">\n' +
            '                 <td>' + element.name + '</td>\n' +
            '                 <td><i class="user circle outline icon"></i>' + element.playerList.length + '</td>\n' +
            '                 <td><i class="hourglass end icon"></i>' + status.timeLeft + '</td>\n' +
            '                 <td><i class="help icon"></i>' + element.questions.length + '</td>\n' +
            '                 <td class="center aligned collapsing">\n' +
            '                     <button value="' + element.id + '" class="ui circular button joinButton">Join</button>\n' +
            '                     <button value="' + element.id + '" class="ui circular button scoreboardButton">Scoreboard</button>\n' +
            '                 </td>\n' +
            '             </tr>');
    });

    $("table").removeClass("loading");
}

/**
 * Calculate the time and status of a quiz.
 * @param {object} quiz - A object with quiz data.
 * @return {{timeLeft: string, color: string}}
 */
function getTimeStatus(quiz) {
    const MINUTE_IN_MILLIS = 60000,
        HOUR_IN_MILLIS   = 3600000,
        DAY_IN_MILLIS    = 86400000;

    const timeLeft = Countdown.remainingTime(quiz.startTime);

    // Boolean time left checks.
    const isLessThanAMinute = (timeLeft.total <= MINUTE_IN_MILLIS),
        isLessThanAnHour    = (timeLeft.total <= HOUR_IN_MILLIS),
        isLessThanADay      = (timeLeft.total <= DAY_IN_MILLIS);

    // Time left partial Strings.
    const minutesLeft = (timeLeft.minutes + " minutes"),
        hoursLeft   = (timeLeft.hours + " hours"),
        daysLeft    = (timeLeft.days + " days");

    // Building final time left String.
    const timeLeftString = isLessThanAMinute ? "In Progress" :
        isLessThanAnHour ? ("In " + minutesLeft) :
            isLessThanADay ? ("In " + hoursLeft + ", " + minutesLeft) :
                ("In " + daysLeft + ", " + hoursLeft + ", " + minutesLeft);

    // Color based on time remaining.
    const color = isLessThanAMinute ? "positive" :
        isLessThanAnHour ? "warning" :
            isLessThanADay ? "warning" : "negative";

    return { timeLeft: timeLeftString, color: color };
}