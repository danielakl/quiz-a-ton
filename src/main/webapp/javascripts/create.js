$(document).ready(function () {
    var quizObject = {
            name: null,
            creator: null,
            startTime: null,
            questions: null,
            playerList: []
        },
        questions = [],
        tableBody = $("#tableBody"),

        nextBtn = $("#nextBtn"),
        backBtn = $("#backBtn"),
        newQBtn = $("#newQBtn"),
        radioBtns = $(".NrARadio"),
        correctAnswer = $("#correctAnswer"),

        currentTab = 0,
        tabItems = [
            {
                item: $("#generalItem"),
                tab: $("#generalTab")
            }, {
                item: $("#questionItem"),
                tab: $("#questionTab")
            }, {
                item: $("#summaryItem"),
                tab: $("#summaryTab")
            }];

    $(".item").click(function () {
        switch (this.id) {
            case "generalItem":
                setContent(0);
                break;

            case "questionItem":
                setContent(1);
                break;

            case "summaryItem":
                setContent(2);
                break;
        }
    });

    //Set the content of the page, with tabs
    function setContent(index) {
        saveQuiz();
        for (var i = 0; i < tabItems.length; i++) {
            if (i === index) {
                tabItems[i].item.addClass("active");
                tabItems[i].tab.addClass("active");
                currentTab = i;
            } else {
                tabItems[i].item.removeClass("active");
                tabItems[i].tab.removeClass("active");
            }

            if (currentTab === 0) {
                backBtn.addClass("disabled");
                nextBtn.text("Next");
                $("#nextBtn").unbind();
                $("#nextBtn").click(function () {
                    setContent(currentTab + 1);
                });
            } else if (currentTab === 2) {
                updateSummary();
                backBtn.removeClass("disabled");
                nextBtn.text("Submit");
                $("#nextBtn").click(function () {
                    RESTQuiz.createQuiz(quizObject, function () {
                        window.location = "show.html";
                    })
                });
            } else {
                $("#nextBtn").unbind();
                $("#nextBtn").click(function () {
                    setContent(currentTab + 1);
                });
                backBtn.removeClass("disabled");
                nextBtn.text("Next");
            }
        }
    }

    nextBtn.click(function () {
        setContent(currentTab + 1);
    });
    backBtn.click(function () {
        setContent(currentTab - 1)
    });

    //Open modal for new question when button is pressed
    newQBtn.click(function () {
        $(".ui.modal").modal({
            closable: true,
            onDeny: function () {
                return true;
            },
            onApprove: function () {
                questions.push(
                    {
                        question: $("#questionInput").val(),
                        duration: $("#durationInput").val(),
                        imageURL: $("#urlInput").val(),
                        answers: [answer1.val(), answer2.val(), answer3.val(), answer4.val()],
                        correctAnswerIndex: (correctAnswer.val()),
                        points: 1
                    });
                updateList();
                clearQuestionInputs();
                return true;
            }
        }).modal("show");
    });

    var answer1 = $("#answer1");
    var answer2 = $("#answer2");
    var answer3 = $("#answer3");
    var answer4 = $("#answer4");
    radioBtns.click(function () {
        if (radioBtns[0].checked) {
            answer3.attr("disabled", true);
            answer3.attr("placeholder", "Disabled");
            answer3.val("");
            answer4.attr("disabled", true);
            answer4.attr("placeholder", "Disabled");
            answer4.val("");
            correctAnswer.html("<option value=\"0\">Answer 1</option>\n" +
                "<option value=\"1\">Answer 2</option>");
        } else {
            answer3.attr("disabled", false);
            answer3.attr("placeholder", "Answer 3");
            answer4.attr("disabled", false);
            answer4.attr("placeholder", "Answer 4");

            correctAnswer.html("<option value=\"0\">Answer 1</option>\n" +
                "<option value=\"1\">Answer 2</option>\n" +
                "<option value=\"2\">Answer 3</option>\n" +
                "<option value=\"3\">Answer 4</option>");
        }
    });

    //updates the questionsTable/list
    function updateList() {
        tableBody.html("");
        for (var i = 0; i < questions.length; i++) {
            tableBody.append("<tr><td>" + questions[i].question + "</td><td>" + questions[i].answers[questions[i].correctAnswerIndex] + "</td><td><button class='deleteBtn ui red compact button' value='" + i + "'>Delete</button></td></tr>");
        }

        //delete a question
        $(".deleteBtn").click(function () {
            questions.splice(this.value, 1);
            updateList();
        });
    }

    //clear the modal inputs
    function clearQuestionInputs() {
        $("#questionInput").val("");
        $("#durationInput").val("");
        $("#urlInput").val("");
        answer1.val("");
        answer2.val("");
        answer3.val("");
        answer4.val("");
        correctAnswer.val(1);
    }

    //saves the quiz
    function saveQuiz() {
        quizObject.name = $("#nameInput").val();
        quizObject.creator = $("#authorInput").val();
        quizObject.startTime = new Date($("#dateInput").val());
        quizObject.questions = questions;
    }

    //Updates the summary
    function updateSummary() {
        $("#summaryName").html(quizObject.name);
        $("#summaryAuthor").html(quizObject.creator);
        $("#summaryDate").html(quizObject.startTime);
        $("#summaryList").html("");
        for (var i = 0; i < questions.length; i++) {
            $("#summaryList").append("<div class='item'><div class='header'>" + questions[i].question + "</div>" + questions[i].answers[questions[i].correctAnswerIndex] + "</div>");
        }
    }

}); //end document ready

