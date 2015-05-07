function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function setMasterlink(e) {
        $.standard.backgroundColor = "#2b3b94";
        $.oversized.backgroundColor = "#2b3b94";
        var obj = e.source;
        obj.backgroundColor = "#6b76d0";
        Alloy.Globals.sling.masterLink = "oversized" === obj.id ? "Oversized" : "Standard";
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "masterLink";
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
    $.__views.__alloyId105 = Ti.UI.createView({
        layout: "vertical",
        width: "90%",
        height: Titanium.UI.SIZE,
        id: "__alloyId105"
    });
    $.__views.content.add($.__views.__alloyId105);
    $.__views.__alloyId106 = Ti.UI.createLabel({
        top: "20dip",
        color: "#FFF",
        font: {
            fontSize: 26
        },
        textAlign: "center",
        text: "Master Link",
        id: "__alloyId106"
    });
    $.__views.__alloyId105.add($.__views.__alloyId106);
    $.__views.__alloyId107 = Ti.UI.createLabel({
        top: "10dip",
        color: "#FFF",
        font: {
            fontSize: 14
        },
        text: "Short introduction. Morbi in placerat magna, a gravida tellus. Lorem ipsum dolor sit amet, consectetur adipiscing.",
        id: "__alloyId107"
    });
    $.__views.__alloyId105.add($.__views.__alloyId107);
    $.__views.masterlinkView = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "masterlinkView"
    });
    $.__views.content.add($.__views.masterlinkView);
    $.__views.__alloyId108 = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId108"
    });
    $.__views.masterlinkView.add($.__views.__alloyId108);
    $.__views.__alloyId109 = Ti.UI.createLabel({
        font: {
            fontSize: "20px"
        },
        text: "Standard or oversized master link?",
        textAlign: "center",
        color: "#FFF",
        id: "__alloyId109"
    });
    $.__views.__alloyId108.add($.__views.__alloyId109);
    $.__views.__alloyId110 = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId110"
    });
    $.__views.masterlinkView.add($.__views.__alloyId110);
    $.__views.__alloyId111 = Ti.UI.createView({
        layout: "horizontal",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId111"
    });
    $.__views.__alloyId110.add($.__views.__alloyId111);
    $.__views.standard = Ti.UI.createView({
        top: "10dip",
        width: "50%",
        height: "120dip",
        className: "halfWidth",
        id: "standard",
        backgroundColor: "#2b3b94"
    });
    $.__views.__alloyId111.add($.__views.standard);
    setMasterlink ? $.__views.standard.addEventListener("click", setMasterlink) : __defers["$.__views.standard!click!setMasterlink"] = true;
    $.__views.__alloyId112 = Ti.UI.createView({
        height: "1dip",
        width: "100%",
        top: "0",
        backgroundColor: "#FFF",
        id: "__alloyId112"
    });
    $.__views.standard.add($.__views.__alloyId112);
    $.__views.__alloyId113 = Ti.UI.createLabel({
        color: "#FFF",
        font: {
            fontSize: 22
        },
        textAlign: "center",
        text: "Standard",
        touchEnabled: false,
        id: "__alloyId113"
    });
    $.__views.standard.add($.__views.__alloyId113);
    $.__views.__alloyId114 = Ti.UI.createView({
        height: "1dip",
        width: "100%",
        bottom: "0",
        backgroundColor: "#FFF",
        id: "__alloyId114"
    });
    $.__views.standard.add($.__views.__alloyId114);
    $.__views.oversized = Ti.UI.createView({
        top: "10dip",
        width: "50%",
        height: "120dip",
        className: "halfWidth",
        id: "oversized",
        backgroundColor: "#2b3b94"
    });
    $.__views.__alloyId111.add($.__views.oversized);
    setMasterlink ? $.__views.oversized.addEventListener("click", setMasterlink) : __defers["$.__views.oversized!click!setMasterlink"] = true;
    $.__views.__alloyId115 = Ti.UI.createView({
        height: "1dip",
        width: "100%",
        top: "0",
        backgroundColor: "#FFF",
        id: "__alloyId115"
    });
    $.__views.oversized.add($.__views.__alloyId115);
    $.__views.__alloyId116 = Ti.UI.createView({
        height: "100%",
        width: "1dip",
        left: 0,
        backgroundColor: "#FFF",
        id: "__alloyId116"
    });
    $.__views.oversized.add($.__views.__alloyId116);
    $.__views.__alloyId117 = Ti.UI.createLabel({
        color: "#FFF",
        font: {
            fontSize: 22
        },
        textAlign: "center",
        text: "Oversized",
        touchEnabled: false,
        id: "__alloyId117"
    });
    $.__views.oversized.add($.__views.__alloyId117);
    $.__views.__alloyId118 = Ti.UI.createView({
        height: "1dip",
        width: "100%",
        bottom: "0",
        backgroundColor: "#FFF",
        id: "__alloyId118"
    });
    $.__views.oversized.add($.__views.__alloyId118);
    exports.destroy = function() {};
    _.extend($, $.__views);
    null !== Alloy.Globals.sling.masterLink && ("Standard" === Alloy.Globals.sling.masterLink ? $.standard.backgroundColor = "#6b76d0" : "Oversized" === Alloy.Globals.sling.masterLink && ($.oversized.backgroundColor = "#6b76d0"));
    __defers["$.__views.standard!click!setMasterlink"] && $.__views.standard.addEventListener("click", setMasterlink);
    __defers["$.__views.oversized!click!setMasterlink"] && $.__views.oversized.addEventListener("click", setMasterlink);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;