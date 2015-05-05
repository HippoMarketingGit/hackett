function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function setSlingType(e) {
        if ("chain" === e.source.id) {
            $.extra.show();
            $.extra.height = Ti.UI.SIZE;
            Alloy.Globals.sling.type = "Chain";
        } else {
            $.extra.hide();
            $.extra.height = 0;
            Alloy.Globals.sling.type = "Wire Rope";
            Alloy.Globals.sling.grade = null;
        }
        $.chain.backgroundColor = "#2b3b94";
        $.wireRope.backgroundColor = "#2b3b94";
        e.source.backgroundColor = "#6b76d0";
    }
    function setGrade(e) {
        "auto" === e.source.id ? Alloy.Globals.sling.grade = "Auto" : "eight" === e.source.id ? Alloy.Globals.sling.grade = 8 : "ten" === e.source.id && (Alloy.Globals.sling.grade = 10);
        Ti.API.info(Alloy.Globals.sling.grade);
        $.ten.backgroundColor = "#2b3b94";
        $.eight.backgroundColor = "#2b3b94";
        $.auto.backgroundColor = "#2b3b94";
        e.source.backgroundColor = "#6b76d0";
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "slingType";
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
    $.__views.__alloyId212 = Ti.UI.createView({
        layout: "vertical",
        width: "90%",
        height: Titanium.UI.SIZE,
        id: "__alloyId212"
    });
    $.__views.content.add($.__views.__alloyId212);
    $.__views.__alloyId213 = Ti.UI.createLabel({
        top: "20dip",
        color: "#FFF",
        font: {
            fontSize: 26
        },
        textAlign: "center",
        text: "Product Selection",
        id: "__alloyId213"
    });
    $.__views.__alloyId212.add($.__views.__alloyId213);
    $.__views.__alloyId214 = Ti.UI.createLabel({
        top: "10dip",
        color: "#FFF",
        font: {
            fontSize: 14
        },
        text: "Please select whether you require your sling to be chain or wire rope.",
        id: "__alloyId214"
    });
    $.__views.__alloyId212.add($.__views.__alloyId214);
    $.__views.slings = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "slings"
    });
    $.__views.content.add($.__views.slings);
    $.__views.chain = Ti.UI.createView({
        top: "20dip",
        height: "120dip",
        width: "100%",
        className: "button--tertiary",
        id: "chain",
        backgroundColor: "#2b3b94"
    });
    $.__views.slings.add($.__views.chain);
    setSlingType ? $.__views.chain.addEventListener("click", setSlingType) : __defers["$.__views.chain!click!setSlingType"] = true;
    $.__views.__alloyId215 = Ti.UI.createView({
        height: "1dip",
        width: "100%",
        top: "0",
        backgroundColor: "#FFF",
        id: "__alloyId215"
    });
    $.__views.chain.add($.__views.__alloyId215);
    $.__views.__alloyId216 = Ti.UI.createView(function() {
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
            width: "2dip",
            backgroundColor: "#FFF"
        });
        _.extend(o, {
            id: "__alloyId216"
        });
        return o;
    }());
    $.__views.chain.add($.__views.__alloyId216);
    $.__views.__alloyId217 = Ti.UI.createLabel({
        left: "10%",
        color: "#FFF",
        font: {
            fontSize: 20
        },
        text: "Chain",
        touchEnabled: false,
        id: "__alloyId217"
    });
    $.__views.chain.add($.__views.__alloyId217);
    $.__views.__alloyId218 = Ti.UI.createImageView({
        right: "10%",
        height: "60dip",
        width: "auto",
        className: "icon",
        touchEnabled: false,
        image: "/images/sling-type/chain.jpg",
        id: "__alloyId218"
    });
    $.__views.chain.add($.__views.__alloyId218);
    $.__views.__alloyId219 = Ti.UI.createView(function() {
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
            id: "__alloyId219"
        });
        return o;
    }());
    $.__views.chain.add($.__views.__alloyId219);
    $.__views.__alloyId220 = Ti.UI.createView({
        height: "1dip",
        width: "100%",
        bottom: "0",
        backgroundColor: "#FFF",
        id: "__alloyId220"
    });
    $.__views.chain.add($.__views.__alloyId220);
    $.__views.extra = Ti.UI.createView({
        layout: "horizontal",
        id: "extra",
        height: "80dip"
    });
    $.__views.slings.add($.__views.extra);
    $.__views.eight = Ti.UI.createView({
        width: "33.2%",
        className: "button--quartenary",
        height: "80dip",
        id: "eight",
        backgroundColor: "#2b3b94"
    });
    $.__views.extra.add($.__views.eight);
    setGrade ? $.__views.eight.addEventListener("click", setGrade) : __defers["$.__views.eight!click!setGrade"] = true;
    $.__views.__alloyId221 = Ti.UI.createView(function() {
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
            width: "2dip",
            backgroundColor: "#FFF"
        });
        _.extend(o, {
            id: "__alloyId221"
        });
        return o;
    }());
    $.__views.eight.add($.__views.__alloyId221);
    $.__views.__alloyId222 = Ti.UI.createView({
        layout: "vertical",
        height: Titanium.UI.SIZE,
        width: Titanium.UI.SIZE,
        touchEnabled: false,
        id: "__alloyId222"
    });
    $.__views.eight.add($.__views.__alloyId222);
    $.__views.__alloyId223 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: Titanium.UI.SIZE,
        touchEnabled: false,
        top: "4dip",
        id: "__alloyId223"
    });
    $.__views.__alloyId222.add($.__views.__alloyId223);
    $.__views.__alloyId224 = Ti.UI.createLabel({
        color: "#FFF",
        font: {
            fontSize: 12
        },
        text: "Grade",
        touchEnabled: false,
        id: "__alloyId224"
    });
    $.__views.__alloyId223.add($.__views.__alloyId224);
    $.__views.__alloyId225 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: Titanium.UI.SIZE,
        touchEnabled: false,
        top: "0",
        id: "__alloyId225"
    });
    $.__views.__alloyId222.add($.__views.__alloyId225);
    $.__views.__alloyId226 = Ti.UI.createLabel({
        color: "#FFF",
        font: {
            fontSize: 22
        },
        textAlign: "center",
        text: "8",
        touchEnabled: false,
        id: "__alloyId226"
    });
    $.__views.__alloyId225.add($.__views.__alloyId226);
    $.__views.ten = Ti.UI.createView({
        width: "33.2%",
        className: "button--quartenary",
        height: "80dip",
        id: "ten",
        backgroundColor: "#2b3b94"
    });
    $.__views.extra.add($.__views.ten);
    setGrade ? $.__views.ten.addEventListener("click", setGrade) : __defers["$.__views.ten!click!setGrade"] = true;
    $.__views.__alloyId227 = Ti.UI.createView({
        layout: "vertical",
        height: Titanium.UI.SIZE,
        width: Titanium.UI.SIZE,
        touchEnabled: false,
        id: "__alloyId227"
    });
    $.__views.ten.add($.__views.__alloyId227);
    $.__views.__alloyId228 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: Titanium.UI.SIZE,
        touchEnabled: false,
        top: "4dip",
        id: "__alloyId228"
    });
    $.__views.__alloyId227.add($.__views.__alloyId228);
    $.__views.__alloyId229 = Ti.UI.createLabel({
        color: "#FFF",
        font: {
            fontSize: 12
        },
        text: "Grade",
        touchEnabled: false,
        id: "__alloyId229"
    });
    $.__views.__alloyId228.add($.__views.__alloyId229);
    $.__views.__alloyId230 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: Titanium.UI.SIZE,
        touchEnabled: false,
        top: "0",
        id: "__alloyId230"
    });
    $.__views.__alloyId227.add($.__views.__alloyId230);
    $.__views.__alloyId231 = Ti.UI.createLabel({
        color: "#FFF",
        font: {
            fontSize: 22
        },
        textAlign: "center",
        text: "10",
        touchEnabled: false,
        id: "__alloyId231"
    });
    $.__views.__alloyId230.add($.__views.__alloyId231);
    $.__views.auto = Ti.UI.createView({
        width: "33.2%",
        className: "button--quartenary",
        height: "80dip",
        id: "auto",
        backgroundColor: "#2b3b94"
    });
    $.__views.extra.add($.__views.auto);
    setGrade ? $.__views.auto.addEventListener("click", setGrade) : __defers["$.__views.auto!click!setGrade"] = true;
    $.__views.__alloyId232 = Ti.UI.createView({
        layout: "vertical",
        height: Titanium.UI.SIZE,
        width: Titanium.UI.SIZE,
        touchEnabled: false,
        id: "__alloyId232"
    });
    $.__views.auto.add($.__views.__alloyId232);
    $.__views.__alloyId233 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: Titanium.UI.SIZE,
        touchEnabled: false,
        top: "4dip",
        id: "__alloyId233"
    });
    $.__views.__alloyId232.add($.__views.__alloyId233);
    $.__views.__alloyId234 = Ti.UI.createLabel({
        color: "#FFF",
        font: {
            fontSize: 12
        },
        text: "Grade",
        touchEnabled: false,
        id: "__alloyId234"
    });
    $.__views.__alloyId233.add($.__views.__alloyId234);
    $.__views.__alloyId235 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: Titanium.UI.SIZE,
        touchEnabled: false,
        top: "0",
        id: "__alloyId235"
    });
    $.__views.__alloyId232.add($.__views.__alloyId235);
    $.__views.__alloyId236 = Ti.UI.createLabel({
        color: "#FFF",
        font: {
            fontSize: 22
        },
        textAlign: "center",
        text: "Auto",
        touchEnabled: false,
        id: "__alloyId236"
    });
    $.__views.__alloyId235.add($.__views.__alloyId236);
    $.__views.__alloyId237 = Ti.UI.createView(function() {
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
            id: "__alloyId237"
        });
        return o;
    }());
    $.__views.auto.add($.__views.__alloyId237);
    $.__views.__alloyId238 = Ti.UI.createView({
        height: "1dip",
        width: "100%",
        bottom: "0",
        backgroundColor: "#FFF",
        id: "__alloyId238"
    });
    $.__views.extra.add($.__views.__alloyId238);
    $.__views.wireRope = Ti.UI.createView({
        top: 0,
        height: "120dip",
        width: "100%",
        className: "button--tertiary",
        id: "wireRope",
        backgroundColor: "#2b3b94"
    });
    $.__views.slings.add($.__views.wireRope);
    setSlingType ? $.__views.wireRope.addEventListener("click", setSlingType) : __defers["$.__views.wireRope!click!setSlingType"] = true;
    $.__views.__alloyId239 = Ti.UI.createView(function() {
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
            width: "2dip",
            backgroundColor: "#FFF"
        });
        _.extend(o, {
            id: "__alloyId239"
        });
        return o;
    }());
    $.__views.wireRope.add($.__views.__alloyId239);
    $.__views.__alloyId240 = Ti.UI.createLabel({
        left: "10%",
        color: "#FFF",
        font: {
            fontSize: 20
        },
        text: "Wire Rope",
        touchEnabled: false,
        id: "__alloyId240"
    });
    $.__views.wireRope.add($.__views.__alloyId240);
    $.__views.__alloyId241 = Ti.UI.createImageView({
        right: "10%",
        height: "60dip",
        width: "auto",
        className: "icon",
        touchEnabled: false,
        image: "/images/sling-type/wire-rope.jpg",
        id: "__alloyId241"
    });
    $.__views.wireRope.add($.__views.__alloyId241);
    $.__views.__alloyId242 = Ti.UI.createView(function() {
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
            id: "__alloyId242"
        });
        return o;
    }());
    $.__views.wireRope.add($.__views.__alloyId242);
    $.__views.__alloyId243 = Ti.UI.createView({
        height: "1dip",
        width: "100%",
        bottom: "0",
        backgroundColor: "#FFF",
        id: "__alloyId243"
    });
    $.__views.wireRope.add($.__views.__alloyId243);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.extra.hide();
    $.extra.height = 0;
    if (null !== Alloy.Globals.sling.type) if ("Chain" === Alloy.Globals.sling.type) {
        $.extra.show();
        $.extra.height = Ti.UI.SIZE;
        "Auto" === Alloy.Globals.sling.grade ? $.auto.backgroundColor = "#6b76d0" : 8 === Alloy.Globals.sling.grade ? $.eight.backgroundColor = "#6b76d0" : 10 === Alloy.Globals.sling.grade && ($.ten.backgroundColor = "#6b76d0");
        $.chain.backgroundColor = "#6b76d0";
    } else "Wire Rope" === Alloy.Globals.sling.type && ($.wireRope.backgroundColor = "#6b76d0");
    __defers["$.__views.chain!click!setSlingType"] && $.__views.chain.addEventListener("click", setSlingType);
    __defers["$.__views.eight!click!setGrade"] && $.__views.eight.addEventListener("click", setGrade);
    __defers["$.__views.ten!click!setGrade"] && $.__views.ten.addEventListener("click", setGrade);
    __defers["$.__views.auto!click!setGrade"] && $.__views.auto.addEventListener("click", setGrade);
    __defers["$.__views.wireRope!click!setSlingType"] && $.__views.wireRope.addEventListener("click", setSlingType);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;