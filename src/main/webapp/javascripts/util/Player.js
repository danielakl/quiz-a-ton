"use strict";

/**
 * Player object for Quiz objects.
 * @param nickname  {string} the nickname of the player.
 * @param points    {int} how many points a player have within a quiz.
 * @constructor
 */
function Player(nickname, points) {
    this.nickname = nickname;
    this.points = points;
}