function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
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
                Ti.API.info("Nominal Length: " + Alloy.Globals.sling.nominalLength);
                if (0 === Alloy.Globals.sling.nominalLength || null === Alloy.Globals.sling.nominalLength) {
                    $.yes.backgroundColor = "#2b3b94";
                    $.no.backgroundColor = "#2b3b94";
                }
            });
        } else {
            showAlert();
            Alloy.Globals.sling.angle = 45;
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
            if (e.cancel === e.index || true === e.cancel) {
                var modal = Alloy.createController("liftingPoints").getView();
                modal.open({
                    modal: true
                });
                modal.addEventListener("close", function() {
                    Ti.API.info("Nominal Length: " + Alloy.Globals.sling.nominalLength);
                    if (0 === Alloy.Globals.sling.nominalLength || null === Alloy.Globals.sling.nominalLength) {
                        $.yes.backgroundColor = "#2b3b94";
                        $.no.backgroundColor = "#2b3b94";
                    }
                });
            } else if (0 === e.index) {
                var modal = Alloy.createController("nominalLength").getView();
                modal.open({
                    modal: true
                });
                modal.addEventListener("close", function() {
                    Ti.API.info("Nominal Length: " + Alloy.Globals.sling.nominalLength);
                    if (0 === Alloy.Globals.sling.nominalLength || null === Alloy.Globals.sling.nominalLength) {
                        $.yes.backgroundColor = "#2b3b94";
                        $.no.backgroundColor = "#2b3b94";
                    }
                });
            }
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
    $.__views.content = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        id: "content"
    });
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
    $.__views.no = Ti.UI.createView({
        top: "10dip",
        width: "50%",
        height: "120dip",
        className: "halfWidth",
        id: "no",
        backgroundColor: "#2b3b94"
    });
    $.__views.liftingAngle.add($.__views.no);
    setAngle ? $.__views.no.addEventListener("click", setAngle) : __defers["$.__views.no!click!setAngle"] = true;
    $.__views.__alloyId43 = Ti.UI.createView({
        height: "1dip",
        width: "100%",
        top: "0",
        backgroundColor: "#FFF",
        id: "__alloyId43"
    });
    $.__views.no.add($.__views.__alloyId43);
    $.__views.__alloyId44 = Ti.UI.createView({
        layout: "vertical",
        height: Titanium.UI.SIZE,
        width: Titanium.UI.SIZE,
        touchEnabled: false,
        id: "__alloyId44"
    });
    $.__views.no.add($.__views.__alloyId44);
    $.__views.__alloyId45 = Ti.UI.createView({
        top: "4dip",
        height: Titanium.UI.SIZE,
        width: Titanium.UI.SIZE,
        id: "__alloyId45"
    });
    $.__views.__alloyId44.add($.__views.__alloyId45);
    $.__views.__alloyId46 = Ti.UI.createLabel({
        color: "#FFF",
        font: {
            fontSize: 22
        },
        textAlign: "center",
        text: "No",
        id: "__alloyId46"
    });
    $.__views.__alloyId45.add($.__views.__alloyId46);
    $.__views.__alloyId47 = Ti.UI.createView({
        top: "4dip",
        height: Titanium.UI.SIZE,
        width: Titanium.UI.SIZE,
        id: "__alloyId47"
    });
    $.__views.__alloyId44.add($.__views.__alloyId47);
    $.__views.__alloyId48 = Ti.UI.createLabel({
        color: "#FFF",
        font: {
            fontSize: 12
        },
        text: "45 degree Lifting Angle",
        id: "__alloyId48"
    });
    $.__views.__alloyId47.add($.__views.__alloyId48);
    $.__views.__alloyId49 = Ti.UI.createView({
        height: "1dip",
        width: "100%",
        bottom: "0",
        backgroundColor: "#FFF",
        id: "__alloyId49"
    });
    $.__views.no.add($.__views.__alloyId49);
    $.__views.yes = Ti.UI.createView({
        top: "10dip",
        width: "50%",
        height: "120dip",
        className: "halfWidth",
        id: "yes",
        backgroundColor: "#2b3b94"
    });
    $.__views.liftingAngle.add($.__views.yes);
    setAngle ? $.__views.yes.addEventListener("click", setAngle) : __defers["$.__views.yes!click!setAngle"] = true;
    $.__views.__alloyId50 = Ti.UI.createView({
        height: "1dip",
        width: "100%",
        top: "0",
        backgroundColor: "#FFF",
        id: "__alloyId50"
    });
    $.__views.yes.add($.__views.__alloyId50);
    $.__views.__alloyId51 = Ti.UI.createView({
        height: "100%",
        width: "1dip",
        left: 0,
        backgroundColor: "#FFF",
        id: "__alloyId51"
    });
    $.__views.yes.add($.__views.__alloyId51);
    $.__views.__alloyId52 = Ti.UI.createView({
        layout: "vertical",
        height: Titanium.UI.SIZE,
        width: Titanium.UI.SIZE,
        touchEnabled: false,
        id: "__alloyId52"
    });
    $.__views.yes.add($.__views.__alloyId52);
    $.__views.__alloyId53 = Ti.UI.createView({
        top: "4dip",
        height: Titanium.UI.SIZE,
        width: Titanium.UI.SIZE,
        id: "__alloyId53"
    });
    $.__views.__alloyId52.add($.__views.__alloyId53);
    $.__views.__alloyId54 = Ti.UI.createLabel({
        color: "#FFF",
        font: {
            fontSize: 22
        },
        textAlign: "center",
        text: "Yes",
        id: "__alloyId54"
    });
    $.__views.__alloyId53.add($.__views.__alloyId54);
    $.__views.__alloyId55 = Ti.UI.createView({
        top: "4dip",
        height: Titanium.UI.SIZE,
        width: Titanium.UI.SIZE,
        id: "__alloyId55"
    });
    $.__views.__alloyId52.add($.__views.__alloyId55);
    $.__views.__alloyId56 = Ti.UI.createLabel({
        color: "#FFF",
        font: {
            fontSize: 12
        },
        text: "60 degree Lifting Angle",
        id: "__alloyId56"
    });
    $.__views.__alloyId55.add($.__views.__alloyId56);
    $.__views.__alloyId57 = Ti.UI.createView({
        height: "1dip",
        width: "100%",
        bottom: "0",
        backgroundColor: "#FFF",
        id: "__alloyId57"
    });
    $.__views.yes.add($.__views.__alloyId57);
    exports.destroy = function() {};
    _.extend($, $.__views);
    if (1 === Alloy.Globals.sling.legs) {
        var modal = Alloy.createController("nominalLength").getView();
        modal.open({
            modal: true
        });
    }
    null !== Alloy.Globals.sling.angle && (60 === Alloy.Globals.sling.angle ? $.yes.backgroundColor = "#6b76d0" : $.no.backgroundColor = "#6b76d0");
    __defers["$.__views.no!click!setAngle"] && $.__views.no.addEventListener("click", setAngle);
    __defers["$.__views.yes!click!setAngle"] && $.__views.yes.addEventListener("click", setAngle);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;