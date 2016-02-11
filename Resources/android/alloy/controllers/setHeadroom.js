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
    $.__views.setHeadroom = Ti.UI.createWindow({
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
    $.__views.__alloyId169 = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId169"
    });
    $.__views.setHeadroom.add($.__views.__alloyId169);
    $.__views.__alloyId170 = Ti.UI.createImageView({
        top: "30dip",
        left: "20dip",
        image: "/images/WHC-close.png",
        height: "24dip",
        width: "24dip",
        id: "__alloyId170"
    });
    $.__views.__alloyId169.add($.__views.__alloyId170);
    closeModal ? $.addListener($.__views.__alloyId170, "click", closeModal) : __defers["$.__views.__alloyId170!click!closeModal"] = true;
    $.__views.__alloyId171 = Ti.UI.createView({
        top: "20dip",
        height: "1dip",
        width: "100%",
        backgroundColor: "#f7561e",
        id: "__alloyId171"
    });
    $.__views.setHeadroom.add($.__views.__alloyId171);
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
    $.__views.__alloyId172 = Ti.UI.createView({
        layout: "vertical",
        width: "90%",
        height: Titanium.UI.SIZE,
        id: "__alloyId172"
    });
    $.__views.content.add($.__views.__alloyId172);
    $.__views.__alloyId173 = Ti.UI.createLabel({
        top: "20dip",
        color: "#FFF",
        font: {
            fontSize: 26
        },
        textAlign: "center",
        text: "Restricted Headroom",
        id: "__alloyId173"
    });
    $.__views.__alloyId172.add($.__views.__alloyId173);
    $.__views.__alloyId174 = Ti.UI.createLabel({
        top: "10dip",
        color: "#FFF",
        font: {
            fontSize: 14
        },
        text: "Please input the headroom in order to calculate the leg length.",
        id: "__alloyId174"
    });
    $.__views.__alloyId172.add($.__views.__alloyId174);
    $.__views.__alloyId175 = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId175"
    });
    $.__views.__alloyId172.add($.__views.__alloyId175);
    $.__views.__alloyId176 = Ti.UI.createLabel({
        top: "20dip",
        color: "#FFF",
        font: {
            fontSize: 26
        },
        textAlign: "center",
        text: "Headroom (m)",
        id: "__alloyId176"
    });
    $.__views.__alloyId175.add($.__views.__alloyId176);
    $.__views.__alloyId177 = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId177"
    });
    $.__views.__alloyId172.add($.__views.__alloyId177);
    $.__views.__alloyId178 = Ti.UI.createView({
        layout: "horizontal",
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        id: "__alloyId178"
    });
    $.__views.__alloyId177.add($.__views.__alloyId178);
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
        id: "headMeter",
        value: "00"
    });
    $.__views.__alloyId178.add($.__views.headMeter);
    $.__views.__alloyId179 = Ti.UI.createLabel({
        left: "5dip",
        color: "#FFF",
        font: {
            fontSize: 50
        },
        text: ".",
        id: "__alloyId179"
    });
    $.__views.__alloyId178.add($.__views.__alloyId179);
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
        id: "headFraction",
        value: "00"
    });
    $.__views.__alloyId178.add($.__views.headFraction);
    $.__views.__alloyId180 = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        bottom: "20dip",
        id: "__alloyId180"
    });
    $.__views.__alloyId172.add($.__views.__alloyId180);
    $.__views.__alloyId181 = Ti.UI.createButton({
        width: "100%",
        height: "26dip",
        backgroundImage: "/images/WHC-button--primary.png",
        title: "Set Headroom",
        color: "#FFF",
        textAlign: "left",
        font: {
            fontSize: 16
        },
        id: "__alloyId181"
    });
    $.__views.__alloyId180.add($.__views.__alloyId181);
    setHead ? $.addListener($.__views.__alloyId181, "click", setHead) : __defers["$.__views.__alloyId181!click!setHead"] = true;
    $.__views.__alloyId182 = Ti.UI.createView({
        height: "1dip",
        width: "100%",
        top: "0",
        backgroundColor: "#FFF",
        id: "__alloyId182"
    });
    $.__views.scrollView.add($.__views.__alloyId182);
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
    __defers["$.__views.__alloyId170!click!closeModal"] && $.addListener($.__views.__alloyId170, "click", closeModal);
    __defers["$.__views.__alloyId181!click!setHead"] && $.addListener($.__views.__alloyId181, "click", setHead);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;