function createIndicatorWindow(args) {
    function osIndicatorStyle() {
        style = Ti.UI.ActivityIndicatorStyle.PLAIN;
        return style;
    }
    function openIndicator() {
        win.open();
        activityIndicator.show();
    }
    function closeIndicator() {
        activityIndicator.hide();
        win.close();
    }
    var args = args || {};
    args.top || 140;
    var message = args.message || "Loading...";
    var win = Titanium.UI.createWindow({
        backgroundColor: "#021b4b"
    });
    var view = Ti.UI.createView({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        layout: "vertical"
    });
    var logo = Ti.UI.createImageView({
        width: "95%",
        height: "auto",
        image: "/images/WHC--logo.png"
    });
    var activityIndicator = Ti.UI.createActivityIndicator({
        style: osIndicatorStyle(),
        top: "20dip",
        width: "auto",
        height: "auto",
        message: message,
        color: "#FFF"
    });
    view.add(logo);
    view.add(activityIndicator);
    win.add(view);
    win.openIndicator = openIndicator;
    win.closeIndicator = closeIndicator;
    win.setMessage = function(message) {
        activityIndicator.setMessage(message);
    };
    return win;
}

exports.createIndicatorWindow = createIndicatorWindow;