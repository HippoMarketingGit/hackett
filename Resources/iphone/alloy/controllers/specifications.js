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
            if (8 === Alloy.Globals.sling.grade) {
                gradeCode = "A";
                var newRow = db.execute('SELECT * FROM WorkingLoadLimits WHERE legs = "' + Alloy.Globals.sling.legs + '" AND grade = "8" AND ' + limit + " >= " + Alloy.Globals.sling.load + ' AND type = "c" ORDER BY ' + limit + " ASC LIMIT 1");
                if (newRow.isValidRow()) slingSize = newRow.fieldByName("size"); else {
                    Ti.API.info("Grade 8 Limited Exceeded");
                    Alloy.Globals.sling.limitExceeded = true;
                }
            } else if (10 === Alloy.Globals.sling.grade) {
                gradeCode = "X";
                var newRow = db.execute('SELECT * FROM WorkingLoadLimits WHERE legs = "' + Alloy.Globals.sling.legs + '" AND grade = "10" AND ' + limit + " >= " + Alloy.Globals.sling.load + ' AND type = "c" ORDER BY ' + limit + " ASC LIMIT 1");
                if (newRow.isValidRow()) slingSize = newRow.fieldByName("size"); else {
                    Ti.API.info("Grade 10 Limited Exceeded");
                    Alloy.Globals.sling.limitExceeded = true;
                }
            } else if ("Auto" === Alloy.Globals.sling.grade) {
                var row8 = db.execute('SELECT * FROM WorkingLoadLimits WHERE legs = "' + Alloy.Globals.sling.legs + '" AND grade = "8" AND ' + limit + " >= " + Alloy.Globals.sling.load + ' AND type = "c" ORDER BY ' + limit + " ASC LIMIT 1");
                Ti.API.info('Query: SELECT * FROM WorkingLoadLimits WHERE legs = "' + Alloy.Globals.sling.legs + '" AND grade = "8" AND ' + limit + " >= " + Alloy.Globals.sling.load + ' AND type = "' + type + '" ORDER BY ' + limit + " ASC LIMIT 1");
                if (row8.isValidRow()) {
                    slingSizeAuto8 = row8.fieldByName("size");
                    Ti.API.info("sling size 8: " + slingSizeAuto8);
                } else {
                    Ti.API.info("Auto 8 Limited Exceeded");
                    Alloy.Globals.sling.limitExceeded = true;
                }
                var row10 = db.execute('SELECT * FROM WorkingLoadLimits WHERE legs = "' + Alloy.Globals.sling.legs + '" AND grade = "10" AND ' + limit + " >= " + Alloy.Globals.sling.load + ' AND type = "c" ORDER BY ' + limit + " ASC LIMIT 1");
                Ti.API.info('Query: SELECT * FROM WorkingLoadLimits WHERE legs = "' + Alloy.Globals.sling.legs + '" AND grade = "10" AND ' + limit + " >= " + Alloy.Globals.sling.load + ' AND type = "' + type + '" ORDER BY ' + limit + " ASC LIMIT 1");
                if (row10.isValidRow()) {
                    slingSizeAuto10 = row10.fieldByName("size");
                    Ti.API.info("sling size 10: " + slingSizeAuto10);
                } else {
                    Ti.API.info("Auto 10 Limited Exceeded");
                    Alloy.Globals.sling.limitExceeded = true;
                }
            }
        } else {
            type = "r";
            var newRow = db.execute('SELECT * FROM WorkingLoadLimits WHERE legs = "' + Alloy.Globals.sling.legs + '" AND ' + limit + " >= " + Alloy.Globals.sling.load + ' AND type = "' + type + '" ORDER BY ' + limit + " ASC LIMIT 1");
            if (newRow.isValidRow()) slingSize = newRow.fieldByName("size"); else {
                Ti.API.info("Limited Exceeded");
                Alloy.Globals.sling.limitExceeded = true;
            }
        }
        "NONE" === Alloy.Globals.sling.shorteningDeviceCode && (Alloy.Globals.sling.shorteningDeviceCode = 0);
        "NONE" === Alloy.Globals.sling.lowerTerminationCode && (Alloy.Globals.sling.lowerTerminationCode = 0);
        "NONE" === Alloy.Globals.sling.upperTerminationCode && (Alloy.Globals.sling.upperTerminationCode = 0);
        if (!Alloy.Globals.sling.limitExceeded) {
            10 > slingSize && (slingSize = "0" + slingSize);
            10 > slingSizeAuto8 && (slingSizeAuto8 = "0" + slingSizeAuto8);
            10 > slingSizeAuto10 && (slingSizeAuto10 = "0" + slingSizeAuto10);
            10 > legLength && (legLength = "0" + legLength);
        }
        Alloy.Globals.sling.partCode = "Chain" === Alloy.Globals.sling.type ? "Auto" !== Alloy.Globals.sling.grade ? gradeCode + slingSize + "." + Alloy.Globals.sling.legs + legLength + "." + Alloy.Globals.sling.lowerTerminationCode + Alloy.Globals.sling.shorteningDeviceCode : "A" + slingSizeAuto8 + "." + Alloy.Globals.sling.legs + legLength + "." + Alloy.Globals.sling.lowerTerminationCode + Alloy.Globals.sling.shorteningDeviceCode + " or X" + slingSizeAuto10 + "." + Alloy.Globals.sling.legs + legLength + "." + Alloy.Globals.sling.lowerTerminationCode + Alloy.Globals.sling.shorteningDeviceCode : 1 === Alloy.Globals.sling.legs ? "NONE" === Alloy.Globals.sling.upperTerminationCode ? "RS0" + slingSize + "." + Alloy.Globals.sling.legs + legLength + "." + Alloy.Globals.sling.lowerTerminationCode : "RS0" + slingSize + "." + Alloy.Globals.sling.legs + legLength + "." + Alloy.Globals.sling.lowerTerminationCode + Alloy.Globals.sling.upperTerminationCode : "RS0" + slingSize + "." + Alloy.Globals.sling.legs + legLength + "." + Alloy.Globals.sling.lowerTerminationCode;
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
        if (Alloy.Globals.sling.limitExceeded) {
            alert("The Maximum Working Load Limit has been exceeded for your sling. Please go back and enter a new load.");
            $.quotedPrice.text = "We cannot quote you a price for your configured sling.";
        } else if (null === Alloy.Globals.sling.quotedPrice && "Auto" === Alloy.Globals.sling.grade) {
            $.specPartcode.text = "Based on your requirements, we have identified two possible sling configurations: " + partCode;
            $.quotedPrice.text = "We cannot quote you a price for your configured slings. Please contact William Hackett Chains and reference your part code.";
        } else if (null === Alloy.Globals.sling.quotedPrice && "Auto" !== Alloy.Globals.sling.grade) {
            $.specPartcode.text = "Based on your requirements, we recommend the following sling configuration: " + partCode;
            $.quotedPrice.text = "We cannot quote you a price for your configured sling. Please contact William Hackett Chains and reference your part code.";
        } else if (null !== Alloy.Globals.sling.quotedPrice && "Auto" !== Alloy.Globals.sling.grade) {
            $.quotedPrice.text = "Price (RRP): £" + Alloy.Globals.sling.quotedPrice;
            $.specPartcode.text = "Based on your requirements, we recommend the following sling configuration: " + partCode;
        } else if (null !== Alloy.Globals.sling.quotedPrice && "Auto" === Alloy.Globals.sling.grade) {
            $.quotedPrice.text = "Price (RRP): £" + Alloy.Globals.sling.quotedPrice;
            $.specPartcode.text = "Based on your requirements, we recommend the following sling configuration: " + partCode;
        }
    }
    function checkImage(partCode) {
        $.viewSlingAssembly.hide();
        $.slingAssemblyImg.setHeight(0);
        $.slingAssemblyImg.hide();
        var database = new Database("SlingDB.sqlite"), db = database.openDb(), row = db.execute("SELECT img FROM Slings WHERE code = ? AND img_status = ? LIMIT 1", partCode, 1), img = null, imgPath = null, f = null;
        if (row.isValidRow()) {
            img = row.fieldByName("img");
            imgPath = Ti.Filesystem.applicationDataDirectory + "slings/" + img + ".jpg";
            f = Ti.Filesystem.getFile(imgPath);
            Ti.API.info("Valid! Partcode " + partCode + " has img " + img + ": " + imgPath);
            $.viewSlingAssembly.show();
            $.slingAssemblyImg.image = f;
        } else Ti.API.info("Sling assembly image " + img + " does not exist.");
        row.close();
        db.close();
    }
    function viewSlingAssembly() {
        if ($.slingAssemblyImg.getVisible()) {
            $.slingAssemblyImg.hide();
            $.slingAssemblyImg.setTop(0);
            $.slingAssemblyImg.setBottom(0);
            $.slingAssemblyImg.setHeight(0);
        } else {
            $.slingAssemblyImg.show();
            $.slingAssemblyImg.setTop("8dip");
            $.slingAssemblyImg.setBottom("16dip");
            $.slingAssemblyImg.setHeight("auto");
        }
    }
    function closeModal() {
        $.specifications.close({
            modal: true
        });
    }
    function sendQuote() {
        var Common = require("common"), common = new Common(), Connection = require("connections"), connection = new Connection(), Database = require("databaseObj"), database = new Database("SlingDB.sqlite"), user = database.getCurrentUserDetails(), online = connection.onlineCheck(function(data) {
            var online;
            online = 1 === data ? true : false;
            return online;
        });
        Ti.API.info("user");
        var quoteData = {
            type: Alloy.Globals.sling.type,
            grade: Alloy.Globals.sling.grade,
            legs: Alloy.Globals.sling.legs,
            load: Alloy.Globals.sling.load,
            length: Alloy.Globals.sling.nominalLength,
            partCode: Alloy.Globals.sling.partCode,
            price: Alloy.Globals.sling.quotedPrice,
            description: Alloy.Globals.sling.slingDescription,
            date: common.getDate(),
            user: user.email,
            addtodb: 1
        };
        quoteData.ref = common.generateQuoteRef(user, quoteData);
        database.insertQuoteOffline(quoteData);
        online && database.insertQuoteOnline(quoteData);
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
        statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
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
    $.__views.__alloyId244 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        top: "30dip",
        left: "5%",
        id: "__alloyId244"
    });
    $.__views.specifications.add($.__views.__alloyId244);
    $.__views.close = Ti.UI.createImageView({
        id: "close",
        left: "0",
        image: "/images/WHC-close.png",
        height: "24dip",
        width: "24dip"
    });
    $.__views.__alloyId244.add($.__views.close);
    closeModal ? $.__views.close.addEventListener("click", closeModal) : __defers["$.__views.close!click!closeModal"] = true;
    $.__views.__alloyId245 = Ti.UI.createView({
        height: "1dip",
        top: "20dip",
        width: "100%",
        backgroundColor: "#f7561e",
        id: "__alloyId245"
    });
    $.__views.specifications.add($.__views.__alloyId245);
    $.__views.scrollView = Ti.UI.createScrollView({
        id: "scrollView",
        top: "4dip",
        left: "0",
        width: "100%",
        layout: "vertical"
    });
    $.__views.specifications.add($.__views.scrollView);
    $.__views.content = Ti.UI.createView(function() {
        var o = {};
        _.extend(o, {
            height: Ti.UI.SIZE
        });
        Alloy.isTablet && _.extend(o, {
            layout: "vertical",
            width: "80%",
            height: Ti.UI.SIZE
        });
        _.extend(o, {
            id: "content",
            top: "10dip",
            height: Ti.UI.SIZE
        });
        return o;
    }());
    $.__views.scrollView.add($.__views.content);
    $.__views.slingSpec = Ti.UI.createView({
        height: Ti.UI.SIZE,
        id: "slingSpec",
        layout: "vertical",
        width: "90%",
        left: "5%"
    });
    $.__views.content.add($.__views.slingSpec);
    $.__views.__alloyId246 = Ti.UI.createLabel({
        color: "#FFF",
        height: Ti.UI.SIZE,
        text: "Your requirements:",
        id: "__alloyId246"
    });
    $.__views.slingSpec.add($.__views.__alloyId246);
    $.__views.__alloyId247 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        top: "4dip",
        layout: "horizontal",
        id: "__alloyId247"
    });
    $.__views.slingSpec.add($.__views.__alloyId247);
    $.__views.__alloyId248 = Ti.UI.createLabel({
        color: "#FFF",
        height: Ti.UI.SIZE,
        text: "Type:",
        left: "0",
        id: "__alloyId248"
    });
    $.__views.__alloyId247.add($.__views.__alloyId248);
    $.__views.slingType = Ti.UI.createLabel({
        color: "#FFF",
        height: Ti.UI.SIZE,
        left: "71dip",
        id: "slingType"
    });
    $.__views.__alloyId247.add($.__views.slingType);
    $.__views.gradeContainer = Ti.UI.createView({
        height: Ti.UI.SIZE,
        top: "4dip",
        layout: "horizontal",
        id: "gradeContainer"
    });
    $.__views.slingSpec.add($.__views.gradeContainer);
    $.__views.__alloyId249 = Ti.UI.createLabel({
        color: "#FFF",
        height: Ti.UI.SIZE,
        text: "Grade:",
        left: "0",
        id: "__alloyId249"
    });
    $.__views.gradeContainer.add($.__views.__alloyId249);
    $.__views.grade = Ti.UI.createLabel({
        color: "#FFF",
        height: Ti.UI.SIZE,
        left: "60dip",
        id: "grade"
    });
    $.__views.gradeContainer.add($.__views.grade);
    $.__views.__alloyId250 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        top: "4dip",
        layout: "horizontal",
        id: "__alloyId250"
    });
    $.__views.slingSpec.add($.__views.__alloyId250);
    $.__views.__alloyId251 = Ti.UI.createLabel({
        color: "#FFF",
        height: Ti.UI.SIZE,
        text: "Legs:",
        left: "0",
        id: "__alloyId251"
    });
    $.__views.__alloyId250.add($.__views.__alloyId251);
    $.__views.legs = Ti.UI.createLabel({
        color: "#FFF",
        height: Ti.UI.SIZE,
        left: "74dip",
        id: "legs"
    });
    $.__views.__alloyId250.add($.__views.legs);
    $.__views.__alloyId252 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        top: "4dip",
        layout: "horizontal",
        id: "__alloyId252"
    });
    $.__views.slingSpec.add($.__views.__alloyId252);
    $.__views.__alloyId253 = Ti.UI.createLabel({
        color: "#FFF",
        height: Ti.UI.SIZE,
        text: "Load (t):",
        left: "0",
        id: "__alloyId253"
    });
    $.__views.__alloyId252.add($.__views.__alloyId253);
    $.__views.load = Ti.UI.createLabel({
        color: "#FFF",
        height: Ti.UI.SIZE,
        left: "53dip",
        id: "load"
    });
    $.__views.__alloyId252.add($.__views.load);
    $.__views.__alloyId254 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        top: "4dip",
        layout: "horizontal",
        id: "__alloyId254"
    });
    $.__views.slingSpec.add($.__views.__alloyId254);
    $.__views.__alloyId255 = Ti.UI.createLabel({
        color: "#FFF",
        height: Ti.UI.SIZE,
        text: "Length (m):",
        left: "0",
        id: "__alloyId255"
    });
    $.__views.__alloyId254.add($.__views.__alloyId255);
    $.__views.length = Ti.UI.createLabel({
        color: "#FFF",
        height: Ti.UI.SIZE,
        left: "30dip",
        id: "length"
    });
    $.__views.__alloyId254.add($.__views.length);
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
    $.__views.__alloyId256 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        top: "10dip",
        layout: "horizontal",
        id: "__alloyId256"
    });
    $.__views.slingSpec.add($.__views.__alloyId256);
    $.__views.quotedPrice = Ti.UI.createLabel({
        color: "#FFF",
        height: Ti.UI.SIZE,
        left: "0",
        id: "quotedPrice"
    });
    $.__views.__alloyId256.add($.__views.quotedPrice);
    $.__views.viewSlingAssembly = Ti.UI.createButton({
        width: "100%",
        height: "26dip",
        backgroundImage: "/images/WHC-button--primary.png",
        title: "View Sling Assembly",
        color: "#FFF",
        textAlign: "left",
        font: {
            fontSize: 16
        },
        id: "viewSlingAssembly",
        top: "10dip"
    });
    $.__views.slingSpec.add($.__views.viewSlingAssembly);
    viewSlingAssembly ? $.__views.viewSlingAssembly.addEventListener("click", viewSlingAssembly) : __defers["$.__views.viewSlingAssembly!click!viewSlingAssembly"] = true;
    $.__views.slingAssemblyImg = Ti.UI.createImageView({
        touchEnabled: false,
        id: "slingAssemblyImg",
        width: "auto"
    });
    $.__views.slingSpec.add($.__views.slingAssemblyImg);
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
        top: "8dip"
    });
    $.__views.slingSpec.add($.__views.requestQuote);
    sendQuote ? $.__views.requestQuote.addEventListener("click", sendQuote) : __defers["$.__views.requestQuote!click!sendQuote"] = true;
    $.__views.backToDash = Ti.UI.createButton({
        top: "8dip",
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
    $.__views.__alloyId257 = Ti.UI.createView({
        height: "1dip",
        width: "100%",
        top: "20dip",
        backgroundColor: "#FFF",
        id: "__alloyId257"
    });
    $.__views.scrollView.add($.__views.__alloyId257);
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
                    Alloy.Globals.sling.partCode = row.fieldByName("code");
                    Alloy.Globals.sling.quotedPrice = row.fieldByName("price");
                    Alloy.Globals.sling.slingDescription = row.fieldByName("description");
                } else {
                    Ti.API.info("row 10 create part code");
                    createPartcode();
                }
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
                } else Ti.API.info("Row 8 not valid");
                var row10 = db.execute("SELECT * FROM WorkingLoadLimits AS wll, Slings AS s WHERE " + angle + " >= " + Alloy.Globals.sling.load + ' AND wll.type="c" AND wll.legs = ' + Alloy.Globals.sling.legs + ' AND s.legs=wll.legs AND (wll.grade = "10" ) AND (s.size=wll.size AND s.grade=wll.grade ' + end + " " + shortener + " AND s.length = " + legLength + ") group by wll.id ORDER BY " + angle + " ASC");
                if (row10.isValidRow()) {
                    price10 = row10.fieldByName("price");
                    code10 = row10.fieldByName("code");
                    description10 = row10.fieldByName("description");
                } else Ti.API.info("Row 10 not valid");
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
                    createPartcode();
                }
            }
        } else if ("Wire Rope" === Alloy.Globals.sling.type) {
            Alloy.Globals.sling.grade = null;
            Alloy.Globals.sling.quotedPrice = null;
            Alloy.Globals.sling.slingDescription = null;
            Ti.API.info("Wire Rope create part code");
            createPartcode();
            outputDetails(Alloy.Globals.sling.type, Alloy.Globals.sling.grade, Alloy.Globals.sling.legs, Alloy.Globals.sling.load, Alloy.Globals.sling.nominalLength, Alloy.Globals.sling.slingDescription, Alloy.Globals.sling.partCode, Alloy.Globals.sling.quotedPrice);
        }
        outputDetails(Alloy.Globals.sling.type, Alloy.Globals.sling.grade, Alloy.Globals.sling.legs, Alloy.Globals.sling.load, Alloy.Globals.sling.nominalLength, Alloy.Globals.sling.slingDescription, Alloy.Globals.sling.partCode, Alloy.Globals.sling.quotedPrice);
        database.closeDb(db);
        checkImage(Alloy.Globals.sling.partCode);
    }();
    __defers["$.__views.close!click!closeModal"] && $.__views.close.addEventListener("click", closeModal);
    __defers["$.__views.viewSlingAssembly!click!viewSlingAssembly"] && $.__views.viewSlingAssembly.addEventListener("click", viewSlingAssembly);
    __defers["$.__views.requestQuote!click!sendQuote"] && $.__views.requestQuote.addEventListener("click", sendQuote);
    __defers["$.__views.backToDash!click!openDash"] && $.__views.backToDash.addEventListener("click", openDash);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;