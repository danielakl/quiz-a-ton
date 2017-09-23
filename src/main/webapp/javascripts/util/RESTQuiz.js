"use strict";

/**
 * RESTQuiz has methods to send AJAX requests to an Web API.
 * @constructor
 */
function RESTQuiz() { }

/**
 * @callback callback
 * @param {*} data              - formatted according to the dataType given to AJAX.
 * @param {string} errorThrown  - HTTP status text.
 * @param {string} textStatus   -
 * @param {jqXHR} jqXHR         - jQuery XMLHttpRequest object.
 */

/**
 * Get all quizzes.
 * @param {callback} callback - to call once the request succeeds or fails.
 */
RESTQuiz.getQuizzes = function(callback) {
    $.ajax("api/quiz/", {
        type: "GET",
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            callback(data, null, textStatus, jqXHR);
        },
        error: function (jqXHR, textStatus, error) {
            callback(null, error, textStatus, jqXHR);
        }
    });
};

/**
 * Get a quiz.
 * @param {int} id              - the ID of the quiz to get.
 * @param {callback} callback   - to call once the request succeeds or fails.
 */
RESTQuiz.getQuiz = function(id, callback) {
    $.ajax("api/quiz/" + id, {
        type: "GET",
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            callback(data, null, textStatus, jqXHR);
        },
        error: function (jqXHR, textStatus, error) {
            callback(null, error, textStatus, jqXHR);
        }
    });
};

/**
 * Create a quiz.
 * @param {Quiz} quiz           - Quiz object used to create the resource on the server.
 * @param {callback} callback   - to call once the request succeeds or fails.
 */
RESTQuiz.createQuiz = function(quiz, callback) {
    quiz = JSON.stringify(quiz);
    $.ajax("api/quiz/", {
        type: "POST",
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        data: quiz,
        success: function (data, textStatus, jqXHR) {
            callback(data, null, textStatus, jqXHR);
        },
        error: function (jqXHR, textStatus, error) {
            callback(null, error, textStatus, jqXHR);
        }
    });
};

/**
 * Update a quiz.
 * @param {int} id              - the ID of the quiz to update.
 * @param {Quiz} quiz           - Quiz object to update the resource on the server.
 * @param {callback} callback   - to call once the request succeeds or fails.
 */
RESTQuiz.updateQuiz = function(id, quiz, callback) {
    quiz = JSON.stringify(quiz);
    $.ajax("api/quiz/" + id, {
        type: "PUT",
        contentType: "application/json",
        data: quiz,
        success: function (data, textStatus, jqXHR) {
            callback(data, null, textStatus, jqXHR);
        },
        error: function (jqXHR, textStatus, error) {
            callback(null, error, textStatus, jqXHR);
        }
    });
};

/**
 * Delete a quiz.
 * @param {int} id              - the ID of the quiz to delete.
 * @param {callback} callback   - to call once the request succeeds or fails.
 */
RESTQuiz.deleteQuiz = function(id, callback) {
    $.ajax("api/quiz/" + id, {
        type: "DELETE",
        success: function (data, textStatus, jqXHR) {
            callback(data, null, textStatus, jqXHR);
        },
        error: function (jqXHR, textStatus, error) {
            callback(null, error, textStatus, jqXHR);
        }
    });
};