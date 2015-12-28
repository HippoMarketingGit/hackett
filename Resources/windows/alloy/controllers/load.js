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
    this.__controllerPath = "load";
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
    $.__views.content = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        id: "content"
    });
    $.__views.content && $.addTopLevelView($.__views.content);
    $.__views.__alloyId94 = Ti.UI.createView({
        layout: "vertical",
        width: "90%",
        height: Titanium.UI.SIZE,
        id: "__alloyId94"
    });
    $.__views.content.add($.__views.__alloyId94);
    $.__views.__alloyId95 = Ti.UI.createLabel({
        top: "20dip",
        color: "#FFF",
        font: {
            fontSize: 26
        },
        textAlign: "center",
        text: "Weight of load",
        id: "__alloyId95"
    });
    $.__views.__alloyId94.add($.__views.__alloyId95);
    $.__views.__alloyId96 = Ti.UI.createLabel({
        top: "10dip",
        color: "#FFF",
        font: {
            fontSize: 14
        },
        text: "Please input the weight of the load to be lifted with the sling, then press Next.",
        id: "__alloyId96"
    });
    $.__views.__alloyId94.add($.__views.__alloyId96);
    $.__views.__alloyId97 = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId97"
    });
    $.__views.__alloyId94.add($.__views.__alloyId97);
    $.__views.__alloyId98 = Ti.UI.createLabel({
        top: "20dip",
        color: "#FFF",
        font: {
            fontSize: 26
        },
        textAlign: "center",
        text: "Load in Tonnes (t)",
        id: "__alloyId98"
    });
    $.__views.__alloyId97.add($.__views.__alloyId98);
    $.__views.__alloyId99 = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId99"
    });
    $.__views.__alloyId94.add($.__views.__alloyId99);
    $.__views.__alloyId100 = Ti.UI.createView({
        layout: "horizontal",
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        id: "__alloyId100"
    });
    $.__views.__alloyId99.add($.__views.__alloyId100);
    $.__views.tonne = Ti.UI.createTextField({
        height: "50dip",
        width: "60dip",
        left: "5dip",
        borderWidth: "1dip",
        borderColor: "#fba688",
        backgroundColor: "#FFF",
        font: {
            fontSize: 30
        },
        paddingLeft: "4dip",
        maxLength: 2,
        textAlign: "center",
        keyboardType: Titanium.UI.KEYBOARD_NUMBER_PAD,
        color: "#000",
        clearOnEdit: true,
        id: "tonne",
        value: "00",
        returnKeyType: Titanium.UI.RETURNKEY_DONE
    });
    $.__views.__alloyId100.add($.__views.tonne);
    $.__views.__alloyId101 = Ti.UI.createLabel({
        left: "5dip",
        color: "#FFF",
        font: {
            fontSize: 50
        },
        text: ".",
        id: "__alloyId101"
    });
    $.__views.__alloyId100.add($.__views.__alloyId101);
    $.__views.fraction = Ti.UI.createTextField({
        height: "50dip",
        width: "60dip",
        left: "5dip",
        borderWidth: "1dip",
        borderColor: "#fba688",
        backgroundColor: "#FFF",
        font: {
            fontSize: 30
        },
        paddingLeft: "4dip",
        maxLength: 2,
        textAlign: "center",
        keyboardType: Titanium.UI.KEYBOARD_NUMBER_PAD,
        color: "#000",
        clearOnEdit: true,
        id: "fraction",
        value: "00"
    });
    $.__views.__alloyId100.add($.__views.fraction);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var load, Common = require("common"), common = new Common(), tonne = $.tonne.value, fraction = $.fraction.value;
    if (null !== Alloy.Globals.sling.load) {
        var str = Alloy.Globals.sling.load.toString();
        str = str.split(".");
        $.tonne.value = str[0];
        $.fraction.value = str[1];
    }
    $.fractionDone && $.fractionDone.addEventListener("click", function() {
        ("" == $.fraction.value || null === $.fraction.value) && $.fraction.setValue("00");
        $.fraction.blur();
    });
    $.tonneDone && $.tonneDone.addEventListener("click", function() {
        ("" == $.tonne.value || null === $.tonne.value) && $.tonne.setValue("00");
        $.tonne.blur();
    });
    $.tonne.addEventListener("change", function(e) {
        var obj = e.source;
        tonne = obj.value;
        load = tonne + "." + fraction;
        Alloy.Globals.sling.load = common.padIntRight(load);
    });
    $.fraction.addEventListener("change", function(e) {
        var obj = e.source;
        fraction = obj.value;
        load = tonne + "." + fraction;
        Alloy.Globals.sling.load = common.padIntRight(load);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;