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
    $.ajax("api/quizzes/", {
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
    $.ajax("api/quizzes/" + id, {
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
 * @param {Object} quiz         - Quiz object used to create the resource on the server.
 * @param {callback} callback   - to call once the request succeeds or fails.
 */
RESTQuiz.createQuiz = function(quiz, callback) {
    $.ajax("api/quizzes/", {
        type: "POST",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify(quiz),
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
 * @param {Object} quiz         - Quiz object to update the resource on the server.
 * @param {callback} callback   - to call once the request succeeds or fails.
 */
RESTQuiz.updateQuiz = function(id, quiz, callback) {
    $.ajax("api/quizzes/" + id, {
        type: "PUT",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify(quiz),
        success: function (data, textStatus, jqXHR) {
            callback(data, null, textStatus, jqXHR);
        },
        error: function (jqXHR, textStatus, error) {
            callback(null, error, textStatus, jqXHR);
        }
    });
};

/**
 * Partialy update a quiz.
 * @param {int} id              - The ID of the quiz to update.
 * @param {object} quiz         - Object with updated values, not all values are required.
 * @param {callback} callback   - Callback function to run on success or error.
 */
RESTQuiz.partiallyUpdateQuiz = function(id, quiz, callback) {
    $.ajax("api/quizzes/" + id, {
        type: "PATCH",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify(quiz),
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
    $.ajax("api/quizzes/" + id, {
        type: "DELETE",
        success: function (data, textStatus, jqXHR) {
            callback(data, null, textStatus, jqXHR);
        },
        error: function (jqXHR, textStatus, error) {
            callback(null, error, textStatus, jqXHR);
        }
    });
};