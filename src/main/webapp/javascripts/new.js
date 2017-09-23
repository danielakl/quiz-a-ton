const questionBox = $("#questionBox");

function updateAccordion() {
    $('.ui.accordion').accordion();
}
updateAccordion();

var questionAmount = 0;
$("#addQuizButton").on("click", function () {
    questionAmount++;
    questionBox.append('<div class="question ui styled accordion">\n' +
        '                        <div class="ui title">\n' +
        '                            <i class="dropdown icon"></i>\n' +
        '                            Question ' + questionAmount + '\n' +
        '                        </div>\n' +
        '                        <div class="content">\n' +
        '                            <!-- Question Field -->\n' +
        '                            <div class="field">\n' +
        '                                <div class="ui left icon input">\n' +
        '                                    <i class="icon help"></i>\n' +
        '                                    <input class="fieldQuestion" placeholder="Question">\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '                            <!-- Question Image URL Field -->\n' +
        '                            <div class="field">\n' +
        '                                <div class="ui left icon input">\n' +
        '                                    <i class="icon image"></i>\n' +
        '                                    <input class="fieldImage" type="url" placeholder="Image URL">\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '                            <!-- Question Points Field -->\n' +
        '                            <div class="field">\n' +
        '                                <div class="ui left icon input">\n' +
        '                                    <i class="icon star"></i>\n' +
        '                                    <input class="fieldPoints" type="number" min="1" max="10" placeholder="Points">\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '                            <!-- Question Duration Field -->\n' +
        '                            <div class="field">\n' +
        '                                <div class="ui left icon input">\n' +
        '                                    <i class="icon hourglass end"></i>\n' +
        '                                    <input class="fieldDuration" type="number" min="10" max="60" placeholder="Duration (seconds)">\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '                            <!-- Answer Accordion -->\n' +
        '                            <div class="answer accordion">\n' +
        '                                <div class="ui tiny header title">\n' +
        '                                    <i class="dropdown icon"></i>\n' +
        '                                    Answers\n' +
        '                                </div>\n' +
        '                                <div class="content">\n' +
        '                                    <!-- Answer Field -->\n' +
        '                                    <div class="field">\n' +
        '                                        <div class="ui left icon action input">\n' +
        '                                            <i class="icon comment"></i>\n' +
        '                                            <input class="fieldAnswer' + questionAmount + '" placeholder="Answer 1">\n' +
        '                                            <button class="ui large green icon button">\n' +
        '                                                <i class="check icon"></i>\n' +
        '                                            </button>\n' +
        '                                        </div>\n' +
        '                                    </div>\n' +
        '                                    <!-- Answer Field -->\n' +
        '                                    <div class="field">\n' +
        '                                        <div class="ui left icon action input">\n' +
        '                                            <i class="icon comment"></i>\n' +
        '                                            <input class="fieldAnswer' + questionAmount + '" placeholder="Answer 2">\n' +
        '                                            <button class="ui large red icon button">\n' +
        '                                                <i class="remove icon"></i>\n' +
        '                                            </button>\n' +
        '                                        </div>\n' +
        '                                    </div>\n' +
        '                                    <!-- Answer Field -->\n' +
        '                                    <div class="field">\n' +
        '                                        <div class="ui left icon action input">\n' +
        '                                            <i class="icon comment"></i>\n' +
        '                                            <input class="fieldAnswer' + questionAmount + '" placeholder="Answer 3">\n' +
        '                                            <button class="ui large red icon button">\n' +
        '                                                <i class="remove icon"></i>\n' +
        '                                            </button>\n' +
        '                                        </div>\n' +
        '                                    </div>\n' +
        '                                    <!-- Answer Field -->\n' +
        '                                    <div class="field">\n' +
        '                                        <div class="ui left icon action input">\n' +
        '                                            <i class="icon comment"></i>\n' +
        '                                            <input class="fieldAnswer' + questionAmount + '" placeholder="Answer 4">\n' +
        '                                            <button class="ui large red icon button">\n' +
        '                                                <i class="remove icon"></i>\n' +
        '                                            </button>\n' +
        '                                        </div>\n' +
        '                                    </div>\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                    </div>');
    updateAccordion();
});

// Prevent reloading page on submit.
$("form").submit(function(e) {
    e.preventDefault();
});

$("#submit").on("click", function () {
    const title = $(".fieldTitle").val();
    const creator = $(".fieldCreator").val();
    const startTime = new Date($(".fieldStartTime").val());
    const jqQuestions = $(".question");

    // Add questions to quiz.
    var questions = [];
    $.each(jqQuestions, function (questionIndex, element) {
        //Create answers.
        var answers = [];
        $.each($(".fieldAnswer" + (questionIndex + 1)), function (answerIndex, answer) {
            answers.push($(answer).val());
        });

        // Create Question.
        const question = new Question(
            $($(".fieldQuestion")[questionIndex]).val(),
            $($(".fieldImage")[questionIndex]).val(),
            answers,
            parseInt($($(".fieldPoints")[questionIndex]).val()),
            0,
            parseInt($($(".fieldDuration")[questionIndex]).val())
        );
        questions.push(question);
    });

    // Create quiz.
    const quiz = new Quiz(title, creator, startTime, questions, []);
    RESTQuiz.createQuiz(quiz, function (data, error, textStatus, jqXHR) {
        if (error) {
            Message.showMessage(".ui.message", "error", "Error creating a new quiz.", error);
        } else {
            Message.showMessage(".ui.message", "success", "Successfully created a new quiz.");
        }
    });
});