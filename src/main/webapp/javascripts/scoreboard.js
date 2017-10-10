$(document).ready(function () {
    const link = window.location.href,
        quizId = link.substring(link.indexOf("qId") + 4),
        tableBody = $("#tableBody");
    RESTQuiz.getQuiz(quizId, function (data) {
        tableBody.empty();
        console.log(data.players);
        for (var i = 0; i < data.players.length; i++) {
            tableBody.append("<tr><td>" + data.players[i].nickname + "</td><td>" + data.players[i].score + "</td></tr>");
        }
    });
});
