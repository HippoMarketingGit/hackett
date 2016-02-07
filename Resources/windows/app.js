var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

var Common = require("common"), User = require("user"), Database = require("databaseObj"), ImageSync = require("imagesync"), Connection = require("connections"), common = new Common(), user = new User(), database = new Database("SlingDB.sqlite"), imageSync = new ImageSync({
    database: database
}), connection = new Connection(), actwin = require("activitywindow");

Alloy.Globals.callHandler = function(el) {
    el.text = "01665 604200";
    el.addEventListener("click", function() {
        if (Ti.Platform.Android) {
            var intent = Ti.Android.createIntent({
                action: Ti.Android.ACTION_DIAL,
                data: "tel:+441665604200"
            });
            Ti.Android.currentActivity.startActivity(intent);
        } else Ti.Platform.openURL("tel:+441665604200");
    });
};

var online = connection.onlineCheck(function(data) {
    return 1 === data ? true : false;
});

Ti.API.info("App path is " + Ti.Filesystem.applicationDirectory);

if (online) {
    Ti.API.info("online");
    database.updateTables();
    var interval = setInterval(function() {
        if (database.databaseUpdated()) {
            Ti.API.info("Ready (finished updating)");
            if (database.userIsLogged()) {
                Ti.API.info("A user is logged in");
                var dash = Alloy.createController("dashboard").getView();
                dash.open();
            } else {
                Ti.API.info("No user is logged in.");
                var index = Alloy.createController("index").getView();
                index.open();
            }
            clearInterval(interval);
        }
    }, 1e3);
} else {
    Ti.API.info("offline");
    if (database.userIsLogged()) {
        Ti.API.info("A user is Logged In");
        var dash = Alloy.createController("dashboard").getView();
        dash.open();
    } else {
        var index = Alloy.createController("index").getView();
        index.open();
    }
    alert("You are working in offline mode. Any quotes you receive are accurate since your last login. Prices may vary when you next come back online. Your quotes will be saved locally to your handset.");
}

Alloy.createController("index");