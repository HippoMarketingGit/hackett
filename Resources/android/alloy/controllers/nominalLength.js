function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function setLength() {
        var nominalLength, meter = $.legMeter.value, fraction = $.legFraction.value;
        if ("00" === meter && "00" === fraction) alert("Please enter the nominal length."); else {
            nominalLength = meter + "." + fraction;
            Alloy.Globals.sling.nominalLength = common.padIntRight(nominalLength);
            closeModal();
        }
    }
    function closeModal(e) {
        var isManual = null !== e && e && e["type"];
        $.nominalLength.close({
            modal: true
        });
        isManual && args && args["closeAction"] && "back" === args.closeAction && Alloy.Globals.goBack();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "nominalLength";
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
    $.__views.nominalLength = Ti.UI.createWindow({
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
        top: "0",
        height: "100%",
        left: "0",
        width: "100%",
        layout: "vertical",
        id: "nominalLength"
    });
    $.__views.nominalLength && $.addTopLevelView($.__views.nominalLength);
    $.__views.__alloyId119 = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId119"
    });
    $.__views.nominalLength.add($.__views.__alloyId119);
    $.__views.__alloyId120 = Ti.UI.createImageView({
        top: "30dip",
        left: "20dip",
        image: "/images/WHC-close.png",
        height: "24dip",
        width: "24dip",
        id: "__alloyId120"
    });
    $.__views.__alloyId119.add($.__views.__alloyId120);
    closeModal ? $.__views.__alloyId120.addEventListener("click", closeModal) : __defers["$.__views.__alloyId120!click!closeModal"] = true;
    $.__views.__alloyId121 = Ti.UI.createView({
        top: "20dip",
        height: "1dip",
        width: "100%",
        backgroundColor: "#f7561e",
        id: "__alloyId121"
    });
    $.__views.nominalLength.add($.__views.__alloyId121);
    $.__views.scrollView = Ti.UI.createScrollView({
        layout: "vertical",
        bottom: "10dip",
        id: "scrollView",
        top: "0",
        left: "0",
        width: "100%"
    });
    $.__views.nominalLength.add($.__views.scrollView);
    $.__views.content = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        id: "content",
        top: "0",
        backgroundColor: "#2b3b94"
    });
    $.__views.scrollView.add($.__views.content);
    $.__views.__alloyId122 = Ti.UI.createView({
        layout: "vertical",
        width: "90%",
        height: Titanium.UI.SIZE,
        id: "__alloyId122"
    });
    $.__views.content.add($.__views.__alloyId122);
    $.__views.__alloyId123 = Ti.UI.createLabel({
        top: "20dip",
        color: "#FFF",
        font: {
            fontSize: 26
        },
        textAlign: "center",
        text: "Length of Sling",
        id: "__alloyId123"
    });
    $.__views.__alloyId122.add($.__views.__alloyId123);
    $.__views.__alloyId124 = Ti.UI.createLabel({
        top: "10dip",
        color: "#FFF",
        font: {
            fontSize: 14
        },
        text: "Please input the length of the sling, bearing to bearing.",
        id: "__alloyId124"
    });
    $.__views.__alloyId122.add($.__views.__alloyId124);
    $.__views.__alloyId125 = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId125"
    });
    $.__views.__alloyId122.add($.__views.__alloyId125);
    $.__views.__alloyId126 = Ti.UI.createLabel({
        top: "20dip",
        color: "#FFF",
        font: {
            fontSize: 26
        },
        textAlign: "center",
        text: "Nominal Length (m)",
        id: "__alloyId126"
    });
    $.__views.__alloyId125.add($.__views.__alloyId126);
    $.__views.__alloyId127 = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId127"
    });
    $.__views.__alloyId122.add($.__views.__alloyId127);
    $.__views.__alloyId128 = Ti.UI.createView({
        layout: "horizontal",
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        id: "__alloyId128"
    });
    $.__views.__alloyId127.add($.__views.__alloyId128);
    $.__views.legMeter = Ti.UI.createTextField({
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
        id: "legMeter",
        value: "00"
    });
    $.__views.__alloyId128.add($.__views.legMeter);
    $.__views.__alloyId129 = Ti.UI.createLabel({
        left: "5dip",
        color: "#FFF",
        font: {
            fontSize: 50
        },
        text: ".",
        id: "__alloyId129"
    });
    $.__views.__alloyId128.add($.__views.__alloyId129);
    $.__views.legFraction = Ti.UI.createTextField({
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
        id: "legFraction",
        value: "00"
    });
    $.__views.__alloyId128.add($.__views.legFraction);
    $.__views.__alloyId130 = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        bottom: "20dip",
        id: "__alloyId130"
    });
    $.__views.__alloyId122.add($.__views.__alloyId130);
    $.__views.__alloyId131 = Ti.UI.createButton({
        width: "100%",
        height: "26dip",
        backgroundImage: "/images/WHC-button--primary.png",
        title: "Set Nominal Length",
        color: "#FFF",
        textAlign: "left",
        font: {
            fontSize: 16
        },
        id: "__alloyId131"
    });
    $.__views.__alloyId130.add($.__views.__alloyId131);
    setLength ? $.__views.__alloyId131.addEventListener("click", setLength) : __defers["$.__views.__alloyId131!click!setLength"] = true;
    $.__views.__alloyId132 = Ti.UI.createView({
        height: "1dip",
        width: "100%",
        top: "0",
        backgroundColor: "#FFF",
        id: "__alloyId132"
    });
    $.__views.scrollView.add($.__views.__alloyId132);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Common = require("common"), common = new Common(), args = arguments[0] || {};
    $.legMeterDone && $.legMeterDone.addEventListener("click", function() {
        $.legMeter.blur();
        ("" === $.legMeter.value || null === $.legMeter.value) && $.legMeter.setValue("00");
        Ti.API.info($.legMeter.value);
    });
    $.legFractionDone && $.legFractionDone.addEventListener("click", function() {
        $.legFraction.blur();
        ("" === $.legFraction.value || null === $.legFraction.value) && $.legFraction.setValue("00");
        Ti.API.info($.legFraction.value);
    });
    __defers["$.__views.__alloyId120!click!closeModal"] && $.__views.__alloyId120.addEventListener("click", closeModal);
    __defers["$.__views.__alloyId131!click!setLength"] && $.__views.__alloyId131.addEventListener("click", setLength);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;