function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function setLegLength() {
        var legLength, num = parseFloat($.liftingPointMeter.value + "." + $.liftingPointFraction.value);
        if (60 === Alloy.Globals.sling.angle) {
            var distance;
            distance = 2 === Alloy.Globals.sling.legs || 4 === Alloy.Globals.sling.legs ? num / 2 : num;
            var n = distance / .866;
            legLength = n.toFixed(2);
        } else if (45 === Alloy.Globals.sling.angle) {
            var distance;
            distance = 2 === Alloy.Globals.sling.legs || 4 === Alloy.Globals.sling.legs ? num / 2 : num;
            var n = distance / .707;
            legLength = n.toFixed(2);
        }
        Alloy.Globals.sling.nominalLength = legLength;
    }
    function getHeadroom() {
        var distance;
        distance = 2 === Alloy.Globals.sling.legs || 4 === Alloy.Globals.sling.legs ? parseFloat($.liftingPointMeter.value + "." + $.liftingPointFraction.value) / 2 : parseFloat($.liftingPointMeter.value + "." + $.liftingPointFraction.value);
        var distanceSquared = distance * distance, nominalLengthSquared = Alloy.Globals.sling.nominalLength * Alloy.Globals.sling.nominalLength, minusNumber = nominalLengthSquared - distanceSquared, result = Math.sqrt(minusNumber);
        return result.toFixed(2);
    }
    function setLength() {
        setLegLength();
        "00" === $.liftingPointMeter.value && "00" === $.liftingPointFraction.value ? alert("Please enter the distance between lifting points") : showHeadroomAlert();
    }
    function showHeadroomAlert() {
        var title = null, message = null;
        if (45 === Alloy.Globals.sling.angle) {
            title = "Leg length";
            message = "The calculated leg length is " + Alloy.Globals.sling.nominalLength + " (m). Do you wish to continue?";
        } else {
            title = "Headroom";
            message = "You will require a minimum headroom of " + getHeadroom() + " (m) to operate this sling. Do you wish to continue?";
        }
        var headroom = Titanium.UI.createAlertDialog({
            title: title,
            message: message,
            buttonNames: [ "Yes", "No" ],
            cancel: 1
        });
        headroom.addEventListener("click", function(e) {
            if (e.cancel === e.index || true === e.cancel) return;
            0 === e.index && closeModal();
        });
        headroom.show();
    }
    function closeModal(e) {
        var isManual = null !== e && e && e["type"];
        $.liftingPoints.close({
            modal: true
        });
        isManual && args && args["navigateOnClose"] && true === args.navigateOnClose && args["back"] && true === args.back && Alloy.Globals.goBack();
        !isManual && args && args["navigateOnClose"] && true === args.navigateOnClose && args["next"] && true === args.next && Alloy.Globals.goNext();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "liftingPoints";
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
    $.__views.liftingPoints = Ti.UI.createWindow({
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
        id: "liftingPoints"
    });
    $.__views.liftingPoints && $.addTopLevelView($.__views.liftingPoints);
    $.__views.__alloyId75 = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId75"
    });
    $.__views.liftingPoints.add($.__views.__alloyId75);
    $.__views.__alloyId76 = Ti.UI.createImageView({
        top: "30dip",
        left: "20dip",
        image: "/images/WHC-close.png",
        height: "24dip",
        width: "24dip",
        id: "__alloyId76"
    });
    $.__views.__alloyId75.add($.__views.__alloyId76);
    closeModal ? $.__views.__alloyId76.addEventListener("click", closeModal) : __defers["$.__views.__alloyId76!click!closeModal"] = true;
    $.__views.__alloyId77 = Ti.UI.createView({
        top: "20dip",
        height: "1dip",
        width: "100%",
        backgroundColor: "#f7561e",
        id: "__alloyId77"
    });
    $.__views.liftingPoints.add($.__views.__alloyId77);
    $.__views.scrollView = Ti.UI.createScrollView({
        layout: "vertical",
        bottom: "10dip",
        id: "scrollView",
        top: "0",
        left: "0",
        width: "100%"
    });
    $.__views.liftingPoints.add($.__views.scrollView);
    $.__views.content = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        id: "content",
        top: "0",
        backgroundColor: "#2b3b94"
    });
    $.__views.scrollView.add($.__views.content);
    $.__views.__alloyId78 = Ti.UI.createView(function() {
        var o = {};
        _.extend(o, {
            layout: "vertical",
            width: "90%",
            height: Titanium.UI.SIZE
        });
        Alloy.isTablet && _.extend(o, {
            layout: "vertical",
            width: "60%",
            height: Ti.UI.SIZE
        });
        _.extend(o, {
            id: "__alloyId78"
        });
        return o;
    }());
    $.__views.content.add($.__views.__alloyId78);
    $.__views.__alloyId79 = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId79"
    });
    $.__views.__alloyId78.add($.__views.__alloyId79);
    $.__views.__alloyId80 = Ti.UI.createLabel({
        color: "#FFF",
        font: {
            fontSize: 26
        },
        textAlign: "center",
        text: "Distance between\nLifting Points (m)",
        id: "__alloyId80"
    });
    $.__views.__alloyId79.add($.__views.__alloyId80);
    $.__views.__alloyId81 = Ti.UI.createLabel({
        top: "10dip",
        color: "#FFF",
        font: {
            fontSize: 14
        },
        text: "If you are unsure of where the lifting points will be on your load, please see the diagram below for reference.",
        id: "__alloyId81"
    });
    $.__views.__alloyId79.add($.__views.__alloyId81);
    $.__views.liftingPointsImage = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "liftingPointsImage"
    });
    $.__views.__alloyId78.add($.__views.liftingPointsImage);
    $.__views.__alloyId82 = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId82"
    });
    $.__views.__alloyId78.add($.__views.__alloyId82);
    $.__views.__alloyId83 = Ti.UI.createView({
        layout: "horizontal",
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        id: "__alloyId83"
    });
    $.__views.__alloyId82.add($.__views.__alloyId83);
    var __alloyId87 = [];
    $.__views.__alloyId88 = Ti.UI.createButton({
        systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
    });
    __alloyId87.push($.__views.__alloyId88);
    $.__views.liftingPointDone = Ti.UI.createButton({
        title: "Done",
        id: "liftingPointDone",
        style: Ti.UI.iPhone.SystemButtonStyle.DONE
    });
    __alloyId87.push($.__views.liftingPointDone);
    $.__views.__alloyId85 = Ti.UI.iOS.createToolbar({
        items: __alloyId87,
        id: "__alloyId85"
    });
    $.__views.liftingPointMeter = Ti.UI.createTextField({
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
        keyboardToolbar: $.__views.__alloyId85,
        id: "liftingPointMeter",
        value: "00"
    });
    $.__views.__alloyId83.add($.__views.liftingPointMeter);
    $.__views.__alloyId85 = Ti.UI.iOS.createToolbar({
        clearOnEdit: true,
        keyboardToolbar: $.__views.__alloyId85,
        id: "liftingPointMeter",
        value: "00"
    });
    $.__views.__alloyId89 = Ti.UI.createLabel({
        left: "5dip",
        color: "#FFF",
        font: {
            fontSize: 50
        },
        text: ".",
        id: "__alloyId89"
    });
    $.__views.__alloyId83.add($.__views.__alloyId89);
    var __alloyId93 = [];
    $.__views.__alloyId94 = Ti.UI.createButton({
        systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
    });
    __alloyId93.push($.__views.__alloyId94);
    $.__views.liftingPointFractionDone = Ti.UI.createButton({
        title: "Done",
        id: "liftingPointFractionDone",
        style: Ti.UI.iPhone.SystemButtonStyle.DONE
    });
    __alloyId93.push($.__views.liftingPointFractionDone);
    $.__views.__alloyId91 = Ti.UI.iOS.createToolbar({
        items: __alloyId93,
        id: "__alloyId91"
    });
    $.__views.liftingPointFraction = Ti.UI.createTextField({
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
        keyboardToolbar: $.__views.__alloyId91,
        id: "liftingPointFraction",
        value: "00"
    });
    $.__views.__alloyId83.add($.__views.liftingPointFraction);
    $.__views.__alloyId91 = Ti.UI.iOS.createToolbar({
        clearOnEdit: true,
        keyboardToolbar: $.__views.__alloyId91,
        id: "liftingPointFraction",
        value: "00"
    });
    $.__views.__alloyId95 = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        bottom: "20dip",
        id: "__alloyId95"
    });
    $.__views.__alloyId78.add($.__views.__alloyId95);
    $.__views.__alloyId96 = Ti.UI.createButton({
        width: "100%",
        height: "26dip",
        backgroundImage: "/images/WHC-button--primary.png",
        title: "Calculate",
        color: "#FFF",
        textAlign: "left",
        font: {
            fontSize: 16
        },
        id: "__alloyId96"
    });
    $.__views.__alloyId95.add($.__views.__alloyId96);
    setLength ? $.__views.__alloyId96.addEventListener("click", setLength) : __defers["$.__views.__alloyId96!click!setLength"] = true;
    $.__views.__alloyId97 = Ti.UI.createView({
        height: "1dip",
        width: "100%",
        top: "0",
        backgroundColor: "#FFF",
        id: "__alloyId97"
    });
    $.__views.scrollView.add($.__views.__alloyId97);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.liftingPointDone && $.liftingPointDone.addEventListener("click", function() {
        ("" === $.liftingPointMeter.value || null == $.liftingPointMeter.value) && $.liftingPointMeter.setValue("00");
        $.liftingPointMeter.blur();
    });
    $.liftingPointFractionDone && $.liftingPointFractionDone.addEventListener("click", function() {
        ("" === $.liftingPointFraction.value || null == $.liftingPointFraction.value) && $.liftingPointFraction.setValue("00");
        $.liftingPointFraction.blur();
    });
    var liftingPointImg = Ti.UI.createImageView({
        image: "/images/lifting-points/WHC--" + Alloy.Globals.sling.legs.toString() + "-leg--lifting-points.png",
        width: "Auto"
    });
    liftingPointImg.height = 3 === Alloy.Globals.sling.legs ? "100dip" : "60dip";
    $.liftingPointsImage.add(liftingPointImg);
    __defers["$.__views.__alloyId76!click!closeModal"] && $.__views.__alloyId76.addEventListener("click", closeModal);
    __defers["$.__views.__alloyId96!click!setLength"] && $.__views.__alloyId96.addEventListener("click", setLength);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;