function setChainSize() {
    var db = ("limit" + Alloy.Globals.angle, Titanium.Database.open("SlingDB"));
    if ("Chain" === Alloy.Globals.sling) {
        if (80 == Alloy.Globals.grade) {
            if (45 == Alloy.Globals.angle || 0 == Alloy.Globals.angle) {
                var returnedRow = db.execute("SELECT * FROM WorkingLoadLimits WHERE grade = 80 AND legs = ? AND limit45 >= ?", Alloy.Globals.legs, Alloy.Globals.load);
                var lastNum = 1e4;
                while (returnedRow.isValidRow()) {
                    if (returnedRow.fieldByName("limit45") < lastNum) {
                        lastNum = returnedRow.fieldByName("limit45");
                        Alloy.Globals.chainSize = parseInt(returnedRow.fieldByName("size"));
                    }
                    returnedRow.next();
                }
            } else if (60 == Alloy.Globals.angle) {
                var returnedRow = db.execute("SELECT * FROM WorkingLoadLimits WHERE grade = 80 AND legs = ? AND limit60 >= ?", Alloy.Globals.legs, Alloy.Globals.load);
                var lastNum = 1e4;
                while (returnedRow.isValidRow()) {
                    if (returnedRow.fieldByName("limit60") < lastNum) {
                        lastNum = returnedRow.fieldByName("limit60");
                        Alloy.Globals.chainSize = parseInt(returnedRow.fieldByName("size"));
                    }
                    returnedRow.next();
                }
            }
        } else if (100 == Alloy.Globals.grade) if (45 == Alloy.Globals.angle || 0 == Alloy.Globals.angle) {
            var returnedRow = db.execute("SELECT * FROM WorkingLoadLimits WHERE grade = 100 AND legs = ? AND limit45 >= ?", Alloy.Globals.legs, Alloy.Globals.load);
            var lastNum = 1e4;
            while (returnedRow.isValidRow()) {
                if (returnedRow.fieldByName("limit45") < lastNum) {
                    lastNum = returnedRow.fieldByName("limit45");
                    Alloy.Globals.chainSize = parseInt(returnedRow.fieldByName("size"));
                }
                returnedRow.next();
            }
        } else if (60 == Alloy.Globals.angle) {
            var returnedRow = db.execute("SELECT * FROM WorkingLoadLimits WHERE grade = 100 AND legs = ? AND limit60 >= ?", Alloy.Globals.legs, Alloy.Globals.load);
            var lastNum = 1e4;
            while (returnedRow.isValidRow()) {
                if (returnedRow.fieldByName("limit60") < lastNum) {
                    lastNum = returnedRow.fieldByName("limit60");
                    Alloy.Globals.chainSize = parseInt(returnedRow.fieldByName("size"));
                }
                returnedRow.next();
            }
        }
    } else if ("Wire Rope" === Alloy.Globals.sling) if (45 == Alloy.Globals.angle || 0 == Alloy.Globals.angle) {
        var returnedRow = db.execute('SELECT * FROM WorkingLoadLimits WHERE type = "r" AND legs = ? AND limit45 >= ?', Alloy.Globals.legs, Alloy.Globals.load);
        var lastNum = 1e4;
        while (returnedRow.isValidRow()) {
            if (returnedRow.fieldByName("limit45") < lastNum) {
                lastNum = returnedRow.fieldByName("limit45");
                Alloy.Globals.ropeSize = parseInt(returnedRow.fieldByName("size"));
            }
            returnedRow.next();
        }
    } else if (60 == Alloy.Globals.angle) {
        var returnedRow = db.execute('SELECT * FROM WorkingLoadLimits WHERE type = "r" AND legs = ? AND limit60 >= ?', Alloy.Globals.legs, Alloy.Globals.load);
        var lastNum = 1e4;
        while (returnedRow.isValidRow()) {
            if (returnedRow.fieldByName("limit60") < lastNum) {
                lastNum = returnedRow.fieldByName("limit60");
                Alloy.Globals.ropeSize = parseInt(returnedRow.fieldByName("size"));
            }
            returnedRow.next();
        }
    }
}