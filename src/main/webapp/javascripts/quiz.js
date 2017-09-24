/**
 * Insert data from a Question.
 * @param {Question} question - Question object to display on the page.
 */
function insertQuestion(question) {
    console.log($("#question"));

    const answersHTML = [];
    '                        <div class="ui button">' + question.answers[0] + '</div>\n'

    $("#question").html('<div class="image">\n' +
        '                    <img src="' + (question.imageURL !== "") ? question.imageURL : "assets/images/questionDefault.png" + '">\n' +
        '                </div>\n' +
        '                <div class="content">\n' +
        '                    <div class="header">' + (question.question) + '</div>\n' +
        '                </div>\n' +
        '                <div class="extra content">\n' +
        '                    <div class="ui four buttons">\n' +

        '                        <div class="ui button">' + question.answers[0] + '</div>\n' +
        '                        <div class="ui button">' + question.answers[1] + '</div>\n' +
        '                        <div class="ui button">' + question.answers[2] + '</div>\n' +
        '                        <div class="ui button">' + question.answers[3] + '</div>\n' +
        '                    </div>\n' +
        '                </div>');
}

/**
 * Get the ID of the quiz from the URL after the '#' at the end.
 * @return {Number}
 */
function getQuizID() {
    const url = window.location.href;
    return parseInt(url.substr(url.indexOf("#") + 1));
}

const restQuestion = new RESTQuestion(getQuizID());
restQuestion.getQuestions(function (questions, error, textStatus, jqXHR) {
    if (!error) {
        console.log(questions[0]);
        insertQuestion(questions[0]);
    } else {
        console.log(error);
    }
});