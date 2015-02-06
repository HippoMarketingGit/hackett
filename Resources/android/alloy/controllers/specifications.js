function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function createPartcode() {
        var gradeCode, limit, type, slingSize, slingSizeAuto8, slingSizeAuto10, Database = require("databaseObj"), database = new Database("SlingDB.sqlite"), db = database.openDb(), legLength = Math.ceil(parseFloat(Alloy.Globals.sling.nominalLength));
        limit = 45 === Alloy.Globals.sling.angle ? "limit45" : "limit60";
        if ("Chain" === Alloy.Globals.sling.type) {
            type = "c";
            if (8 === Alloy.Globals.sling.grade) gradeCode = "A"; else if (10 === Alloy.Globals.sling.grade) gradeCode = "X"; else if ("Auto" === Alloy.Globals.sling.grade) {
                var row8 = db.execute('SELECT * FROM WorkingLoadLimits WHERE legs = "' + Alloy.Globals.sling.legs + '" AND grade = "8" AND ' + limit + " >= " + Alloy.Globals.sling.load + ' AND type = "' + type + '" ORDER BY ' + limit + " ASC LIMIT 1");
                row8.isValidRow() && (slingSizeAuto8 = row8.fieldByName("size"));
                var row10 = db.execute('SELECT * FROM WorkingLoadLimits WHERE legs = "' + Alloy.Globals.sling.legs + '" AND grade = "10" AND ' + limit + " >= " + Alloy.Globals.sling.load + ' AND type = "' + type + '" ORDER BY ' + limit + " ASC LIMIT 1");
                row10.isValidRow() && (slingSizeAuto10 = row10.fieldByName("size"));
            }
            var newRow = db.execute('SELECT * FROM WorkingLoadLimits WHERE legs = "' + Alloy.Globals.sling.legs + '" AND grade = "' + Alloy.Globals.sling.grade + '" AND ' + limit + " >= " + Alloy.Globals.sling.load + ' AND type = "' + type + '" ORDER BY ' + limit + " ASC LIMIT 1");
            newRow.isValidRow() && (slingSize = newRow.fieldByName("size"));
        } else {
            type = "r";
            var newRow = db.execute('SELECT * FROM WorkingLoadLimits WHERE legs = "' + Alloy.Globals.sling.legs + '" AND ' + limit + " >= " + Alloy.Globals.sling.load + ' AND type = "' + type + '" ORDER BY ' + limit + " ASC LIMIT 1");
            newRow.isValidRow() && (slingSize = newRow.fieldByName("size"));
        }
        "NONE" === Alloy.Globals.sling.shorteningDeviceCode && (Alloy.Globals.sling.shorteningDeviceCode = 0);
        "NONE" === Alloy.Globals.sling.lowerTerminationCode && (Alloy.Globals.sling.lowerTerminationCode = 0);
        "NONE" === Alloy.Globals.sling.upperTerminationCode && (Alloy.Globals.sling.upperTerminationCode = 0);
        10 > slingSize && (slingSize = "0" + slingSize);
        10 > slingSizeAuto8 && (slingSizeAuto8 = "0" + slingSizeAuto8);
        10 > slingSizeAuto10 && (slingSizeAuto10 = "0" + slingSizeAuto10);
        if (10 > legLength) {
            legLength = "0" + legLength;
            Ti.API.info("Leg Length: " + legLength);
        }
        if ("Chain" === Alloy.Globals.sling.type) if ("Auto" !== Alloy.Globals.sling.grade) Alloy.Globals.sling.partCode = gradeCode + slingSize + "." + Alloy.Globals.sling.legs + legLength + "." + Alloy.Globals.sling.lowerTerminationCode + Alloy.Globals.sling.shorteningDeviceCode; else {
            Alloy.Globals.sling.partCode = "A" + slingSizeAuto8 + "." + Alloy.Globals.sling.legs + legLength + "." + Alloy.Globals.sling.lowerTerminationCode + Alloy.Globals.sling.shorteningDeviceCode + " or X" + slingSizeAuto10 + "." + Alloy.Globals.sling.legs + legLength + "." + Alloy.Globals.sling.lowerTerminationCode + Alloy.Globals.sling.shorteningDeviceCode;
            Ti.API.info(Alloy.Globals.sling.partCode);
        } else Alloy.Globals.sling.partCode = 1 === Alloy.Globals.sling.legs ? "NONE" === Alloy.Globals.sling.upperTerminationCode ? "RS0" + slingSize + "." + Alloy.Globals.sling.legs + legLength + "." + Alloy.Globals.sling.lowerTerminationCode : "RS0" + slingSize + "." + Alloy.Globals.sling.legs + legLength + "." + Alloy.Globals.sling.lowerTerminationCode + Alloy.Globals.sling.upperTerminationCode : "RS0" + slingSize + "." + Alloy.Globals.sling.legs + legLength + "." + Alloy.Globals.sling.lowerTerminationCode;
        database.closeDb(db);
        return Alloy.Globals.sling.partCode;
    }
    function outputDetails(type, grade, legs, load, nominalLength, description, partCode) {
        $.slingType.text = type;
        $.grade.text = grade;
        $.legs.text = legs;
        $.load.text = load;
        $.length.text = nominalLength;
        $.description.text = description;
        if ("Wire Rope" === type) {
            $.gradeContainer.height = 0;
            $.gradeContainer.hide();
        }
        if (null === description) {
            $.descriptionContainer.hide();
            $.descriptionContainer.height = 0;
        } else $.description.text = "Description: " + description;
        Ti.API.info("price: " + Alloy.Globals.sling.quotedPrice + " grade: " + Alloy.Globals.sling.grade);
        if (null === Alloy.Globals.sling.quotedPrice && "Auto" === Alloy.Globals.sling.grade) {
            $.specPartcode.text = "Based on your requirements, we have identified two possible sling configurations: " + partCode;
            $.quotedPrice.text = "We cannot quote you a price for your configured slings. Please contact William Hackett Chains and reference your part code.";
        } else if (null === Alloy.Globals.sling.quotedPrice && "Auto" !== Alloy.Globals.sling.grade) {
            $.quotedPrice.text = "We cannot quote you a price for your configured sling. Please contact William Hackett Chains and reference your part code.";
            $.specPartcode.text = "Based on your requirements, we recommend the following sling configuration: " + partCode;
        } else if (null !== Alloy.Globals.sling.quotedPrice && "Auto" !== Alloy.Globals.sling.grade) {
            $.quotedPrice.text = "Price (RRP): £" + Alloy.Globals.sling.quotedPrice;
            $.specPartcode.text = "Based on your requirements, we recommend the following sling configuration: " + partCode;
        } else if (null !== Alloy.Globals.sling.quotedPrice && "Auto" === Alloy.Globals.sling.grade) {
            $.quotedPrice.text = "Price (RRP): £" + Alloy.Globals.sling.quotedPrice;
            $.specPartcode.text = "Based on your requirements, we recommend the following sling configuration: " + partCode;
        }
    }
    function closeModal() {
        $.specifications.close({
            modal: true
        });
    }
    function sendQuote() {
        var Common = require("common"), common = new Common(), Connection = require("connections"), connection = new Connection(), Database = require("databaseObj"), database = new Database("SlingDB.sqlite"), user = database.getCurrentUser();
        online = connection.onlineCheck(function(data) {
            var online;
            online = 1 === data ? true : false;
            return online;
        });
        Ti.API.info(user);
        if (online) {
            database.insertQuoteOnline(Alloy.Globals.sling.type, Alloy.Globals.sling.grade, Alloy.Globals.sling.legs, Alloy.Globals.sling.load, Alloy.Globals.sling.nominalLength, Alloy.Globals.sling.partCode, Alloy.Globals.sling.quotedPrice, Alloy.Globals.sling.slingDescription, common.getDate(), common.createUnix(), user, 1);
            database.insertQuoteOffline(Alloy.Globals.sling.type, Alloy.Globals.sling.grade, Alloy.Globals.sling.legs, Alloy.Globals.sling.load, Alloy.Globals.sling.nominalLength, Alloy.Globals.sling.partCode, Alloy.Globals.sling.quotedPrice, Alloy.Globals.sling.slingDescription, common.getDate(), common.createUnix(), user);
        } else database.insertQuoteOffline(Alloy.Globals.sling.type, Alloy.Globals.sling.grade, Alloy.Globals.sling.legs, Alloy.Globals.sling.load, Alloy.Globals.sling.nominalLength, Alloy.Globals.sling.partCode, Alloy.Globals.sling.quotedPrice, Alloy.Globals.sling.slingDescription, common.getDate(), common.createUnix(), user);
        $.close.hide();
        $.close.height = 0;
        $.requestQuote.hide();
        $.requestQuote.height = 0;
        $.backToDash.show();
        $.backToDash.height = "26dip";
    }
    function openDash() {
        $.specifications.close({
            modal: true
        });
        var slingConfig = Alloy.createController("slingConfiguration").getView(), dash = Alloy.createController("dashboard").getView();
        slingConfig.close();
        dash.open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "specifications";
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
    $.__views.specifications = Ti.UI.createWindow({
        backgroundGradient: {
            type: "linear",
            colors: [ {
                color: "#021b4b",
                offset: 0
            }, {
                color: "#032d73",
                offset: .5
            } ],
            startPoint: {
                x: "0%",
                y: "0%"
            },
            endPoint: {
                x: "0%",
                y: "100%"
            }
        },
        layout: "vertical",
        id: "specifications"
    });
    $.__views.specifications && $.addTopLevelView($.__views.specifications);
    $.__views.__alloyId223 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        top: "30dip",
        left: "5%",
        id: "__alloyId223"
    });
    $.__views.specifications.add($.__views.__alloyId223);
    $.__views.close = Ti.UI.createImageView({
        id: "close",
        left: "0",
        image: "/images/WHC-close.png",
        height: "24dip",
        width: "24dip"
    });
    $.__views.__alloyId223.add($.__views.close);
    closeModal ? $.__views.close.addEventListener("click", closeModal) : __defers["$.__views.close!click!closeModal"] = true;
    $.__views.__alloyId224 = Ti.UI.createView({
        height: "1dip",
        top: "20dip",
        width: "100%",
        backgroundColor: "#f7561e",
        id: "__alloyId224"
    });
    $.__views.specifications.add($.__views.__alloyId224);
    $.__views.scrollView = Ti.UI.createScrollView({
        id: "scrollView",
        top: "4dip",
        left: "0",
        width: "100%",
        layout: "vertical"
    });
    $.__views.specifications.add($.__views.scrollView);
    $.__views.content = Ti.UI.createView({
        height: Ti.UI.SIZE,
        id: "content",
        top: "10dip"
    });
    $.__views.scrollView.add($.__views.content);
    $.__views.slingSpec = Ti.UI.createView({
        height: Ti.UI.SIZE,
        id: "slingSpec",
        layout: "vertical",
        width: "90%",
        left: "5%"
    });
    $.__views.content.add($.__views.slingSpec);
    $.__views.__alloyId225 = Ti.UI.createLabel({
        color: "#FFF",
        height: Ti.UI.SIZE,
        text: "Your requirements:",
        id: "__alloyId225"
    });
    $.__views.slingSpec.add($.__views.__alloyId225);
    $.__views.__alloyId226 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        top: "4dip",
        layout: "horizontal",
        id: "__alloyId226"
    });
    $.__views.slingSpec.add($.__views.__alloyId226);
    $.__views.__alloyId227 = Ti.UI.createLabel({
        color: "#FFF",
        height: Ti.UI.SIZE,
        text: "Type:",
        left: "0",
        id: "__alloyId227"
    });
    $.__views.__alloyId226.add($.__views.__alloyId227);
    $.__views.slingType = Ti.UI.createLabel({
        color: "#FFF",
        height: Ti.UI.SIZE,
        left: "71dip",
        id: "slingType"
    });
    $.__views.__alloyId226.add($.__views.slingType);
    $.__views.gradeContainer = Ti.UI.createView({
        height: Ti.UI.SIZE,
        top: "4dip",
        layout: "horizontal",
        id: "gradeContainer"
    });
    $.__views.slingSpec.add($.__views.gradeContainer);
    $.__views.__alloyId228 = Ti.UI.createLabel({
        color: "#FFF",
        height: Ti.UI.SIZE,
        text: "Grade:",
        left: "0",
        id: "__alloyId228"
    });
    $.__views.gradeContainer.add($.__views.__alloyId228);
    $.__views.grade = Ti.UI.createLabel({
        color: "#FFF",
        height: Ti.UI.SIZE,
        left: "60dip",
        id: "grade"
    });
    $.__views.gradeContainer.add($.__views.grade);
    $.__views.__alloyId229 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        top: "4dip",
        layout: "horizontal",
        id: "__alloyId229"
    });
    $.__views.slingSpec.add($.__views.__alloyId229);
    $.__views.__alloyId230 = Ti.UI.createLabel({
        color: "#FFF",
        height: Ti.UI.SIZE,
        text: "Legs:",
        left: "0",
        id: "__alloyId230"
    });
    $.__views.__alloyId229.add($.__views.__alloyId230);
    $.__views.legs = Ti.UI.createLabel({
        color: "#FFF",
        height: Ti.UI.SIZE,
        left: "74dip",
        id: "legs"
    });
    $.__views.__alloyId229.add($.__views.legs);
    $.__views.__alloyId231 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        top: "4dip",
        layout: "horizontal",
        id: "__alloyId231"
    });
    $.__views.slingSpec.add($.__views.__alloyId231);
    $.__views.__alloyId232 = Ti.UI.createLabel({
        color: "#FFF",
        height: Ti.UI.SIZE,
        text: "Load (t):",
        left: "0",
        id: "__alloyId232"
    });
    $.__views.__alloyId231.add($.__views.__alloyId232);
    $.__views.load = Ti.UI.createLabel({
        color: "#FFF",
        height: Ti.UI.SIZE,
        left: "53dip",
        id: "load"
    });
    $.__views.__alloyId231.add($.__views.load);
    $.__views.__alloyId233 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        top: "4dip",
        layout: "horizontal",
        id: "__alloyId233"
    });
    $.__views.slingSpec.add($.__views.__alloyId233);
    $.__views.__alloyId234 = Ti.UI.createLabel({
        color: "#FFF",
        height: Ti.UI.SIZE,
        text: "Length (m):",
        left: "0",
        id: "__alloyId234"
    });
    $.__views.__alloyId233.add($.__views.__alloyId234);
    $.__views.length = Ti.UI.createLabel({
        color: "#FFF",
        height: Ti.UI.SIZE,
        left: "30dip",
        id: "length"
    });
    $.__views.__alloyId233.add($.__views.length);
    $.__views.descriptionContainer = Ti.UI.createView({
        height: Ti.UI.SIZE,
        top: "4dip",
        layout: "horizontal",
        id: "descriptionContainer"
    });
    $.__views.slingSpec.add($.__views.descriptionContainer);
    $.__views.description = Ti.UI.createLabel({
        color: "#FFF",
        height: Ti.UI.SIZE,
        left: "0",
        id: "description"
    });
    $.__views.descriptionContainer.add($.__views.description);
    $.__views.slingPartcode = Ti.UI.createView({
        height: Ti.UI.SIZE,
        id: "slingPartcode",
        layout: "vertical",
        top: "10dip"
    });
    $.__views.slingSpec.add($.__views.slingPartcode);
    $.__views.specPartcode = Ti.UI.createLabel({
        color: "#FFF",
        height: Ti.UI.SIZE,
        left: "0",
        textAlign: "left",
        top: "4dip",
        id: "specPartcode"
    });
    $.__views.slingPartcode.add($.__views.specPartcode);
    $.__views.__alloyId235 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        top: "10dip",
        layout: "horizontal",
        id: "__alloyId235"
    });
    $.__views.slingSpec.add($.__views.__alloyId235);
    $.__views.quotedPrice = Ti.UI.createLabel({
        color: "#FFF",
        height: Ti.UI.SIZE,
        left: "0",
        id: "quotedPrice"
    });
    $.__views.__alloyId235.add($.__views.quotedPrice);
    $.__views.requestQuote = Ti.UI.createButton({
        width: "100%",
        height: "26dip",
        backgroundImage: "/images/WHC-button--primary.png",
        title: "Request Quote",
        color: "#FFF",
        textAlign: "left",
        font: {
            fontSize: 16
        },
        id: "requestQuote",
        top: "10dip"
    });
    $.__views.slingSpec.add($.__views.requestQuote);
    sendQuote ? $.__views.requestQuote.addEventListener("click", sendQuote) : __defers["$.__views.requestQuote!click!sendQuote"] = true;
    $.__views.backToDash = Ti.UI.createButton({
        top: "4dip",
        width: "100%",
        height: "26dip",
        backgroundImage: "/images/WHC-button--secondary.png",
        color: "#FFF",
        textAlign: "left",
        font: {
            fontSize: 16
        },
        id: "backToDash",
        title: "Back to Dashboard"
    });
    $.__views.slingSpec.add($.__views.backToDash);
    openDash ? $.__views.backToDash.addEventListener("click", openDash) : __defers["$.__views.backToDash!click!openDash"] = true;
    $.__views.__alloyId236 = Ti.UI.createView({
        height: "1dip",
        width: "100%",
        top: "20dip",
        backgroundColor: "#FFF",
        id: "__alloyId236"
    });
    $.__views.scrollView.add($.__views.__alloyId236);
    exports.destroy = function() {};
    _.extend($, $.__views);
    !function() {
        $.backToDash.hide();
        $.backToDash.height = 0;
        var angle, grade, shortener, end, upper, Database = require("databaseObj"), database = new Database("SlingDB.sqlite"), db = database.openDb(), legLength = Math.ceil(Alloy.Globals.sling.nominalLength);
        if ("Chain" === Alloy.Globals.sling.type) {
            var angle, grade, shortener, end, upper;
            angle = 45 === Alloy.Globals.sling.angle ? "wll.limit45" : "wll.limit60";
            shortener = "NONE" === Alloy.Globals.sling.shorteningDeviceCode ? 'AND s.shortener LIKE ""' : 'AND s.shortener LIKE "' + Alloy.Globals.sling.shorteningDeviceCode + '"';
            end = "NONE" === Alloy.Globals.sling.lowerTerminationCode ? 'AND end = ""' : 'AND end = "' + Alloy.Globals.sling.lowerTerminationCode + '"';
            upper = "NONE" === Alloy.Globals.sling.upperTerminationCode ? 'AND end = ""' : 'AND end = "' + Alloy.Globals.sling.upperTerminationCode + '"';
            if (8 === Alloy.Globals.sling.grade || 10 === Alloy.Globals.sling.grade) {
                grade = Alloy.Globals.sling.grade;
                var row = db.execute("SELECT * FROM WorkingLoadLimits AS wll, Slings AS s WHERE " + angle + " >= " + Alloy.Globals.sling.load + ' AND wll.type="c" AND wll.legs = ' + Alloy.Globals.sling.legs + " AND s.legs=wll.legs AND (wll.grade = " + grade + ") AND (s.size=wll.size AND s.grade=wll.grade " + end + " " + shortener + ' AND s.length = "' + legLength + '") group by wll.id ORDER BY ' + angle + " LIMIT 1");
                if (row.isValidRow()) {
                    Ti.API.info("part code: " + row.fieldByName("code"));
                    Alloy.Globals.sling.partCode = row.fieldByName("code");
                    Alloy.Globals.sling.quotedPrice = row.fieldByName("price");
                    Alloy.Globals.sling.slingDescription = row.fieldByName("description");
                } else createPartcode();
            } else if ("Auto" === Alloy.Globals.sling.grade) {
                var price8, code8, description8, price10, code10, description10, angle, grade, shortener, end, upper;
                angle = 45 === Alloy.Globals.sling.angle ? "wll.limit45" : "wll.limit60";
                shortener = "NONE" === Alloy.Globals.sling.shorteningDeviceCode ? "AND s.shortener IS NULL" : 'AND s.shortener LIKE "' + Alloy.Globals.sling.shorteningDeviceCode + '"';
                end = "NONE" === Alloy.Globals.sling.lowerTerminationCode ? "AND s.end IS NULL" : 'AND s.end = "' + Alloy.Globals.sling.lowerTerminationCode + '"';
                upper = "NONE" === Alloy.Globals.sling.upperTerminationCode ? "AND s.end IS NULL" : 'AND s.end = "' + Alloy.Globals.sling.upperTerminationCode + '"';
                var row8 = db.execute("SELECT * FROM WorkingLoadLimits AS wll, Slings AS s WHERE " + angle + " >= " + Alloy.Globals.sling.load + ' AND wll.type="c" AND wll.legs = ' + Alloy.Globals.sling.legs + ' AND s.legs = wll.legs AND (wll.grade = "8" ) AND (s.size=wll.size AND s.grade=wll.grade ' + end + " " + shortener + " AND s.length = " + legLength + ") group by wll.id ORDER BY " + angle + " ASC");
                if (row8.isValidRow()) {
                    price8 = row8.fieldByName("price");
                    code8 = row8.fieldByName("code");
                    description8 = row8.fieldByName("description");
                } else createPartcode();
                var row10 = db.execute("SELECT * FROM WorkingLoadLimits AS wll, Slings AS s WHERE " + angle + " >= " + Alloy.Globals.sling.load + ' AND wll.type="c" AND wll.legs = ' + Alloy.Globals.sling.legs + ' AND s.legs=wll.legs AND (wll.grade = "10" ) AND (s.size=wll.size AND s.grade=wll.grade ' + end + " " + shortener + " AND s.length = " + legLength + ") group by wll.id ORDER BY " + angle + " ASC");
                if (row10.isValidRow()) {
                    price10 = row10.fieldByName("price");
                    code10 = row10.fieldByName("code");
                    description10 = row10.fieldByName("description");
                } else createPartcode();
                if (void 0 !== price8 && null !== price8 || void 0 !== price10 && null !== price10) {
                    if (void 0 === price10 || null === price10) {
                        Alloy.Globals.sling.partCode = code8;
                        Alloy.Globals.sling.quotedPrice = price8;
                        Alloy.Globals.sling.slingDescription = description8;
                    } else if (void 0 === price8 || null === price8) {
                        Alloy.Globals.sling.partCode = code10;
                        Alloy.Globals.sling.quotedPrice = price10;
                        Alloy.Globals.sling.slingDescription = description10;
                    } else if (parseInt(price8) < parseInt(price10)) {
                        Alloy.Globals.sling.partCode = code8;
                        Alloy.Globals.sling.quotedPrice = price8;
                        Alloy.Globals.sling.slingDescription = description8;
                        Alloy.Globals.sling.gradeCode = 8;
                    } else if (parseInt(price8) > parseInt(price10)) {
                        Alloy.Globals.sling.partCode = code10;
                        Alloy.Globals.sling.quotedPrice = price10;
                        Alloy.Globals.sling.slingDescription = description10;
                        Alloy.Globals.sling.gradeCode = 10;
                    } else if (parseInt(price8) === parseInt(price10)) {
                        Alloy.Globals.sling.partCode = code10;
                        Alloy.Globals.sling.quotedPrice = price10;
                        Alloy.Globals.sling.slingDescription = description10;
                        Alloy.Globals.sling.gradeCode = 10;
                    }
                } else {
                    Alloy.Globals.sling.quotedPrice = null;
                    Alloy.Globals.sling.slingDescription = null;
                }
            }
        } else if ("Wire Rope" === Alloy.Globals.sling.type) {
            Alloy.Globals.sling.grade = null;
            Alloy.Globals.sling.quotedPrice = null;
            Alloy.Globals.sling.slingDescription = null;
            createPartcode();
            outputDetails(Alloy.Globals.sling.type, Alloy.Globals.sling.grade, Alloy.Globals.sling.legs, Alloy.Globals.sling.load, Alloy.Globals.sling.nominalLength, Alloy.Globals.sling.slingDescription, Alloy.Globals.sling.partCode, Alloy.Globals.sling.quotedPrice);
        }
        outputDetails(Alloy.Globals.sling.type, Alloy.Globals.sling.grade, Alloy.Globals.sling.legs, Alloy.Globals.sling.load, Alloy.Globals.sling.nominalLength, Alloy.Globals.sling.slingDescription, Alloy.Globals.sling.partCode, Alloy.Globals.sling.quotedPrice);
        database.closeDb(db);
    }();
    __defers["$.__views.close!click!closeModal"] && $.__views.close.addEventListener("click", closeModal);
    __defers["$.__views.requestQuote!click!sendQuote"] && $.__views.requestQuote.addEventListener("click", sendQuote);
    __defers["$.__views.backToDash!click!openDash"] && $.__views.backToDash.addEventListener("click", openDash);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;