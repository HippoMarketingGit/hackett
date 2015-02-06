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
                upperTerminations.push(obj);
                lowerTerminations.push(obj);
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
                $.shorteningImage.image = "/images/terminations/" + e.row.title + ".jpg";
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
    $.__views.__alloyId256 = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "90%",
        height: Titanium.UI.SIZE,
        id: "__alloyId256"
    });
    $.__views.content.add($.__views.__alloyId256);
    $.__views.__alloyId257 = Ti.UI.createLabel({
        top: "10dip",
        color: "#FFF",
        font: {
            fontSize: 26
        },
        text: "Product Selection",
        id: "__alloyId257"
    });
    $.__views.__alloyId256.add($.__views.__alloyId257);
    $.__views.__alloyId258 = Ti.UI.createLabel({
        top: "10dip",
        color: "#FFF",
        font: {
            fontSize: 14
        },
        text: "Short introduction. Morbi in placerat magna, a gravida tellus. Lorem ipsum dolor sit amet, consectetur adipiscing.",
        id: "__alloyId258"
    });
    $.__views.__alloyId256.add($.__views.__alloyId258);
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
    $.__views.__alloyId259 = Ti.UI.createView({
        top: "10dip",
        height: "60dip",
        width: "90%",
        id: "__alloyId259"
    });
    $.__views.shorteningDeviceView.add($.__views.__alloyId259);
    $.__views.__alloyId260 = Ti.UI.createLabel({
        text: "Shortening Device",
        height: Ti.UI.FILL,
        left: "5dip",
        right: "70dip",
        color: "#FFF",
        id: "__alloyId260"
    });
    $.__views.__alloyId259.add($.__views.__alloyId260);
    $.__views.__alloyId261 = Ti.UI.createView({
        height: "60dip",
        width: "60dip",
        right: "5dip",
        backgroundColor: "#FFF",
        id: "__alloyId261"
    });
    $.__views.__alloyId259.add($.__views.__alloyId261);
    $.__views.shorteningImage = Ti.UI.createImageView({
        image: "/images/terminations/Eye Grab Hook.jpg",
        id: "shorteningImage",
        height: "60dip",
        width: "auto"
    });
    $.__views.__alloyId261.add($.__views.shorteningImage);
    $.__views.__alloyId262 = Ti.UI.createView({
        width: "90%",
        height: Titanium.UI.SIZE,
        top: "10dip",
        bottom: "10dip",
        id: "__alloyId262"
    });
    $.__views.shorteningDeviceView.add($.__views.__alloyId262);
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
    $.__views.__alloyId262.add($.__views.shorteningDeviceText);
    createPicker ? $.__views.shorteningDeviceText.addEventListener("click", createPicker) : __defers["$.__views.shorteningDeviceText!click!createPicker"] = true;
    $.__views.__alloyId263 = Ti.UI.createImageView({
        right: "0",
        width: "61px",
        height: "52px",
        className: "shortening",
        image: "images/WHC-select.jpg",
        id: "__alloyId263"
    });
    $.__views.__alloyId262.add($.__views.__alloyId263);
    createPicker ? $.__views.__alloyId263.addEventListener("click", createPicker) : __defers["$.__views.__alloyId263!click!createPicker"] = true;
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
    $.__views.__alloyId264 = Ti.UI.createView({
        top: "10dip",
        height: "60dip",
        width: "90%",
        id: "__alloyId264"
    });
    $.__views.lowerTermView.add($.__views.__alloyId264);
    $.__views.__alloyId265 = Ti.UI.createLabel({
        text: "Lower Termination",
        height: Ti.UI.FILL,
        left: "5dip",
        right: "70dip",
        color: "#FFF",
        id: "__alloyId265"
    });
    $.__views.__alloyId264.add($.__views.__alloyId265);
    $.__views.__alloyId266 = Ti.UI.createView({
        height: "60dip",
        width: "60dip",
        right: "5dip",
        backgroundColor: "#FFF",
        id: "__alloyId266"
    });
    $.__views.__alloyId264.add($.__views.__alloyId266);
    $.__views.lowerTermImage = Ti.UI.createImageView({
        image: "/images/terminations/Eye Grab Hook.jpg",
        id: "lowerTermImage",
        height: "60dip",
        width: "auto"
    });
    $.__views.__alloyId266.add($.__views.lowerTermImage);
    $.__views.__alloyId267 = Ti.UI.createView({
        width: "90%",
        height: Titanium.UI.SIZE,
        top: "10dip",
        bottom: "10dip",
        id: "__alloyId267"
    });
    $.__views.lowerTermView.add($.__views.__alloyId267);
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
    $.__views.__alloyId267.add($.__views.lowerTermText);
    createPicker ? $.__views.lowerTermText.addEventListener("click", createPicker) : __defers["$.__views.lowerTermText!click!createPicker"] = true;
    $.__views.__alloyId268 = Ti.UI.createImageView({
        right: "0",
        width: "61px",
        height: "52px",
        className: "lowerTerminations",
        image: "images/WHC-select.jpg",
        id: "__alloyId268"
    });
    $.__views.__alloyId267.add($.__views.__alloyId268);
    createPicker ? $.__views.__alloyId268.addEventListener("click", createPicker) : __defers["$.__views.__alloyId268!click!createPicker"] = true;
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
    $.__views.__alloyId269 = Ti.UI.createView({
        top: "10dip",
        height: "60dip",
        width: "90%",
        id: "__alloyId269"
    });
    $.__views.upperTermView.add($.__views.__alloyId269);
    $.__views.__alloyId270 = Ti.UI.createLabel({
        text: "Upper Termination",
        height: Ti.UI.FILL,
        left: "5dip",
        right: "70dip",
        color: "#FFF",
        id: "__alloyId270"
    });
    $.__views.__alloyId269.add($.__views.__alloyId270);
    $.__views.__alloyId271 = Ti.UI.createView({
        height: "60dip",
        width: "60dip",
        right: "5dip",
        backgroundColor: "#FFF",
        id: "__alloyId271"
    });
    $.__views.__alloyId269.add($.__views.__alloyId271);
    $.__views.upperTermImage = Ti.UI.createImageView({
        image: "/images/terminations/Eye Grab Hook.jpg",
        id: "upperTermImage",
        height: "60dip",
        width: "auto"
    });
    $.__views.__alloyId271.add($.__views.upperTermImage);
    $.__views.__alloyId272 = Ti.UI.createView({
        width: "90%",
        height: Titanium.UI.SIZE,
        top: "10dip",
        bottom: "10dip",
        id: "__alloyId272"
    });
    $.__views.upperTermView.add($.__views.__alloyId272);
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
    $.__views.__alloyId272.add($.__views.upperTermText);
    createPicker ? $.__views.upperTermText.addEventListener("click", createPicker) : __defers["$.__views.upperTermText!click!createPicker"] = true;
    $.__views.__alloyId273 = Ti.UI.createImageView({
        right: "0",
        width: "61px",
        height: "52px",
        className: "upperTerminations",
        image: "images/WHC-select.jpg",
        id: "__alloyId273"
    });
    $.__views.__alloyId272.add($.__views.__alloyId273);
    createPicker ? $.__views.__alloyId273.addEventListener("click", createPicker) : __defers["$.__views.__alloyId273!click!createPicker"] = true;
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
    __defers["$.__views.shorteningDeviceText!click!createPicker"] && $.__views.shorteningDeviceText.addEventListener("click", createPicker);
    __defers["$.__views.__alloyId263!click!createPicker"] && $.__views.__alloyId263.addEventListener("click", createPicker);
    __defers["$.__views.lowerTermText!click!createPicker"] && $.__views.lowerTermText.addEventListener("click", createPicker);
    __defers["$.__views.__alloyId268!click!createPicker"] && $.__views.__alloyId268.addEventListener("click", createPicker);
    __defers["$.__views.upperTermText!click!createPicker"] && $.__views.upperTermText.addEventListener("click", createPicker);
    __defers["$.__views.__alloyId273!click!createPicker"] && $.__views.__alloyId273.addEventListener("click", createPicker);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;