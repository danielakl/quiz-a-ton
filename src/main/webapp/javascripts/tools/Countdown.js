"use strict";

// MS = milliseconds, S = seconds, M = minutes, H = hours, D = days
const MS_PER_S = 1000,
    S_PER_M = 60,
    M_PER_H = 60,
    H_PER_D = 24;

//Object, used to countdown before quiz start and questions
function Countdown(d, h, m, s) {
    this.d = d;
    this.h = h;
    this.m = m;
    this.s = s;
}

Countdown.remaining = function (date) {
    const remainingMilis = date - Date.now();
    var s = 0,
        m = 0,
        h = 0,
        d = 0;

    //Check that the time aint up/past the date
    if (remainingMilis > 0) {
        s = Math.floor((remainingMilis / MS_PER_S) % 60);
        m = Math.floor((remainingMilis / MS_PER_S / S_PER_M) % 60);
        h   = Math.floor((remainingMilis / (MS_PER_S * S_PER_M * M_PER_H)) % 24);
        d    = Math.floor(remainingMilis / (MS_PER_S * S_PER_M * M_PER_H * H_PER_D));
    }

    //Return the time until "date"
    return {
        total: remainingMilis,
        days: d,
        hours: h,
        minutes: m,
        seconds: s
    }
};