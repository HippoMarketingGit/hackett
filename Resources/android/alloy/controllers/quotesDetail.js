function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function checkImage(partCode) {
        if (!partCode) return false;
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
    function sendQuote() {
        Ti.API.info("Clicked");
        var Common = require("common"), Connection = (new Common(), require("connections")), connection = new Connection(), Database = require("databaseObj"), database = new Database("SlingDB.sqlite"), user = database.getCurrentUserDetails();
        online = connection.onlineCheck(function(data) {
            var online;
            online = 1 === data ? true : false;
            return online;
        });
        Ti.API.info(user);
        if (online) {
            var quoteData = {
                type: args.type,
                grade: args.grade,
                legs: args.legs,
                load: args.load,
                length: args.length,
                partCode: args.partCode,
                price: args.price,
                description: args.description,
                date: args.date,
                ref: args.ref,
                user: args.user,
                specLoad: args.specLoad,
                addtodb: 0
            };
            database.insertQuoteOnline(quoteData);
        }
    }
    function deleteQuote() {
        var Connection = require("connections"), connection = new Connection(), Database = require("databaseObj"), database = new Database("SlingDB.sqlite"), online = connection.onlineCheck(function(data) {
            var online;
            online = 1 === data ? true : false;
            return online;
        });
        database.deleteQuote(online, args.ref, function() {
            $.quotesDetail.close({
                modal: true
            });
        });
    }
    function closeModal() {
        $.quotesDetail.close({
            modal: true
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "quotesDetail";
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
    $.__views.quotesDetail = Ti.UI.createWindow({
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
        id: "quotesDetail",
        layout: "vertical"
    });
    $.__views.quotesDetail && $.addTopLevelView($.__views.quotesDetail);
    $.__views.__alloyId130 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        left: "5%",
        top: "30dip",
        id: "__alloyId130"
    });
    $.__views.quotesDetail.add($.__views.__alloyId130);
    $.__views.close = Ti.UI.createImageView({
        id: "close",
        top: "0",
        left: "0",
        image: "/images/WHC-close.png",
        height: "24dip",
        width: "24dip"
    });
    $.__views.__alloyId130.add($.__views.close);
    closeModal ? $.__views.close.addEventListener("click", closeModal) : __defers["$.__views.close!click!closeModal"] = true;
    $.__views.__alloyId131 = Ti.UI.createView({
        height: "1dip",
        top: "20dip",
        width: "100%",
        backgroundColor: "#f7561e",
        id: "__alloyId131"
    });
    $.__views.quotesDetail.add($.__views.__alloyId131);
    $.__views.scrollView = Ti.UI.createScrollView({
        id: "scrollView",
        top: "4dip",
        left: "0",
        width: "100%",
        layout: "vertical"
    });
    $.__views.quotesDetail.add($.__views.scrollView);
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
        top: "4dip",
        width: "90%",
        left: "5%"
    });
    $.__views.content.add($.__views.slingSpec);
    $.__views.__alloyId132 = Ti.UI.createLabel({
        color: "#FFF",
        height: Ti.UI.SIZE,
        text: "Your requirements:",
        id: "__alloyId132"
    });
    $.__views.slingSpec.add($.__views.__alloyId132);
    $.__views.__alloyId133 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        top: "4dip",
        layout: "horizontal",
        id: "__alloyId133"
    });
    $.__views.slingSpec.add($.__views.__alloyId133);
    $.__views.__alloyId134 = Ti.UI.createLabel({
        color: "#FFF",
        height: Ti.UI.SIZE,
        text: "Ref:",
        left: "0",
        id: "__alloyId134"
    });
    $.__views.__alloyId133.add($.__views.__alloyId134);
    $.__views.ref = Ti.UI.createLabel({
        color: "#FFF",
        height: Ti.UI.SIZE,
        left: "104dip",
        id: "ref"
    });
    $.__views.__alloyId133.add($.__views.ref);
    $.__views.__alloyId135 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        top: "4dip",
        layout: "horizontal",
        id: "__alloyId135"
    });
    $.__views.slingSpec.add($.__views.__alloyId135);
    $.__views.__alloyId136 = Ti.UI.createLabel({
        color: "#FFF",
        height: Ti.UI.SIZE,
        text: "Type:",
        left: "0",
        id: "__alloyId136"
    });
    $.__views.__alloyId135.add($.__views.__alloyId136);
    $.__views.slingType = Ti.UI.createLabel({
        color: "#FFF",
        height: Ti.UI.SIZE,
        left: "94dip",
        id: "slingType"
    });
    $.__views.__alloyId135.add($.__views.slingType);
    $.__views.gradeContainer = Ti.UI.createView({
        height: Ti.UI.SIZE,
        top: "4dip",
        layout: "horizontal",
        id: "gradeContainer"
    });
    $.__views.slingSpec.add($.__views.gradeContainer);
    $.__views.__alloyId137 = Ti.UI.createLabel({
        color: "#FFF",
        height: Ti.UI.SIZE,
        text: "Grade:",
        left: "0",
        id: "__alloyId137"
    });
    $.__views.gradeContainer.add($.__views.__alloyId137);
    $.__views.grade = Ti.UI.createLabel({
        color: "#FFF",
        height: Ti.UI.SIZE,
        left: "83dip",
        id: "grade"
    });
    $.__views.gradeContainer.add($.__views.grade);
    $.__views.__alloyId138 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        top: "4dip",
        layout: "horizontal",
        id: "__alloyId138"
    });
    $.__views.slingSpec.add($.__views.__alloyId138);
    $.__views.__alloyId139 = Ti.UI.createLabel({
        color: "#FFF",
        height: Ti.UI.SIZE,
        text: "Legs:",
        left: "0",
        id: "__alloyId139"
    });
    $.__views.__alloyId138.add($.__views.__alloyId139);
    $.__views.legs = Ti.UI.createLabel({
        color: "#FFF",
        height: Ti.UI.SIZE,
        left: "95dip",
        id: "legs"
    });
    $.__views.__alloyId138.add($.__views.legs);
    $.__views.__alloyId140 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        top: "4dip",
        layout: "horizontal",
        id: "__alloyId140"
    });
    $.__views.slingSpec.add($.__views.__alloyId140);
    $.__views.__alloyId141 = Ti.UI.createLabel({
        color: "#FFF",
        height: Ti.UI.SIZE,
        text: "Load / WLL (t):",
        left: "0",
        id: "__alloyId141"
    });
    $.__views.__alloyId140.add($.__views.__alloyId141);
    $.__views.load = Ti.UI.createLabel({
        color: "#FFF",
        height: Ti.UI.SIZE,
        left: "23dip",
        id: "load"
    });
    $.__views.__alloyId140.add($.__views.load);
    $.__views.__alloyId142 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        top: "4dip",
        layout: "horizontal",
        id: "__alloyId142"
    });
    $.__views.slingSpec.add($.__views.__alloyId142);
    $.__views.__alloyId143 = Ti.UI.createLabel({
        color: "#FFF",
        height: Ti.UI.SIZE,
        text: "Length (m):",
        left: "0",
        id: "__alloyId143"
    });
    $.__views.__alloyId142.add($.__views.__alloyId143);
    $.__views.length = Ti.UI.createLabel({
        color: "#FFF",
        height: Ti.UI.SIZE,
        left: "50dip",
        id: "length"
    });
    $.__views.__alloyId142.add($.__views.length);
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
        id: "specPartcode"
    });
    $.__views.slingPartcode.add($.__views.specPartcode);
    $.__views.priceContainer = Ti.UI.createView({
        height: Ti.UI.SIZE,
        top: "10dip",
        layout: "horizontal",
        id: "priceContainer"
    });
    $.__views.slingSpec.add($.__views.priceContainer);
    $.__views.__alloyId144 = Ti.UI.createLabel({
        color: "#FFF",
        height: Ti.UI.SIZE,
        text: "Price (RRP): £",
        left: "0",
        id: "__alloyId144"
    });
    $.__views.priceContainer.add($.__views.__alloyId144);
    $.__views.quotedPrice = Ti.UI.createLabel({
        color: "#FFF",
        height: Ti.UI.SIZE,
        left: "0",
        id: "quotedPrice"
    });
    $.__views.priceContainer.add($.__views.quotedPrice);
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
        top: "24dip"
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
    $.__views.deleteQuote = Ti.UI.createButton({
        top: "8dip",
        width: "100%",
        height: "26dip",
        backgroundImage: "/images/WHC-button--secondary.png",
        color: "#FFF",
        textAlign: "left",
        font: {
            fontSize: 16
        },
        id: "deleteQuote",
        title: "Delete Quote"
    });
    $.__views.slingSpec.add($.__views.deleteQuote);
    deleteQuote ? $.__views.deleteQuote.addEventListener("click", deleteQuote) : __defers["$.__views.deleteQuote!click!deleteQuote"] = true;
    $.__views.__alloyId145 = Ti.UI.createView({
        height: "1dip",
        width: "100%",
        top: "20dip",
        backgroundColor: "#FFF",
        id: "__alloyId145"
    });
    $.__views.scrollView.add($.__views.__alloyId145);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    !function() {
        $.ref.text = args.ref;
        $.slingType.text = args.type;
        $.grade.text = args.grade;
        $.legs.text = args.legs;
        $.load.text = args.load;
        $.length.text = args.length;
        $.description.text = args.description;
        $.specPartcode.text = "Part code: " + args.partCode;
        if (null !== args.price) {
            $.quotedPrice.text = args.price;
            $.requestQuote.show();
        } else {
            $.priceContainer.height = 0;
            $.priceContainer.hide();
            $.requestQuote.hide();
        }
        Ti.API.info("price: " + args.price);
        Ti.API.info(JSON.stringify(args));
        if ("Wire Rope" === args.type) {
            $.gradeContainer.hide();
            $.gradeContainer.height = 0;
        }
        checkImage(args.partCode);
    }();
    __defers["$.__views.close!click!closeModal"] && $.__views.close.addEventListener("click", closeModal);
    __defers["$.__views.viewSlingAssembly!click!viewSlingAssembly"] && $.__views.viewSlingAssembly.addEventListener("click", viewSlingAssembly);
    __defers["$.__views.requestQuote!click!sendQuote"] && $.__views.requestQuote.addEventListener("click", sendQuote);
    __defers["$.__views.deleteQuote!click!deleteQuote"] && $.__views.deleteQuote.addEventListener("click", deleteQuote);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;