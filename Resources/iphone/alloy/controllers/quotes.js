function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function getData() {
        var Database = require("databaseObj"), database = new Database("SlingDB.sqlite"), db = database.openDb(), user = database.getCurrentUser(), row = db.execute('SELECT * FROM Quotes WHERE user = "' + user + '"'), array = [];
        while (row.isValidRow()) {
            var obj = {
                type: row.fieldByName("type"),
                grade: row.fieldByName("Grade"),
                legs: row.fieldByName("legs"),
                load: row.fieldByName("load"),
                length: row.fieldByName("length"),
                partCode: row.fieldByName("partCode"),
                price: row.fieldByName("price"),
                description: row.fieldByName("description"),
                date: row.fieldByName("date"),
                ref: row.fieldByName("ref"),
                user: row.fieldByName("user")
            };
            var tableRow = Ti.UI.createTableViewRow({
                width: "100%"
            }), container = Ti.UI.createView({
                top: "10dip",
                left: "0",
                layout: "vertical",
                height: Ti.UI.SIZE,
                width: "100%"
            }), separator = Ti.UI.createView({
                height: "1dip",
                width: "100%",
                top: "4dip",
                left: "20dip",
                backgroundColor: "#1e4fa2"
            }), partCode = Ti.UI.createLabel({
                left: "20dip",
                top: "0",
                text: row.fieldByName("partCode"),
                font: {
                    fontSize: "14px"
                },
                color: "#FFF"
            }), date = Ti.UI.createLabel({
                left: "20dip",
                top: "4dip",
                text: row.fieldByName("date"),
                font: {
                    fontSize: "16px"
                },
                color: "#FFF"
            }), description = Ti.UI.createLabel({
                left: "20dip",
                top: "4dip",
                right: "20dip",
                text: row.fieldByName("description"),
                font: {
                    fontSize: "12px"
                },
                color: "#FFF"
            });
            container.add(date);
            container.add(description);
            container.add(partCode);
            container.add(separator);
            tableRow.add(container);
            tableRow.hasChild = true;
            tableRow.dest = "quotesDetail";
            tableRow.quote = obj;
            tableRow.borderColor = "transparent";
            array.push(tableRow);
            row.next();
        }
        return array;
    }
    function openDash() {
        $.quotes.close();
        var win = Alloy.createController("dashboard").getView();
        win.open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "quotes";
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
    $.__views.quotes = Ti.UI.createWindow({
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
        width: "100%",
        left: "0",
        id: "quotes"
    });
    $.__views.quotes && $.addTopLevelView($.__views.quotes);
    $.__views.header = Ti.UI.createView({
        height: "50dip",
        layout: "vertical",
        top: "26dip",
        width: "100%",
        id: "header"
    });
    $.__views.quotes.add($.__views.header);
    $.__views.__alloyId163 = Ti.UI.createImageView({
        bottom: "8dip",
        width: "90%",
        image: "/images/WHC--logo.png",
        id: "__alloyId163"
    });
    $.__views.header.add($.__views.__alloyId163);
    $.__views.__alloyId164 = Ti.UI.createView({
        height: "1dip",
        width: "100%",
        backgroundColor: "#f7561e",
        id: "__alloyId164"
    });
    $.__views.quotes.add($.__views.__alloyId164);
    $.__views.__alloyId165 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        left: "5%",
        top: "10dip",
        id: "__alloyId165"
    });
    $.__views.quotes.add($.__views.__alloyId165);
    $.__views.__alloyId166 = Ti.UI.createView({
        height: "26dip",
        left: "0",
        layout: "horizontal",
        textAlign: "right",
        backgroundImage: "/images/WHC-button--back.png",
        width: "100dip",
        id: "__alloyId166"
    });
    $.__views.__alloyId165.add($.__views.__alloyId166);
    openDash ? $.__views.__alloyId166.addEventListener("click", openDash) : __defers["$.__views.__alloyId166!click!openDash"] = true;
    $.__views.__alloyId167 = Ti.UI.createLabel({
        color: "#FFF",
        height: Ti.UI.SIZE,
        text: "BACK",
        touchEnabled: false,
        top: "2dip",
        left: "42dip",
        width: Ti.UI.SIZE,
        id: "__alloyId167"
    });
    $.__views.__alloyId166.add($.__views.__alloyId167);
    $.__views.container = Ti.UI.createView({
        height: Ti.UI.SIZE,
        id: "container",
        width: "100%",
        top: "10dip",
        bottom: "10dip",
        layout: "vertical"
    });
    $.__views.quotes.add($.__views.container);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    !function() {
        var table = Ti.UI.createTableView({
            height: "100%",
            width: "100%",
            backgroundColor: "transparent"
        });
        table.separatorStyle = Titanium.UI.iPhone.TableViewSeparatorStyle.NONE;
        table.setData(getData());
        $.container.add(table);
        table.addEventListener("click", function(e) {
            if (e.rowData.hasChild) {
                var data = e.rowData, details = Alloy.createController("quotesDetail", data.quote).getView();
                details.open({
                    modal: true
                });
                details.addEventListener("close", function() {
                    var data = getData();
                    table.setData(data);
                });
            }
        });
    }();
    __defers["$.__views.__alloyId166!click!openDash"] && $.__views.__alloyId166.addEventListener("click", openDash);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;