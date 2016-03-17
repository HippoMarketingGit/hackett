function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function openDashboard() {
        database.logIn($.username.value, $.password.value, function(result) {
            if ("success" === result) {
                var win = Alloy.createController("dashboard").getView();
                win.open();
                $.index.close();
                $.index = null;
            }
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.index = Ti.UI.createWindow({
        layout: "vertical",
        color: "#FFF",
        backgroundColor: "#0d182f",
        width: "100%",
        left: "0",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.header = Ti.UI.createView({
        top: "26dip",
        height: "85dip",
        backgroundColor: "#eb6209",
        layout: "vertical",
        id: "header"
    });
    $.__views.index.add($.__views.header);
    $.__views.__alloyId53 = Ti.UI.createImageView({
        top: "5dip",
        width: "100%",
        height: "70%",
        image: "/images/WHC--logo--transparent.png",
        id: "__alloyId53"
    });
    $.__views.header.add($.__views.__alloyId53);
    $.__views.tel = Ti.UI.createLabel({
        left: "0",
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#FFF",
        textAlign: "center",
        id: "tel"
    });
    $.__views.header.add($.__views.tel);
    $.__views.loaderContainer = Ti.UI.createView({
        backgroundGradient: {
            type: "linear",
            colors: [ "#021b4b", "#032d73" ],
            startPoint: {
                x: 0,
                y: 0
            },
            endPoint: {
                x: 0,
                y: 960
            },
            backFillStart: false
        },
        id: "loaderContainer"
    });
    $.__views.index.add($.__views.loaderContainer);
    $.__views.__alloyId54 = Ti.UI.createScrollView({
        contentWidth: "auto",
        contentHeight: "auto",
        showVerticalScrollIndicator: true,
        width: "100%",
        height: "100%",
        id: "__alloyId54"
    });
    $.__views.loaderContainer.add($.__views.__alloyId54);
    $.__views.__alloyId55 = Ti.UI.createView({
        layout: "vertical",
        width: "90%",
        id: "__alloyId55"
    });
    $.__views.__alloyId54.add($.__views.__alloyId55);
    $.__views.__alloyId56 = Ti.UI.createView({
        layout: "vertical",
        top: "20dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId56"
    });
    $.__views.__alloyId55.add($.__views.__alloyId56);
    $.__views.__alloyId57 = Ti.UI.createLabel({
        left: "0",
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#FFF",
        text: "Email",
        id: "__alloyId57"
    });
    $.__views.__alloyId56.add($.__views.__alloyId57);
    $.__views.username = Ti.UI.createTextField({
        top: "4dip",
        height: "45dip",
        width: "100%",
        borderWidth: "1dip",
        borderColor: "#fba688",
        backgroundColor: "#FFF",
        font: {
            fontSize: "20dip"
        },
        paddingLeft: "4dip",
        color: "#000",
        autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
        id: "username"
    });
    $.__views.__alloyId56.add($.__views.username);
    $.__views.__alloyId58 = Ti.UI.createView({
        layout: "vertical",
        top: "20dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId58"
    });
    $.__views.__alloyId55.add($.__views.__alloyId58);
    $.__views.__alloyId59 = Ti.UI.createLabel({
        left: "0",
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#FFF",
        text: "Password",
        id: "__alloyId59"
    });
    $.__views.__alloyId58.add($.__views.__alloyId59);
    $.__views.password = Ti.UI.createTextField({
        top: "4dip",
        height: "45dip",
        width: "100%",
        borderWidth: "1dip",
        borderColor: "#fba688",
        backgroundColor: "#FFF",
        font: {
            fontSize: "20dip"
        },
        paddingLeft: "4dip",
        color: "#000",
        passwordMask: "true",
        id: "password"
    });
    $.__views.__alloyId58.add($.__views.password);
    $.__views.__alloyId60 = Ti.UI.createView({
        layout: "vertical",
        top: "20dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId60"
    });
    $.__views.__alloyId55.add($.__views.__alloyId60);
    $.__views.login = Ti.UI.createButton({
        width: "100%",
        height: "50dip",
        title: "LOG IN",
        textAlign: "left",
        font: {
            fontSize: 16
        },
        id: "login"
    });
    $.__views.__alloyId60.add($.__views.login);
    openDashboard ? $.addListener($.__views.login, "click", openDashboard) : __defers["$.__views.login!click!openDashboard"] = true;
    $.__views.__alloyId61 = Ti.UI.createView({
        layout: "vertical",
        top: "20dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        bottom: "20dip",
        id: "__alloyId61"
    });
    $.__views.__alloyId55.add($.__views.__alloyId61);
    $.__views.__alloyId62 = Ti.UI.createLabel({
        left: "0",
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#FFF",
        top: "20dip",
        font: {
            fontSize: 14
        },
        text: "Don't have an account?",
        id: "__alloyId62"
    });
    $.__views.__alloyId61.add($.__views.__alloyId62);
    $.__views.register = Ti.UI.createButton({
        top: "4dip",
        width: "100%",
        height: "50dip",
        title: "CREATE ACCOUNT",
        textAlign: "left",
        font: {
            fontSize: 16
        },
        id: "register"
    });
    $.__views.__alloyId61.add($.__views.register);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Database = require("databaseObj"), database = new Database("SlingDB.sqlite");
    Alloy.Globals.callHandler($.tel);
    $.register.addEventListener("click", function() {
        var win = Alloy.createController("register").getView();
        win.open();
        $.index.close();
        $.index = null;
    });
    __defers["$.__views.login!click!openDashboard"] && $.addListener($.__views.login, "click", openDashboard);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;