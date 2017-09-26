const quizTable = $("#quizTable");
const MINUTE_IN_MILLIS = 60000,
      HOUR_IN_MILLIS   = 3600000,
      DAY_IN_MILLIS    = 86400000;

function reloadQuizTable() {
    RESTQuiz.getQuizzes(function (data, error, textStatus, jqXHR) {
        if (data) {
            // Clear current data set.
            quizTable.empty();

            if (data.length === 0) {
                quizTable.html('<tr class="negative"><td><strong>No upcoming quizzes.</strong></td></tr>');
            }

            // Insert all quizzes into table.
            $.each(data, function (index, quiz) {
                // Calculate time until quiz starts.
                const timeLeft = Countdown.remainingTime(quiz.startTime);

                // Ignore quizzes that have started.
                if (timeLeft.total > 0) {
                    // Boolean time left checks.
                    const isLessThanAMinute = (timeLeft.total <= MINUTE_IN_MILLIS),
                        isLessThanAnHour    = (timeLeft.total <= HOUR_IN_MILLIS),
                        isLessThanADay      = (timeLeft.total <= DAY_IN_MILLIS);

                    // Time left partial Strings.
                    const minutesLeft = (timeLeft.minutes + " minutes"),
                          hoursLeft   = (timeLeft.hours + " hours"),
                          daysLeft    = (timeLeft.days + " days");

                    // Building final time left String.
                    const timeLeftString = isLessThanAMinute ? "Now" :
                                           isLessThanAnHour ? ("In " + minutesLeft) :
                                           isLessThanADay ? ("In " + hoursLeft + ", " + minutesLeft) :
                                           ("In " + daysLeft + ", " + hoursLeft + ", " + minutesLeft);

                    // Color table row based on time remaining.
                    const color = isLessThanAMinute ? "positive" :
                                  isLessThanAnHour ? "warning" :
                                  isLessThanADay ? "warning" : "negative";

                    quizTable.append('<tr class="' + color + '">\n' +
                        '                 <td>' + quiz.name + '</td>\n' +
                        '                 <td><i class="user circle outline icon"></i>' + quiz.playerList.length + '/10</td>\n' +
                        '                 <td><i class="hourglass end icon"></i>' + timeLeftString + '</td>\n' +
                        '                 <td><i class="help icon"></i>' + quiz.questions.length + '/10</td>\n' +
                        '                 <td class="center aligned collapsing">\n' +
                        '                     <button value="' + quiz.id + '" class="ui circular button joinButton">Join</button>\n' +
                        '                     <button value="' + quiz.id + '" class="ui circular button scoreboardButton">Scoreboard</button>\n' +
                        '                 </td>\n' +
                        '             </tr>');
                }
            });
            $("table").removeClass("loading");

            $(".joinButton").on("click", function () {
                window.location.href = "http://localhost:8080/quiz/quiz.html?qid=" + this.value;
            });
            $(".scoreboardButton").on("click", function () {
                // Get correct quiz.
                const quiz = data.find(function (element, index, array) {
                    if (element.id === this.value) {
                        return true;
                    }
                }, this);

                // Build scoreboard for quiz.
                const scoreboard = $("#scoreboard");
                scoreboard.empty();
                $.each(quiz.playerList, function (index, player) {
                    scoreboard.append(
                        '<tr>\n' +
                        '    <td>' + player.nickname + '</td>\n' +
                        '    <td>' + player.points + '</td>\n' +
                        '</tr>'
                    );
                });

                // Display scoreboard.
                $('.ui.modal').modal('show');
            });
        }
    });
}

reloadQuizTable();
setInterval(reloadQuizTable, 60000);
