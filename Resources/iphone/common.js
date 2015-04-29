function Common() {}

Common.prototype.getDate = function() {
    var d = new Date();
    return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
};

Common.prototype.generateQuoteRef = function(user) {
    var company = null, personal = null, id = null, ref = null;
    company = user["company"].substring(0, 1);
    personal = user["name"].substring(0, 2);
    id = user["id"];
    count = parseInt(user["quotes"], 10) + 1;
    ref = [ company + personal + id, count ].join("-").toUpperCase();
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