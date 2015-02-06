function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function chooseLegs(e) {
        var obj = e.source;
        $.one.borderColor = "#2b3b94";
        $.two.borderColor = "#2b3b94";
        $.three.borderColor = "#2b3b94";
        $.four.borderColor = "#2b3b94";
        $.one.borderWidth = "1px";
        $.two.borderWidth = "1px";
        $.three.borderWidth = "1px";
        $.four.borderWidth = "1px";
        obj.borderColor = "#f7561e";
        obj.borderWidth = "8px";
        if ("one" === obj.id) {
            Alloy.Globals.sling.legs = 1;
            Alloy.Globals.sling.angle = 45;
        } else if ("two" === obj.id) {
            Alloy.Globals.sling.legs = 2;
            Alloy.Globals.sling.angle = null;
        } else if ("three" === obj.id) {
            Alloy.Globals.sling.legs = 3;
            Alloy.Globals.sling.angle = null;
        } else if ("four" === obj.id) {
            Alloy.Globals.sling.legs = 4;
            Alloy.Globals.sling.angle = null;
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "legs";
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
    $.__views.content = Ti.UI.createView(function() {
        var o = {};
        _.extend(o, {
            layout: "vertical",
            height: Ti.UI.SIZE
        });
        Alloy.isTablet && _.extend(o, {
            layout: "vertical",
            width: "60%",
            height: Ti.UI.SIZE
        });
        _.extend(o, {
            id: "content"
        });
        return o;
    }());
    $.__views.content && $.addTopLevelView($.__views.content);
    $.__views.__alloyId75 = Ti.UI.createView({
        layout: "vertical",
        width: "90%",
        height: Titanium.UI.SIZE,
        id: "__alloyId75"
    });
    $.__views.content.add($.__views.__alloyId75);
    $.__views.__alloyId76 = Ti.UI.createLabel({
        top: "20dip",
        color: "#FFF",
        font: {
            fontSize: 26
        },
        textAlign: "center",
        text: "How many Legs?",
        id: "__alloyId76"
    });
    $.__views.__alloyId75.add($.__views.__alloyId76);
    $.__views.__alloyId77 = Ti.UI.createLabel({
        top: "10dip",
        color: "#FFF",
        font: {
            fontSize: 14
        },
        text: "Please chose however many legs you would like your sling to have by tapping a diagram below. Press 'Next' to proceed.",
        id: "__alloyId77"
    });
    $.__views.__alloyId75.add($.__views.__alloyId77);
    $.__views.__alloyId78 = Ti.UI.createView({
        layout: "horizontal",
        width: "100%",
        height: Titanium.UI.SIZE,
        top: "20dip",
        id: "__alloyId78"
    });
    $.__views.content.add($.__views.__alloyId78);
    $.__views.one = Ti.UI.createView(function() {
        var o = {};
        _.extend(o, {
            width: "50%",
            height: "120dip",
            className: "legs",
            borderWidth: "1px",
            borderColor: "#2b3b94"
        });
        Alloy.isTablet && _.extend(o, {
            width: "49%"
        });
        _.extend(o, {
            id: "one",
            backgroundColor: "#FFF"
        });
        return o;
    }());
    $.__views.__alloyId78.add($.__views.one);
    chooseLegs ? $.__views.one.addEventListener("click", chooseLegs) : __defers["$.__views.one!click!chooseLegs"] = true;
    $.__views.__alloyId79 = Ti.UI.createImageView({
        touchEnabled: false,
        image: "/images/slings/1-leg.png",
        height: "100%",
        width: "auto",
        id: "__alloyId79"
    });
    $.__views.one.add($.__views.__alloyId79);
    $.__views.two = Ti.UI.createView(function() {
        var o = {};
        _.extend(o, {
            width: "50%",
            height: "120dip",
            className: "legs",
            borderWidth: "1px",
            borderColor: "#2b3b94"
        });
        Alloy.isTablet && _.extend(o, {
            width: "49%"
        });
        _.extend(o, {
            id: "two",
            backgroundColor: "#FFF"
        });
        return o;
    }());
    $.__views.__alloyId78.add($.__views.two);
    chooseLegs ? $.__views.two.addEventListener("click", chooseLegs) : __defers["$.__views.two!click!chooseLegs"] = true;
    $.__views.__alloyId80 = Ti.UI.createImageView({
        touchEnabled: false,
        image: "/images/slings/2-legs.png",
        height: "100%",
        width: "auto",
        id: "__alloyId80"
    });
    $.__views.two.add($.__views.__alloyId80);
    $.__views.__alloyId81 = Ti.UI.createView({
        layout: "horizontal",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId81"
    });
    $.__views.content.add($.__views.__alloyId81);
    $.__views.three = Ti.UI.createView(function() {
        var o = {};
        _.extend(o, {
            width: "50%",
            height: "120dip",
            className: "legs",
            borderWidth: "1px",
            borderColor: "#2b3b94"
        });
        Alloy.isTablet && _.extend(o, {
            width: "49%"
        });
        _.extend(o, {
            id: "three",
            backgroundColor: "#FFF"
        });
        return o;
    }());
    $.__views.__alloyId81.add($.__views.three);
    chooseLegs ? $.__views.three.addEventListener("click", chooseLegs) : __defers["$.__views.three!click!chooseLegs"] = true;
    $.__views.__alloyId82 = Ti.UI.createImageView({
        touchEnabled: false,
        image: "/images/slings/3-legs.png",
        height: "90%",
        top: "5%",
        width: "auto",
        id: "__alloyId82"
    });
    $.__views.three.add($.__views.__alloyId82);
    $.__views.four = Ti.UI.createView(function() {
        var o = {};
        _.extend(o, {
            width: "50%",
            height: "120dip",
            className: "legs",
            borderWidth: "1px",
            borderColor: "#2b3b94"
        });
        Alloy.isTablet && _.extend(o, {
            width: "49%"
        });
        _.extend(o, {
            id: "four",
            backgroundColor: "#FFF"
        });
        return o;
    }());
    $.__views.__alloyId81.add($.__views.four);
    chooseLegs ? $.__views.four.addEventListener("click", chooseLegs) : __defers["$.__views.four!click!chooseLegs"] = true;
    $.__views.__alloyId83 = Ti.UI.createImageView({
        touchEnabled: false,
        image: "/images/slings/4-legs.png",
        height: "100%",
        width: "auto",
        id: "__alloyId83"
    });
    $.__views.four.add($.__views.__alloyId83);
    exports.destroy = function() {};
    _.extend($, $.__views);
    if (null !== Alloy.Globals.sling.legs) if (1 === Alloy.Globals.sling.legs) {
        $.one.borderColor = "#f7561e";
        $.one.borderWidth = "8px";
    } else if (2 === Alloy.Globals.sling.legs) {
        $.two.borderColor = "#f7561e";
        $.two.borderWidth = "8px";
    } else if (3 === Alloy.Globals.sling.legs) {
        $.three.borderColor = "#f7561e";
        $.three.borderWidth = "8px";
    } else if (4 === Alloy.Globals.sling.legs) {
        $.four.borderColor = "#f7561e";
        $.four.borderWidth = "8px";
    }
    __defers["$.__views.one!click!chooseLegs"] && $.__views.one.addEventListener("click", chooseLegs);
    __defers["$.__views.two!click!chooseLegs"] && $.__views.two.addEventListener("click", chooseLegs);
    __defers["$.__views.three!click!chooseLegs"] && $.__views.three.addEventListener("click", chooseLegs);
    __defers["$.__views.four!click!chooseLegs"] && $.__views.four.addEventListener("click", chooseLegs);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;