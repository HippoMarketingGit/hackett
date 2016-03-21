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
    $.__views.requirements = Ti.UI.createWindow({
        layout: "vertical",
        color: "#FFF",
        backgroundColor: "#0d182f",
        id: "requirements"
    });
    $.__views.requirements && $.addTopLevelView($.__views.requirements);
    $.__views.header = Ti.UI.createView({
        top: "26dip",
        width: "100%",
        height: "65dip",
        backgroundColor: "#eb6209",
        id: "header"
    });
    $.__views.requirements.add($.__views.header);
    $.__views.__alloyId163 = Ti.UI.createImageView({
        width: Ti.UI.SIZE,
        height: "80%",
        image: "images/WHC--logo.png",
        id: "__alloyId163"
    });
    $.__views.header.add($.__views.__alloyId163);
    $.__views.__alloyId164 = Ti.UI.createView({
        height: "1dip",
        width: "100%",
        backgroundColor: "#f7561e",
        id: "__alloyId164"
    });
    $.__views.requirements.add($.__views.__alloyId164);
    $.__views.__alloyId165 = Ti.UI.createView({
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
        id: "__alloyId165"
    });
    $.__views.requirements.add($.__views.__alloyId165);
    $.__views.scrollView = Ti.UI.createScrollView({
        layout: "vertical",
        bottom: "51dip",
        id: "scrollView"
    });
    $.__views.__alloyId165.add($.__views.scrollView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;