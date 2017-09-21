"use strict";

/**
 * RESTQuestion has methods to send AJAX requests to an Web API.
 * @param quizId    {int} the ID of the quiz to use for context.
 * @constructor
 */
function RESTQuestion(quizId) {
    this.quizId = quizId;
}

/**
 * Get all questions.
 * @param callback  {function} to call once the request succeeds or fails.
 */
RESTQuestion.prototype.getQuestions = function(callback) {
    $.ajax("api/quiz/" + this.quizId + "/question/", {
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
 * @param id        {int} the ID of the question to get.
 * @param callback  {function} to call once the request succeeds or fails.
 */
RESTQuestion.prototype.getQuestion = function(id, callback) {
    $.ajax("api/quiz/" + this.quizId + "/question/" + id, {
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
 * @param question    {object} of key value pairs, with new values to update the
 *                    resource on the server.
 * @param callback    {function} to call once the request succeeds or fails.
 */
RESTQuestion.prototype.createQuestion = function(question, callback) {
    $.ajax("api/quiz/" + this.quizId, {
        type: "POST",
        contentType: "application/json",
        data: question,
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
 * @param id        {int} the ID of the question to update.
 * @param question  {object} of key value pairs, with new values to update the
 *                  resource on the server.
 * @param callback  {function} to call once the request succeeds or fails.
 */
RESTQuestion.prototype.updateQuestion = function(id, question, callback) {
    $.ajax("api/quiz/" + this.quizId + "/question/" + id, {
        type: "PUT",
        contentType: "application/json",
        data: question,
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
 * @param id        {int} the ID of the question to delete.
 * @param callback  {function} to call once the request succeeds or fails.
 */
RESTQuestion.prototype.deleteQuestion = function(id, callback) {
    $.ajax("api/quiz/" + this.quizId + "/question/" + id, {
        type: "DELETE",
        success: function (data, textStatus, jqXHR) {
            callback(data, null, textStatus, jqXHR);
        },
        error: function (jqXHR, textStatus, error) {
            callback(null, error, textStatus, jqXHR);
        }
    });
};