function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function openConfigurator() {
        var win = Alloy.createController("slingConfiguration").getView();
        win.open();
        $.dashboard.close();
        $.dashboard = null;
    }
    function openAccountSettings() {
        var win = Alloy.createController("accountSettings").getView();
        win.open();
        $.dashboard.close();
        $.dashboard = null;
    }
    function openQuotes() {
        var win = Alloy.createController("quotes").getView();
        win.open();
        $.dashboard.close();
        $.dashboard = null;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "dashboard";
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
    $.__views.dashboard = Ti.UI.createWindow({
        statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
        layout: "vertical",
        color: "#FFF",
        backgroundColor: "#0d182f",
        id: "dashboard"
    });
    $.__views.dashboard && $.addTopLevelView($.__views.dashboard);
    $.__views.header = Ti.UI.createView({
        top: "26dip",
        width: "100%",
        height: "85dip",
        backgroundColor: "#eb6209",
        layout: "vertical",
        id: "header"
    });
    $.__views.dashboard.add($.__views.header);
    $.__views.__alloyId28 = Ti.UI.createImageView({
        top: "5dip",
        width: Ti.UI.SIZE,
        height: "70%",
        image: "/images/WHC--logo--transparent.png",
        id: "__alloyId28"
    });
    $.__views.header.add($.__views.__alloyId28);
    $.__views.tel = Ti.UI.createLabel({
        left: "0",
        width: "100%",
        height: Ti.UI.SIZE,
        color: "#FFF",
        className: "label",
        top: "-10dip",
        textAlign: "center",
        id: "tel"
    });
    $.__views.header.add($.__views.tel);
    $.__views.__alloyId29 = Ti.UI.createView({
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
        id: "__alloyId29"
    });
    $.__views.dashboard.add($.__views.__alloyId29);
    $.__views.wrapper = Ti.UI.createView({
        layout: "vertical",
        width: "100%",
        id: "wrapper"
    });
    $.__views.__alloyId29.add($.__views.wrapper);
    $.__views.newQuote = Ti.UI.createView({
        height: "33.3%",
        width: "100%",
        className: "button--tertiary",
        id: "newQuote",
        backgroundColor: "#2b3b94"
    });
    $.__views.wrapper.add($.__views.newQuote);
    openConfigurator ? $.addListener($.__views.newQuote, "click", openConfigurator) : __defers["$.__views.newQuote!click!openConfigurator"] = true;
    $.__views.__alloyId30 = Ti.UI.createLabel({
        left: "10dip",
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#FFF",
        className: "label",
        text: "Start a New Quote",
        touchEnabled: false,
        id: "__alloyId30"
    });
    $.__views.newQuote.add($.__views.__alloyId30);
    $.__views.__alloyId31 = Ti.UI.createImageView({
        right: "10dip",
        height: "60dip",
        width: "auto",
        className: "icon",
        touchEnabled: false,
        image: "/images/WHC-magnifying-glass.png",
        id: "__alloyId31"
    });
    $.__views.newQuote.add($.__views.__alloyId31);
    $.__views.__alloyId32 = Ti.UI.createView({
        bottom: "0",
        width: "100%",
        height: "1dip",
        backgroundColor: "#FFF",
        touchEnabled: false,
        id: "__alloyId32"
    });
    $.__views.newQuote.add($.__views.__alloyId32);
    $.__views.__alloyId33 = Ti.UI.createView({
        height: "33.3%",
        width: "100%",
        className: "button--tertiary",
        backgroundColor: "#2b3b94",
        id: "__alloyId33"
    });
    $.__views.wrapper.add($.__views.__alloyId33);
    openQuotes ? $.addListener($.__views.__alloyId33, "click", openQuotes) : __defers["$.__views.__alloyId33!click!openQuotes"] = true;
    $.__views.__alloyId34 = Ti.UI.createLabel({
        left: "10dip",
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#FFF",
        className: "label",
        text: "Retrieve Existing Quote",
        touchEnabled: false,
        id: "__alloyId34"
    });
    $.__views.__alloyId33.add($.__views.__alloyId34);
    $.__views.__alloyId35 = Ti.UI.createImageView({
        right: "10dip",
        height: "60dip",
        width: "auto",
        className: "icon",
        touchEnabled: false,
        image: "/images/WHC-quote.png",
        id: "__alloyId35"
    });
    $.__views.__alloyId33.add($.__views.__alloyId35);
    $.__views.__alloyId36 = Ti.UI.createView({
        bottom: "0",
        width: "100%",
        height: "1dip",
        backgroundColor: "#FFF",
        touchEnabled: false,
        id: "__alloyId36"
    });
    $.__views.__alloyId33.add($.__views.__alloyId36);
    $.__views.__alloyId37 = Ti.UI.createView({
        height: "33.3%",
        width: "100%",
        className: "button--tertiary",
        backgroundColor: "#2b3b94",
        id: "__alloyId37"
    });
    $.__views.wrapper.add($.__views.__alloyId37);
    openAccountSettings ? $.addListener($.__views.__alloyId37, "click", openAccountSettings) : __defers["$.__views.__alloyId37!click!openAccountSettings"] = true;
    $.__views.__alloyId38 = Ti.UI.createLabel({
        left: "10dip",
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#FFF",
        className: "label",
        text: "Account Settings",
        touchEnabled: false,
        id: "__alloyId38"
    });
    $.__views.__alloyId37.add($.__views.__alloyId38);
    $.__views.__alloyId39 = Ti.UI.createImageView({
        right: "10dip",
        height: "60dip",
        width: "auto",
        className: "icon",
        touchEnabled: false,
        image: "/images/WHC-cog.png",
        id: "__alloyId39"
    });
    $.__views.__alloyId37.add($.__views.__alloyId39);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Globals.callHandler($.tel);
    __defers["$.__views.newQuote!click!openConfigurator"] && $.addListener($.__views.newQuote, "click", openConfigurator);
    __defers["$.__views.__alloyId33!click!openQuotes"] && $.addListener($.__views.__alloyId33, "click", openQuotes);
    __defers["$.__views.__alloyId37!click!openAccountSettings"] && $.addListener($.__views.__alloyId37, "click", openAccountSettings);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;