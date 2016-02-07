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
    $.__views.content = Ti.UI.createView({
        layout: "vertical",
        height: Ti.UI.SIZE,
        id: "content"
    });
    $.__views.content && $.addTopLevelView($.__views.content);
    $.__views.__alloyId178 = Ti.UI.createView({
        layout: "vertical",
        width: "90%",
        height: Titanium.UI.SIZE,
        id: "__alloyId178"
    });
    $.__views.content.add($.__views.__alloyId178);
    $.__views.__alloyId179 = Ti.UI.createLabel({
        top: "20dip",
        color: "#FFF",
        font: {
            fontSize: 26
        },
        textAlign: "center",
        text: "Product Selection",
        id: "__alloyId179"
    });
    $.__views.__alloyId178.add($.__views.__alloyId179);
    $.__views.__alloyId180 = Ti.UI.createLabel({
        top: "10dip",
        color: "#FFF",
        font: {
            fontSize: 14
        },
        text: "Please select whether you require your sling to be chain or wire rope.",
        id: "__alloyId180"
    });
    $.__views.__alloyId178.add($.__views.__alloyId180);
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
    setSlingType ? $.addListener($.__views.chain, "click", setSlingType) : __defers["$.__views.chain!click!setSlingType"] = true;
    $.__views.__alloyId181 = Ti.UI.createView({
        height: "1dip",
        width: "100%",
        top: "0",
        backgroundColor: "#FFF",
        id: "__alloyId181"
    });
    $.__views.chain.add($.__views.__alloyId181);
    $.__views.__alloyId182 = Ti.UI.createView({
        left: 0,
        height: 0,
        width: 0,
        backgroundColor: "#FFF",
        id: "__alloyId182"
    });
    $.__views.chain.add($.__views.__alloyId182);
    $.__views.__alloyId183 = Ti.UI.createLabel({
        left: "10%",
        color: "#FFF",
        font: {
            fontSize: 20
        },
        text: "Chain",
        touchEnabled: false,
        id: "__alloyId183"
    });
    $.__views.chain.add($.__views.__alloyId183);
    $.__views.__alloyId184 = Ti.UI.createImageView({
        right: "0",
        height: "85%",
        width: "auto",
        className: "icon",
        touchEnabled: false,
        image: "/images/sling-type/chain.jpg",
        id: "__alloyId184"
    });
    $.__views.chain.add($.__views.__alloyId184);
    $.__views.__alloyId185 = Ti.UI.createView({
        right: 0,
        height: 0,
        width: 0,
        backgroundColor: "#FFF",
        id: "__alloyId185"
    });
    $.__views.chain.add($.__views.__alloyId185);
    $.__views.__alloyId186 = Ti.UI.createView({
        height: "1dip",
        width: "100%",
        bottom: "0",
        backgroundColor: "#FFF",
        id: "__alloyId186"
    });
    $.__views.chain.add($.__views.__alloyId186);
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
    setGrade ? $.addListener($.__views.eight, "click", setGrade) : __defers["$.__views.eight!click!setGrade"] = true;
    $.__views.__alloyId187 = Ti.UI.createView({
        left: 0,
        height: 0,
        width: 0,
        backgroundColor: "#FFF",
        id: "__alloyId187"
    });
    $.__views.eight.add($.__views.__alloyId187);
    $.__views.__alloyId188 = Ti.UI.createView({
        layout: "vertical",
        height: Titanium.UI.SIZE,
        width: Titanium.UI.SIZE,
        touchEnabled: false,
        id: "__alloyId188"
    });
    $.__views.eight.add($.__views.__alloyId188);
    $.__views.__alloyId189 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: Titanium.UI.SIZE,
        touchEnabled: false,
        top: "4dip",
        id: "__alloyId189"
    });
    $.__views.__alloyId188.add($.__views.__alloyId189);
    $.__views.__alloyId190 = Ti.UI.createLabel({
        color: "#FFF",
        font: {
            fontSize: 12
        },
        text: "Grade",
        touchEnabled: false,
        id: "__alloyId190"
    });
    $.__views.__alloyId189.add($.__views.__alloyId190);
    $.__views.__alloyId191 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: Titanium.UI.SIZE,
        touchEnabled: false,
        top: "0",
        id: "__alloyId191"
    });
    $.__views.__alloyId188.add($.__views.__alloyId191);
    $.__views.__alloyId192 = Ti.UI.createLabel({
        color: "#FFF",
        font: {
            fontSize: 22
        },
        textAlign: "center",
        text: "8",
        touchEnabled: false,
        id: "__alloyId192"
    });
    $.__views.__alloyId191.add($.__views.__alloyId192);
    $.__views.ten = Ti.UI.createView({
        width: "33.2%",
        className: "button--quartenary",
        height: "80dip",
        id: "ten",
        backgroundColor: "#2b3b94"
    });
    $.__views.extra.add($.__views.ten);
    setGrade ? $.addListener($.__views.ten, "click", setGrade) : __defers["$.__views.ten!click!setGrade"] = true;
    $.__views.__alloyId193 = Ti.UI.createView({
        layout: "vertical",
        height: Titanium.UI.SIZE,
        width: Titanium.UI.SIZE,
        touchEnabled: false,
        id: "__alloyId193"
    });
    $.__views.ten.add($.__views.__alloyId193);
    $.__views.__alloyId194 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: Titanium.UI.SIZE,
        touchEnabled: false,
        top: "4dip",
        id: "__alloyId194"
    });
    $.__views.__alloyId193.add($.__views.__alloyId194);
    $.__views.__alloyId195 = Ti.UI.createLabel({
        color: "#FFF",
        font: {
            fontSize: 12
        },
        text: "Grade",
        touchEnabled: false,
        id: "__alloyId195"
    });
    $.__views.__alloyId194.add($.__views.__alloyId195);
    $.__views.__alloyId196 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: Titanium.UI.SIZE,
        touchEnabled: false,
        top: "0",
        id: "__alloyId196"
    });
    $.__views.__alloyId193.add($.__views.__alloyId196);
    $.__views.__alloyId197 = Ti.UI.createLabel({
        color: "#FFF",
        font: {
            fontSize: 22
        },
        textAlign: "center",
        text: "10",
        touchEnabled: false,
        id: "__alloyId197"
    });
    $.__views.__alloyId196.add($.__views.__alloyId197);
    $.__views.auto = Ti.UI.createView({
        width: "33.2%",
        className: "button--quartenary",
        height: "80dip",
        id: "auto",
        backgroundColor: "#2b3b94"
    });
    $.__views.extra.add($.__views.auto);
    setGrade ? $.addListener($.__views.auto, "click", setGrade) : __defers["$.__views.auto!click!setGrade"] = true;
    $.__views.__alloyId198 = Ti.UI.createView({
        layout: "vertical",
        height: Titanium.UI.SIZE,
        width: Titanium.UI.SIZE,
        touchEnabled: false,
        id: "__alloyId198"
    });
    $.__views.auto.add($.__views.__alloyId198);
    $.__views.__alloyId199 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: Titanium.UI.SIZE,
        touchEnabled: false,
        top: "4dip",
        id: "__alloyId199"
    });
    $.__views.__alloyId198.add($.__views.__alloyId199);
    $.__views.__alloyId200 = Ti.UI.createLabel({
        color: "#FFF",
        font: {
            fontSize: 12
        },
        text: "Grade",
        touchEnabled: false,
        id: "__alloyId200"
    });
    $.__views.__alloyId199.add($.__views.__alloyId200);
    $.__views.__alloyId201 = Ti.UI.createView({
        height: Titanium.UI.SIZE,
        width: Titanium.UI.SIZE,
        touchEnabled: false,
        top: "0",
        id: "__alloyId201"
    });
    $.__views.__alloyId198.add($.__views.__alloyId201);
    $.__views.__alloyId202 = Ti.UI.createLabel({
        color: "#FFF",
        font: {
            fontSize: 22
        },
        textAlign: "center",
        text: "Auto",
        touchEnabled: false,
        id: "__alloyId202"
    });
    $.__views.__alloyId201.add($.__views.__alloyId202);
    $.__views.__alloyId203 = Ti.UI.createView({
        right: 0,
        height: 0,
        width: 0,
        backgroundColor: "#FFF",
        id: "__alloyId203"
    });
    $.__views.auto.add($.__views.__alloyId203);
    $.__views.__alloyId204 = Ti.UI.createView({
        height: "1dip",
        width: "100%",
        bottom: "0",
        backgroundColor: "#FFF",
        id: "__alloyId204"
    });
    $.__views.extra.add($.__views.__alloyId204);
    $.__views.wireRope = Ti.UI.createView({
        top: 0,
        height: "120dip",
        width: "100%",
        className: "button--tertiary",
        id: "wireRope",
        backgroundColor: "#2b3b94"
    });
    $.__views.slings.add($.__views.wireRope);
    setSlingType ? $.addListener($.__views.wireRope, "click", setSlingType) : __defers["$.__views.wireRope!click!setSlingType"] = true;
    $.__views.__alloyId205 = Ti.UI.createView({
        left: 0,
        height: 0,
        width: 0,
        backgroundColor: "#FFF",
        id: "__alloyId205"
    });
    $.__views.wireRope.add($.__views.__alloyId205);
    $.__views.__alloyId206 = Ti.UI.createLabel({
        left: "10%",
        color: "#FFF",
        font: {
            fontSize: 20
        },
        text: "Wire Rope",
        touchEnabled: false,
        id: "__alloyId206"
    });
    $.__views.wireRope.add($.__views.__alloyId206);
    $.__views.__alloyId207 = Ti.UI.createImageView({
        right: "0",
        height: "85%",
        width: "auto",
        className: "icon",
        touchEnabled: false,
        image: "/images/sling-type/wire-rope.jpg",
        id: "__alloyId207"
    });
    $.__views.wireRope.add($.__views.__alloyId207);
    $.__views.__alloyId208 = Ti.UI.createView({
        right: 0,
        height: 0,
        width: 0,
        backgroundColor: "#FFF",
        id: "__alloyId208"
    });
    $.__views.wireRope.add($.__views.__alloyId208);
    $.__views.__alloyId209 = Ti.UI.createView({
        height: "1dip",
        width: "100%",
        bottom: "0",
        backgroundColor: "#FFF",
        id: "__alloyId209"
    });
    $.__views.wireRope.add($.__views.__alloyId209);
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
    __defers["$.__views.chain!click!setSlingType"] && $.addListener($.__views.chain, "click", setSlingType);
    __defers["$.__views.eight!click!setGrade"] && $.addListener($.__views.eight, "click", setGrade);
    __defers["$.__views.ten!click!setGrade"] && $.addListener($.__views.ten, "click", setGrade);
    __defers["$.__views.auto!click!setGrade"] && $.addListener($.__views.auto, "click", setGrade);
    __defers["$.__views.wireRope!click!setSlingType"] && $.addListener($.__views.wireRope, "click", setSlingType);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;