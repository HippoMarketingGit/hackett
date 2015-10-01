function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function openDash() {
        var win = Alloy.createController("dashboard").getView();
        win.open();
        $.accountSettings.close();
        $.accountSettings = null;
    }
    function update() {
        var currentUser = db.getCurrentUser(), valid = validateFields();
        true === valid ? database.updateUserDetails(currentUser, $.name.value, $.companyName.value, $.phoneNumber.value, $.emailAddress.value, $.mailingList.value, $.password1.value, $.postcode.value) : alert(valid);
    }
    function logout() {
        database.logout(function() {
            var win = Alloy.createController("index").getView();
            win.open();
            $.accountSettings.close();
            $.accountSettings = null;
        });
    }
    function validateFields() {
        if ("" == $.name.value) return "Please enter a name.";
        if ("" == $.companyName.value) return "Please enter a company name.";
        if ("" == $.phoneNumber.value) return "Please enter a phone number.";
        if ("" == $.postcode.value) return "Please enter a postcode.";
        var emailReg = /^([A-Za-z0-9_\-\.\+])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if ("" == $.emailAddress.value || false === emailReg.test($.emailAddress.value)) return "Please enter a valid email address.";
        if ($.password1.value != $.password2.value) return "Please make sure the new passwords match.";
        return true;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "accountSettings";
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
    $.__views.accountSettings = Ti.UI.createWindow({
        statusBarStyle: Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT,
        layout: "vertical",
        color: "#FFF",
        backgroundColor: "#0d182f",
        id: "accountSettings"
    });
    $.__views.accountSettings && $.addTopLevelView($.__views.accountSettings);
    $.__views.header = Ti.UI.createView({
        top: "26dip",
        width: "100%",
        height: "85dip",
        backgroundColor: "#eb6209",
        layout: "vertical",
        id: "header"
    });
    $.__views.accountSettings.add($.__views.header);
    $.__views.__alloyId0 = Ti.UI.createImageView({
        top: "5dip",
        width: Ti.UI.SIZE,
        height: "70%",
        image: "/images/WHC--logo--transparent.png",
        id: "__alloyId0"
    });
    $.__views.header.add($.__views.__alloyId0);
    $.__views.tel = Ti.UI.createLabel({
        left: "0",
        width: "100%",
        height: Titanium.UI.SIZE,
        color: "#FFF",
        top: "-10dip",
        textAlign: "center",
        id: "tel"
    });
    $.__views.header.add($.__views.tel);
    $.__views.__alloyId1 = Ti.UI.createView({
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
        id: "__alloyId1"
    });
    $.__views.accountSettings.add($.__views.__alloyId1);
    $.__views.__alloyId2 = Ti.UI.createScrollView({
        contentWidth: "auto",
        contentHeight: "auto",
        showVerticalScrollIndicator: true,
        width: "100%",
        height: "100%",
        id: "__alloyId2"
    });
    $.__views.__alloyId1.add($.__views.__alloyId2);
    $.__views.__alloyId3 = Ti.UI.createView({
        layout: "vertical",
        width: "90%",
        id: "__alloyId3"
    });
    $.__views.__alloyId2.add($.__views.__alloyId3);
    $.__views.__alloyId4 = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId4"
    });
    $.__views.__alloyId3.add($.__views.__alloyId4);
    $.__views.__alloyId5 = Ti.UI.createView({
        left: "0",
        layout: "horizontal",
        textAlign: "right",
        backgroundImage: "/images/WHC-button--back.png",
        width: "100dip",
        height: "26dip",
        id: "__alloyId5"
    });
    $.__views.__alloyId4.add($.__views.__alloyId5);
    openDash ? $.__views.__alloyId5.addEventListener("click", openDash) : __defers["$.__views.__alloyId5!click!openDash"] = true;
    $.__views.__alloyId6 = Ti.UI.createLabel({
        left: "42dip",
        width: Ti.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#FFF",
        text: "BACK",
        touchEnabled: false,
        top: "2dip",
        id: "__alloyId6"
    });
    $.__views.__alloyId5.add($.__views.__alloyId6);
    $.__views.__alloyId7 = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId7"
    });
    $.__views.__alloyId3.add($.__views.__alloyId7);
    $.__views.__alloyId8 = Ti.UI.createLabel({
        left: "0",
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#FFF",
        text: "Your name *",
        id: "__alloyId8"
    });
    $.__views.__alloyId7.add($.__views.__alloyId8);
    $.__views.name = Ti.UI.createTextField({
        top: "4dip",
        height: Titanium.UI.SIZE,
        width: "100%",
        borderWidth: "1dip",
        borderColor: "#fba688",
        backgroundColor: "#FFF",
        font: {
            fontSize: "20dip"
        },
        paddingLeft: "4dip",
        color: "black",
        id: "name"
    });
    $.__views.__alloyId7.add($.__views.name);
    $.__views.__alloyId9 = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId9"
    });
    $.__views.__alloyId3.add($.__views.__alloyId9);
    $.__views.__alloyId10 = Ti.UI.createLabel({
        left: "0",
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#FFF",
        text: "Company name *",
        id: "__alloyId10"
    });
    $.__views.__alloyId9.add($.__views.__alloyId10);
    $.__views.companyName = Ti.UI.createTextField({
        top: "4dip",
        height: Titanium.UI.SIZE,
        width: "100%",
        borderWidth: "1dip",
        borderColor: "#fba688",
        backgroundColor: "#FFF",
        font: {
            fontSize: "20dip"
        },
        paddingLeft: "4dip",
        color: "black",
        id: "companyName"
    });
    $.__views.__alloyId9.add($.__views.companyName);
    $.__views.__alloyId11 = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId11"
    });
    $.__views.__alloyId3.add($.__views.__alloyId11);
    $.__views.__alloyId12 = Ti.UI.createLabel({
        left: "0",
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#FFF",
        text: "Phone number *",
        id: "__alloyId12"
    });
    $.__views.__alloyId11.add($.__views.__alloyId12);
    $.__views.phoneNumber = Ti.UI.createTextField({
        top: "4dip",
        height: Titanium.UI.SIZE,
        width: "100%",
        borderWidth: "1dip",
        borderColor: "#fba688",
        backgroundColor: "#FFF",
        font: {
            fontSize: "20dip"
        },
        paddingLeft: "4dip",
        color: "black",
        id: "phoneNumber"
    });
    $.__views.__alloyId11.add($.__views.phoneNumber);
    $.__views.__alloyId13 = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId13"
    });
    $.__views.__alloyId3.add($.__views.__alloyId13);
    $.__views.__alloyId14 = Ti.UI.createLabel({
        left: "0",
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#FFF",
        text: "Postcode *",
        id: "__alloyId14"
    });
    $.__views.__alloyId13.add($.__views.__alloyId14);
    $.__views.postcode = Ti.UI.createTextField({
        top: "4dip",
        height: Titanium.UI.SIZE,
        width: "100%",
        borderWidth: "1dip",
        borderColor: "#fba688",
        backgroundColor: "#FFF",
        font: {
            fontSize: "20dip"
        },
        paddingLeft: "4dip",
        color: "black",
        id: "postcode"
    });
    $.__views.__alloyId13.add($.__views.postcode);
    $.__views.__alloyId15 = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId15"
    });
    $.__views.__alloyId3.add($.__views.__alloyId15);
    $.__views.__alloyId16 = Ti.UI.createLabel({
        left: "0",
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#FFF",
        text: "Email address *",
        id: "__alloyId16"
    });
    $.__views.__alloyId15.add($.__views.__alloyId16);
    $.__views.emailAddress = Ti.UI.createTextField({
        top: "4dip",
        height: Titanium.UI.SIZE,
        width: "100%",
        borderWidth: "1dip",
        borderColor: "#fba688",
        backgroundColor: "#FFF",
        font: {
            fontSize: "20dip"
        },
        paddingLeft: "4dip",
        color: "black",
        id: "emailAddress"
    });
    $.__views.__alloyId15.add($.__views.emailAddress);
    $.__views.__alloyId17 = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId17"
    });
    $.__views.__alloyId3.add($.__views.__alloyId17);
    $.__views.__alloyId18 = Ti.UI.createLabel({
        left: "0",
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#FFF",
        text: "Update password",
        id: "__alloyId18"
    });
    $.__views.__alloyId17.add($.__views.__alloyId18);
    $.__views.password1 = Ti.UI.createTextField({
        top: "4dip",
        height: Titanium.UI.SIZE,
        width: "100%",
        borderWidth: "1dip",
        borderColor: "#fba688",
        backgroundColor: "#FFF",
        font: {
            fontSize: "20dip"
        },
        paddingLeft: "4dip",
        color: "black",
        id: "password1",
        passwordMask: "true"
    });
    $.__views.__alloyId17.add($.__views.password1);
    $.__views.__alloyId19 = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId19"
    });
    $.__views.__alloyId3.add($.__views.__alloyId19);
    $.__views.__alloyId20 = Ti.UI.createLabel({
        left: "0",
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#FFF",
        text: "Update password (confirm)",
        id: "__alloyId20"
    });
    $.__views.__alloyId19.add($.__views.__alloyId20);
    $.__views.password2 = Ti.UI.createTextField({
        top: "4dip",
        height: Titanium.UI.SIZE,
        width: "100%",
        borderWidth: "1dip",
        borderColor: "#fba688",
        backgroundColor: "#FFF",
        font: {
            fontSize: "20dip"
        },
        paddingLeft: "4dip",
        color: "black",
        id: "password2",
        passwordMask: "true"
    });
    $.__views.__alloyId19.add($.__views.password2);
    $.__views.__alloyId21 = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId21"
    });
    $.__views.__alloyId3.add($.__views.__alloyId21);
    $.__views.__alloyId22 = Ti.UI.createView({
        layout: "horizontal",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId22"
    });
    $.__views.__alloyId21.add($.__views.__alloyId22);
    $.__views.mailingList = Ti.UI.createButton({
        left: 0,
        title: "",
        width: "18dip",
        height: "18dip",
        borderColor: "#666",
        borderWidth: "1dip",
        borderRadius: "2dip",
        backgroundColor: "#FFF",
        backgroundImage: "none",
        color: "#666",
        font: {
            fontSize: 18,
            fontWeight: "bold"
        },
        value: false,
        id: "mailingList"
    });
    $.__views.__alloyId22.add($.__views.mailingList);
    $.__views.__alloyId23 = Ti.UI.createLabel({
        left: "5dip",
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#FFF",
        font: {
            fontSize: 14
        },
        text: "Yes please, add me to the mailing list*",
        id: "__alloyId23"
    });
    $.__views.__alloyId22.add($.__views.__alloyId23);
    $.__views.__alloyId24 = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId24"
    });
    $.__views.__alloyId3.add($.__views.__alloyId24);
    $.__views.__alloyId25 = Ti.UI.createButton({
        width: "100%",
        height: "26dip",
        backgroundImage: "/images/WHC-button--primary.png",
        color: "#FFF",
        textAlign: "left",
        font: {
            fontSize: 16
        },
        title: "UPDATE",
        id: "__alloyId25"
    });
    $.__views.__alloyId24.add($.__views.__alloyId25);
    update ? $.__views.__alloyId25.addEventListener("click", update) : __defers["$.__views.__alloyId25!click!update"] = true;
    $.__views.__alloyId26 = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId26"
    });
    $.__views.__alloyId3.add($.__views.__alloyId26);
    $.__views.__alloyId27 = Ti.UI.createButton({
        width: "100%",
        height: "26dip",
        backgroundImage: "/images/WHC-button--secondary.png",
        color: "#FFF",
        textAlign: "left",
        font: {
            fontSize: 16
        },
        title: "LOGOUT",
        id: "__alloyId27"
    });
    $.__views.__alloyId26.add($.__views.__alloyId27);
    logout ? $.__views.__alloyId27.addEventListener("click", logout) : __defers["$.__views.__alloyId27!click!logout"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Database = require("databaseObj"), database = new Database("SlingDB.sqlite"), db = database.openDb();
    Alloy.Globals.callHandler($.tel);
    $.mailingList.on = function() {
        this.backgroundColor = "#FFF";
        this.title = "✓";
        this.value = true;
    };
    $.mailingList.off = function() {
        this.backgroundColor = "#FFF";
        this.title = "";
        this.value = false;
    };
    $.mailingList.addEventListener("click", function(e) {
        false == e.source.value ? e.source.on() : e.source.off();
    });
    var row = db.execute('SELECT * FROM UserProfile WHERE loggedIn = "1"'), userData = {};
    while (row.isValidRow()) {
        var name = row.fieldByName("name"), company = row.fieldByName("company"), phone = row.fieldByName("phone"), email = row.fieldByName("email"), optIn = row.fieldByName("optIn"), postcode = row.fieldByName("postcode");
        $.name.value = name;
        $.companyName.value = company;
        $.phoneNumber.value = phone;
        $.emailAddress.value = email;
        $.postcode.value = postcode;
        userData = {
            name: name,
            company: company,
            phone: phone,
            email: email,
            postcode: postcode
        };
        if (1 === optIn) {
            $.mailingList.backgroundColor = "#FFF";
            $.mailingList.title = "✓";
            $.mailingList.value = true;
            userData.optIn = true;
        } else {
            this.backgroundColor = "#FFF";
            this.title = "";
            this.value = false;
            userData.optIn = false;
        }
        row.next();
    }
    db.close();
    __defers["$.__views.__alloyId5!click!openDash"] && $.__views.__alloyId5.addEventListener("click", openDash);
    __defers["$.__views.__alloyId25!click!update"] && $.__views.__alloyId25.addEventListener("click", update);
    __defers["$.__views.__alloyId27!click!logout"] && $.__views.__alloyId27.addEventListener("click", logout);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;