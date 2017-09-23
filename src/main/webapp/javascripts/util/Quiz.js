"use strict";

/**
 * Quiz object for sending through RESTQuiz PUT and POST operations.
 * @param name          {string} the name or title of the quiz.
 * @param creator       {string} the creator or author of the quiz.
 * @param startTime     {Date} the time the quiz starts.
 * @param questions     {Question[]} an array of questions.
 * @param playerList    {Player[]} an array of players.
 * @constructor
 */
function Quiz(name, creator, startTime, questions, playerList) {
    this.name = name;
    this.creator = creator;
    this.startTime = startTime;
    this.questions = questions;
    this.playerList = playerList;
}