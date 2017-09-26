"use strict";

/**
 * RESTQuestion has methods to send AJAX requests to an Web API.
 * @param {int} quizId - the ID of the quiz to use for context.
 * @constructor
 */
function RESTQuestion(quizId) {
    this.quizId = quizId;
}

/**
 * @callback callback
 * @param {*} data              - formatted according to the dataType given to AJAX.
 * @param {string} errorThrown  - HTTP status text.
 * @param {string} textStatus   -
 * @param {jqXHR} jqXHR         - jQuery XMLHttpRequest object.
 */

/**
 * Get all questions.
 * @param {callback} callback - to call once the request succeeds or fails.
 */
RESTQuestion.prototype.getQuestions = function(callback) {
    $.ajax("api/quizzes/" + this.quizId + "/questions/", {
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
 * Get a question.
 * @param {int} id            - the ID of the question to get.
 * @param {callback} callback - to call once the request succeeds or fails.
 */
RESTQuestion.prototype.getQuestion = function(id, callback) {
    $.ajax("api/quizzes/" + this.quizId + "/questions/" + id, {
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
 * Create a question.
 * @param {Object} question     - Question object to create the resource on the server.
 * @param {callback} callback   - to call once the request succeeds or fails.
 */
RESTQuestion.prototype.createQuestion = function(question, callback) {
    $.ajax("api/quizzes/" + this.quizId, {
        type: "POST",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify(question),
        success: function (data, textStatus, jqXHR) {
            callback(data, null, textStatus, jqXHR);
        },
        error: function (jqXHR, textStatus, error) {
            callback(null, error, textStatus, jqXHR);
        }
    });
};

/**
 * Update a question.
 * @param {int} id              - the ID of the question to update.
 * @param {Object} question     - Question object to update the resource on the server.
 * @param {callback} callback   - to call once the request succeeds or fails.
 */
RESTQuestion.prototype.updateQuestion = function(id, question, callback) {
    $.ajax("api/quizzes/" + this.quizId + "/questions/" + id, {
        type: "PUT",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify(question),
        success: function (data, textStatus, jqXHR) {
            callback(data, null, textStatus, jqXHR);
        },
        error: function (jqXHR, textStatus, error) {
            callback(null, error, textStatus, jqXHR);
        }
    });
};

/**
 * Partially update a question.
 * @param {int} id              - The ID of the question to update.
 * @param {Object} question     - Question object with updated values, all values are not required.
 * @param {callback} callback   - to run on success or error.
 */
RESTQuestion.prototype.partiallyUpdateQuiz = function(id, question, callback) {
    $.ajax("api/quizzes/" + this.quizId + "/questions/" + id, {
        type: "PATCH",
        contentType: "application/json; charset=UTF-8",
        data: JSON.stringify(question),
        success: function (data, textStatus, jqXHR) {
            callback(data, null, textStatus, jqXHR);
        },
        error: function (jqXHR, textStatus, error) {
            callback(null, error, textStatus, jqXHR);
        }
    });
};

/**
 * Delete a question.
 * @param {int} id              - the ID of the question to delete.
 * @param {callback} callback   - to call once the request succeeds or fails.
 */
RESTQuestion.prototype.deleteQuestion = function(id, callback) {
    $.ajax("api/quizzes/" + this.quizId + "/questions/" + id, {
        type: "DELETE",
        success: function (data, textStatus, jqXHR) {
            callback(data, null, textStatus, jqXHR);
        },
        error: function (jqXHR, textStatus, error) {
            callback(null, error, textStatus, jqXHR);
        }
    });
};