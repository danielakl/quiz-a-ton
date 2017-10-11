const quizId = parseInt(getUrlParameter("qid"));
const nickname = getUrlParameter("nick");
const list = $(".ui.list");
const minutes = $("#cdMinutes");
const seconds = $("#cdSeconds");

RESTQuiz.getQuiz(quizId, function (data, error, textStatus, jqXHR) {
    if (!error) {
        setTime(data);
        timerInterval = setInterval(function () {
            setTime(data);
        }, 500);
        updateList(data);
        playersInterval = setInterval(function () {
            updateList(data)
        }, 10000);
    } else {
        console.log(error);
    }
});

function updateList(data) {
    list.html("");
    for(var i = 0; i < data.playerList.length; i++) {
        var player = data.playerList[i].nickname;
        if (nickname === player) {
            list.append("<div class=\"item\"><strong>" + player + "</strong></div>");
        } else {
            list.append("<div class=\"item\">" + player + "</div>");
        }
    }
}

function setTime(data) {
    var time = Countdown.remainingTime(data.startTime);
    if (time.total > 0) {
        minutes.html(time.minutes + " minutes and ");
        seconds.html(time.seconds + " seconds");
    } else {
        clearInterval(timerInterval);
        clearInterval(playersInterval);
        window.location.href = "http://localhost:8080/quiz/quiz.html?qid=" + quizId + "&nick=" + nickname;
    }
}