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
        if ("" != $.name.value && "" != $.companyName.value && "" != $.phoneNumber.value && "" != $.emailAddress.value && "" != $.password.value) {
            xhr.open("POST", "http://whackett.hippocreative.com/sync.php?task=pushUser");
            var params = {
                name: $.name.value,
                company: $.companyName.value,
                phone: parseInt($.phoneNumber.value),
                email: $.emailAddress.value,
                password: $.password.value,
                optIn: $.mailingList.value
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
        } else alert("Please make sure all fields marked * have been completed");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "register";
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
        layout: "vertical",
        top: "26dip",
        width: "100%",
        height: "50dip",
        id: "header"
    });
    $.__views.register.add($.__views.header);
    $.__views.__alloyId155 = Ti.UI.createImageView({
        bottom: "8dip",
        width: "90%",
        image: "/images/WHC--logo.png",
        id: "__alloyId155"
    });
    $.__views.header.add($.__views.__alloyId155);
    $.__views.__alloyId156 = Ti.UI.createView({
        height: "1dip",
        width: "100%",
        backgroundColor: "#f7561e",
        id: "__alloyId156"
    });
    $.__views.register.add($.__views.__alloyId156);
    $.__views.__alloyId157 = Ti.UI.createView({
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
        id: "__alloyId157"
    });
    $.__views.register.add($.__views.__alloyId157);
    $.__views.__alloyId158 = Ti.UI.createScrollView({
        contentWidth: "auto",
        contentHeight: "auto",
        showVerticalScrollIndicator: true,
        width: "100%",
        height: "100%",
        id: "__alloyId158"
    });
    $.__views.__alloyId157.add($.__views.__alloyId158);
    $.__views.__alloyId159 = Ti.UI.createView({
        layout: "vertical",
        width: "90%",
        id: "__alloyId159"
    });
    $.__views.__alloyId158.add($.__views.__alloyId159);
    $.__views.__alloyId160 = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId160"
    });
    $.__views.__alloyId159.add($.__views.__alloyId160);
    $.__views.back = Ti.UI.createButton({
        layout: "vertical",
        left: "0",
        width: "100dip",
        height: "26dip",
        backgroundImage: "/images/WHC-button--back.png",
        title: "BACK",
        color: "#FFF",
        textAlign: "right",
        verticalAlign: "bottom",
        font: {
            fontSize: 16
        },
        id: "back"
    });
    $.__views.__alloyId160.add($.__views.back);
    $.__views.__alloyId161 = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId161"
    });
    $.__views.__alloyId159.add($.__views.__alloyId161);
    $.__views.__alloyId162 = Ti.UI.createLabel({
        left: "0",
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#FFF",
        text: "Your name*",
        id: "__alloyId162"
    });
    $.__views.__alloyId161.add($.__views.__alloyId162);
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
    $.__views.__alloyId161.add($.__views.name);
    $.__views.__alloyId163 = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId163"
    });
    $.__views.__alloyId159.add($.__views.__alloyId163);
    $.__views.__alloyId164 = Ti.UI.createLabel({
        left: "0",
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#FFF",
        text: "Company name*",
        id: "__alloyId164"
    });
    $.__views.__alloyId163.add($.__views.__alloyId164);
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
    $.__views.__alloyId163.add($.__views.companyName);
    $.__views.__alloyId165 = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId165"
    });
    $.__views.__alloyId159.add($.__views.__alloyId165);
    $.__views.__alloyId166 = Ti.UI.createLabel({
        left: "0",
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#FFF",
        text: "Phone number*",
        id: "__alloyId166"
    });
    $.__views.__alloyId165.add($.__views.__alloyId166);
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
    $.__views.__alloyId165.add($.__views.phoneNumber);
    $.__views.__alloyId167 = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId167"
    });
    $.__views.__alloyId159.add($.__views.__alloyId167);
    $.__views.__alloyId168 = Ti.UI.createLabel({
        left: "0",
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#FFF",
        text: "Email address*",
        id: "__alloyId168"
    });
    $.__views.__alloyId167.add($.__views.__alloyId168);
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
    $.__views.__alloyId167.add($.__views.emailAddress);
    $.__views.__alloyId169 = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId169"
    });
    $.__views.__alloyId159.add($.__views.__alloyId169);
    $.__views.__alloyId170 = Ti.UI.createLabel({
        left: "0",
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#FFF",
        text: "Password *",
        id: "__alloyId170"
    });
    $.__views.__alloyId169.add($.__views.__alloyId170);
    $.__views.password = Ti.UI.createTextField({
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
        id: "password",
        passwordMask: "true"
    });
    $.__views.__alloyId169.add($.__views.password);
    $.__views.__alloyId171 = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId171"
    });
    $.__views.__alloyId159.add($.__views.__alloyId171);
    $.__views.__alloyId172 = Ti.UI.createView({
        layout: "horizontal",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId172"
    });
    $.__views.__alloyId171.add($.__views.__alloyId172);
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
    $.__views.__alloyId172.add($.__views.mailingList);
    $.__views.__alloyId173 = Ti.UI.createLabel({
        left: "5dip",
        width: Titanium.UI.SIZE,
        height: Titanium.UI.SIZE,
        color: "#FFF",
        font: {
            fontSize: 14
        },
        text: "Yes please, add me to the mailing list",
        id: "__alloyId173"
    });
    $.__views.__alloyId172.add($.__views.__alloyId173);
    $.__views.__alloyId174 = Ti.UI.createView({
        layout: "vertical",
        top: "10dip",
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "__alloyId174"
    });
    $.__views.__alloyId159.add($.__views.__alloyId174);
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
    $.__views.__alloyId174.add($.__views.submit);
    registerUser ? $.__views.submit.addEventListener("click", registerUser) : __defers["$.__views.submit!click!registerUser"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
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
    __defers["$.__views.submit!click!registerUser"] && $.__views.submit.addEventListener("click", registerUser);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;