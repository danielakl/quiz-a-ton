"use strict";

/**
 * Question object for Quiz objects.
 * @param {string} question         - the question.
 * @param {string} [imageURL]       - a URL to a image to display along
 *                                    the question.
 * @param {string[]} answers        - a array of possible answers for the question.
 * @param {int} points              - the amount of points a user will get for
 *                                    answering correctly.
 * @param {int} correctAnswerIndex  - the array index of the correct answer.
 * @param {int} duration            - the time a user will have to answer the q
 *                                    question in seconds.
 * @constructor
 */
function Question(question, imageURL, answers, points, correctAnswerIndex, duration) {
    this.question = question;
    this.imageURL = imageURL;
    this.answers = answers;
    this.points = points;
    this.correctAnswerIndex = correctAnswerIndex;
    this.duration = duration;
}