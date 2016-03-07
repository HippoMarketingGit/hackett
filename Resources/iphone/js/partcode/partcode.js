function generatePartcode() {
    var db = Titanium.Database.open("SlingDB");
    var angle, grade, shortener, end, upper, legLength = Math.ceil(Alloy.Globals.nominalLength);
    angle = 45 === Alloy.Globals.angle ? "wll.limit45" : "wll.limit60";
    shortener = "NONE" === Alloy.Globals.shorteningCode ? "AND shortener IS NULL" : 'AND shortener = "' + Alloy.Globals.shorteningCode + '"';
    end = "NONE" === Alloy.Globals.lowerTermCode ? "AND end IS NULL" : 'AND end = "' + Alloy.Globals.lowerTermCode + '"';
    upper = "NONE" === Alloy.Globals.lowerTermCode ? "AND end IS NULL" : 'AND end = "' + Alloy.Globals.lowerTermCode + '"';
    if ("Chain" === Alloy.Globals.sling) {
        if (80 === Alloy.Globals.grade || 100 === Alloy.Globals.grade) {
            grade = Alloy.Globals.grade;
            var row = db.execute("SELECT * FROM WorkingLoadLimits AS wll, Slings AS s WHERE " + angle + " >= " + Alloy.Globals.load + ' AND wll.type="c" AND wll.legs = ' + Alloy.Globals.legs + " AND s.legs=wll.legs AND (wll.grade = " + grade + ") AND (s.size=wll.size AND s.grade=wll.grade " + end + " " + shortener + " AND s.length >= " + legLength + ") group by wll.id ORDER BY " + angle + " LIMIT 1");
            if (row.isValidRow()) {
                Alloy.Globals.partCode = row.fieldByName("code");
                Alloy.Globals.quotedPrice = "£" + row.fieldByName("price");
                Alloy.Globals.slingDescription = row.fieldByName("description");
            } else createPartcode();
        } else if ("Auto" === Alloy.Globals.grade) {
            alert("Auto");
            var price80, code80, description80, price100, code100, description100;
            var row80 = db.execute("SELECT * FROM WorkingLoadLimits AS wll, Slings AS s WHERE " + angle + " >= " + Alloy.Globals.load + ' AND wll.type="c" AND wll.legs = ' + Alloy.Globals.legs + ' AND s.legs=wll.legs AND (wll.grade = "80" ) AND (s.size=wll.size AND s.grade=wll.grade ' + end + " " + shortener + " AND s.length >= " + legLength + ") group by wll.id ORDER BY " + angle + " LIMIT 1");
            if (row80.isValidRow()) {
                alert("row 80");
                price80 = row80.fieldByName("price");
                code80 = row80.fieldByName("code");
                description80 = row80.fieldByName("description");
            } else createPartcode();
            var row100 = db.execute("SELECT * FROM WorkingLoadLimits AS wll, Slings AS s WHERE " + angle + " >= " + Alloy.Globals.load + ' AND wll.type="c" AND wll.legs = ' + Alloy.Globals.legs + ' AND s.legs=wll.legs AND (wll.grade = "100" ) AND (s.size=wll.size AND s.grade=wll.grade ' + end + " " + shortener + " AND s.length >= " + legLength + ") group by wll.id ORDER BY " + angle + " LIMIT 1");
            if (row100.isValidRow()) {
                alert("row 100");
                price100 = row100.fieldByName("price");
                code100 = row100.fieldByName("code");
                description100 = row100.fieldByName("description");
            } else createPartcode();
            if (void 0 === price100 || null === price100) {
                Alloy.Globals.partCode = code80;
                Alloy.Globals.quotedPrice = "£" + price80;
                Alloy.Globals.slingDescription = description80;
            } else if (void 0 === price100 || null === price100) {
                Alloy.Globals.partCode = code100;
                Alloy.Globals.quotedPrice = "£" + price100;
                Alloy.Globals.slingDescription = description100;
            } else if (parseInt(price80) <= parseInt(price100)) {
                Alloy.Globals.partCode = code80;
                Alloy.Globals.quotedPrice = "£" + price80;
                Alloy.Globals.slingDescription = description80;
                Alloy.Globals.gradeCode = 80;
            } else {
                Alloy.Globals.partCode = code100;
                Alloy.Globals.quotedPrice = "£" + price100;
                Alloy.Globals.slingDescription = description100;
                Alloy.Globals.gradeCode = 100;
            }
        }
    } else "Wire Rope" === Alloy.Globals.sling && createPartcode();
    db.close();
}

function createPartcode() {
    var gradeCode, limit, type, slingSize, db = Titanium.Database.open("SlingDB"), legLength = Math.ceil(parseFloat(Alloy.Globals.nominalLength));
    gradeCode = 80 === Alloy.Globals.grade ? "A" : "X";
    limit = 45 === Alloy.Globals.angle ? "limit45" : "limit60";
    "NONE" === Alloy.Globals.shorteningCode && (Alloy.Globals.shorteningCode = 0);
    "NONE" === Alloy.Globals.lowerTermCode && (Alloy.Globals.lowerTermCode = 0);
    "NONE" === Alloy.Globals.upperTermCode && (Alloy.Globals.upperTermCode = 0);
    type = "Chain" === Alloy.Globals.sling ? "c" : "r";
    if ("Auto" != Alloy.Globals.grade) {
        var newRow = db.execute('SELECT * FROM WorkingLoadLimits WHERE legs = "' + Alloy.Globals.legs + '" AND grade = "' + Alloy.Globals.grade + '" AND ' + limit + " >= " + Alloy.Globals.load + ' AND type = "' + type + '" ORDER BY ' + limit + " ASC LIMIT 1");
        if (newRow.isValidRow()) {
            slingSize = newRow.fieldByName("size");
            alert("sling size: " + slingSize);
        }
    } else alert("Cannot configure chain");
    slingSize = 10 > slingSize ? "0" + slingSize.toString() : slingSize.toString();
    legLength = 10 > legLength ? "0" + legLength.toString() : legLength.toString();
    Alloy.Globals.partCode = "Chain" === Alloy.Globals.sling ? gradeCode + slingSize + "." + Alloy.Globals.legs + legLength + "." + Alloy.Globals.lowerTermCode + Alloy.Globals.shorteningCode : 1 === Alloy.Globals.legs ? "NONE" === Alloy.Globals.upperTermCode ? "RS0" + slingSize + "." + Alloy.Globals.legs + legLength + "." + Alloy.Globals.lowerTermCode : "RS0" + slingSize + "." + Alloy.Globals.legs + legLength + "." + Alloy.Globals.lowerTermCode + Alloy.Globals.upperTermCode : "RS0" + slingSize + "." + Alloy.Globals.legs + legLength + "." + Alloy.Globals.lowerTermCode;
    db.close();
    return Alloy.Globals.partCode;
}