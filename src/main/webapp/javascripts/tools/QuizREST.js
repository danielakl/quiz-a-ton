"use strict";

//Constructor
function QuizREST() {
}

//Get all quizzes from rest
QuizREST.getQuizzes = function (callback) {
    $.ajax({
        url: "rest/quizzes",
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            callback(data);
        }
    });
};

//Get one quiz from rest
QuizREST.getQuiz = function (id, callback) {
    $.ajax({
        url: "rest/quizzes/" + id,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            callback(data);
        }
    });
};

QuizREST.postQuiz = function (quiz, callback) {
    $.ajax({
        url: "rest/quizzes",
        type: "POST",
        data: JSON.stringify({
            name: quiz.name,
            author: quiz.author,
            startTime: quiz.startTime,
            questions: quiz.questions
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            callback(data);
        }
    });
};

QuizREST.deleteQuiz = function (id, callback) {
    $.ajax({
        url: "rest/quizzes/" + id,
        type: "DELETE",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            callback(data);
        }
    });
};

QuizREST.putQuiz = function (id, quiz, callback) {
    $.ajax({
        url: "rest/quizzes/" + id,
        type: "PUT",
        data: JSON.stringify(quiz),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            callback();
        }
    });
};

QuizREST.patchQuiz = function (id, quiz, callback) {
    $.ajax({
        url: "rest/quizzes/" + id,
        type: "PATCH",
        data: JSON.stringify(quiz),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            callback();
        }
    });
};