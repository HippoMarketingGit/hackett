function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "slingConfiguration";
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
    $.__views.slingConfiguration = Ti.UI.createWindow({
        layout: "vertical",
        color: "#FFF",
        backgroundColor: "#0d182f",
        id: "slingConfiguration"
    });
    $.__views.slingConfiguration && $.addTopLevelView($.__views.slingConfiguration);
    $.__views.header = Ti.UI.createView({
        layout: "vertical",
        top: "26dip",
        width: "100%",
        height: "50dip",
        id: "header"
    });
    $.__views.slingConfiguration.add($.__views.header);
    $.__views.__alloyId178 = Ti.UI.createImageView({
        bottom: "8dip",
        width: "90%",
        image: "/images/WHC--logo.png",
        id: "__alloyId178"
    });
    $.__views.header.add($.__views.__alloyId178);
    $.__views.__alloyId179 = Ti.UI.createView({
        height: "1dip",
        width: "100%",
        backgroundColor: "#f7561e",
        id: "__alloyId179"
    });
    $.__views.slingConfiguration.add($.__views.__alloyId179);
    $.__views.wrapper = Ti.UI.createView({
        backgroundGradient: {
            type: "linear",
            colors: [ {
                color: "#021b4b",
                offset: 0
            }, {
                color: "#032d73",
                offset: .5
            } ],
            startPoint: {
                x: "0%",
                y: "0%"
            },
            endPoint: {
                x: "0%",
                y: "100%"
            }
        },
        id: "wrapper"
    });
    $.__views.slingConfiguration.add($.__views.wrapper);
    $.__views.scrollView = Ti.UI.createScrollView({
        layout: "vertical",
        bottom: "51dip",
        id: "scrollView"
    });
    $.__views.wrapper.add($.__views.scrollView);
    $.__views.footer = Ti.UI.createView({
        bottom: "0",
        width: "100%",
        height: "50dip",
        id: "footer"
    });
    $.__views.wrapper.add($.__views.footer);
    $.__views.__alloyId180 = Ti.UI.createView({
        height: "1dip",
        width: "100%",
        top: "0",
        backgroundColor: "#FFF",
        id: "__alloyId180"
    });
    $.__views.footer.add($.__views.__alloyId180);
    $.__views.back = Ti.UI.createView({
        left: "5%",
        layout: "horizontal",
        textAlign: "right",
        backgroundImage: "/images/WHC-button--back.png",
        width: "100dip",
        height: "26dip",
        id: "back"
    });
    $.__views.footer.add($.__views.back);
    $.__views.__alloyId181 = Ti.UI.createLabel({
        text: "BACK",
        touchEnabled: false,
        top: "2dip",
        left: "42dip",
        width: Ti.UI.SIZE,
        color: "#FFF",
        id: "__alloyId181"
    });
    $.__views.back.add($.__views.__alloyId181);
    $.__views.next = Ti.UI.createButton({
        layout: "vertical",
        right: "5%",
        width: "100dip",
        height: "26dip",
        backgroundImage: "/images/WHC-button--next.png",
        title: "NEXT",
        color: "#FFF",
        textAlign: "left",
        verticalAlign: "bottom",
        font: {
            fontSize: 16
        },
        id: "next"
    });
    $.__views.footer.add($.__views.next);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Common = require("common"), Navigation = (new Common(), require("navigation")), navigation = new Navigation(), Sling = require("sling"), sling = new Sling(), pages = [ "slingType", "legs", "load", "headroom", "terminations" ];
    Alloy.Globals.sling = sling;
    Alloy.Globals.goBack = function() {
        navigation.previousPage($.scrollView, pages, Alloy.Globals.sling, $.slingConfiguration);
    };
    navigation.openFirstPage($.scrollView, pages);
    $.next.addEventListener("click", function() {
        navigation.nextPage($.scrollView, pages, Alloy.Globals.sling);
    });
    $.back.addEventListener("click", function() {
        navigation.previousPage($.scrollView, pages, Alloy.Globals.sling, $.slingConfiguration);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;