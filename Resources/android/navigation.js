function Navigation() {
    this.count = 0;
    this.currentWin;
}

Navigation.prototype.openFirstPage = function(currentWin, array) {
    var win = Alloy.createController(array[this.count]).getView("content");
    this.currentWin = win;
    currentWin.add(win);
};

Navigation.prototype.nextPage = function(scrollview, array, sling) {
    if (this.errorHandling(sling)) if (this.count < array.length - 1) {
        this.count++;
        var win = Alloy.createController(array[this.count]).getView("content");
        scrollview.remove(scrollview.children[0]);
        scrollview.add(win);
    } else {
        var modal = Alloy.createController("specifications").getView();
        modal.open({
            modal: true
        });
    }
};

Navigation.prototype.previousPage = function(scrollview, array, sling, current) {
    if (this.count > 0) {
        this.count--;
        var win = Alloy.createController(array[this.count]).getView("content");
        scrollview.remove(scrollview.children[0]);
        scrollview.add(win);
    } else this.slingCancel(current);
};

Navigation.prototype.slingCancel = function(current) {
    var returnToDash = Titanium.UI.createAlertDialog({
        title: "Return to Dashboard",
        message: "Are you sure you want to return to Dashboard? Doing so will delete your current Sling Configuration if it has not been saved.",
        buttonNames: [ "Yes", "No" ],
        cancel: 1
    });
    returnToDash.addEventListener("click", function(e) {
        if (e.cancel === e.index || true === e.cancel) return;
        if (0 === e.index) {
            var dash = Alloy.createController("dashboard").getView();
            dash.open();
            current.close();
        }
    });
    returnToDash.show();
};

Navigation.prototype.errorHandling = function(sling) {
    var progress = false;
    0 === this.count ? null === sling.type ? alert("Please chose a Sling Type.") : "Chain" === sling.type && null === sling.grade ? alert("Please chose a Grade of Chain.") : progress = true : 1 === this.count ? null === sling.legs ? alert("Please chose how many legs you would like your sling to have.") : progress = true : 2 === this.count ? null === sling.load ? alert("Please enter a weight.") : progress = true : 3 === this.count ? null === sling.nominalLength ? alert("Please enter a Nominal Length (Leg Length)") : progress = true : 4 === this.count && ("Chain" === sling.type ? null === sling.lowerTermination || null === sling.shorteningDevice ? alert("Please select your End Devices.") : progress = true : 1 === sling.legs ? null === sling.lowerTermination ? alert("Please select a Lower Termination.") : progress = true : null === sling.lowerTermination ? alert("Please select a Lower Termination.") : progress = true);
    return progress;
};

module.exports = Navigation;