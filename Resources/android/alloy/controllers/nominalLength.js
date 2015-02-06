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
    function closeModal() {
        $.nominalLength.close({
            modal: true
        });
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
    $.__views.__alloyId126 = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId126"
    });
    $.__views.nominalLength.add($.__views.__alloyId126);
    $.__views.__alloyId127 = Ti.UI.createImageView({
        top: "30dip",
        left: "20dip",
        image: "/images/WHC-close.png",
        height: "24dip",
        width: "24dip",
        id: "__alloyId127"
    });
    $.__views.__alloyId126.add($.__views.__alloyId127);
    closeModal ? $.__views.__alloyId127.addEventListener("click", closeModal) : __defers["$.__views.__alloyId127!click!closeModal"] = true;
    $.__views.__alloyId128 = Ti.UI.createView({
        top: "20dip",
        height: "1dip",
        width: "100%",
        backgroundColor: "#f7561e",
        id: "__alloyId128"
    });
    $.__views.nominalLength.add($.__views.__alloyId128);
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
    $.__views.__alloyId129 = Ti.UI.createView({
        layout: "vertical",
        width: "90%",
        height: Titanium.UI.SIZE,
        id: "__alloyId129"
    });
    $.__views.content.add($.__views.__alloyId129);
    $.__views.__alloyId130 = Ti.UI.createLabel({
        top: "20dip",
        color: "#FFF",
        font: {
            fontSize: 26
        },
        textAlign: "center",
        text: "Product Selection",
        id: "__alloyId130"
    });
    $.__views.__alloyId129.add($.__views.__alloyId130);
    $.__views.__alloyId131 = Ti.UI.createLabel({
        top: "10dip",
        color: "#FFF",
        font: {
            fontSize: 14
        },
        text: "Short introduction. Morbi in placerat magna, a gravida tellus. Lorem ipsum dolor sit amet, consectetur adipiscing.",
        id: "__alloyId131"
    });
    $.__views.__alloyId129.add($.__views.__alloyId131);
    $.__views.__alloyId132 = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId132"
    });
    $.__views.__alloyId129.add($.__views.__alloyId132);
    $.__views.__alloyId133 = Ti.UI.createLabel({
        top: "20dip",
        color: "#FFF",
        font: {
            fontSize: 26
        },
        textAlign: "center",
        text: "Nominal Length (m)",
        id: "__alloyId133"
    });
    $.__views.__alloyId132.add($.__views.__alloyId133);
    $.__views.__alloyId134 = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId134"
    });
    $.__views.__alloyId129.add($.__views.__alloyId134);
    $.__views.__alloyId135 = Ti.UI.createView({
        layout: "horizontal",
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        id: "__alloyId135"
    });
    $.__views.__alloyId134.add($.__views.__alloyId135);
    var __alloyId139 = [];
    $.__views.__alloyId140 = Ti.UI.createButton({
        systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
    });
    __alloyId139.push($.__views.__alloyId140);
    $.__views.legMeterDone = Ti.UI.createButton({
        title: "Done",
        id: "legMeterDone",
        style: Ti.UI.iPhone.SystemButtonStyle.DONE
    });
    __alloyId139.push($.__views.legMeterDone);
    $.__views.__alloyId137 = Ti.UI.iOS.createToolbar({
        items: __alloyId139,
        id: "__alloyId137"
    });
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
        clearOnEdit: true,
        keyboardToolbar: $.__views.__alloyId137,
        id: "legMeter",
        value: "00"
    });
    $.__views.__alloyId135.add($.__views.legMeter);
    $.__views.__alloyId137 = Ti.UI.iOS.createToolbar({
        clearOnEdit: true,
        keyboardToolbar: $.__views.__alloyId137,
        id: "legMeter",
        value: "00"
    });
    $.__views.__alloyId141 = Ti.UI.createLabel({
        left: "5dip",
        color: "#FFF",
        font: {
            fontSize: 50
        },
        text: ".",
        id: "__alloyId141"
    });
    $.__views.__alloyId135.add($.__views.__alloyId141);
    var __alloyId145 = [];
    $.__views.__alloyId146 = Ti.UI.createButton({
        systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
    });
    __alloyId145.push($.__views.__alloyId146);
    $.__views.legFractionDone = Ti.UI.createButton({
        title: "Done",
        id: "legFractionDone",
        style: Ti.UI.iPhone.SystemButtonStyle.DONE
    });
    __alloyId145.push($.__views.legFractionDone);
    $.__views.__alloyId143 = Ti.UI.iOS.createToolbar({
        items: __alloyId145,
        id: "__alloyId143"
    });
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
        clearOnEdit: true,
        keyboardToolbar: $.__views.__alloyId143,
        id: "legFraction",
        value: "00"
    });
    $.__views.__alloyId135.add($.__views.legFraction);
    $.__views.__alloyId143 = Ti.UI.iOS.createToolbar({
        clearOnEdit: true,
        keyboardToolbar: $.__views.__alloyId143,
        id: "legFraction",
        value: "00"
    });
    $.__views.__alloyId147 = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        bottom: "20dip",
        id: "__alloyId147"
    });
    $.__views.__alloyId129.add($.__views.__alloyId147);
    $.__views.__alloyId148 = Ti.UI.createButton({
        width: "100%",
        height: "26dip",
        backgroundImage: "/images/WHC-button--primary.png",
        title: "Set Nominal Length",
        color: "#FFF",
        textAlign: "left",
        font: {
            fontSize: 16
        },
        id: "__alloyId148"
    });
    $.__views.__alloyId147.add($.__views.__alloyId148);
    setLength ? $.__views.__alloyId148.addEventListener("click", setLength) : __defers["$.__views.__alloyId148!click!setLength"] = true;
    $.__views.__alloyId149 = Ti.UI.createView({
        height: "1dip",
        width: "100%",
        top: "0",
        backgroundColor: "#FFF",
        id: "__alloyId149"
    });
    $.__views.scrollView.add($.__views.__alloyId149);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Common = require("common"), common = new Common();
    $.legMeterDone.addEventListener("click", function() {
        $.legMeter.blur();
        ("" === $.legMeter.value || null === $.legMeter.value) && $.legMeter.setValue("00");
        Ti.API.info($.legMeter.value);
    });
    $.legFractionDone.addEventListener("click", function() {
        $.legFraction.blur();
        ("" === $.legFraction.value || null === $.legFraction.value) && $.legFraction.setValue("00");
        Ti.API.info($.legFraction.value);
    });
    __defers["$.__views.__alloyId127!click!closeModal"] && $.__views.__alloyId127.addEventListener("click", closeModal);
    __defers["$.__views.__alloyId148!click!setLength"] && $.__views.__alloyId148.addEventListener("click", setLength);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;