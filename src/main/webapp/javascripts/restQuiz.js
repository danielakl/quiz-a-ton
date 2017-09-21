"use strict";

/**
 * RESTQuiz has methods to send AJAX requests to an Web API.
 * @constructor
 */
function RESTQuiz() { }

/**
 * Get all quizzes.
 * @param callback  {function} to call once the request succeeds or fails.
 */
RESTQuiz.getQuizzes = function(callback) {
    $.ajax("api/quiz/", {
        type: "GET",
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            callback(data, textStatus, jqXHR);
        },
        error: function (jqXHR, textStatus, error) {
            callback(error, textStatus, jqXHR);
        }
    });
};

/**
 * Get a quiz.
 * @param id        {int} the ID of the quiz to get.
 * @param callback  {function} to call once the request succeeds or fails.
 */
RESTQuiz.getQuiz = function(id, callback) {
    $.ajax("api/quiz/" + id, {
        type: "GET",
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            callback(data, textStatus, jqXHR);
        },
        error: function (jqXHR, textStatus, error) {
            callback(error, textStatus, jqXHR);
        }
    });
};

/**
 * Create a quiz.
 * @param quiz      {object} of key value pairs, with new values to update the
 *                  resource on the server.
 * @param callback  {function} to call once the request succeeds or fails.
 */
RESTQuiz.createQuiz = function(quiz, callback) {
    $.ajax("api/quiz/", {
        type: "POST",
        contentType: "application/json",
        data: quiz,
        success: function (data, textStatus, jqXHR) {
            callback(data, textStatus, jqXHR);
        },
        error: function (jqXHR, textStatus, error) {
            callback(error, textStatus, jqXHR);
        }
    });
};

/**
 * Update a quiz.
 * @param id        {int} the ID of the quiz to update.
 * @param quiz      {object} of key value pairs, with new values to update the
 *                  resource on the server.
 * @param callback  {function} to call once the request succeeds or fails.
 */
RESTQuiz.updateQuiz = function(id, quiz, callback) {
    $.ajax("api/quiz/" + id, {
        type: "PUT",
        contentType: "application/json",
        data: quiz,
        success: function (data, textStatus, jqXHR) {
            callback(data, textStatus, jqXHR);
        },
        error: function (jqXHR, textStatus, error) {
            callback(error, textStatus, jqXHR);
        }
    });
};

/**
 * Delete a quiz.
 * @param id        {int} the ID of the quiz to delete.
 * @param callback  {function} to call once the request succeeds or fails.
 */
RESTQuiz.deleteQuiz = function(id, callback) {
    $.ajax("api/quiz/" + id, {
        type: "DELETE",
        success: function (data, textStatus, jqXHR) {
            callback(data, textStatus, jqXHR);
        },
        error: function (jqXHR, textStatus, error) {
            callback(error, textStatus, jqXHR);
        }
    });
};