function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function data() {
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
    }
    function devices() {
        var devicepicker = Ti.UI.createListView({
            height: "150dp",
            width: "100%",
            top: "0dp",
            templates: {
                plain: template
            },
            defaultItemTemplate: "plain"
        });
        devicepicker.addEventListener("itemclick", function(e) {
            if (e.itemIndex >= 0) {
                var section = e.section;
                var item = section.getItemAt(e.itemIndex);
                Ti.API.info(e.itemIndex);
                $.shorteningDeviceText.value = item.properties.title;
                $.shorteningImage.image = "/images/shorteners/" + item.properties.title + ".jpg";
                Ti.API.info(JSON.stringify(item));
                Alloy.Globals.sling.shorteningDevice = item.properties.title;
                Alloy.Globals.sling.shorteningDeviceCode = item.properties.val;
            }
        });
        var devicedataSet = [ {
            properties: {
                title: "No Device",
                val: ""
            }
        } ];
        var i;
        for (i = 0; i < shorteningDevices.length; i++) devicedataSet.push({
            properties: {
                title: shorteningDevices[i].name,
                val: shorteningDevices[i].code
            }
        });
        var devicesections = [];
        var deviceSection = Ti.UI.createListSection({
            headerTitle: "Shortening Devices"
        });
        deviceSection.setItems(devicedataSet);
        devicesections.push(deviceSection);
        devicepicker.sections = devicesections;
        $.devices.add(devicepicker);
    }
    function upper() {
        var upperpicker = Ti.UI.createListView({
            height: "150dp",
            width: "100%",
            top: "0dp",
            templates: {
                plain: template
            },
            defaultItemTemplate: "plain"
        });
        upperpicker.addEventListener("itemclick", function(e) {
            if (e.itemIndex >= 0) {
                var section = e.section;
                var item = section.getItemAt(e.itemIndex);
                $.upperTermText.value = item.properties.title;
                $.upperTermImage.image = "/images/terminations/" + item.properties.title + ".jpg";
                Ti.API.info("upper term image /images/terminations/" + item.properties.title + ".jpg");
                Ti.API.info(JSON.stringify(item));
                Alloy.Globals.sling.upperTermination = item.properties.title;
                Alloy.Globals.sling.upperTerminationCode = item.properties.val;
            }
        });
        var upperdataSet = [];
        var i;
        for (i = 0; i < upperTerminations.length; i++) upperdataSet.push({
            properties: {
                title: upperTerminations[i].name,
                val: upperTerminations[i].code
            }
        });
        var upperSections = [];
        var upperSection = Ti.UI.createListSection({
            headerTitle: "Upper Terminations"
        });
        upperSection.setItems(upperdataSet);
        upperSections.push(upperSection);
        upperpicker.sections = upperSections;
        $.upper.add(upperpicker);
    }
    function lower() {
        var lowerpicker = Ti.UI.createListView({
            height: "150dp",
            width: "100%",
            top: "0dp",
            templates: {
                plain: template
            },
            defaultItemTemplate: "plain"
        });
        lowerpicker.addEventListener("itemclick", function(e) {
            if (e.itemIndex >= 0) {
                var section = e.section;
                var item = section.getItemAt(e.itemIndex);
                $.lowerTermText.value = item.properties.title;
                $.lowerTermImage.image = "/images/terminations/" + item.properties.title + ".jpg";
                Ti.API.info("lower term image /images/terminations/" + item.properties.title + ".jpg");
                Ti.API.info(JSON.stringify(item));
                Alloy.Globals.sling.lowerTermination = item.properties.title;
                Alloy.Globals.sling.lowerTerminationCode = item.properties.val;
            }
        });
        var lowerdataSet = [];
        var i;
        for (i = 0; i < lowerTerminations.length; i++) lowerdataSet.push({
            properties: {
                title: lowerTerminations[i].name,
                val: lowerTerminations[i].code
            }
        });
        var lowerSections = [];
        var lowerSection = Ti.UI.createListSection({
            headerTitle: "Lower Terminations"
        });
        lowerSection.setItems(lowerdataSet);
        lowerSections.push(lowerSection);
        lowerpicker.sections = lowerSections;
        $.lower.add(lowerpicker);
    }
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
        var template = {
            childTemplates: [ {
                type: "Ti.UI.Label",
                bindId: "title"
            } ]
        };
        var picker = Ti.UI.createListView({
            height: "50dp",
            width: "100%",
            top: "0dp",
            templates: {
                plain: template
            },
            defaultItemTemplate: "plain"
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
        });
        pickerMenu.add(doneButton);
        pickerView.add(pickerMenu);
        pickerView.add(picker);
        var dataSet = [ {
            properties: {
                title: "Select a device...",
                val: false
            }
        }, {
            properties: {
                title: "No Device",
                val: ""
            }
        } ];
        if ("shortening" === e.source.className) {
            var i;
            for (i = 0; i < shorteningDevices.length; i++) dataSet.push({
                properties: {
                    title: shorteningDevices[i].name,
                    val: shorteningDevices[i].code
                }
            });
            var sections = [];
            var deviceSection = Ti.UI.createListSection({
                headerTitle: "Devices"
            });
            deviceSection.setItems(dataSet);
            sections.push(deviceSection);
            picker.sections = sections;
            picker.addEventListener("change", function(e) {
                $.shorteningDeviceText.value = e.row.title;
                $.shorteningImage.image = "/images/shorteners/" + e.row.title + ".jpg";
                Ti.API.info(JSON.stringify(e.row));
                Alloy.Globals.sling.shorteningDevice = e.row.title;
                Alloy.Globals.sling.shorteningDeviceCode = e.row.val;
            });
            doneButton.addEventListener("click", function() {});
        } else if ("lowerTerminations" === e.source.className) {
            var i;
            for (i = 0; i < lowerTerminations.length; i++) {
                var obj = Ti.UI.createPickerRow({
                    title: lowerTerminations[i].name,
                    val: lowerTerminations[i].code
                });
                obj.addEventListener("click", function(e) {
                    $.lowerTermText.value = e.title;
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
            doneButton.addEventListener("click", function() {});
        } else if ("upperTerminations" === e.source.className) {
            var i;
            for (i = 0; i < upperTerminations.length; i++) {
                var obj = Ti.UI.createPickerRow({
                    title: upperTerminations[i].name,
                    val: upperTerminations[i].code
                });
                obj.addEventListener("click", function(e) {
                    $.upperTermText.value = e.title;
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
            doneButton.addEventListener("click", function() {});
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
    $.__views.__alloyId234 = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "90%",
        height: Titanium.UI.SIZE,
        id: "__alloyId234"
    });
    $.__views.content.add($.__views.__alloyId234);
    $.__views.__alloyId235 = Ti.UI.createLabel({
        top: "10dip",
        color: "#FFF",
        font: {
            fontSize: 26
        },
        text: "Terminations",
        id: "__alloyId235"
    });
    $.__views.__alloyId234.add($.__views.__alloyId235);
    $.__views.__alloyId236 = Ti.UI.createLabel({
        top: "10dip",
        color: "#FFF",
        font: {
            fontSize: 14
        },
        text: "Please select one of the lower terminations available and a shortening device if required.",
        id: "__alloyId236"
    });
    $.__views.__alloyId234.add($.__views.__alloyId236);
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
    $.__views.__alloyId237 = Ti.UI.createView({
        top: "10dip",
        height: "105dip",
        width: "90%",
        id: "__alloyId237"
    });
    $.__views.shorteningDeviceView.add($.__views.__alloyId237);
    $.__views.__alloyId238 = Ti.UI.createView({
        height: "60dip",
        width: "60dip",
        right: "5dip",
        backgroundColor: "#FFF",
        id: "__alloyId238"
    });
    $.__views.__alloyId237.add($.__views.__alloyId238);
    $.__views.shorteningImage = Ti.UI.createImageView({
        image: "/images/terminations/Eye Grab Hook.jpg",
        id: "shorteningImage",
        height: "60dip",
        width: "auto"
    });
    $.__views.__alloyId238.add($.__views.shorteningImage);
    $.__views.devices = Ti.UI.createView({
        id: "devices"
    });
    $.__views.__alloyId237.add($.__views.devices);
    $.__views.__alloyId239 = Ti.UI.createView({
        width: "90%",
        height: Titanium.UI.SIZE,
        top: "10dip",
        bottom: "10dip",
        id: "__alloyId239"
    });
    $.__views.shorteningDeviceView.add($.__views.__alloyId239);
    $.__views.shorteningDeviceText = Ti.UI.createTextField({
        left: "0",
        right: "61px",
        height: "34px",
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
    $.__views.__alloyId239.add($.__views.shorteningDeviceText);
    createPicker ? $.addListener($.__views.shorteningDeviceText, "click", createPicker) : __defers["$.__views.shorteningDeviceText!click!createPicker"] = true;
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
    $.__views.__alloyId240 = Ti.UI.createView({
        top: "10dip",
        height: "105dip",
        width: "90%",
        id: "__alloyId240"
    });
    $.__views.upperTermView.add($.__views.__alloyId240);
    $.__views.__alloyId241 = Ti.UI.createView({
        height: "60dip",
        width: "60dip",
        right: "5dip",
        backgroundColor: "#FFF",
        id: "__alloyId241"
    });
    $.__views.__alloyId240.add($.__views.__alloyId241);
    $.__views.upperTermImage = Ti.UI.createImageView({
        image: "/images/terminations/Eye Grab Hook.jpg",
        id: "upperTermImage",
        height: "60dip",
        width: "auto"
    });
    $.__views.__alloyId241.add($.__views.upperTermImage);
    $.__views.upper = Ti.UI.createView({
        id: "upper"
    });
    $.__views.__alloyId240.add($.__views.upper);
    $.__views.__alloyId242 = Ti.UI.createView({
        width: "90%",
        height: Titanium.UI.SIZE,
        top: "10dip",
        bottom: "10dip",
        id: "__alloyId242"
    });
    $.__views.upperTermView.add($.__views.__alloyId242);
    $.__views.upperTermText = Ti.UI.createTextField({
        left: "0",
        right: "61px",
        height: "34px",
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
    $.__views.__alloyId242.add($.__views.upperTermText);
    createPicker ? $.addListener($.__views.upperTermText, "click", createPicker) : __defers["$.__views.upperTermText!click!createPicker"] = true;
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
    $.__views.__alloyId243 = Ti.UI.createView({
        top: "10dip",
        height: "105dip",
        width: "90%",
        id: "__alloyId243"
    });
    $.__views.lowerTermView.add($.__views.__alloyId243);
    $.__views.__alloyId244 = Ti.UI.createView({
        height: "60dip",
        width: "60dip",
        right: "5dip",
        backgroundColor: "#FFF",
        id: "__alloyId244"
    });
    $.__views.__alloyId243.add($.__views.__alloyId244);
    $.__views.lowerTermImage = Ti.UI.createImageView({
        image: "/images/terminations/Eye Grab Hook.jpg",
        id: "lowerTermImage",
        height: "60dip",
        width: "auto"
    });
    $.__views.__alloyId244.add($.__views.lowerTermImage);
    $.__views.lower = Ti.UI.createView({
        id: "lower"
    });
    $.__views.__alloyId243.add($.__views.lower);
    $.__views.__alloyId245 = Ti.UI.createView({
        width: "90%",
        height: Titanium.UI.SIZE,
        top: "10dip",
        bottom: "10dip",
        id: "__alloyId245"
    });
    $.__views.lowerTermView.add($.__views.__alloyId245);
    $.__views.lowerTermText = Ti.UI.createTextField({
        left: "0",
        right: "61px",
        height: "34px",
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
    $.__views.__alloyId245.add($.__views.lowerTermText);
    createPicker ? $.addListener($.__views.lowerTermText, "click", createPicker) : __defers["$.__views.lowerTermText!click!createPicker"] = true;
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
    var template = {
        childTemplates: [ {
            type: "Ti.UI.Label",
            bindId: "title"
        } ]
    };
    Alloy.Globals.shorteningCode = 0;
    Alloy.Globals.lowerTermCode = 0;
    Alloy.Globals.upperTermCode = 0;
    var upperTerminations = [], lowerTerminations = [], shorteningDevices = [];
    !function() {
        data();
        devices();
        upper();
        lower();
    }();
    __defers["$.__views.shorteningDeviceText!click!createPicker"] && $.addListener($.__views.shorteningDeviceText, "click", createPicker);
    __defers["$.__views.upperTermText!click!createPicker"] && $.addListener($.__views.upperTermText, "click", createPicker);
    __defers["$.__views.lowerTermText!click!createPicker"] && $.addListener($.__views.lowerTermText, "click", createPicker);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;