function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function setupAppleUI() {
        var windowOpts = {
            layout: "vertical",
            bottom: "0dip",
            width: "100%",
            height: Ti.UI.SIZE,
            exitOnClose: true,
            layout: "vertical",
            backgroundColor: "#f7561e"
        };
        var menuOpts = {
            backgroundColor: "#f7561e",
            top: 0,
            height: Ti.UI.SIZE
        };
        var buttonOpts = {
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
        };
        if (doShorteningDevs) {
            var shortenersWin = Ti.UI.createWindow(windowOpts), shortenersPickerMenu = Ti.UI.createView(menuOpts), shortenersDoneButton = Ti.UI.createButton(buttonOpts);
            shortenersWin.add(shortenersDoneButton);
            shortenersWin.add(shortenersPickerMenu);
            shortenersDoneButton.addEventListener("click", function() {
                shortenersWin.close();
            });
            setupPicker({
                itemList: lists.shorteningDevices,
                parentEl: shortenersPickerMenu,
                selectCb: function(e) {
                    Ti.API.info(e);
                },
                changeCb: function(e) {
                    $.shorteningDeviceText.value = e.row.title;
                    $.shorteningImage.image = "/images/shorteners/" + e.row.title + ".jpg";
                    Ti.API.info(JSON.stringify(e.row));
                    Alloy.Globals.sling.shorteningDevice = e.row.title;
                    Alloy.Globals.sling.shorteningDeviceCode = e.row.val;
                }
            });
            $.shorteningDeviceText.addEventListener("click", function() {
                shortenersWin.open();
            });
            $.buttonPickShortener.addEventListener("click", function() {
                shortenersWin.open();
            });
        }
        if (doUpperTerms) {
            var uppersWin = Ti.UI.createWindow(windowOpts), uppersPickerMenu = Ti.UI.createView(menuOpts), uppersDoneButton = Ti.UI.createButton(buttonOpts);
            uppersWin.add(uppersDoneButton);
            uppersWin.add(uppersPickerMenu);
            uppersDoneButton.addEventListener("click", function() {
                uppersWin.close();
            });
            setupPicker({
                itemList: lists.upperTerminations,
                parentEl: uppersPickerMenu,
                selectCb: function(e) {
                    Ti.API.info(e);
                },
                changeCb: function(e) {
                    $.upperTermText.value = e.row.title;
                    $.upperTermImage.image = "/images/terminations/" + e.row.title + ".jpg";
                    Ti.API.info(JSON.stringify(e.row));
                    Alloy.Globals.sling.upperTermination = e.row.title;
                    Alloy.Globals.sling.upperTerminationCode = e.row.val;
                }
            });
            $.upperTermText.addEventListener("click", function() {
                uppersWin.open();
            });
            $.buttonPickUpper.addEventListener("click", function() {
                uppersWin.open();
            });
        }
        if (doLowerTerms) {
            var lowersWin = Ti.UI.createWindow(windowOpts), lowersPickerMenu = Ti.UI.createView(menuOpts), lowersDoneButton = Ti.UI.createButton(buttonOpts);
            lowersWin.add(lowersDoneButton);
            lowersWin.add(lowersPickerMenu);
            lowersDoneButton.addEventListener("click", function() {
                lowersWin.close();
            });
            setupPicker({
                itemList: lists.lowerTerminations,
                parentEl: lowersPickerMenu,
                selectCb: function(e) {
                    Ti.API.info(e);
                },
                changeCb: function(e) {
                    $.lowerTermText.value = e.row.title;
                    $.lowerTermImage.image = "/images/terminations/" + e.row.title + ".jpg";
                    Ti.API.info(JSON.stringify(e.row));
                    Alloy.Globals.sling.lowerTermination = e.row.title;
                    Alloy.Globals.sling.lowerTerminationCode = e.row.val;
                }
            });
            $.lowerTermText.addEventListener("click", function() {
                lowersWin.open();
            });
            $.buttonPickLower.addEventListener("click", function() {
                lowersWin.open();
            });
        }
    }
    function setupAndroidUI() {
        $.shorteningDeviceText.hide();
        $.shorteningDeviceText.height = 0;
        $.buttonPickShortener.hide();
        $.buttonPickShortener.height = 0;
        $.upperTermText.hide();
        $.upperTermText.height = 0;
        $.buttonPickUpper.hide();
        $.buttonPickUpper.height = 0;
        $.lowerTermText.hide();
        $.lowerTermText.height = 0;
        $.buttonPickLower.hide();
        $.buttonPickLower.height = 0;
        doShorteningDevs && setupPicker({
            itemList: lists.shorteningDevices,
            parentEl: $.pickerWrapperShortening,
            selectCb: function(e) {
                Ti.API.info(e);
            },
            changeCb: function(e) {
                $.shorteningImage.image = "/images/shorteners/" + e.row.title + ".jpg";
                Ti.API.info(JSON.stringify(e.row));
                Alloy.Globals.sling.shorteningDevice = e.row.title;
                Alloy.Globals.sling.shorteningDeviceCode = e.row.val;
            }
        });
        doUpperTerms && setupPicker({
            itemList: lists.upperTerminations,
            parentEl: $.pickerWrapperUpper,
            selectCb: function(e) {
                Ti.API.info(e);
            },
            changeCb: function(e) {
                $.upperTermImage.image = "/images/terminations/" + e.row.title + ".jpg";
                Ti.API.info(JSON.stringify(e.row));
                Alloy.Globals.sling.upperTermination = e.row.title;
                Alloy.Globals.sling.upperTerminationCode = e.row.val;
            }
        });
        doLowerTerms && setupPicker({
            itemList: lists.lowerTerminations,
            parentEl: $.pickerWrapperLower,
            selectCb: function(e) {
                Ti.API.info(e);
            },
            changeCb: function(e) {
                $.lowerTermImage.image = "/images/terminations/" + e.row.title + ".jpg";
                Ti.API.info(JSON.stringify(e.row));
                Alloy.Globals.sling.lowerTermination = e.row.title;
                Alloy.Globals.sling.lowerTerminationCode = e.row.val;
            }
        });
    }
    function setupPicker(options) {
        var i = 0, obj = null, picker = Ti.UI.createPicker({
            width: Ti.UI.FILL
        }), row = Ti.UI.createPickerRow({
            title: "Select a device...",
            val: false
        }), noDevice = Ti.UI.createPickerRow({
            title: "No Device",
            val: ""
        });
        picker.add(row);
        picker.add(noDevice);
        for (i = 0; i < options.itemList.length; i++) {
            obj = Ti.UI.createPickerRow({
                title: options.itemList[i].name,
                val: options.itemList[i].code
            });
            obj.addEventListener("click", function(e) {
                options.selectCb(e);
            });
            picker.add(obj);
        }
        picker.addEventListener("change", function(e) {
            options.changeCb(e);
        });
        options.parentEl.add(picker);
        return picker;
    }
    function generateLists() {
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
        return {
            upperTerminations: upperTerminations,
            lowerTerminations: lowerTerminations,
            shorteningDevices: shorteningDevices
        };
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
    $.__views.content = Ti.UI.createView(function() {
        var o = {};
        Alloy.deepExtend(true, o, {
            layout: "vertical",
            height: Ti.UI.SIZE
        });
        Alloy.isTablet && Alloy.deepExtend(true, o, {
            layout: "vertical",
            width: "60%",
            height: Ti.UI.SIZE
        });
        Alloy.deepExtend(true, o, {
            id: "content"
        });
        return o;
    }());
    $.__views.content && $.addTopLevelView($.__views.content);
    $.__views.__alloyId286 = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "90%",
        height: Titanium.UI.SIZE,
        id: "__alloyId286"
    });
    $.__views.content.add($.__views.__alloyId286);
    $.__views.__alloyId287 = Ti.UI.createLabel({
        top: "10dip",
        color: "#FFF",
        font: {
            fontSize: 26
        },
        text: "Terminations",
        id: "__alloyId287"
    });
    $.__views.__alloyId286.add($.__views.__alloyId287);
    $.__views.__alloyId288 = Ti.UI.createLabel({
        top: "10dip",
        color: "#FFF",
        font: {
            fontSize: 14
        },
        text: "Please select one of the lower terminations available and a shortening device if required.",
        id: "__alloyId288"
    });
    $.__views.__alloyId286.add($.__views.__alloyId288);
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
    $.__views.__alloyId289 = Ti.UI.createView({
        top: "10dip",
        height: "60dip",
        width: "90%",
        id: "__alloyId289"
    });
    $.__views.shorteningDeviceView.add($.__views.__alloyId289);
    $.__views.__alloyId290 = Ti.UI.createLabel({
        text: "Shortening Device",
        height: Ti.UI.FILL,
        left: "5dip",
        right: "70dip",
        color: "#FFF",
        id: "__alloyId290"
    });
    $.__views.__alloyId289.add($.__views.__alloyId290);
    $.__views.__alloyId291 = Ti.UI.createView({
        height: "60dip",
        width: "60dip",
        right: "5dip",
        backgroundColor: "#FFF",
        id: "__alloyId291"
    });
    $.__views.__alloyId289.add($.__views.__alloyId291);
    $.__views.shorteningImage = Ti.UI.createImageView({
        image: "/images/terminations/Eye Grab Hook.jpg",
        id: "shorteningImage",
        height: "60dip",
        width: "auto"
    });
    $.__views.__alloyId291.add($.__views.shorteningImage);
    $.__views.pickerWrapperShortening = Ti.UI.createView({
        width: "90%",
        height: Titanium.UI.SIZE,
        top: "10dip",
        bottom: "10dip",
        id: "pickerWrapperShortening"
    });
    $.__views.shorteningDeviceView.add($.__views.pickerWrapperShortening);
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
    $.__views.pickerWrapperShortening.add($.__views.shorteningDeviceText);
    $.__views.buttonPickShortener = Ti.UI.createImageView({
        right: "0",
        width: "61px",
        height: "52px",
        className: "shortening",
        id: "buttonPickShortener",
        image: "images/WHC-select.jpg"
    });
    $.__views.pickerWrapperShortening.add($.__views.buttonPickShortener);
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
    $.__views.__alloyId292 = Ti.UI.createView({
        top: "10dip",
        height: "60dip",
        width: "90%",
        id: "__alloyId292"
    });
    $.__views.upperTermView.add($.__views.__alloyId292);
    $.__views.__alloyId293 = Ti.UI.createLabel({
        text: "Upper Termination",
        height: Ti.UI.FILL,
        left: "5dip",
        right: "70dip",
        color: "#FFF",
        id: "__alloyId293"
    });
    $.__views.__alloyId292.add($.__views.__alloyId293);
    $.__views.__alloyId294 = Ti.UI.createView({
        height: "60dip",
        width: "60dip",
        right: "5dip",
        backgroundColor: "#FFF",
        id: "__alloyId294"
    });
    $.__views.__alloyId292.add($.__views.__alloyId294);
    $.__views.upperTermImage = Ti.UI.createImageView({
        image: "/images/terminations/Eye Grab Hook.jpg",
        id: "upperTermImage",
        height: "60dip",
        width: "auto"
    });
    $.__views.__alloyId294.add($.__views.upperTermImage);
    $.__views.pickerWrapperUpper = Ti.UI.createView({
        width: "90%",
        height: Titanium.UI.SIZE,
        top: "10dip",
        bottom: "10dip",
        id: "pickerWrapperUpper"
    });
    $.__views.upperTermView.add($.__views.pickerWrapperUpper);
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
    $.__views.pickerWrapperUpper.add($.__views.upperTermText);
    $.__views.buttonPickUpper = Ti.UI.createImageView({
        right: "0",
        width: "61px",
        height: "52px",
        className: "upperTerminations",
        id: "buttonPickUpper",
        image: "images/WHC-select.jpg"
    });
    $.__views.pickerWrapperUpper.add($.__views.buttonPickUpper);
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
    $.__views.__alloyId295 = Ti.UI.createView({
        top: "10dip",
        height: "60dip",
        width: "90%",
        id: "__alloyId295"
    });
    $.__views.lowerTermView.add($.__views.__alloyId295);
    $.__views.__alloyId296 = Ti.UI.createLabel({
        text: "Lower Termination",
        height: Ti.UI.FILL,
        left: "5dip",
        right: "70dip",
        color: "#FFF",
        id: "__alloyId296"
    });
    $.__views.__alloyId295.add($.__views.__alloyId296);
    $.__views.__alloyId297 = Ti.UI.createView({
        height: "60dip",
        width: "60dip",
        right: "5dip",
        backgroundColor: "#FFF",
        id: "__alloyId297"
    });
    $.__views.__alloyId295.add($.__views.__alloyId297);
    $.__views.lowerTermImage = Ti.UI.createImageView({
        image: "/images/terminations/Eye Grab Hook.jpg",
        id: "lowerTermImage",
        height: "60dip",
        width: "auto"
    });
    $.__views.__alloyId297.add($.__views.lowerTermImage);
    $.__views.pickerWrapperLower = Ti.UI.createView({
        width: "90%",
        height: Titanium.UI.SIZE,
        top: "10dip",
        bottom: "10dip",
        id: "pickerWrapperLower"
    });
    $.__views.lowerTermView.add($.__views.pickerWrapperLower);
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
    $.__views.pickerWrapperLower.add($.__views.lowerTermText);
    $.__views.buttonPickLower = Ti.UI.createImageView({
        right: "0",
        width: "61px",
        height: "52px",
        className: "lowerTerminations",
        id: "buttonPickLower",
        image: "images/WHC-select.jpg"
    });
    $.__views.pickerWrapperLower.add($.__views.buttonPickLower);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var doShorteningDevs = true, doUpperTerms = true, doLowerTerms = true;
    if ("Chain" === Alloy.Globals.sling.type) {
        doUpperTerms = false;
        $.upperTermView.hide();
        $.upperTermView.height = 0;
    } else if ("Wire Rope" === Alloy.Globals.sling.type) if (1 === Alloy.Globals.sling.legs) {
        doShorteningDevs = false;
        $.shorteningDeviceView.hide();
        $.shorteningDeviceView.height = 0;
    } else {
        doShorteningDevs = false;
        $.shorteningDeviceView.hide();
        $.shorteningDeviceView.height = 0;
        doUpperTerms = false;
        $.upperTermView.hide();
        $.upperTermView.height = 0;
    }
    Alloy.Globals.shorteningCode = 0;
    Alloy.Globals.lowerTermCode = 0;
    Alloy.Globals.upperTermCode = 0;
    var lists = generateLists();
    switch (Ti.Platform.osname) {
      case "iphone":
      case "ipad":
        setupAppleUI();
        break;

      case "android":
        setupAndroidUI();
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;