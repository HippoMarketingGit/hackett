function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function setHead() {
        var headroom, meter = $.headMeter.value, fraction = $.headFraction.value;
        if ("00" === meter && "00" === fraction) alert("Please enter the restricted headroom."); else {
            headroom = parseFloat(meter + "." + fraction);
            var angleB = Alloy.Globals.sling.angle, angleA = 90 - angleB;
            var sideA = headroom, sideC = 0;
            sideC = sideA / Math.sin(DegreesToRadians(angleA));
            sideC = sideC.toFixed(2);
            var confirmHead = Titanium.UI.createAlertDialog({
                title: "Leg length",
                message: "Based on a headroom of " + headroom + "m, the calculated leg length is " + sideC + "m. Continue?",
                buttonNames: [ "Yes", "No" ],
                cancel: 1
            });
            confirmHead.addEventListener("click", function(e) {
                if (e.cancel === e.index || true === e.cancel) return;
                if (0 === e.index) {
                    Alloy.Globals.sling.nominalLength = common.padIntRight(sideC);
                    closeModal();
                }
            });
            confirmHead.show();
        }
    }
    function closeModal(e) {
        var isManual = null !== e && e && e["type"];
        $.setHeadroom.close({
            modal: true
        });
        isManual && args && args["closeAction"] && "back" === args.closeAction && Alloy.Globals.goBack();
    }
    function DegreesToRadians(valDeg) {
        return 2 * Math.PI / 360 * valDeg;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "setHeadroom";
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
    $.__views.setHeadroom = Ti.UI.createWindow({
        statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
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
        id: "setHeadroom"
    });
    $.__views.setHeadroom && $.addTopLevelView($.__views.setHeadroom);
    $.__views.__alloyId203 = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId203"
    });
    $.__views.setHeadroom.add($.__views.__alloyId203);
    $.__views.__alloyId204 = Ti.UI.createImageView({
        top: "30dip",
        left: "20dip",
        image: "/images/WHC-close.png",
        height: "24dip",
        width: "24dip",
        id: "__alloyId204"
    });
    $.__views.__alloyId203.add($.__views.__alloyId204);
    closeModal ? $.__views.__alloyId204.addEventListener("click", closeModal) : __defers["$.__views.__alloyId204!click!closeModal"] = true;
    $.__views.__alloyId205 = Ti.UI.createView({
        top: "20dip",
        height: "1dip",
        width: "100%",
        backgroundColor: "#f7561e",
        id: "__alloyId205"
    });
    $.__views.setHeadroom.add($.__views.__alloyId205);
    $.__views.scrollView = Ti.UI.createScrollView({
        layout: "vertical",
        bottom: "10dip",
        id: "scrollView",
        top: "0",
        left: "0",
        width: "100%"
    });
    $.__views.setHeadroom.add($.__views.scrollView);
    $.__views.content = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        id: "content",
        top: "0",
        backgroundColor: "#2b3b94"
    });
    $.__views.scrollView.add($.__views.content);
    $.__views.__alloyId206 = Ti.UI.createView({
        layout: "vertical",
        width: "90%",
        height: Titanium.UI.SIZE,
        id: "__alloyId206"
    });
    $.__views.content.add($.__views.__alloyId206);
    $.__views.__alloyId207 = Ti.UI.createLabel({
        top: "20dip",
        color: "#FFF",
        font: {
            fontSize: 26
        },
        textAlign: "center",
        text: "Restricted Headroom",
        id: "__alloyId207"
    });
    $.__views.__alloyId206.add($.__views.__alloyId207);
    $.__views.__alloyId208 = Ti.UI.createLabel({
        top: "10dip",
        color: "#FFF",
        font: {
            fontSize: 14
        },
        text: "Please input the headroom in order to calculate the leg length.",
        id: "__alloyId208"
    });
    $.__views.__alloyId206.add($.__views.__alloyId208);
    $.__views.__alloyId209 = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId209"
    });
    $.__views.__alloyId206.add($.__views.__alloyId209);
    $.__views.__alloyId210 = Ti.UI.createLabel({
        top: "20dip",
        color: "#FFF",
        font: {
            fontSize: 26
        },
        textAlign: "center",
        text: "Headroom (m)",
        id: "__alloyId210"
    });
    $.__views.__alloyId209.add($.__views.__alloyId210);
    $.__views.__alloyId211 = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId211"
    });
    $.__views.__alloyId206.add($.__views.__alloyId211);
    $.__views.__alloyId212 = Ti.UI.createView({
        layout: "horizontal",
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        id: "__alloyId212"
    });
    $.__views.__alloyId211.add($.__views.__alloyId212);
    var __alloyId216 = [];
    $.__views.__alloyId217 = Ti.UI.createButton({
        systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
    });
    __alloyId216.push($.__views.__alloyId217);
    $.__views.headMeterDone = Ti.UI.createButton({
        title: "Done",
        id: "headMeterDone",
        style: Ti.UI.iPhone.SystemButtonStyle.DONE
    });
    __alloyId216.push($.__views.headMeterDone);
    $.__views.__alloyId214 = Ti.UI.iOS.createToolbar({
        items: __alloyId216,
        id: "__alloyId214"
    });
    $.__views.headMeter = Ti.UI.createTextField({
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
        keyboardToolbar: $.__views.__alloyId214,
        id: "headMeter",
        value: "00"
    });
    $.__views.__alloyId212.add($.__views.headMeter);
    $.__views.__alloyId214 = Ti.UI.iOS.createToolbar({
        clearOnEdit: true,
        keyboardToolbar: $.__views.__alloyId214,
        id: "headMeter",
        value: "00"
    });
    $.__views.__alloyId218 = Ti.UI.createLabel({
        left: "5dip",
        color: "#FFF",
        font: {
            fontSize: 50
        },
        text: ".",
        id: "__alloyId218"
    });
    $.__views.__alloyId212.add($.__views.__alloyId218);
    var __alloyId222 = [];
    $.__views.__alloyId223 = Ti.UI.createButton({
        systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
    });
    __alloyId222.push($.__views.__alloyId223);
    $.__views.headFractionDone = Ti.UI.createButton({
        title: "Done",
        id: "headFractionDone",
        style: Ti.UI.iPhone.SystemButtonStyle.DONE
    });
    __alloyId222.push($.__views.headFractionDone);
    $.__views.__alloyId220 = Ti.UI.iOS.createToolbar({
        items: __alloyId222,
        id: "__alloyId220"
    });
    $.__views.headFraction = Ti.UI.createTextField({
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
        keyboardToolbar: $.__views.__alloyId220,
        id: "headFraction",
        value: "00"
    });
    $.__views.__alloyId212.add($.__views.headFraction);
    $.__views.__alloyId220 = Ti.UI.iOS.createToolbar({
        clearOnEdit: true,
        keyboardToolbar: $.__views.__alloyId220,
        id: "headFraction",
        value: "00"
    });
    $.__views.__alloyId224 = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        bottom: "20dip",
        id: "__alloyId224"
    });
    $.__views.__alloyId206.add($.__views.__alloyId224);
    $.__views.__alloyId225 = Ti.UI.createButton({
        width: "100%",
        height: "26dip",
        backgroundImage: "/images/WHC-button--primary.png",
        title: "Set Headroom",
        color: "#FFF",
        textAlign: "left",
        font: {
            fontSize: 16
        },
        id: "__alloyId225"
    });
    $.__views.__alloyId224.add($.__views.__alloyId225);
    setHead ? $.__views.__alloyId225.addEventListener("click", setHead) : __defers["$.__views.__alloyId225!click!setHead"] = true;
    $.__views.__alloyId226 = Ti.UI.createView({
        height: "1dip",
        width: "100%",
        top: "0",
        backgroundColor: "#FFF",
        id: "__alloyId226"
    });
    $.__views.scrollView.add($.__views.__alloyId226);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Common = require("common"), common = new Common(), args = arguments[0] || {};
    $.headMeterDone && $.headMeterDone.addEventListener("click", function() {
        $.headMeter.blur();
        ("" === $.headMeter.value || null === $.headMeter.value) && $.headMeter.setValue("00");
    });
    $.headFractionDone && $.headFractionDone.addEventListener("click", function() {
        $.headFraction.blur();
        ("" === $.headFraction.value || null === $.headFraction.value) && $.headFraction.setValue("00");
        Ti.API.info($.headFraction.value);
    });
    __defers["$.__views.__alloyId204!click!closeModal"] && $.__views.__alloyId204.addEventListener("click", closeModal);
    __defers["$.__views.__alloyId225!click!setHead"] && $.__views.__alloyId225.addEventListener("click", setHead);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;