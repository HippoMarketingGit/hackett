function Common() {}

Common.prototype.getDate = function() {
    var d = new Date();
    return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
};

Common.prototype.generateQuoteRef = function(user, quote) {
    var company = null, personal = null, id = null, alphabet = "ABCDEFGHJKMNPQRSTUVWXYZ23456789", chars = "", ref = null, num = 0;
    company = user["company"].substring(0, 1);
    personal = user["name"].substring(0, 2);
    id = user["id"];
    for (var i = 0; 3 > i; i++) chars += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    if (quote["description"] && quote["description"].length > 0) num = parseInt(quote["description"].length, 10); else {
        num = 0;
        var i = 0;
        if (quote["legs"]) {
            i = parseInt(quote["legs"], 10);
            isNaN(i) || (num += i);
        }
        if (quote["grade"]) {
            i = parseInt(quote["grade"], 10);
            isNaN(i) || (num += i);
        }
        if (quote["length"]) {
            i = parseInt(quote["length"], 10);
            isNaN(i) || (num += i);
        }
        if (quote["load"]) {
            i = parseInt(quote["load"], 10);
            isNaN(i) || (num += i);
        }
    }
    var count = parseInt(user["company"].length, 10) + parseInt(user["name"].length, 10) + parseInt(user["email"].length, 10) + parseInt(num, 10);
    ref = [ company + personal + id, chars + count.toString() ].join("-").toUpperCase();
    Ti.API.info("Ref: " + ref);
    return ref;
};

Common.prototype.createUnix = function() {
    return Math.round(new Date().getTime() / 1e3);
};

Common.prototype.firstStart = function(database) {
    var start, db = database.openDb(), row = db.execute("SELECT * FROM VersionCheck");
    if (row.isValidRow()) {
        Ti.API.info("Not First Start");
        start = false;
    } else {
        Ti.API.info("First Start");
        start = true;
    }
    database.closeDb(db);
    return start;
};

Common.prototype.openApp = function() {
    var Database = require("databaseObj"), database = new Database("SlingDB"), db = database.openDb(), logCheck = db.execute('SELECT * FROM UserProfile WHERE loggedIn = "1"');
    if (logCheck.isValidRow()) {
        var val = logCheck.fieldByName("loggedIn");
        if (1 === val) {
            var dash = Alloy.createController("dashboard").getView();
            dash.open();
            database.closeDb(db);
        } else {
            var index = Alloy.createController("index").getView();
            index.open();
            database.closeDb(db);
        }
    } else {
        var index = Alloy.createController("index").getView();
        index.open();
        database.closeDb(db);
    }
};

Common.prototype.padIntRight = function(num) {
    var str = num.toString(), strArray = str.split(".");
    if ("" === str || 1 === strArray.length) return "";
    strArray[1].length < 2 && (strArray[1] += "0");
    return strArray[0] + "." + strArray[1];
};

module.exports = Common;