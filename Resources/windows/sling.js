function Sling() {
    this.type = null;
    this.grade = null;
    this.legs = null;
    this.load = null;
    this.masterLink = null;
    this.angle = null;
    this.nominalLength = null;
    this.lowerTermination = null;
    this.lowerTerminationCode = null;
    this.upperTermination = null;
    this.upperTerminationCode = null;
    this.shorteningDevice = null;
    this.shorteningDeviceCode = null;
    this.partCode = null;
    this.quotedPrice = null;
    this.slingDescription = null;
    this.limitExceeded = false;
}

Sling.prototype.getPartCode = function(database) {
    var angle, shortener, end, self = this, db = database.openDb(), legLength = Math.ceil(self.nominalLength);
    if ("Chain" === self.type) {
        var shortener, end;
        if (8 === self.grade || 10 === self.grade) {
            var row = db.execute("SELECT * FROM WorkingLoadLimits AS wll, Slings AS s WHERE wll.limit" + self.angle + " >= " + self.load + ' AND wll.type="c" AND wll.legs = ' + self.legs + " AND s.legs=wll.legs AND (wll.grade = " + self.grade + ') AND (s.size=wll.size AND s.grade=wll.grade AND end = "' + self.lowerTerminationCode + '" AND s.shortener LIKE "' + self.shorteningDeviceCode + '" AND s.length = "' + legLength + '") group by wll.id ORDER BY ' + angle + " LIMIT 1");
            if (row.isValidRow()) {
                self.partCode = row.fieldByName("code");
                self.quotedPrice = row.fieldByName("price");
                self.slingDescription = row.fieldByName("description");
            } else createPartcode();
        } else if ("Auto" === self.grade) {
            var price8, code8, description8, price10, code10, description10, shortener, end;
            shortener = "" === self.shorteningDeviceCode ? "AND s.shortener IS NULL" : 'AND s.shortener LIKE "' + self.shorteningDeviceCode + '"';
            end = "" === self.lowerTerminationCode ? "AND s.end IS NULL" : 'AND s.end = "' + self.lowerTerminationCode + '"';
            var row8 = db.execute("SELECT * FROM WorkingLoadLimits AS wll, Slings AS s WHERE wll.limit" + self.angle + " >= " + self.load + ' AND wll.type="c" AND wll.legs = ' + self.legs + ' AND s.legs = wll.legs AND (wll.grade = "8" ) AND (s.size=wll.size AND s.grade=wll.grade ' + end + " " + shortener + " AND s.length = " + legLength + ") group by wll.id ORDER BY " + angle + " ASC");
            if (row8.isValidRow()) {
                price8 = row8.fieldByName("price");
                code8 = row8.fieldByName("code");
                description8 = row8.fieldByName("description");
            } else createPartcode();
            var row10 = db.execute("SELECT * FROM WorkingLoadLimits AS wll, Slings AS s WHERE wll.limit" + self.angle + " >= " + self.load + ' AND wll.type="c" AND wll.legs = ' + self.legs + ' AND s.legs=wll.legs AND (wll.grade = "10" ) AND (s.size=wll.size AND s.grade=wll.grade ' + end + " " + shortener + " AND s.length = " + legLength + ") group by wll.id ORDER BY " + angle + " ASC");
            if (row10.isValidRow()) {
                price10 = row10.fieldByName("price");
                code10 = row10.fieldByName("code");
                description10 = row10.fieldByName("description");
            } else createPartcode();
            if (void 0 !== price8 && null !== price8 || void 0 !== price10 && null !== price10) {
                if (void 0 === price10 || null === price10) {
                    self.partCode = code8;
                    self.quotedPrice = price8;
                    self.slingDescription = description8;
                } else if (void 0 === price8 || null === price8) {
                    self.partCode = code10;
                    self.quotedPrice = price10;
                    self.slingDescription = description10;
                } else if (parseInt(price8) < parseInt(price10)) {
                    self.partCode = code8;
                    self.quotedPrice = price8;
                    self.slingDescription = description8;
                    self.gradeCode = 8;
                } else if (parseInt(price8) > parseInt(price10)) {
                    self.partCode = code10;
                    self.quotedPrice = price10;
                    self.slingDescription = description10;
                    self.gradeCode = 10;
                } else if (parseInt(price8) === parseInt(price10)) {
                    self.partCode = code10;
                    self.quotedPrice = price10;
                    self.slingDescription = description10;
                    self.gradeCode = 10;
                }
            } else {
                self.quotedPrice = null;
                self.slingDescription = null;
            }
        }
    } else if ("Wire Rope" === self.type) {
        self.grade = null;
        self.quotedPrice = null;
        self.slingDescription = null;
        createPartcode();
        cb && cb(self);
    }
    cb() && cb(self);
    database.closeDb(db);
};

Sling.prototype.checkLimit = function() {
    var angle, self = this, proceed = false, limits = {
        4: {
            grade8: {
                45: 45,
                60: 31.5
            },
            grade10: {
                45: 40,
                60: 28
            }
        },
        3: {
            grade8: {
                fortyFive: 67,
                sixty: 47.5
            },
            grade10: {
                fortyFive: 40,
                sixty: 28
            }
        },
        2: {
            grade8: {
                fortyFive: 45,
                sixty: 31.5
            },
            grade10: {
                fortyFive: 26.5,
                sixty: 19
            }
        },
        1: {
            grade8: {
                fortyFive: 31.5,
                sixty: 31.5
            },
            grade10: {
                fortyFive: 19,
                sixty: 19
            }
        }
    };
    45 === this.angle ? angle = "fortyFive" : 60 === this.angle && (angle = "sixty");
    for (legs in limits) {
        var legObj = limits[legs];
        if (legs === self.legs.toString()) for (x in legObj) {
            var obj = legObj[x];
            if ("grade" + self.grade === x) {
                var limit = obj[self.angle];
                Ti.API.info("limit: " + limit);
                Ti.API.info("load: " + parseFloat(self.load));
                if (parseFloat(self.load) > limit) {
                    Ti.API.info("false");
                    proceed = false;
                } else {
                    Ti.API.info("true");
                    proceed = true;
                }
            }
        }
    }
    return proceed;
};

module.exports = Sling;