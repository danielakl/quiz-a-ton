const quizList = $("#quizList");
const quizBox = $("#quizBox");

function loadQuizList() {
    $.ajax("api/quiz/", {
        type: "GET",
        dataType: "json",
        success: function (quizzes, textStatus, jqXHR) {
            $.each(quizzes, function (index, quiz) {
                quizList.append("<div class=\"item\"><div class=\"content\"><div class=\"header\">" + quiz.name + "</div></div></div>");
            });
            quizBox.removeClass("loading");
        }
    });
}

loadQuizList();
