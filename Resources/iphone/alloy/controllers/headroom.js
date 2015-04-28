function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function setHeadroomImg() {
        var src = "";
        switch (Alloy.Globals.sling.legs) {
          case 2:
            src = "/images/headroom/double.jpg";
            break;

          case 3:
          case 4:
            src = "/images/headroom/3-4-leg.jpg";
        }
        "" !== src && ($.headroomImg.image = src);
    }
    function setAngle(e) {
        $.yes.backgroundColor = "#2b3b94";
        $.no.backgroundColor = "#2b3b94";
        var obj = e.source;
        obj.backgroundColor = "#6b76d0";
        if ("yes" === obj.id) {
            Alloy.Globals.sling.angle = 60;
            var modal = Alloy.createController("liftingPoints").getView();
            modal.open({
                modal: true
            });
            modal.addEventListener("close", function() {
                if (0 === Alloy.Globals.sling.nominalLength || null === Alloy.Globals.sling.nominalLength) {
                    $.yes.backgroundColor = "#2b3b94";
                    $.no.backgroundColor = "#2b3b94";
                }
            });
        } else {
            showAlert();
            Alloy.Globals.sling.angle = 45;
            Ti.API.info(Alloy.Globals.sling.checkLimit());
        }
    }
    function showAlert() {
        var lengthKnown = Titanium.UI.createAlertDialog({
            title: "Nominal Length",
            message: "Do you know the Nominal Length?(Leg Length)",
            buttonNames: [ "Yes", "No" ],
            cancel: 1
        });
        lengthKnown.addEventListener("click", function(e) {
            var modal;
            if (e.cancel === e.index || true === e.cancel) {
                modal = Alloy.createController("liftingPoints").getView();
                modal.open({
                    modal: true
                });
            } else if (0 === e.index) {
                modal = Alloy.createController("nominalLength").getView();
                modal.open({
                    modal: true
                });
            }
            modal.addEventListener("close", function() {
                if (0 === Alloy.Globals.sling.nominalLength || null === Alloy.Globals.sling.nominalLength) {
                    $.yes.backgroundColor = "#2b3b94";
                    $.no.backgroundColor = "#2b3b94";
                }
            });
        });
        lengthKnown.show();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "headroom";
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
    $.__views.__alloyId38 = Ti.UI.createView({
        layout: "vertical",
        width: "90%",
        height: Titanium.UI.SIZE,
        id: "__alloyId38"
    });
    $.__views.content.add($.__views.__alloyId38);
    $.__views.__alloyId39 = Ti.UI.createLabel({
        top: "20dip",
        color: "#FFF",
        font: {
            fontSize: 26
        },
        textAlign: "center",
        text: "Headroom",
        id: "__alloyId39"
    });
    $.__views.__alloyId38.add($.__views.__alloyId39);
    $.__views.__alloyId40 = Ti.UI.createLabel({
        top: "10dip",
        color: "#FFF",
        font: {
            fontSize: 14
        },
        text: 'Is headroom restricted? Any slings that have 1 leg automatically default to "No" as the lifting angle is not taken in to consideration.',
        id: "__alloyId40"
    });
    $.__views.__alloyId38.add($.__views.__alloyId40);
    $.__views.headroomImg = Ti.UI.createImageView({
        top: "10dip",
        touchEnabled: false,
        id: "headroomImg",
        width: "auto"
    });
    $.__views.__alloyId38.add($.__views.headroomImg);
    $.__views.headroomView = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "headroomView"
    });
    $.__views.content.add($.__views.headroomView);
    $.__views.__alloyId41 = Ti.UI.createLabel({
        font: {
            fontSize: "20px"
        },
        text: "Is headrooom restricted?",
        textAlign: "center",
        color: "#FFF",
        id: "__alloyId41"
    });
    $.__views.headroomView.add($.__views.__alloyId41);
    $.__views.__alloyId42 = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId42"
    });
    $.__views.headroomView.add($.__views.__alloyId42);
    $.__views.liftingAngle = Ti.UI.createView({
        layout: "horizontal",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "liftingAngle"
    });
    $.__views.__alloyId42.add($.__views.liftingAngle);
    $.__views.no = Ti.UI.createView(function() {
        var o = {};
        _.extend(o, {
            top: "10dip",
            width: "50%",
            height: "120dip",
            className: "halfWidth"
        });
        Alloy.isTablet && _.extend(o, {
            width: "49%"
        });
        _.extend(o, {
            id: "no",
            backgroundColor: "#2b3b94"
        });
        return o;
    }());
    $.__views.liftingAngle.add($.__views.no);
    setAngle ? $.__views.no.addEventListener("click", setAngle) : __defers["$.__views.no!click!setAngle"] = true;
    $.__views.__alloyId43 = Ti.UI.createView(function() {
        var o = {};
        _.extend(o, {
            left: 0,
            height: 0,
            width: 0,
            backgroundColor: "#FFF"
        });
        Alloy.isTablet && _.extend(o, {
            left: 0,
            height: "100%",
            width: "1dip",
            backgroundColor: "#FFF"
        });
        _.extend(o, {
            id: "__alloyId43"
        });
        return o;
    }());
    $.__views.no.add($.__views.__alloyId43);
    $.__views.__alloyId44 = Ti.UI.createView({
        height: "1dip",
        width: "100%",
        top: "0",
        backgroundColor: "#FFF",
        id: "__alloyId44"
    });
    $.__views.no.add($.__views.__alloyId44);
    $.__views.__alloyId45 = Ti.UI.createView({
        layout: "vertical",
        height: Titanium.UI.SIZE,
        width: Titanium.UI.SIZE,
        touchEnabled: false,
        id: "__alloyId45"
    });
    $.__views.no.add($.__views.__alloyId45);
    $.__views.__alloyId46 = Ti.UI.createView({
        top: "4dip",
        height: Titanium.UI.SIZE,
        width: Titanium.UI.SIZE,
        id: "__alloyId46"
    });
    $.__views.__alloyId45.add($.__views.__alloyId46);
    $.__views.__alloyId47 = Ti.UI.createLabel({
        color: "#FFF",
        font: {
            fontSize: 22
        },
        textAlign: "center",
        text: "No",
        id: "__alloyId47"
    });
    $.__views.__alloyId46.add($.__views.__alloyId47);
    $.__views.__alloyId48 = Ti.UI.createView({
        top: "4dip",
        height: Titanium.UI.SIZE,
        width: Titanium.UI.SIZE,
        id: "__alloyId48"
    });
    $.__views.__alloyId45.add($.__views.__alloyId48);
    $.__views.__alloyId49 = Ti.UI.createLabel({
        color: "#FFF",
        font: {
            fontSize: 12
        },
        text: "0 - 45° Angle",
        id: "__alloyId49"
    });
    $.__views.__alloyId48.add($.__views.__alloyId49);
    $.__views.__alloyId50 = Ti.UI.createView({
        height: "1dip",
        width: "100%",
        bottom: "0",
        backgroundColor: "#FFF",
        id: "__alloyId50"
    });
    $.__views.no.add($.__views.__alloyId50);
    $.__views.yes = Ti.UI.createView(function() {
        var o = {};
        _.extend(o, {
            top: "10dip",
            width: "50%",
            height: "120dip",
            className: "halfWidth"
        });
        Alloy.isTablet && _.extend(o, {
            width: "49%"
        });
        _.extend(o, {
            id: "yes",
            backgroundColor: "#2b3b94"
        });
        return o;
    }());
    $.__views.liftingAngle.add($.__views.yes);
    setAngle ? $.__views.yes.addEventListener("click", setAngle) : __defers["$.__views.yes!click!setAngle"] = true;
    $.__views.__alloyId51 = Ti.UI.createView({
        height: "1dip",
        width: "100%",
        top: "0",
        backgroundColor: "#FFF",
        id: "__alloyId51"
    });
    $.__views.yes.add($.__views.__alloyId51);
    $.__views.__alloyId52 = Ti.UI.createView({
        height: "100%",
        width: "1dip",
        left: 0,
        backgroundColor: "#FFF",
        id: "__alloyId52"
    });
    $.__views.yes.add($.__views.__alloyId52);
    $.__views.__alloyId53 = Ti.UI.createView({
        layout: "vertical",
        height: Titanium.UI.SIZE,
        width: Titanium.UI.SIZE,
        touchEnabled: false,
        id: "__alloyId53"
    });
    $.__views.yes.add($.__views.__alloyId53);
    $.__views.__alloyId54 = Ti.UI.createView({
        top: "4dip",
        height: Titanium.UI.SIZE,
        width: Titanium.UI.SIZE,
        id: "__alloyId54"
    });
    $.__views.__alloyId53.add($.__views.__alloyId54);
    $.__views.__alloyId55 = Ti.UI.createLabel({
        color: "#FFF",
        font: {
            fontSize: 22
        },
        textAlign: "center",
        text: "Yes",
        id: "__alloyId55"
    });
    $.__views.__alloyId54.add($.__views.__alloyId55);
    $.__views.__alloyId56 = Ti.UI.createView({
        top: "4dip",
        height: Titanium.UI.SIZE,
        width: Titanium.UI.SIZE,
        id: "__alloyId56"
    });
    $.__views.__alloyId53.add($.__views.__alloyId56);
    $.__views.__alloyId57 = Ti.UI.createLabel({
        color: "#FFF",
        font: {
            fontSize: 12
        },
        text: "45 - 60° Angle",
        id: "__alloyId57"
    });
    $.__views.__alloyId56.add($.__views.__alloyId57);
    $.__views.__alloyId58 = Ti.UI.createView({
        height: "1dip",
        width: "100%",
        bottom: "0",
        backgroundColor: "#FFF",
        id: "__alloyId58"
    });
    $.__views.yes.add($.__views.__alloyId58);
    $.__views.__alloyId59 = Ti.UI.createView(function() {
        var o = {};
        _.extend(o, {
            right: 0,
            height: 0,
            width: 0,
            backgroundColor: "#FFF"
        });
        Alloy.isTablet && _.extend(o, {
            right: 0,
            height: "100%",
            width: "1dip",
            backgroundColor: "#FFF"
        });
        _.extend(o, {
            id: "__alloyId59"
        });
        return o;
    }());
    $.__views.yes.add($.__views.__alloyId59);
    exports.destroy = function() {};
    _.extend($, $.__views);
    if (1 === Alloy.Globals.sling.legs) {
        var modal = Alloy.createController("nominalLength").getView();
        modal.open({
            modal: true
        });
    } else setHeadroomImg();
    null !== Alloy.Globals.sling.angle && (60 === Alloy.Globals.sling.angle ? $.yes.backgroundColor = "#6b76d0" : $.no.backgroundColor = "#6b76d0");
    __defers["$.__views.no!click!setAngle"] && $.__views.no.addEventListener("click", setAngle);
    __defers["$.__views.yes!click!setAngle"] && $.__views.yes.addEventListener("click", setAngle);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;