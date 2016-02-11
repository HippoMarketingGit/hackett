function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function registerUser() {
        var valid = validateFields();
        if (true === valid) {
            xhr.open("POST", "http://whackett.hippocreative.com/sync.php?task=pushUser");
            var params = {
                name: $.name.value,
                company: $.companyName.value,
                phone: $.phoneNumber.value,
                email: $.emailAddress.value,
                password: $.password1.value,
                optIn: $.mailingList.value,
                postcode: $.postcode.value
            };
            xhr.onload = function() {
                var response = JSON.parse(this.responseText);
                if (1 === response.reply) {
                    alert("You have registered successfully. Please login to continue using the app.");
                    var index = Alloy.createController("index").getView();
                    index.open();
                    $.register.close();
                } else alert("This email address is already in use, if you have forgotten your account details you can reset your password from the login screen.");
            };
            xhr.send(params);
        } else alert(valid);
    }
    function validateFields() {
        if ("" === $.name.value) return "Please enter a name.";
        if ("" == $.companyName.value) return "Please enter a company name.";
        if ("" == $.phoneNumber.value) return "Please enter a phone number.";
        if ("" == $.postcode.value) return "Please enter a postcode.";
        var emailReg = /^([A-Za-z0-9_\-\.\+])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if ("" == $.emailAddress.value || false === emailReg.test($.emailAddress.value)) return "Please enter a valid email address.";
        if ("" == $.password1.value || $.password1.value != $.password2.value) return "Please enter a password and make sure they match.";
        return true;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "register";
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
    $.__views.register = Ti.UI.createWindow({
        layout: "vertical",
        color: "#FFF",
        backgroundColor: "#0d182f",
        id: "register"
    });
    $.__views.register && $.addTopLevelView($.__views.register);
    $.__views.header = Ti.UI.createView({
        top: 0,
        width: "100%",
        height: "85dip",
        backgroundColor: "#eb6209",
        layout: "vertical",
        id: "header"
    });
    $.__views.register.add($.__views.header);
    $.__views.__alloyId146 = Ti.UI.createImageView({
        top: "5dip",
        width: Ti.UI.SIZE,
        height: "70%",
        image: "/images/WHC--logo--transparent.png",
        id: "__alloyId146"
    });
    $.__views.header.add($.__views.__alloyId146);
    $.__views.tel = Ti.UI.createLabel({
        left: "0",
        width: "100%",
        height: Ti.UI.SIZE,
        color: "#FFF",
        top: "-10dip",
        textAlign: "center",
        id: "tel"
    });
    $.__views.header.add($.__views.tel);
    $.__views.__alloyId147 = Ti.UI.createView({
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
        id: "__alloyId147"
    });
    $.__views.register.add($.__views.__alloyId147);
    $.__views.__alloyId148 = Ti.UI.createScrollView({
        contentWidth: "auto",
        contentHeight: "auto",
        showVerticalScrollIndicator: true,
        width: "100%",
        height: "100%",
        id: "__alloyId148"
    });
    $.__views.__alloyId147.add($.__views.__alloyId148);
    $.__views.__alloyId149 = Ti.UI.createView({
        layout: "vertical",
        width: "90%",
        id: "__alloyId149"
    });
    $.__views.__alloyId148.add($.__views.__alloyId149);
    $.__views.__alloyId150 = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId150"
    });
    $.__views.__alloyId149.add($.__views.__alloyId150);
    $.__views.back = Ti.UI.createView({
        left: "0",
        layout: "horizontal",
        textAlign: "right",
        backgroundImage: "/images/WHC-button--back.png",
        width: "100dip",
        height: "26dip",
        id: "back"
    });
    $.__views.__alloyId150.add($.__views.back);
    $.__views.__alloyId151 = Ti.UI.createLabel({
        left: "42dip",
        width: Ti.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#FFF",
        text: "BACK",
        touchEnabled: false,
        top: "2dip",
        id: "__alloyId151"
    });
    $.__views.back.add($.__views.__alloyId151);
    $.__views.__alloyId152 = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId152"
    });
    $.__views.__alloyId149.add($.__views.__alloyId152);
    $.__views.__alloyId153 = Ti.UI.createLabel({
        left: "0",
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#FFF",
        text: "Your name *",
        id: "__alloyId153"
    });
    $.__views.__alloyId152.add($.__views.__alloyId153);
    $.__views.name = Ti.UI.createTextField({
        top: "4dip",
        height: "26dip",
        width: "100%",
        borderWidth: "1dip",
        borderColor: "#fba688",
        backgroundColor: "#FFF",
        font: {
            fontSize: 20
        },
        paddingLeft: "4dip",
        id: "name"
    });
    $.__views.__alloyId152.add($.__views.name);
    $.__views.__alloyId154 = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId154"
    });
    $.__views.__alloyId149.add($.__views.__alloyId154);
    $.__views.__alloyId155 = Ti.UI.createLabel({
        left: "0",
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#FFF",
        text: "Company name *",
        id: "__alloyId155"
    });
    $.__views.__alloyId154.add($.__views.__alloyId155);
    $.__views.companyName = Ti.UI.createTextField({
        top: "4dip",
        height: "26dip",
        width: "100%",
        borderWidth: "1dip",
        borderColor: "#fba688",
        backgroundColor: "#FFF",
        font: {
            fontSize: 20
        },
        paddingLeft: "4dip",
        id: "companyName"
    });
    $.__views.__alloyId154.add($.__views.companyName);
    $.__views.__alloyId156 = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId156"
    });
    $.__views.__alloyId149.add($.__views.__alloyId156);
    $.__views.__alloyId157 = Ti.UI.createLabel({
        left: "0",
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#FFF",
        text: "Phone number *",
        id: "__alloyId157"
    });
    $.__views.__alloyId156.add($.__views.__alloyId157);
    $.__views.phoneNumber = Ti.UI.createTextField({
        top: "4dip",
        height: "26dip",
        width: "100%",
        borderWidth: "1dip",
        borderColor: "#fba688",
        backgroundColor: "#FFF",
        font: {
            fontSize: 20
        },
        paddingLeft: "4dip",
        id: "phoneNumber"
    });
    $.__views.__alloyId156.add($.__views.phoneNumber);
    $.__views.__alloyId158 = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId158"
    });
    $.__views.__alloyId149.add($.__views.__alloyId158);
    $.__views.__alloyId159 = Ti.UI.createLabel({
        left: "0",
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#FFF",
        text: "Postcode *",
        id: "__alloyId159"
    });
    $.__views.__alloyId158.add($.__views.__alloyId159);
    $.__views.postcode = Ti.UI.createTextField({
        top: "4dip",
        height: "26dip",
        width: "100%",
        borderWidth: "1dip",
        borderColor: "#fba688",
        backgroundColor: "#FFF",
        font: {
            fontSize: 20
        },
        paddingLeft: "4dip",
        id: "postcode"
    });
    $.__views.__alloyId158.add($.__views.postcode);
    $.__views.__alloyId160 = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId160"
    });
    $.__views.__alloyId149.add($.__views.__alloyId160);
    $.__views.__alloyId161 = Ti.UI.createLabel({
        left: "0",
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#FFF",
        text: "Email address *",
        id: "__alloyId161"
    });
    $.__views.__alloyId160.add($.__views.__alloyId161);
    $.__views.emailAddress = Ti.UI.createTextField({
        top: "4dip",
        height: "26dip",
        width: "100%",
        borderWidth: "1dip",
        borderColor: "#fba688",
        backgroundColor: "#FFF",
        font: {
            fontSize: 20
        },
        paddingLeft: "4dip",
        id: "emailAddress"
    });
    $.__views.__alloyId160.add($.__views.emailAddress);
    $.__views.__alloyId162 = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId162"
    });
    $.__views.__alloyId149.add($.__views.__alloyId162);
    $.__views.__alloyId163 = Ti.UI.createLabel({
        left: "0",
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#FFF",
        text: "Password *",
        id: "__alloyId163"
    });
    $.__views.__alloyId162.add($.__views.__alloyId163);
    $.__views.password1 = Ti.UI.createTextField({
        top: "4dip",
        height: "26dip",
        width: "100%",
        borderWidth: "1dip",
        borderColor: "#fba688",
        backgroundColor: "#FFF",
        font: {
            fontSize: 20
        },
        paddingLeft: "4dip",
        id: "password1",
        passwordMask: "true"
    });
    $.__views.__alloyId162.add($.__views.password1);
    $.__views.__alloyId164 = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId164"
    });
    $.__views.__alloyId149.add($.__views.__alloyId164);
    $.__views.__alloyId165 = Ti.UI.createLabel({
        left: "0",
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#FFF",
        text: "Password (confirm) *",
        id: "__alloyId165"
    });
    $.__views.__alloyId164.add($.__views.__alloyId165);
    $.__views.password2 = Ti.UI.createTextField({
        top: "4dip",
        height: "26dip",
        width: "100%",
        borderWidth: "1dip",
        borderColor: "#fba688",
        backgroundColor: "#FFF",
        font: {
            fontSize: 20
        },
        paddingLeft: "4dip",
        id: "password2",
        passwordMask: "true"
    });
    $.__views.__alloyId164.add($.__views.password2);
    $.__views.__alloyId166 = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId166"
    });
    $.__views.__alloyId149.add($.__views.__alloyId166);
    $.__views.__alloyId167 = Ti.UI.createView({
        layout: "horizontal",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId167"
    });
    $.__views.__alloyId166.add($.__views.__alloyId167);
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
    $.__views.__alloyId167.add($.__views.mailingList);
    $.__views.__alloyId168 = Ti.UI.createLabel({
        left: "5dip",
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#FFF",
        font: {
            fontSize: 14
        },
        text: "Yes please, add me to the mailing list",
        id: "__alloyId168"
    });
    $.__views.__alloyId167.add($.__views.__alloyId168);
    $.__views.__alloyId169 = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId169"
    });
    $.__views.__alloyId149.add($.__views.__alloyId169);
    $.__views.submit = Ti.UI.createButton({
        width: "100%",
        height: "26dip",
        backgroundImage: "/images/WHC-button--primary.png",
        title: "REGISTER",
        color: "#FFF",
        textAlign: "left",
        font: {
            fontSize: 16
        },
        id: "submit"
    });
    $.__views.__alloyId169.add($.__views.submit);
    registerUser ? $.addListener($.__views.submit, "click", registerUser) : __defers["$.__views.submit!click!registerUser"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    Alloy.Globals.callHandler($.tel);
    $.back.addEventListener("click", function() {
        var win = Alloy.createController("index").getView();
        $.register.close();
        win.open();
    });
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
    var xhr = Titanium.Network.createHTTPClient();
    __defers["$.__views.submit!click!registerUser"] && $.addListener($.__views.submit, "click", registerUser);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;