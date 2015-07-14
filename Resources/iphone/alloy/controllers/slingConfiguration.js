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
        statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
        layout: "vertical",
        color: "#FFF",
        backgroundColor: "#0d182f",
        id: "slingConfiguration"
    });
    $.__views.slingConfiguration && $.addTopLevelView($.__views.slingConfiguration);
    $.__views.header = Ti.UI.createView({
        top: "26dip",
        width: "100%",
        height: "65dip",
        backgroundColor: "#eb6209",
        id: "header"
    });
    $.__views.slingConfiguration.add($.__views.header);
    $.__views.__alloyId219 = Ti.UI.createImageView({
        width: Ti.UI.SIZE,
        height: "80%",
        image: "/images/WHC--logo--transparent.png",
        id: "__alloyId219"
    });
    $.__views.header.add($.__views.__alloyId219);
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
    $.__views.__alloyId220 = Ti.UI.createView({
        height: "1dip",
        width: "100%",
        top: "0",
        backgroundColor: "#FFF",
        id: "__alloyId220"
    });
    $.__views.footer.add($.__views.__alloyId220);
    $.__views.back = Ti.UI.createView(function() {
        var o = {};
        _.extend(o, {
            width: "100dip",
            height: "30dip"
        });
        Alloy.isHandheld && _.extend(o, {
            width: "88dip",
            height: "26dip"
        });
        _.extend(o, {
            left: "5%",
            layout: "vertical",
            backgroundImage: "/images/WHC-button--back.png",
            id: "back"
        });
        return o;
    }());
    $.__views.footer.add($.__views.back);
    $.__views.__alloyId221 = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            font: {
                fontSize: 16
            }
        });
        Alloy.isHandheld && _.extend(o, {
            font: {
                fontSize: 14
            }
        });
        _.extend(o, {
            text: "BACK",
            touchEnabled: false,
            right: "5%",
            height: "100%",
            width: Ti.UI.SIZE,
            color: "#FFF",
            id: "__alloyId221"
        });
        return o;
    }());
    $.__views.back.add($.__views.__alloyId221);
    $.__views.home = Ti.UI.createButton(function() {
        var o = {};
        _.extend(o, {
            layout: "vertical",
            backgroundImage: "/images/WHC-button--blank.png",
            title: "HOME",
            color: "#FFF",
            textAlign: "center",
            verticalAlign: "middle",
            width: "100dip",
            height: "30dip",
            font: {
                fontSize: 16
            }
        });
        Alloy.isHandheld && _.extend(o, {
            width: "88dip",
            height: "26dip"
        });
        Alloy.isHandheld && _.extend(o, {
            font: {
                fontSize: 14
            }
        });
        _.extend(o, {
            id: "home"
        });
        return o;
    }());
    $.__views.footer.add($.__views.home);
    $.__views.next = Ti.UI.createButton(function() {
        var o = {};
        _.extend(o, {
            layout: "vertical",
            right: "5%",
            width: "100dip",
            height: "30dip",
            backgroundImage: "/images/WHC-button--next.png",
            title: "NEXT",
            color: "#FFF",
            textAlign: "left",
            verticalAlign: "middle",
            font: {
                fontSize: 16
            }
        });
        Alloy.isHandheld && _.extend(o, {
            width: "88dip",
            height: "26dip"
        });
        Alloy.isHandheld && _.extend(o, {
            font: {
                fontSize: 14
            }
        });
        _.extend(o, {
            id: "next"
        });
        return o;
    }());
    $.__views.footer.add($.__views.next);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Common = require("common"), Navigation = (new Common(), require("navigation")), navigation = new Navigation(), Sling = require("sling"), sling = new Sling(), pages = [ "slingType", "legs", "load", "headroom", "terminations" ];
    Alloy.Globals.sling = sling;
    Alloy.Globals.goBack = function() {
        navigation.previousPage($.scrollView, pages, Alloy.Globals.sling, $.slingConfiguration);
    };
    Alloy.Globals.goNext = function() {
        navigation.nextPage($.scrollView, pages, Alloy.Globals.sling);
    };
    navigation.openFirstPage($.scrollView, pages);
    $.next.addEventListener("click", function() {
        navigation.nextPage($.scrollView, pages, Alloy.Globals.sling);
    });
    $.back.addEventListener("click", function() {
        navigation.previousPage($.scrollView, pages, Alloy.Globals.sling, $.slingConfiguration);
    });
    $.home.addEventListener("click", function() {
        navigation.slingCancel($.slingConfiguration);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;