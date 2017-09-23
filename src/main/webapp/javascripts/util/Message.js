"use strict";

/**
 * Display a message giving the user directions or information.
 * @constructor
 */
function Message() { }

/**
 * Display a the message the selector parameter points at, with a given title
 * and message.
 * @param {string} selector     - The message to display as a CSS selector.
 * @param {string} type         - The type of message this is (info, error, warning or success)
 * @param {string} title        - Title as a String or html code to put in the header div.
 * @param {string} [message]    - Message to put after the title, string or html code.
 */
Message.showMessage = function (selector, type, title, message) {
    const jqSelector = $(selector);

    jqSelector.addClass(type);
    jqSelector.removeClass("hidden");
    jqSelector.addClass("visible");

    // Close function.
    jqSelector.on("click", function () {
        $(this).closest(".message").transition("fade");
    });

    // Add text/html content.
    const header = $(selector + " > .header");
    header.append(title);
    if (message) {
        header.after(message);
    }
};