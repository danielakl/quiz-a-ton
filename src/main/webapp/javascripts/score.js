var quizId = parseInt(getUrlParameter("qid"));

displayQuizInfo();
loadScoreboard();
setInterval(loadScoreboard, 5000);

/**
 * Display general quiz information in header.
 */
function displayQuizInfo() {
    RESTQuiz.getQuiz(quizId, function (data, error, textStatus, jqXHR) {
        if (!error) {
            $("p").text("For \"" + data.name + "\".");
        } else {
            console.log(error);
        }
    });
}

/**
 * Load data into the scoreboard.
 */
function loadScoreboard() {
    RESTQuiz.getQuiz(quizId, function (data, error, textStatus, jqXHR) {
        if (!error) {
            const scoreboard = $("#scoreboard");

            // Rebuild scoreboard.
            scoreboard.empty();
            $.each(data.playerList, function (index, player) {
                scoreboard.append(
                    '<tr>\n' +
                    '    <td>' + player.nickname + '</td>\n' +
                    '    <td>' + player.points + '</td>\n' +
                    '</tr>'
                );
            });

        } else {
            console.log(error);
        }
    });
}