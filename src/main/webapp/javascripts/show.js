const quizList = $("#quizList");
const quizBox = $("#quizBox");

function loadQuizList() {
    RESTQuiz.getQuizzes(function (data, error, textStatus, jqXHR) {
        if (data) {
            $.each(data, function (index, quiz) {
                quizList.append("<div class=\"item\">\n" +
                    "               <div class=\"content\">\n" +
                    "                   <div class=\"header\">" + quiz.name + "</div>\n" +
                    "               </div>\n" +
                    "           </div>");
            });
            quizBox.removeClass("loading");
        }
    });
}

loadQuizList();
