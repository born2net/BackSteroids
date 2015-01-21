window.onerror = function (msg, url, line, col, error) {
    if (window.debug == undefined || window.debug){
        var extra = !col ? '' : '\ncolumn: ' + col;
        extra += !error ? '' : '\nerror: ' + error;
        alert("err 1: " + msg + "\nurl: " + url + "\nline: " + line + extra);
        var suppressErrorAlert = true;
        // If you return true, then error alerts (like in older versions of
        // Internet Explorer) will be suppressed.
        return suppressErrorAlert;
    }
};
