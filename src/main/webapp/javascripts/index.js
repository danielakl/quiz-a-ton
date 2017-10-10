$(document).ready(function () {
    var quizzes = [],
        tableBody = $("#tableBody");
    updateQuizzes();

    $("#refreshBtn").click(function () {
        updateQuizzes();
    });

    function updateQuizzes() {
        quizzes = [];
        RESTQuiz.getQuizzes(function (data) {
            $.each(data, function (key, val) {
                quizzes.push(val);
            });
            updateTable();
        });
    }

    //Updates the table with quizzes and sets listeners to tableButtons
    function updateTable() {
        tableBody.html("");
        for (var i = 0; i < quizzes.length; i++) {
            const timeLeft = Countdown.remaining(quizzes[i].startTime);
            var timeString = "";
            var btnClasses = "";
            var trClass = "";
            var joinButton = "";
            if (timeLeft.total > 0) {
                if (timeLeft.days !== 0) timeString += timeLeft.days + "d, ";
                if (timeLeft.hours !== 0) timeString += timeLeft.hours + "h, ";
                timeString += timeLeft.minutes + "m and " + timeLeft.seconds + "s";
                //Can't get ready for a quiz before it's 15 min left
                if (timeLeft.total > 900000) {
                    btnClasses = "ui blue circular disabled button";
                } else {
                    btnClasses = "joinBtn ui blue circular button";
                    trClass = "positive";
                }
                joinButton = "<button class='" + btnClasses + "' value='" + quizzes[i].id + "'><i class='child icon'></i>Join</button>";
            }
            else {
                timeString = "In progress";
                trClass = "negative";
            }
            tableBody.append("<tr id='" + quizzes[i].id + "' class='" + trClass + "' >" +
                "<td>" + quizzes[i].name + "</td>" +
                "<td>" + timeString + "</td>" +
                "<td>" + quizzes[i].author + "</td>" +
                "<td class='btnTd center aligned collapsing'>" +
                joinButton +
                "<button class='sbBtn ui blue circular compact button' value='" + quizzes[i].id + "'><i class='bar chart icon'></i></icon>Scoreboard</button>"
                + "</td>");
        }
        $(".joinBtn").click(joinClick);
        $(".sbBtn").click(function () {
            window.open("http://localhost:8080/ProjectQuiz/scoreboard.html?qId=" + this.value, "_blank");
        });
    }

    //Function that is called when a "Join" button is called
    function joinClick() {
        //The quiz id (value of the clicked button)
        var quizId = this.value;
        $('#nickModal').modal({
            closable: true,
            onDeny: function () {
                return true;
            },
            onApprove: function () {
                enterQuiz(quizId);
                return true;
            }
        }).modal("show");
    }

    // Function that is called when trying to enter a quiz
    function enterQuiz(quizId) {
        RESTQuiz.getQuiz(quizId, function (data) {
            var players = data.players;
            var found = false;
            var nick = $("#nickInput").val();

            //Check if nickname already taken
            for (var i = 0; i < players.length; i++) {
                if (nick === players[i].nickname) {
                    //nickname taken
                    found = true;
                    $("#nickInput").val("");
                    break;
                }
            }
            if (found) {
                //show modal again with message
                $("#nickModal").modal("show");
                $(".ui.message").removeClass("hidden");
            } else {
                //post the player to the quiz players
                var quiz = {
                    players: [{
                        nickname: nick
                    }]
                };
                RESTQuiz.partiallyUpdateQuiz(quizId, quiz, function () {
                    window.location = "http://localhost:8080/ProjectQuiz/play.html?qId=" + quizId + "nick=" + nick;
                });
            }
        });
    }

    //updating table
    setInterval(function () {
        updateQuizzes();
    }, 1000);

});