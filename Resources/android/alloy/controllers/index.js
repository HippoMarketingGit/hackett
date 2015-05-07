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
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.header = Ti.UI.createView({
        layout: "vertical",
        top: "26dip",
        width: "100%",
        height: "50dip",
        id: "header"
    });
    $.__views.index.add($.__views.header);
    $.__views.__alloyId60 = Ti.UI.createImageView({
        bottom: "8dip",
        width: "90%",
        image: "/images/WHC--logo.png",
        id: "__alloyId60"
    });
    $.__views.header.add($.__views.__alloyId60);
    $.__views.__alloyId61 = Ti.UI.createView({
        height: "1dip",
        width: "100%",
        backgroundColor: "#f7561e",
        id: "__alloyId61"
    });
    $.__views.index.add($.__views.__alloyId61);
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
    $.__views.__alloyId62 = Ti.UI.createScrollView({
        contentWidth: "auto",
        contentHeight: "auto",
        showVerticalScrollIndicator: true,
        width: "100%",
        height: "100%",
        id: "__alloyId62"
    });
    $.__views.loaderContainer.add($.__views.__alloyId62);
    $.__views.__alloyId63 = Ti.UI.createView({
        layout: "vertical",
        width: "90%",
        id: "__alloyId63"
    });
    $.__views.__alloyId62.add($.__views.__alloyId63);
    $.__views.__alloyId64 = Ti.UI.createView({
        layout: "vertical",
        top: "20dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId64"
    });
    $.__views.__alloyId63.add($.__views.__alloyId64);
    $.__views.__alloyId65 = Ti.UI.createLabel({
        left: "0",
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#FFF",
        text: "Email",
        id: "__alloyId65"
    });
    $.__views.__alloyId64.add($.__views.__alloyId65);
    $.__views.username = Ti.UI.createTextField({
        top: "4dip",
        height: Titanium.UI.SIZE,
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
    $.__views.__alloyId64.add($.__views.username);
    $.__views.__alloyId66 = Ti.UI.createView({
        layout: "vertical",
        top: "20dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId66"
    });
    $.__views.__alloyId63.add($.__views.__alloyId66);
    $.__views.__alloyId67 = Ti.UI.createLabel({
        left: "0",
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#FFF",
        text: "Password",
        id: "__alloyId67"
    });
    $.__views.__alloyId66.add($.__views.__alloyId67);
    $.__views.password = Ti.UI.createTextField({
        top: "4dip",
        height: Titanium.UI.SIZE,
        width: "100%",
        borderWidth: "1dip",
        borderColor: "#fba688",
        backgroundColor: "#FFF",
        font: {
            fontSize: "20dip"
        },
        paddingLeft: "4dip",
        passwordMask: true,
        color: "#000",
        id: "password"
    });
    $.__views.__alloyId66.add($.__views.password);
    $.__views.__alloyId68 = Ti.UI.createView({
        layout: "vertical",
        top: "20dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId68"
    });
    $.__views.__alloyId63.add($.__views.__alloyId68);
    $.__views.login = Ti.UI.createButton({
        width: "100%",
        height: "26dip",
        backgroundImage: "/images/WHC-button--primary.png",
        title: "LOG IN",
        color: "#FFF",
        textAlign: "left",
        font: {
            fontSize: 16
        },
        id: "login"
    });
    $.__views.__alloyId68.add($.__views.login);
    openDashboard ? $.__views.login.addEventListener("click", openDashboard) : __defers["$.__views.login!click!openDashboard"] = true;
    $.__views.__alloyId69 = Ti.UI.createView({
        layout: "vertical",
        top: "20dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId69"
    });
    $.__views.__alloyId63.add($.__views.__alloyId69);
    $.__views.__alloyId70 = Ti.UI.createView({
        layout: "horizontal",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId70"
    });
    $.__views.__alloyId69.add($.__views.__alloyId70);
    $.__views.__alloyId71 = Ti.UI.createLabel({
        left: "5dip",
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#FFF",
        font: {
            fontSize: 14
        },
        text: "Recover my password",
        id: "__alloyId71"
    });
    $.__views.__alloyId70.add($.__views.__alloyId71);
    $.__views.__alloyId72 = Ti.UI.createImageView({
        left: "10dip",
        height: "10dip",
        width: "15dip",
        image: "/images/WHC--arrow-right.png",
        id: "__alloyId72"
    });
    $.__views.__alloyId70.add($.__views.__alloyId72);
    $.__views.__alloyId73 = Ti.UI.createView({
        layout: "vertical",
        top: "20dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        bottom: "20dip",
        id: "__alloyId73"
    });
    $.__views.__alloyId63.add($.__views.__alloyId73);
    $.__views.__alloyId74 = Ti.UI.createLabel({
        left: "0",
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#FFF",
        top: "20dip",
        font: {
            fontSize: 14
        },
        text: "Don't have an account?",
        id: "__alloyId74"
    });
    $.__views.__alloyId73.add($.__views.__alloyId74);
    $.__views.register = Ti.UI.createButton({
        top: "4dip",
        width: "100%",
        height: "26dip",
        backgroundImage: "/images/WHC-button--secondary.png",
        title: "CREATE ACCOUNT",
        color: "#FFF",
        textAlign: "left",
        font: {
            fontSize: 16
        },
        id: "register"
    });
    $.__views.__alloyId73.add($.__views.register);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Database = require("databaseObj"), database = new Database("SlingDB.sqlite");
    $.register.addEventListener("click", function() {
        var win = Alloy.createController("register").getView();
        $.index.close();
        $.index = null;
        win.open();
    });
    __defers["$.__views.login!click!openDashboard"] && $.__views.login.addEventListener("click", openDashboard);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;