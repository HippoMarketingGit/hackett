function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "requirements";
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
    $.__views.requirements = Ti.UI.createWindow({
        layout: "vertical",
        color: "#FFF",
        backgroundColor: "#0d182f",
        id: "requirements"
    });
    $.__views.requirements && $.addTopLevelView($.__views.requirements);
    $.__views.header = Ti.UI.createView({
        layout: "vertical",
        top: "26dip",
        width: "100%",
        height: "50dip",
        id: "header"
    });
    $.__views.requirements.add($.__views.header);
    $.__views.__alloyId175 = Ti.UI.createImageView({
        bottom: "8dip",
        width: "90%",
        image: "images/WHC--logo.png",
        id: "__alloyId175"
    });
    $.__views.header.add($.__views.__alloyId175);
    $.__views.__alloyId176 = Ti.UI.createView({
        height: "1dip",
        width: "100%",
        backgroundColor: "#f7561e",
        id: "__alloyId176"
    });
    $.__views.requirements.add($.__views.__alloyId176);
    $.__views.__alloyId177 = Ti.UI.createView({
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
        id: "__alloyId177"
    });
    $.__views.requirements.add($.__views.__alloyId177);
    $.__views.scrollView = Ti.UI.createScrollView({
        layout: "vertical",
        bottom: "51dip",
        id: "scrollView"
    });
    $.__views.__alloyId177.add($.__views.scrollView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;