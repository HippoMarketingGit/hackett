var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

var Common = require("common"), User = require("user"), Database = require("databaseObj"), ImageSync = require("imagesync"), Connection = require("connections"), common = new Common(), user = new User(), database = new Database("SlingDB.sqlite"), imageSync = new ImageSync({
    database: database
}), connection = new Connection();

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

var loader = Ti.UI.createWindow({
    backgroundColor: "#021b4b"
}), container = Ti.UI.createView({
    height: Ti.UI.SIZE,
    width: Ti.UI.SIZE,
    layout: "vertical"
}), style;

style = Ti.UI.ActivityIndicatorStyle.PLAIN;

var activityIndicator = Ti.UI.createActivityIndicator({
    top: "20dip",
    width: "auto",
    height: "auto",
    message: "Loading...",
    color: "#FFF",
    style: style
}), logo = Ti.UI.createImageView({
    width: "95%",
    height: "auto",
    image: "/images/WHC--logo.png"
});

activityIndicator.show();

container.add(logo);

container.add(activityIndicator);

loader.add(container);

loader.open();

database.createTables();

var online = connection.onlineCheck(function(data) {
    var bool;
    bool = 1 === data ? true : false;
    return bool;
});

if (online) {
    Ti.API.info("online");
    if (common.firstStart(database)) {
        database.downloadData();
        var interval = setInterval(function() {
            if (database.databaseReady(8)) {
                Ti.API.info("Ready");
                var index = Alloy.createController("index").getView();
                index.open();
                loader.close();
                loader = null;
                clearInterval(interval);
                imageSync.checkAndDownload();
            }
        }, 500);
    } else {
        database.updateTables();
        var interval = setInterval(function() {
            if (database.databaseUpdated()) {
                Ti.API.info("Ready (finished updating)");
                if (database.userIsLogged()) {
                    Ti.API.info("A user is Logged In");
                    var dash = Alloy.createController("dashboard").getView();
                    dash.open();
                } else {
                    var index = Alloy.createController("index").getView();
                    index.open();
                }
                loader.close();
                loader = null;
                clearInterval(interval);
                imageSync.checkAndDownload();
            }
        }, 500);
    }
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
    loader.close();
    loader = null;
    alert("You are working in offline mode. Any quotes you receive are accurate since your last login. Prices may vary when you next come back online. Your quotes will be saved locally to your handset.");
}

Alloy.createController("index");