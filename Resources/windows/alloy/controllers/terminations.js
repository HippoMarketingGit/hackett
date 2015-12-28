function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function createPicker(e) {
        var upperTerminations = [], lowerTerminations = [], shorteningDevices = [];
        var db = Ti.Database.open("SlingDB.sqlite");
        if ("Chain" === Alloy.Globals.sling.type) {
            var row;
            row = db.execute(10 === Alloy.Globals.sling.grade ? 'SELECT * FROM EndFittings WHERE type = "c" AND grade10_' + Alloy.Globals.sling.legs + ' ="1"' : 8 === Alloy.Globals.sling.grade ? 'SELECT * FROM EndFittings WHERE type = "c" AND grade8_' + Alloy.Globals.sling.legs + ' ="1"' : 'SELECT * FROM EndFittings WHERE type = "c"');
            while (row.isValidRow()) {
                var code = row.fieldByName("code"), name = row.fieldByName("name");
                var obj = {
                    code: code,
                    name: name
                };
                4 != code && lowerTerminations.push(obj);
                upperTerminations.push(obj);
                row.next();
            }
        } else if ("Wire Rope" === Alloy.Globals.sling.type) {
            var row = db.execute('SELECT * FROM EndFittings WHERE type = "r"');
            while (row.isValidRow()) {
                var code = row.fieldByName("code"), name = row.fieldByName("name");
                var obj = {
                    code: code,
                    name: name
                };
                upperTerminations.push(obj);
                lowerTerminations.push(obj);
                row.next();
            }
        }
        var row = db.execute("SELECT * FROM Shorteners");
        while (row.isValidRow()) {
            var code = row.fieldByName("code"), name = row.fieldByName("name");
            var obj = {
                code: code,
                name: name
            };
            shorteningDevices.push(obj);
            row.next();
        }
        db.close();
        var picker = Ti.UI.createPicker(), row = Ti.UI.createPickerRow({
            title: "Select a device...",
            val: false
        }), noDevice = Ti.UI.createPickerRow({
            title: "No Device",
            val: ""
        }), pickerView = Ti.UI.createView({
            layout: "vertical",
            bottom: "0dip",
            width: "100%",
            height: Ti.UI.SIZE
        }), pickerMenu = Ti.UI.createView({
            backgroundColor: "#f7561e",
            top: 0,
            height: Ti.UI.SIZE
        }), doneButton = Ti.UI.createButton({
            title: "Done",
            top: 0,
            right: 0,
            height: Titanium.UI.SIZE,
            width: "60dip",
            backgroundColor: "#f7561e",
            color: "#FFF",
            font: {
                fontSize: 14
            }
        }), wrapper = $.content.getParent().getParent();
        picker.add(row);
        picker.add(noDevice);
        pickerMenu.add(doneButton);
        pickerView.add(pickerMenu);
        pickerView.add(picker);
        if ("shortening" === e.source.className) {
            var i;
            for (i = 0; i < shorteningDevices.length; i++) {
                var obj = Ti.UI.createPickerRow({
                    title: shorteningDevices[i].name,
                    val: shorteningDevices[i].code
                });
                obj.addEventListener("click", function(e) {
                    $.shorteningDeviceText.value = e.title;
                    wrapper.remove(pickerView);
                });
                picker.add(obj);
            }
            picker.addEventListener("change", function(e) {
                $.shorteningDeviceText.value = e.row.title;
                $.shorteningImage.image = "/images/shorteners/" + e.row.title + ".jpg";
                Ti.API.info(JSON.stringify(e.row));
                Alloy.Globals.sling.shorteningDevice = e.row.title;
                Alloy.Globals.sling.shorteningDeviceCode = e.row.val;
            });
            doneButton.addEventListener("click", function() {
                wrapper.remove(pickerView);
            });
            Ti.API.info(wrapper);
        } else if ("lowerTerminations" === e.source.className) {
            var i;
            for (i = 0; i < lowerTerminations.length; i++) {
                var obj = Ti.UI.createPickerRow({
                    title: lowerTerminations[i].name,
                    val: lowerTerminations[i].code
                });
                obj.addEventListener("click", function(e) {
                    $.lowerTermText.value = e.title;
                    wrapper.remove(pickerView);
                });
                picker.add(obj);
            }
            picker.addEventListener("change", function(e) {
                $.lowerTermText.value = e.row.title;
                $.lowerTermImage.image = "/images/terminations/" + e.row.title + ".jpg";
                Ti.API.info("lower term image /images/terminations/" + e.row.title + ".jpg");
                Ti.API.info(JSON.stringify(e.row));
                Alloy.Globals.sling.lowerTermination = e.row.title;
                Alloy.Globals.sling.lowerTerminationCode = e.row.val;
            });
            doneButton.addEventListener("click", function() {
                wrapper.remove(pickerView);
            });
        } else if ("upperTerminations" === e.source.className) {
            var i;
            for (i = 0; i < upperTerminations.length; i++) {
                var obj = Ti.UI.createPickerRow({
                    title: upperTerminations[i].name,
                    val: upperTerminations[i].code
                });
                obj.addEventListener("click", function(e) {
                    $.upperTermText.value = e.title;
                    wrapper.remove(pickerView);
                });
                picker.add(obj);
            }
            picker.addEventListener("change", function(e) {
                $.upperTermText.value = e.row.title;
                $.upperTermImage.image = "/images/terminations/" + e.row.title + ".jpg";
                Ti.API.info("upper term image /images/terminations/" + e.row.title + ".jpg");
                Ti.API.info(JSON.stringify(e.row));
                Alloy.Globals.sling.upperTermination = e.row.title;
                Alloy.Globals.sling.upperTerminationCode = e.row.val;
            });
            doneButton.addEventListener("click", function() {
                wrapper.remove(pickerView);
            });
        }
        wrapper.add(pickerView);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "terminations";
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
    $.__views.__alloyId249 = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "90%",
        height: Titanium.UI.SIZE,
        id: "__alloyId249"
    });
    $.__views.content.add($.__views.__alloyId249);
    $.__views.__alloyId250 = Ti.UI.createLabel({
        top: "10dip",
        color: "#FFF",
        font: {
            fontSize: 26
        },
        text: "Terminations",
        id: "__alloyId250"
    });
    $.__views.__alloyId249.add($.__views.__alloyId250);
    $.__views.__alloyId251 = Ti.UI.createLabel({
        top: "10dip",
        color: "#FFF",
        font: {
            fontSize: 14
        },
        text: "Please select one of the lower terminations available and a shortening device if required.",
        id: "__alloyId251"
    });
    $.__views.__alloyId249.add($.__views.__alloyId251);
    $.__views.shorteningDeviceView = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "90%",
        height: Titanium.UI.SIZE,
        id: "shorteningDeviceView",
        borderWidth: "1dip",
        borderColor: "#fba688",
        backgroundColor: "#6b76d0"
    });
    $.__views.content.add($.__views.shorteningDeviceView);
    $.__views.__alloyId252 = Ti.UI.createView({
        top: "10dip",
        height: "60dip",
        width: "90%",
        id: "__alloyId252"
    });
    $.__views.shorteningDeviceView.add($.__views.__alloyId252);
    $.__views.__alloyId253 = Ti.UI.createLabel({
        text: "Shortening Device",
        height: Ti.UI.FILL,
        left: "5dip",
        right: "70dip",
        color: "#FFF",
        id: "__alloyId253"
    });
    $.__views.__alloyId252.add($.__views.__alloyId253);
    $.__views.__alloyId254 = Ti.UI.createView({
        height: "60dip",
        width: "60dip",
        right: "5dip",
        backgroundColor: "#FFF",
        id: "__alloyId254"
    });
    $.__views.__alloyId252.add($.__views.__alloyId254);
    $.__views.shorteningImage = Ti.UI.createImageView({
        image: "/images/terminations/Eye Grab Hook.jpg",
        id: "shorteningImage",
        height: "60dip",
        width: "auto"
    });
    $.__views.__alloyId254.add($.__views.shorteningImage);
    $.__views.__alloyId255 = Ti.UI.createView({
        width: "90%",
        height: Titanium.UI.SIZE,
        top: "10dip",
        bottom: "10dip",
        id: "__alloyId255"
    });
    $.__views.shorteningDeviceView.add($.__views.__alloyId255);
    $.__views.shorteningDeviceText = Ti.UI.createTextField({
        left: "0",
        right: "61px",
        height: "52px",
        backgroundColor: "#FFF",
        borderWidth: "1dip",
        borderColor: "#fba688",
        color: "#000",
        className: "shortening",
        editable: "false",
        value: "Select...",
        id: "shorteningDeviceText",
        paddingLeft: "5dip"
    });
    $.__views.__alloyId255.add($.__views.shorteningDeviceText);
    createPicker ? $.addListener($.__views.shorteningDeviceText, "click", createPicker) : __defers["$.__views.shorteningDeviceText!click!createPicker"] = true;
    $.__views.__alloyId256 = Ti.UI.createImageView({
        right: "0",
        width: "61px",
        height: "52px",
        className: "shortening",
        image: "images/WHC-select.jpg",
        id: "__alloyId256"
    });
    $.__views.__alloyId255.add($.__views.__alloyId256);
    createPicker ? $.addListener($.__views.__alloyId256, "click", createPicker) : __defers["$.__views.__alloyId256!click!createPicker"] = true;
    $.__views.upperTermView = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "90%",
        height: Titanium.UI.SIZE,
        id: "upperTermView",
        borderWidth: "1dip",
        borderColor: "#fba688",
        backgroundColor: "#6b76d0"
    });
    $.__views.content.add($.__views.upperTermView);
    $.__views.__alloyId257 = Ti.UI.createView({
        top: "10dip",
        height: "60dip",
        width: "90%",
        id: "__alloyId257"
    });
    $.__views.upperTermView.add($.__views.__alloyId257);
    $.__views.__alloyId258 = Ti.UI.createLabel({
        text: "Upper Termination",
        height: Ti.UI.FILL,
        left: "5dip",
        right: "70dip",
        color: "#FFF",
        id: "__alloyId258"
    });
    $.__views.__alloyId257.add($.__views.__alloyId258);
    $.__views.__alloyId259 = Ti.UI.createView({
        height: "60dip",
        width: "60dip",
        right: "5dip",
        backgroundColor: "#FFF",
        id: "__alloyId259"
    });
    $.__views.__alloyId257.add($.__views.__alloyId259);
    $.__views.upperTermImage = Ti.UI.createImageView({
        image: "/images/terminations/Eye Grab Hook.jpg",
        id: "upperTermImage",
        height: "60dip",
        width: "auto"
    });
    $.__views.__alloyId259.add($.__views.upperTermImage);
    $.__views.__alloyId260 = Ti.UI.createView({
        width: "90%",
        height: Titanium.UI.SIZE,
        top: "10dip",
        bottom: "10dip",
        id: "__alloyId260"
    });
    $.__views.upperTermView.add($.__views.__alloyId260);
    $.__views.upperTermText = Ti.UI.createTextField({
        left: "0",
        right: "61px",
        height: "52px",
        backgroundColor: "#FFF",
        borderWidth: "1dip",
        borderColor: "#fba688",
        color: "#000",
        className: "upperTerminations",
        editable: "false",
        value: "Select...",
        id: "upperTermText",
        paddingLeft: "5dip"
    });
    $.__views.__alloyId260.add($.__views.upperTermText);
    createPicker ? $.addListener($.__views.upperTermText, "click", createPicker) : __defers["$.__views.upperTermText!click!createPicker"] = true;
    $.__views.__alloyId261 = Ti.UI.createImageView({
        right: "0",
        width: "61px",
        height: "52px",
        className: "upperTerminations",
        image: "images/WHC-select.jpg",
        id: "__alloyId261"
    });
    $.__views.__alloyId260.add($.__views.__alloyId261);
    createPicker ? $.addListener($.__views.__alloyId261, "click", createPicker) : __defers["$.__views.__alloyId261!click!createPicker"] = true;
    $.__views.lowerTermView = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "90%",
        height: Titanium.UI.SIZE,
        id: "lowerTermView",
        borderWidth: "1dip",
        borderColor: "#fba688",
        backgroundColor: "#6b76d0"
    });
    $.__views.content.add($.__views.lowerTermView);
    $.__views.__alloyId262 = Ti.UI.createView({
        top: "10dip",
        height: "60dip",
        width: "90%",
        id: "__alloyId262"
    });
    $.__views.lowerTermView.add($.__views.__alloyId262);
    $.__views.__alloyId263 = Ti.UI.createLabel({
        text: "Lower Termination",
        height: Ti.UI.FILL,
        left: "5dip",
        right: "70dip",
        color: "#FFF",
        id: "__alloyId263"
    });
    $.__views.__alloyId262.add($.__views.__alloyId263);
    $.__views.__alloyId264 = Ti.UI.createView({
        height: "60dip",
        width: "60dip",
        right: "5dip",
        backgroundColor: "#FFF",
        id: "__alloyId264"
    });
    $.__views.__alloyId262.add($.__views.__alloyId264);
    $.__views.lowerTermImage = Ti.UI.createImageView({
        image: "/images/terminations/Eye Grab Hook.jpg",
        id: "lowerTermImage",
        height: "60dip",
        width: "auto"
    });
    $.__views.__alloyId264.add($.__views.lowerTermImage);
    $.__views.__alloyId265 = Ti.UI.createView({
        width: "90%",
        height: Titanium.UI.SIZE,
        top: "10dip",
        bottom: "10dip",
        id: "__alloyId265"
    });
    $.__views.lowerTermView.add($.__views.__alloyId265);
    $.__views.lowerTermText = Ti.UI.createTextField({
        left: "0",
        right: "61px",
        height: "52px",
        backgroundColor: "#FFF",
        borderWidth: "1dip",
        borderColor: "#fba688",
        color: "#000",
        className: "lowerTerminations",
        editable: "false",
        value: "Select...",
        id: "lowerTermText",
        paddingLeft: "5dip"
    });
    $.__views.__alloyId265.add($.__views.lowerTermText);
    createPicker ? $.addListener($.__views.lowerTermText, "click", createPicker) : __defers["$.__views.lowerTermText!click!createPicker"] = true;
    $.__views.__alloyId266 = Ti.UI.createImageView({
        right: "0",
        width: "61px",
        height: "52px",
        className: "lowerTerminations",
        image: "images/WHC-select.jpg",
        id: "__alloyId266"
    });
    $.__views.__alloyId265.add($.__views.__alloyId266);
    createPicker ? $.addListener($.__views.__alloyId266, "click", createPicker) : __defers["$.__views.__alloyId266!click!createPicker"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    if ("Chain" === Alloy.Globals.sling.type) {
        $.upperTermView.hide();
        $.upperTermView.height = 0;
    } else if ("Wire Rope" === Alloy.Globals.sling.type) if (1 === Alloy.Globals.sling.legs) {
        $.shorteningDeviceView.hide();
        $.shorteningDeviceView.height = 0;
    } else {
        $.shorteningDeviceView.hide();
        $.shorteningDeviceView.height = 0;
        $.upperTermView.hide();
        $.upperTermView.height = 0;
    }
    Alloy.Globals.shorteningCode = 0;
    Alloy.Globals.lowerTermCode = 0;
    Alloy.Globals.upperTermCode = 0;
    __defers["$.__views.shorteningDeviceText!click!createPicker"] && $.addListener($.__views.shorteningDeviceText, "click", createPicker);
    __defers["$.__views.__alloyId256!click!createPicker"] && $.addListener($.__views.__alloyId256, "click", createPicker);
    __defers["$.__views.upperTermText!click!createPicker"] && $.addListener($.__views.upperTermText, "click", createPicker);
    __defers["$.__views.__alloyId261!click!createPicker"] && $.addListener($.__views.__alloyId261, "click", createPicker);
    __defers["$.__views.lowerTermText!click!createPicker"] && $.addListener($.__views.lowerTermText, "click", createPicker);
    __defers["$.__views.__alloyId266!click!createPicker"] && $.addListener($.__views.__alloyId266, "click", createPicker);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;