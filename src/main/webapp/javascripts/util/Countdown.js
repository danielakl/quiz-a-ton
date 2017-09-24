"use strict";

// Constants
const MILLISECONDS_PER_SECOND   = 1000,
      SECONDS_PER_MINUTE        = 60,
      MINUTES_PER_HOUR          = 60,
      HOURS_PER_DAY             = 24;

/**
 * Construct a countdown object, calculating time remaining and inserting the
 * values into jQuery elements.
 * @param {jQuery} [days]     - A jQuery element to insert remaining days into.
 * @param {jQuery} [hours]    - A jQuery element to insert remaining hours into.
 * @param {jQuery} [minutes]  - A jQuery element to insert remaining minutes into.
 * @param {jQuery} [seconds]  - A jQuery element to insert remaining seconds into.
 * @constructor
 */
function Countdown(days, hours, minutes, seconds) {
    this.days = days;
    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;

    this.intervalId = 0;
}

/**
 * Calculates the remaining time in seconds, minutes, hours and days.
 * From the current date and time to the given date.
 * @param {Date} endDate - The date to calculate the time to.
 * @return {{total: number, days: number, hours: number, minutes: number, seconds: number}}
 */
Countdown.remainingTime = function(endDate) {
    // Calculate remaining time.
    const millisLeft = endDate - Date.now();
    var seconds = 0,
        minutes = 0,
        hours   = 0,
        days    = 0;

    if (millisLeft > 0) {
        seconds = Math.floor((millisLeft / MILLISECONDS_PER_SECOND) % 60);
        minutes = Math.floor((millisLeft / MILLISECONDS_PER_SECOND / SECONDS_PER_MINUTE) % 60);
        hours   = Math.floor((millisLeft / (MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE * MINUTES_PER_HOUR)) % 24);
        days    = Math.floor(millisLeft / (MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE * MINUTES_PER_HOUR * HOURS_PER_DAY));
    }

    // Return remaining time.
    return {
        "total": millisLeft,
        "days": days,
        "hours": hours,
        "minutes": minutes,
        "seconds": seconds
    }
};

/**
 * Update the remaining time of the jQuery elements.
 * @param {Date} endDate - The date to count down to.
 */
Countdown.prototype.updateCountdown = function(endDate) {
    // Get remaining time
    const time = Countdown.remainingTime(endDate);

    // Update jQuery elements with remaining time.
    if (this.days) this.days.val(time.days);
    if (this.hours) this.hours.val(time.hours);
    if (this.minutes) this.minutes.val(time.minutes);
    if (this.seconds) this.seconds.val(time.seconds);
};

/**
 * Initialize the countdown, outputting the remaining time to the HTML elements.
 * @param {Date} endDate - The date to end the countdown on.
 * @return {boolean}
 */
Countdown.prototype.initialize = function(endDate) {
    this.updateCountdown(endDate);

    /* As passing additional parameters in setInterval does not work in IE9
       and earlier. This will use a callback function. */
    this.intervalId = setInterval(function() {
        // Get remaining time
        const time = Countdown.remainingTime(endDate);

        // Update jQuery elements with remaining time.
        if (this.days) this.days.val(time.days);
        if (this.hours) this.hours.val(time.hours);
        if (this.minutes) this.minutes.val(time.minutes);
        if (this.seconds) this.seconds.val(time.seconds);

        // Stop updating time if countdown finished.
        if (time.total <= 0) {
            clearInterval(this.intervalId);
        }
    }, 1000);
    return true;
};

/**
 * Stop the countdown, assuming the initialize function has been run previously.
 */
Countdown.prototype.stop = function() {
    clearInterval(this.intervalId);
};