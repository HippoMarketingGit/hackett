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
        Ti.API.info("createPartcode call");
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
        Ti.API.info("createPartcode generated code: " + Alloy.Globals.sling.partCode);
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
            if ($.labelGrade) {
                $.labelGrade.setHeight(0);
                $.labelGrade.hide();
            }
            if ($.labelGradeReq) {
                $.labelGradeReq.setHeight(0);
                $.labelGradeReq.hide();
            }
            if ($.labelGradeSling) {
                $.labelGradeSling.setHeight(0);
                $.labelGradeSling.hide();
            }
            $.grade.setHeight(0);
            $.grade.hide();
            $.slingSpecGrade.setHeight(0);
            $.slingSpecGrade.hide();
        }
        if (null === description) {
            $.descriptionContainer.hide();
            $.descriptionContainer.height = 0;
        } else $.description.text = "Description: " + description;
        if (Alloy.Globals.sling.limitExceeded) {
            alert("The Maximum Working Load Limit has been exceeded for your sling. Please go back and enter a new load.");
            $.quotedPrice.text = "We cannot quote you a price for your configured slings, this may be because we do not offer these terminations in this size or grade. Please contact William Hackett Chains and reference your part code.";
        } else if (null === Alloy.Globals.sling.quotedPrice && "Auto" === Alloy.Globals.sling.grade) {
            $.specPartcode.text = "Based on your requirements, we have identified two possible sling configurations: " + partCode;
            $.quotedPrice.text = "We cannot quote you a price for your configured slings, this may be because we do not offer these terminations in this size or grade. Please contact William Hackett Chains and reference your part code.";
        } else if (null === Alloy.Globals.sling.quotedPrice && "Auto" !== Alloy.Globals.sling.grade) {
            $.specPartcode.text = "Based on your requirements, we recommend the following sling configuration: " + partCode;
            $.quotedPrice.text = "We cannot quote you a price for your configured slings, this may be because we do not offer these terminations in this size or grade. Please contact William Hackett Chains and reference your part code.";
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
    function checkSpec() {
        $.slingSpecification.hide();
        var wllAngle = Alloy.Globals.wllAngle, wllId = Alloy.Globals.wllId, slingId = Alloy.Globals.slingId, database = new Database("SlingDB.sqlite"), db = database.openDb(), sql = null, row = null;
        if (null === wllId && null === slingId) return;
        sql = "SELECT * FROM WorkingLoadLimits AS wll, Slings AS s WHERE wll.id = ? AND s.id = ? LIMIT 1";
        Ti.API.info(sql);
        Ti.API.info("wllId: " + wllId);
        Ti.API.info("slingId: " + slingId);
        Ti.API.info("wllAngle: " + wllAngle);
        row = db.execute(sql, wllId, slingId);
        if (row.isValidRow()) {
            Ti.API.info("Found Working Load Limit and Sling Specification by IDs!");
            switch (row.fieldByName("type")) {
              case "c":
                $.slingSpecType.text = "Chain";
                break;

              case "r":
                $.slingSpecType.text = "Wire Rope";
            }
            $.slingSpecGrade.text = row.fieldByName("grade");
            $.slingSpecLegs.text = row.fieldByName("legs");
            $.slingSpecLoad.text = row.fieldByName(wllAngle);
            $.slingSpecLength.text = row.fieldByName("length");
            $.slingSpecSize.text = row.fieldByName("size");
            $.slingSpecification.show();
            Alloy.Globals.sling.specLoad = row.getFieldByName(wllAngle);
        } else Alloy.Globals.sling.specLoad = null;
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
            specLoad: Alloy.Globals.sling.specLoad,
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
    $.__views.__alloyId254 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        top: "30dip",
        left: "5%",
        id: "__alloyId254"
    });
    $.__views.specifications.add($.__views.__alloyId254);
    $.__views.close = Ti.UI.createImageView({
        id: "close",
        left: "0",
        image: "/images/WHC-close.png",
        height: "24dip",
        width: "24dip"
    });
    $.__views.__alloyId254.add($.__views.close);
    closeModal ? $.__views.close.addEventListener("click", closeModal) : __defers["$.__views.close!click!closeModal"] = true;
    $.__views.__alloyId255 = Ti.UI.createView({
        height: "1dip",
        top: "20dip",
        width: "100%",
        backgroundColor: "#f7561e",
        id: "__alloyId255"
    });
    $.__views.specifications.add($.__views.__alloyId255);
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
            height: Ti.UI.SIZE,
            layout: "vertical"
        });
        return o;
    }());
    $.__views.scrollView.add($.__views.content);
    if (Alloy.isTablet) {
        $.__views.values = Ti.UI.createView({
            height: Ti.UI.SIZE,
            id: "values",
            layout: "horizontal",
            width: "90%",
            left: "5%",
            bottom: "8dip"
        });
        $.__views.content.add($.__views.values);
        $.__views.labels = Ti.UI.createView({
            height: Ti.UI.SIZE,
            id: "labels",
            layout: "vertical",
            width: "25%",
            top: "0"
        });
        $.__views.values.add($.__views.labels);
        $.__views.__alloyId256 = Ti.UI.createLabel({
            color: "#FFF",
            height: Ti.UI.SIZE,
            font: {
                fontSize: 18
            },
            left: "0",
            id: "__alloyId256"
        });
        $.__views.labels.add($.__views.__alloyId256);
        $.__views.__alloyId257 = Ti.UI.createLabel({
            color: "#FFF",
            height: Ti.UI.SIZE,
            text: "Type:",
            top: "4dip",
            left: "0",
            id: "__alloyId257"
        });
        $.__views.labels.add($.__views.__alloyId257);
        $.__views.labelGrade = Ti.UI.createLabel({
            color: "#FFF",
            height: Ti.UI.SIZE,
            text: "Grade:",
            top: "4dip",
            left: "0",
            id: "labelGrade"
        });
        $.__views.labels.add($.__views.labelGrade);
        $.__views.__alloyId258 = Ti.UI.createLabel({
            color: "#FFF",
            height: Ti.UI.SIZE,
            text: "Legs:",
            top: "4dip",
            left: "0",
            id: "__alloyId258"
        });
        $.__views.labels.add($.__views.__alloyId258);
        $.__views.__alloyId259 = Ti.UI.createLabel({
            color: "#FFF",
            height: Ti.UI.SIZE,
            text: "Load / WLL (t):",
            top: "4dip",
            left: "0",
            id: "__alloyId259"
        });
        $.__views.labels.add($.__views.__alloyId259);
        $.__views.__alloyId260 = Ti.UI.createLabel({
            color: "#FFF",
            height: Ti.UI.SIZE,
            text: "Length (m):",
            top: "4dip",
            left: "0",
            id: "__alloyId260"
        });
        $.__views.labels.add($.__views.__alloyId260);
        $.__views.__alloyId261 = Ti.UI.createLabel({
            color: "#FFF",
            height: Ti.UI.SIZE,
            text: "Size (mm):",
            top: "4dip",
            left: "0",
            id: "__alloyId261"
        });
        $.__views.labels.add($.__views.__alloyId261);
        $.__views.slingRequirements = Ti.UI.createView({
            height: Ti.UI.SIZE,
            id: "slingRequirements",
            layout: "vertical",
            width: "37.5%",
            top: "0"
        });
        $.__views.values.add($.__views.slingRequirements);
        $.__views.__alloyId262 = Ti.UI.createLabel({
            color: "#FFF",
            height: Ti.UI.SIZE,
            font: {
                fontSize: 18
            },
            text: "Your requirements:",
            left: "0",
            id: "__alloyId262"
        });
        $.__views.slingRequirements.add($.__views.__alloyId262);
        $.__views.slingType = Ti.UI.createLabel({
            color: "#FFF",
            height: Ti.UI.SIZE,
            top: "4dip",
            left: "0",
            id: "slingType"
        });
        $.__views.slingRequirements.add($.__views.slingType);
        $.__views.grade = Ti.UI.createLabel({
            color: "#FFF",
            height: Ti.UI.SIZE,
            top: "4dip",
            left: "0",
            id: "grade"
        });
        $.__views.slingRequirements.add($.__views.grade);
        $.__views.legs = Ti.UI.createLabel({
            color: "#FFF",
            height: Ti.UI.SIZE,
            top: "4dip",
            left: "0",
            id: "legs"
        });
        $.__views.slingRequirements.add($.__views.legs);
        $.__views.load = Ti.UI.createLabel({
            color: "#FFF",
            height: Ti.UI.SIZE,
            top: "4dip",
            left: "0",
            id: "load"
        });
        $.__views.slingRequirements.add($.__views.load);
        $.__views.length = Ti.UI.createLabel({
            color: "#FFF",
            height: Ti.UI.SIZE,
            top: "4dip",
            left: "0",
            id: "length"
        });
        $.__views.slingRequirements.add($.__views.length);
        $.__views.slingSpecification = Ti.UI.createView({
            height: Ti.UI.SIZE,
            id: "slingSpecification",
            layout: "vertical",
            width: "37.5%",
            top: "0"
        });
        $.__views.values.add($.__views.slingSpecification);
        $.__views.__alloyId263 = Ti.UI.createLabel({
            color: "#FFF",
            height: Ti.UI.SIZE,
            font: {
                fontSize: 18
            },
            text: "Sling specification:",
            left: "0",
            id: "__alloyId263"
        });
        $.__views.slingSpecification.add($.__views.__alloyId263);
        $.__views.slingSpecType = Ti.UI.createLabel({
            color: "#FFF",
            height: Ti.UI.SIZE,
            top: "4dip",
            left: "0",
            id: "slingSpecType"
        });
        $.__views.slingSpecification.add($.__views.slingSpecType);
        $.__views.slingSpecGrade = Ti.UI.createLabel({
            color: "#FFF",
            height: Ti.UI.SIZE,
            top: "4dip",
            left: "0",
            id: "slingSpecGrade"
        });
        $.__views.slingSpecification.add($.__views.slingSpecGrade);
        $.__views.slingSpecLegs = Ti.UI.createLabel({
            color: "#FFF",
            height: Ti.UI.SIZE,
            top: "4dip",
            left: "0",
            id: "slingSpecLegs"
        });
        $.__views.slingSpecification.add($.__views.slingSpecLegs);
        $.__views.slingSpecLoad = Ti.UI.createLabel({
            color: "#FFF",
            height: Ti.UI.SIZE,
            top: "4dip",
            left: "0",
            id: "slingSpecLoad"
        });
        $.__views.slingSpecification.add($.__views.slingSpecLoad);
        $.__views.slingSpecLength = Ti.UI.createLabel({
            color: "#FFF",
            height: Ti.UI.SIZE,
            top: "4dip",
            left: "0",
            id: "slingSpecLength"
        });
        $.__views.slingSpecification.add($.__views.slingSpecLength);
        $.__views.slingSpecSize = Ti.UI.createLabel({
            color: "#FFF",
            height: Ti.UI.SIZE,
            top: "4dip",
            left: "0",
            id: "slingSpecSize"
        });
        $.__views.slingSpecification.add($.__views.slingSpecSize);
    }
    if (!Alloy.isTablet) {
        $.__views.valuesReqs = Ti.UI.createView({
            height: Ti.UI.SIZE,
            id: "valuesReqs",
            layout: "horizontal",
            width: "90%",
            left: "5%",
            bottom: "8dip"
        });
        $.__views.content.add($.__views.valuesReqs);
        $.__views.__alloyId264 = Ti.UI.createLabel({
            color: "#FFF",
            height: Ti.UI.SIZE,
            font: {
                fontSize: 18
            },
            text: "Your requirements:",
            left: "0",
            width: "100%",
            id: "__alloyId264"
        });
        $.__views.valuesReqs.add($.__views.__alloyId264);
        $.__views.labels = Ti.UI.createView({
            height: Ti.UI.SIZE,
            id: "labels",
            layout: "vertical",
            width: "50%",
            top: "0"
        });
        $.__views.valuesReqs.add($.__views.labels);
        $.__views.__alloyId265 = Ti.UI.createLabel({
            color: "#FFF",
            height: Ti.UI.SIZE,
            text: "Type:",
            top: "4dip",
            left: "0",
            id: "__alloyId265"
        });
        $.__views.labels.add($.__views.__alloyId265);
        $.__views.labelGradeReq = Ti.UI.createLabel({
            color: "#FFF",
            height: Ti.UI.SIZE,
            text: "Grade:",
            top: "4dip",
            left: "0",
            id: "labelGradeReq"
        });
        $.__views.labels.add($.__views.labelGradeReq);
        $.__views.__alloyId266 = Ti.UI.createLabel({
            color: "#FFF",
            height: Ti.UI.SIZE,
            text: "Legs:",
            top: "4dip",
            left: "0",
            id: "__alloyId266"
        });
        $.__views.labels.add($.__views.__alloyId266);
        $.__views.__alloyId267 = Ti.UI.createLabel({
            color: "#FFF",
            height: Ti.UI.SIZE,
            text: "Load / WLL (t):",
            top: "4dip",
            left: "0",
            id: "__alloyId267"
        });
        $.__views.labels.add($.__views.__alloyId267);
        $.__views.__alloyId268 = Ti.UI.createLabel({
            color: "#FFF",
            height: Ti.UI.SIZE,
            text: "Length (m):",
            top: "4dip",
            left: "0",
            id: "__alloyId268"
        });
        $.__views.labels.add($.__views.__alloyId268);
        $.__views.slingRequirements = Ti.UI.createView({
            height: Ti.UI.SIZE,
            id: "slingRequirements",
            layout: "vertical",
            width: "50%",
            top: "0"
        });
        $.__views.valuesReqs.add($.__views.slingRequirements);
        $.__views.slingType = Ti.UI.createLabel({
            color: "#FFF",
            height: Ti.UI.SIZE,
            top: "4dip",
            left: "0",
            id: "slingType"
        });
        $.__views.slingRequirements.add($.__views.slingType);
        $.__views.grade = Ti.UI.createLabel({
            color: "#FFF",
            height: Ti.UI.SIZE,
            top: "4dip",
            left: "0",
            id: "grade"
        });
        $.__views.slingRequirements.add($.__views.grade);
        $.__views.legs = Ti.UI.createLabel({
            color: "#FFF",
            height: Ti.UI.SIZE,
            top: "4dip",
            left: "0",
            id: "legs"
        });
        $.__views.slingRequirements.add($.__views.legs);
        $.__views.load = Ti.UI.createLabel({
            color: "#FFF",
            height: Ti.UI.SIZE,
            top: "4dip",
            left: "0",
            id: "load"
        });
        $.__views.slingRequirements.add($.__views.load);
        $.__views.length = Ti.UI.createLabel({
            color: "#FFF",
            height: Ti.UI.SIZE,
            top: "4dip",
            left: "0",
            id: "length"
        });
        $.__views.slingRequirements.add($.__views.length);
    }
    if (!Alloy.isTablet) {
        $.__views.valuesSling = Ti.UI.createView({
            height: Ti.UI.SIZE,
            id: "valuesSling",
            layout: "horizontal",
            width: "90%",
            left: "5%",
            top: "8dip",
            bottom: "16dip"
        });
        $.__views.content.add($.__views.valuesSling);
        $.__views.__alloyId269 = Ti.UI.createLabel({
            color: "#FFF",
            height: Ti.UI.SIZE,
            font: {
                fontSize: 18
            },
            text: "Sling specification:",
            left: "0",
            width: "100%",
            id: "__alloyId269"
        });
        $.__views.valuesSling.add($.__views.__alloyId269);
        $.__views.labels = Ti.UI.createView({
            height: Ti.UI.SIZE,
            id: "labels",
            layout: "vertical",
            width: "50%",
            top: "0"
        });
        $.__views.valuesSling.add($.__views.labels);
        $.__views.__alloyId270 = Ti.UI.createLabel({
            color: "#FFF",
            height: Ti.UI.SIZE,
            text: "Type:",
            top: "4dip",
            left: "0",
            id: "__alloyId270"
        });
        $.__views.labels.add($.__views.__alloyId270);
        $.__views.labelGradeSling = Ti.UI.createLabel({
            color: "#FFF",
            height: Ti.UI.SIZE,
            text: "Grade:",
            top: "4dip",
            left: "0",
            id: "labelGradeSling"
        });
        $.__views.labels.add($.__views.labelGradeSling);
        $.__views.__alloyId271 = Ti.UI.createLabel({
            color: "#FFF",
            height: Ti.UI.SIZE,
            text: "Legs:",
            top: "4dip",
            left: "0",
            id: "__alloyId271"
        });
        $.__views.labels.add($.__views.__alloyId271);
        $.__views.__alloyId272 = Ti.UI.createLabel({
            color: "#FFF",
            height: Ti.UI.SIZE,
            text: "Load / WLL (t):",
            top: "4dip",
            left: "0",
            id: "__alloyId272"
        });
        $.__views.labels.add($.__views.__alloyId272);
        $.__views.__alloyId273 = Ti.UI.createLabel({
            color: "#FFF",
            height: Ti.UI.SIZE,
            text: "Length (m):",
            top: "4dip",
            left: "0",
            id: "__alloyId273"
        });
        $.__views.labels.add($.__views.__alloyId273);
        $.__views.__alloyId274 = Ti.UI.createLabel({
            color: "#FFF",
            height: Ti.UI.SIZE,
            text: "Size (mm):",
            top: "4dip",
            left: "0",
            id: "__alloyId274"
        });
        $.__views.labels.add($.__views.__alloyId274);
        $.__views.slingSpecification = Ti.UI.createView({
            height: Ti.UI.SIZE,
            id: "slingSpecification",
            layout: "vertical",
            width: "50%",
            top: "0"
        });
        $.__views.valuesSling.add($.__views.slingSpecification);
        $.__views.slingSpecType = Ti.UI.createLabel({
            color: "#FFF",
            height: Ti.UI.SIZE,
            top: "4dip",
            left: "0",
            id: "slingSpecType"
        });
        $.__views.slingSpecification.add($.__views.slingSpecType);
        $.__views.slingSpecGrade = Ti.UI.createLabel({
            color: "#FFF",
            height: Ti.UI.SIZE,
            top: "4dip",
            left: "0",
            id: "slingSpecGrade"
        });
        $.__views.slingSpecification.add($.__views.slingSpecGrade);
        $.__views.slingSpecLegs = Ti.UI.createLabel({
            color: "#FFF",
            height: Ti.UI.SIZE,
            top: "4dip",
            left: "0",
            id: "slingSpecLegs"
        });
        $.__views.slingSpecification.add($.__views.slingSpecLegs);
        $.__views.slingSpecLoad = Ti.UI.createLabel({
            color: "#FFF",
            height: Ti.UI.SIZE,
            top: "4dip",
            left: "0",
            id: "slingSpecLoad"
        });
        $.__views.slingSpecification.add($.__views.slingSpecLoad);
        $.__views.slingSpecLength = Ti.UI.createLabel({
            color: "#FFF",
            height: Ti.UI.SIZE,
            top: "4dip",
            left: "0",
            id: "slingSpecLength"
        });
        $.__views.slingSpecification.add($.__views.slingSpecLength);
        $.__views.slingSpecSize = Ti.UI.createLabel({
            color: "#FFF",
            height: Ti.UI.SIZE,
            top: "4dip",
            left: "0",
            id: "slingSpecSize"
        });
        $.__views.slingSpecification.add($.__views.slingSpecSize);
    }
    $.__views.__alloyId275 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        layout: "vertical",
        width: "90%",
        left: "5%",
        id: "__alloyId275"
    });
    $.__views.content.add($.__views.__alloyId275);
    $.__views.descriptionContainer = Ti.UI.createView({
        height: Ti.UI.SIZE,
        top: "4dip",
        layout: "horizontal",
        id: "descriptionContainer"
    });
    $.__views.__alloyId275.add($.__views.descriptionContainer);
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
    $.__views.__alloyId275.add($.__views.slingPartcode);
    $.__views.specPartcode = Ti.UI.createLabel({
        color: "#FFF",
        height: Ti.UI.SIZE,
        left: "0",
        textAlign: "left",
        top: "4dip",
        id: "specPartcode"
    });
    $.__views.slingPartcode.add($.__views.specPartcode);
    $.__views.__alloyId276 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        top: "10dip",
        layout: "horizontal",
        id: "__alloyId276"
    });
    $.__views.__alloyId275.add($.__views.__alloyId276);
    $.__views.quotedPrice = Ti.UI.createLabel({
        color: "#FFF",
        height: Ti.UI.SIZE,
        left: "0",
        id: "quotedPrice"
    });
    $.__views.__alloyId276.add($.__views.quotedPrice);
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
    $.__views.__alloyId275.add($.__views.viewSlingAssembly);
    viewSlingAssembly ? $.__views.viewSlingAssembly.addEventListener("click", viewSlingAssembly) : __defers["$.__views.viewSlingAssembly!click!viewSlingAssembly"] = true;
    $.__views.slingAssemblyImg = Ti.UI.createImageView({
        touchEnabled: false,
        id: "slingAssemblyImg",
        width: "auto"
    });
    $.__views.__alloyId275.add($.__views.slingAssemblyImg);
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
    $.__views.__alloyId275.add($.__views.requestQuote);
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
    $.__views.__alloyId275.add($.__views.backToDash);
    openDash ? $.__views.backToDash.addEventListener("click", openDash) : __defers["$.__views.backToDash!click!openDash"] = true;
    $.__views.__alloyId277 = Ti.UI.createView({
        height: "1dip",
        width: "100%",
        top: "20dip",
        backgroundColor: "#FFF",
        id: "__alloyId277"
    });
    $.__views.scrollView.add($.__views.__alloyId277);
    exports.destroy = function() {};
    _.extend($, $.__views);
    !function() {
        $.backToDash.hide();
        $.backToDash.height = 0;
        var angle, grade, shortener, end, upper, Database = require("databaseObj"), database = new Database("SlingDB.sqlite"), db = database.openDb(), legLength = Math.ceil(Alloy.Globals.sling.nominalLength);
        Ti.API.info(Alloy.Globals.sling);
        Alloy.Globals.wllAngle = null;
        Alloy.Globals.wllId = null;
        Alloy.Globals.slingId = null;
        if ("Chain" === Alloy.Globals.sling.type) {
            var angle, grade, shortener, end, upper;
            if (45 === Alloy.Globals.sling.angle) {
                angle = "wll.limit45";
                Alloy.Globals.wllAngle = "limit45";
            } else {
                angle = "wll.limit60";
                Alloy.Globals.wllAngle = "limit60";
            }
            shortener = "NONE" === Alloy.Globals.sling.shorteningDeviceCode ? 'AND s.shortener LIKE ""' : 'AND s.shortener LIKE "' + Alloy.Globals.sling.shorteningDeviceCode + '"';
            end = "NONE" === Alloy.Globals.sling.lowerTerminationCode ? 'AND end = ""' : 'AND end = "' + Alloy.Globals.sling.lowerTerminationCode + '"';
            upper = "NONE" === Alloy.Globals.sling.upperTerminationCode ? 'AND end = ""' : 'AND end = "' + Alloy.Globals.sling.upperTerminationCode + '"';
            if (8 === Alloy.Globals.sling.grade || 10 === Alloy.Globals.sling.grade) {
                grade = Alloy.Globals.sling.grade;
                var sql = "SELECT *, wll.id AS wllId, s.id AS slingId FROM WorkingLoadLimits AS wll, Slings AS s WHERE " + angle + " >= " + Alloy.Globals.sling.load + ' AND wll.type="c" AND wll.legs = ' + Alloy.Globals.sling.legs + " AND s.legs=wll.legs AND (wll.grade = " + grade + ") AND (s.size=wll.size AND s.grade=wll.grade " + end + " " + shortener + ' AND s.length = "' + legLength + '") GROUP BY wll.id ORDER BY ' + angle + " LIMIT 1";
                var row = db.execute(sql);
                Ti.API.info(sql);
                if (row.isValidRow()) {
                    Alloy.Globals.wllId = row.fieldByName("wllId");
                    Alloy.Globals.slingId = row.fieldByName("slingId");
                    Alloy.Globals.sling.partCode = row.fieldByName("code");
                    Alloy.Globals.sling.quotedPrice = row.fieldByName("price");
                    Alloy.Globals.sling.slingDescription = row.fieldByName("description");
                } else {
                    Ti.API.info("row 10 create part code");
                    createPartcode();
                }
            } else if ("Auto" === Alloy.Globals.sling.grade) {
                var price8, code8, description8, wllId8, slingId8, price10, code10, description10, wllId10, slingId10, angle, grade, shortener, end, upper;
                if (45 === Alloy.Globals.sling.angle) {
                    angle = "wll.limit45";
                    Alloy.Globals.wllAngle = "limit45";
                } else {
                    angle = "wll.limit60";
                    Alloy.Globals.wllAngle = "limit60";
                }
                shortener = "NONE" === Alloy.Globals.sling.shorteningDeviceCode ? "AND s.shortener IS NULL" : 'AND s.shortener LIKE "' + Alloy.Globals.sling.shorteningDeviceCode + '"';
                end = "NONE" === Alloy.Globals.sling.lowerTerminationCode ? "AND s.end IS NULL" : 'AND s.end = "' + Alloy.Globals.sling.lowerTerminationCode + '"';
                upper = "NONE" === Alloy.Globals.sling.upperTerminationCode ? "AND s.end IS NULL" : 'AND s.end = "' + Alloy.Globals.sling.upperTerminationCode + '"';
                var sql = "SELECT *, wll.id AS wllId, s.id AS slingId FROM WorkingLoadLimits AS wll, Slings AS s WHERE " + angle + " >= " + Alloy.Globals.sling.load + ' AND wll.type="c" AND wll.legs = ' + Alloy.Globals.sling.legs + ' AND s.legs = wll.legs AND (wll.grade = "8" ) AND (s.size=wll.size AND s.grade=wll.grade ' + end + " " + shortener + " AND s.length = " + legLength + ") GROUP BY wll.id ORDER BY " + angle + " ASC";
                var row8 = db.execute(sql);
                if (row8.isValidRow()) {
                    price8 = row8.fieldByName("price");
                    code8 = row8.fieldByName("code");
                    description8 = row8.fieldByName("description");
                    wllId8 = row8.fieldByName("wllId");
                    slingId8 = row8.fieldByName("slingId");
                } else Ti.API.info("Row 8 not valid");
                var sql = "SELECT *, wll.id AS wllId, s.id AS slingId FROM WorkingLoadLimits AS wll, Slings AS s WHERE " + angle + " >= " + Alloy.Globals.sling.load + ' AND wll.type="c" AND wll.legs = ' + Alloy.Globals.sling.legs + ' AND s.legs=wll.legs AND (wll.grade = "10" ) AND (s.size=wll.size AND s.grade=wll.grade ' + end + " " + shortener + " AND s.length = " + legLength + ") GROUP BY wll.id ORDER BY " + angle + " ASC";
                var row10 = db.execute(sql);
                if (row10.isValidRow()) {
                    price10 = row10.fieldByName("price");
                    code10 = row10.fieldByName("code");
                    description10 = row10.fieldByName("description");
                    wllId10 = row10.fieldByName("wllId");
                    slingId10 = row10.fieldByName("slingId");
                } else Ti.API.info("Row 10 not valid");
                if (void 0 !== price8 && null !== price8 || void 0 !== price10 && null !== price10) {
                    if (void 0 === price10 || null === price10) {
                        Alloy.Globals.sling.partCode = code8;
                        Alloy.Globals.sling.quotedPrice = price8;
                        Alloy.Globals.sling.slingDescription = description8;
                        Alloy.Globals.wllId = wllId8;
                        Alloy.Globals.slingId = slingId8;
                    } else if (void 0 === price8 || null === price8) {
                        Alloy.Globals.sling.partCode = code10;
                        Alloy.Globals.sling.quotedPrice = price10;
                        Alloy.Globals.sling.slingDescription = description10;
                        Alloy.Globals.wllId = wllId10;
                        Alloy.Globals.slingId = slingId10;
                    } else if (parseInt(price8) < parseInt(price10)) {
                        Alloy.Globals.sling.partCode = code8;
                        Alloy.Globals.sling.quotedPrice = price8;
                        Alloy.Globals.sling.slingDescription = description8;
                        Alloy.Globals.sling.gradeCode = 8;
                        Alloy.Globals.wllId = wllId8;
                        Alloy.Globals.slingId = slingId8;
                    } else if (parseInt(price8) > parseInt(price10)) {
                        Alloy.Globals.sling.partCode = code10;
                        Alloy.Globals.sling.quotedPrice = price10;
                        Alloy.Globals.sling.slingDescription = description10;
                        Alloy.Globals.sling.gradeCode = 10;
                        Alloy.Globals.wllId = wllId10;
                        Alloy.Globals.slingId = slingId10;
                    } else if (parseInt(price8) === parseInt(price10)) {
                        Alloy.Globals.sling.partCode = code10;
                        Alloy.Globals.sling.quotedPrice = price10;
                        Alloy.Globals.sling.slingDescription = description10;
                        Alloy.Globals.sling.gradeCode = 10;
                        Alloy.Globals.wllId = wllId10;
                        Alloy.Globals.slingId = slingId10;
                    }
                } else {
                    Alloy.Globals.sling.quotedPrice = null;
                    Alloy.Globals.sling.slingDescription = null;
                    createPartcode();
                }
            }
        } else if ("Wire Rope" === Alloy.Globals.sling.type) {
            var angle, grade, shortener, end, upper;
            if (45 === Alloy.Globals.sling.angle) {
                angle = "wll.limit45";
                Alloy.Globals.wllAngle = "limit45";
            } else {
                angle = "wll.limit60";
                Alloy.Globals.wllAngle = "limit60";
            }
            end = "NONE" === Alloy.Globals.sling.lowerTerminationCode ? ' AND end = "" ' : ' AND end = "' + Alloy.Globals.sling.lowerTerminationCode + '" ';
            upper = "NONE" === Alloy.Globals.sling.upperTerminationCode || null === Alloy.Globals.sling.upperTerminationCode ? ' AND end_b = "" ' : ' AND end_b = "' + Alloy.Globals.sling.upperTerminationCode + '" ';
            var sql = "SELECT *, wll.id AS wllId, s.id AS slingId FROM WorkingLoadLimits AS wll, Slings AS s WHERE " + angle + " >= " + Alloy.Globals.sling.load + " AND wll.type='r' AND wll.legs = " + Alloy.Globals.sling.legs + " AND s.grade = '' AND s.legs = wll.legs AND s.size = wll.size AND s.length = " + legLength + " " + end + upper + "GROUP BY wll.id ORDER BY " + angle + " ASC LIMIT 1";
            Ti.API.info(sql);
            var row = db.execute(sql);
            if (row.isValidRow()) {
                Ti.API.info("DB part code: " + row.fieldByName("code"));
                Alloy.Globals.sling.partCode = row.fieldByName("code");
                Alloy.Globals.sling.quotedPrice = row.fieldByName("price");
                Alloy.Globals.sling.slingDescription = row.fieldByName("description");
                Alloy.Globals.wllId = row.fieldByName("wllId");
                Alloy.Globals.slingId = row.fieldByName("slingId");
            } else {
                Ti.API.info("wire rope create part code");
                createPartcode();
                Alloy.Globals.sling.grade = null;
                Alloy.Globals.sling.quotedPrice = null;
                Alloy.Globals.sling.slingDescription = null;
            }
        }
        outputDetails(Alloy.Globals.sling.type, Alloy.Globals.sling.grade, Alloy.Globals.sling.legs, Alloy.Globals.sling.load, Alloy.Globals.sling.nominalLength, Alloy.Globals.sling.slingDescription, Alloy.Globals.sling.partCode, Alloy.Globals.sling.quotedPrice);
        database.closeDb(db);
        checkImage(Alloy.Globals.sling.partCode);
        checkSpec();
    }();
    __defers["$.__views.close!click!closeModal"] && $.__views.close.addEventListener("click", closeModal);
    __defers["$.__views.viewSlingAssembly!click!viewSlingAssembly"] && $.__views.viewSlingAssembly.addEventListener("click", viewSlingAssembly);
    __defers["$.__views.requestQuote!click!sendQuote"] && $.__views.requestQuote.addEventListener("click", sendQuote);
    __defers["$.__views.backToDash!click!openDash"] && $.__views.backToDash.addEventListener("click", openDash);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;