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
        $.one.backgroundColor = "#2b3b94";
        $.two.backgroundColor = "#2b3b94";
        $.three.backgroundColor = "#2b3b94";
        $.four.backgroundColor = "#2b3b94";
        obj.backgroundColor = "#f7561e";
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
    $.__views.content = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        id: "content"
    });
    $.__views.content && $.addTopLevelView($.__views.content);
    $.__views.__alloyId72 = Ti.UI.createView({
        layout: "vertical",
        width: "90%",
        height: Titanium.UI.SIZE,
        id: "__alloyId72"
    });
    $.__views.content.add($.__views.__alloyId72);
    $.__views.__alloyId73 = Ti.UI.createLabel({
        top: "20dip",
        color: "#FFF",
        font: {
            fontSize: 26
        },
        textAlign: "center",
        text: "How many Legs?",
        id: "__alloyId73"
    });
    $.__views.__alloyId72.add($.__views.__alloyId73);
    $.__views.__alloyId74 = Ti.UI.createLabel({
        top: "10dip",
        color: "#FFF",
        font: {
            fontSize: 14
        },
        text: "Please choose the number of legs you would like your sling to have by tapping a diagram below then pressing 'Next' to proceed.",
        id: "__alloyId74"
    });
    $.__views.__alloyId72.add($.__views.__alloyId74);
    $.__views.__alloyId75 = Ti.UI.createView({
        layout: "horizontal",
        width: "100%",
        height: Titanium.UI.SIZE,
        top: "20dip",
        id: "__alloyId75"
    });
    $.__views.content.add($.__views.__alloyId75);
    $.__views.one = Ti.UI.createView({
        width: "50%",
        height: "120dip",
        className: "legs",
        borderWidth: "1px",
        borderColor: "#2b3b94",
        id: "one",
        backgroundColor: "#2b3b94"
    });
    $.__views.__alloyId75.add($.__views.one);
    chooseLegs ? $.addListener($.__views.one, "click", chooseLegs) : __defers["$.__views.one!click!chooseLegs"] = true;
    $.__views.__alloyId76 = Ti.UI.createView({
        height: "90%",
        width: "90%",
        backgroundColor: "#FFF",
        id: "__alloyId76"
    });
    $.__views.one.add($.__views.__alloyId76);
    $.__views.oneImg = Ti.UI.createImageView({
        touchEnabled: false,
        id: "oneImg",
        height: "100%",
        width: "auto"
    });
    $.__views.__alloyId76.add($.__views.oneImg);
    $.__views.two = Ti.UI.createView({
        width: "50%",
        height: "120dip",
        className: "legs",
        borderWidth: "1px",
        borderColor: "#2b3b94",
        id: "two",
        backgroundColor: "#2b3b94"
    });
    $.__views.__alloyId75.add($.__views.two);
    chooseLegs ? $.addListener($.__views.two, "click", chooseLegs) : __defers["$.__views.two!click!chooseLegs"] = true;
    $.__views.__alloyId77 = Ti.UI.createView({
        height: "90%",
        width: "90%",
        backgroundColor: "#FFF",
        id: "__alloyId77"
    });
    $.__views.two.add($.__views.__alloyId77);
    $.__views.twoImg = Ti.UI.createImageView({
        touchEnabled: false,
        id: "twoImg",
        height: "100%",
        width: "auto"
    });
    $.__views.__alloyId77.add($.__views.twoImg);
    $.__views.__alloyId78 = Ti.UI.createView({
        layout: "horizontal",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId78"
    });
    $.__views.content.add($.__views.__alloyId78);
    $.__views.three = Ti.UI.createView({
        width: "50%",
        height: "120dip",
        className: "legs",
        borderWidth: "1px",
        borderColor: "#2b3b94",
        id: "three",
        backgroundColor: "#2b3b94"
    });
    $.__views.__alloyId78.add($.__views.three);
    chooseLegs ? $.addListener($.__views.three, "click", chooseLegs) : __defers["$.__views.three!click!chooseLegs"] = true;
    $.__views.__alloyId79 = Ti.UI.createView({
        height: "90%",
        width: "90%",
        backgroundColor: "#FFF",
        id: "__alloyId79"
    });
    $.__views.three.add($.__views.__alloyId79);
    $.__views.threeImg = Ti.UI.createImageView({
        touchEnabled: false,
        id: "threeImg",
        height: "100%",
        width: "auto"
    });
    $.__views.__alloyId79.add($.__views.threeImg);
    $.__views.four = Ti.UI.createView({
        width: "50%",
        height: "120dip",
        className: "legs",
        borderWidth: "1px",
        borderColor: "#2b3b94",
        id: "four",
        backgroundColor: "#2b3b94"
    });
    $.__views.__alloyId78.add($.__views.four);
    chooseLegs ? $.addListener($.__views.four, "click", chooseLegs) : __defers["$.__views.four!click!chooseLegs"] = true;
    $.__views.__alloyId80 = Ti.UI.createView({
        height: "90%",
        width: "90%",
        backgroundColor: "#FFF",
        id: "__alloyId80"
    });
    $.__views.four.add($.__views.__alloyId80);
    $.__views.fourImg = Ti.UI.createImageView({
        touchEnabled: false,
        id: "fourImg",
        height: "100%",
        width: "auto"
    });
    $.__views.__alloyId80.add($.__views.fourImg);
    exports.destroy = function() {};
    _.extend($, $.__views);
    null !== Alloy.Globals.sling.legs && (1 === Alloy.Globals.sling.legs ? $.one.backgroundColor = "#2b3b94" : 2 === Alloy.Globals.sling.legs ? $.two.backgroundColor = "#2b3b94" : 3 === Alloy.Globals.sling.legs ? $.three.backgroundColor = "#2b3b94" : 4 === Alloy.Globals.sling.legs && ($.four.backgroundColor = "#2b3b94"));
    var imgPath = "";
    switch (Alloy.Globals.sling.type) {
      case "Chain":
        imgPath = "/images/slings/chain/";
        break;

      case "Wire Rope":
        imgPath = "/images/slings/wire/";
    }
    $.oneImg.image = imgPath + "1-leg.png";
    $.twoImg.image = imgPath + "2-legs.png";
    $.threeImg.image = imgPath + "3-legs.png";
    $.fourImg.image = imgPath + "4-legs.png";
    __defers["$.__views.one!click!chooseLegs"] && $.addListener($.__views.one, "click", chooseLegs);
    __defers["$.__views.two!click!chooseLegs"] && $.addListener($.__views.two, "click", chooseLegs);
    __defers["$.__views.three!click!chooseLegs"] && $.addListener($.__views.three, "click", chooseLegs);
    __defers["$.__views.four!click!chooseLegs"] && $.addListener($.__views.four, "click", chooseLegs);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;