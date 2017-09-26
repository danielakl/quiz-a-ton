/**
 * Get the value of a given parameter from the URL.
 * Found on: https://stackoverflow.com/questions/19491336/get-url-parameter-jquery-or-how-to-get-query-string-values-in-js
 * @param {string} parameter - Name of the parameter to look for.
 * @return {string}
 */
function getUrlParameter(parameter) {
    const url = decodeURIComponent(window.location.search.substring(1));
    const urlParameters = url.split('&');
    var parameterValue;

    for (var i = 0; i < urlParameters.length; i++) {
        parameterValue = urlParameters[i].split('=');
        if (parameterValue[0] === parameter) {
            return (parameterValue[1] === undefined) ? "" : parameterValue[1];
        }
    }
    return null;
}