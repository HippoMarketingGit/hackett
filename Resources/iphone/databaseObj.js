function Database(dbName) {
    this.dbName = dbName;
    this.ready = 0;
}

Database.prototype.databaseReady = function(count) {
    if (this.ready === count) return true;
};

Database.prototype.openDb = function() {
    return Ti.Database.open(this.dbName);
};

Database.prototype.closeDb = function(db) {
    db.close();
    db = null;
};

Database.prototype.downloadData = function() {
    this.getWorkingLoadLimits();
    this.getSlings();
    this.getShorteners();
    this.getEndFittings();
    this.getChainTypes();
    this.getBoms();
    this.getComponents();
    this.getVersions();
};

Database.prototype.userIsLogged = function() {
    var loggedIn, db = this.openDb(), userRow = db.execute('SELECT * FROM UserProfile WHERE loggedIn = "1" ');
    loggedIn = userRow.isValidRow() ? true : false;
    this.closeDb(db);
    return loggedIn;
};

Database.prototype.getCurrentUser = function() {
    var result, db = this.openDb(), userRow = db.execute('SELECT * FROM UserProfile WHERE loggedIn = "1" ');
    result = userRow.isValidRow() ? userRow.fieldByName("email") : null;
    this.closeDb(db);
    Ti.API.info("Current User connection closed!");
    return result;
};

Database.prototype.getCurrentUserDetails = function() {
    var result, db = this.openDb(), userRow = db.execute('SELECT UserProfile.*, count(Quotes.id) AS quotes FROM UserProfile LEFT JOIN Quotes ON email = user WHERE loggedIn = "1" ');
    result = userRow.isValidRow() ? {
        email: userRow.fieldByName("email"),
        id: userRow.fieldByName("id"),
        name: userRow.fieldByName("name"),
        company: userRow.fieldByName("company"),
        phone: userRow.fieldByName("phone"),
        id: userRow.fieldByName("userId"),
        quotes: userRow.fieldByName("quotes")
    } : null;
    this.closeDb(db);
    Ti.API.info("Current User connection closed!");
    return result;
};

Database.prototype.registerUser = function(name, companyName, phoneNumber, emailAddress, password, mailingList) {
    var xhr = Titanium.Network.createHTTPClient(), params = {
        name: name,
        company: companyName,
        phone: phoneNumber,
        email: emailAddress,
        password: password,
        optIn: mailingList
    };
    xhr.open("POST", "http://whackett.hippocreative.com/sync.php?task=pushUser");
    xhr.onload = function() {
        var response = JSON.parse(this.responseText);
        return 1 === response.reply ? true : false;
    };
    xhr.onerror = function() {
        return "Error connecting to the database";
    };
    xhr.send(params);
};

Database.prototype.logout = function(cb) {
    var self = this, user = this.getCurrentUser(), db = this.openDb(), lengthKnown = Titanium.UI.createAlertDialog({
        title: "Log Out",
        message: "Are you sure you want to log out?",
        buttonNames: [ "Yes", "No" ],
        cancel: 1
    });
    lengthKnown.addEventListener("click", function(e) {
        if (0 === e.index) {
            Ti.API.info("Log out");
            db.execute('UPDATE UserProfile set loggedIn = "0" WHERE email = "' + user + '"');
            self.closeDb(db);
            cb && cb();
        } else if (e.cancel === e.index || true === e.cancel) {
            Ti.API.info("Don't Log out");
            return;
        }
    });
    lengthKnown.show();
};

Database.prototype.updateUserDetails = function(user, name, company, phone, email, optIn, password) {
    var xhr = Ti.Network.createHTTPClient(), currentEmail = this.getCurrentUser(), params = {
        user: currentEmail,
        name: name,
        company: company,
        phone: phone,
        email: email,
        optIn: optIn
    }, that = this;
    "" !== password && (params.password = password);
    xhr.open("POST", "http://whackett.hippocreative.com/sync.php?task=updateUser");
    xhr.onload = function() {
        var response = JSON.parse(this.responseText);
        Ti.API.info(response);
        if (1 !== response.reply) alert("The email address you have entered is already in use. Please chose another and try again."); else {
            var db = that.openDb();
            db.execute('UPDATE UserProfile set email = ?, name = ?, company = ?, phone = ?, optIn = ? WHERE email = "' + currentEmail + '"', email, name, company, phone, optIn);
            that.closeDb(db);
            alert("Your details have been updated successfully");
        }
    };
    xhr.onerror = function() {
        alert("There was a problem connecting to the database, please try again");
    };
    xhr.timeout = 6e4;
    xhr.send(params);
};

Database.prototype.logIn = function(email, password, cb) {
    var xhr = Titanium.Network.createHTTPClient(), that = this;
    if ("" != email && "" != password) {
        xhr.open("POST", "http://whackett.hippocreative.com/sync.php?task=login");
        var params = {
            email: email,
            password: password
        };
        xhr.onload = function() {
            var response = JSON.parse(this.responseText);
            if (1 === response.reply) {
                var exists, db = that.openDb(), row = db.execute("SELECT * FROM UserProfile WHERE email = ?", email);
                exists = row.isValidRow() ? true : false;
                exists ? db.execute('UPDATE UserProfile SET loggedIn = "1" WHERE email = ?', email) : db.execute("INSERT INTO UserProfile(email, name, company, phone, optIn, userId, loggedIn) VALUES (?, ?, ?, ?, ?, ?, ?)", email, response.name, response.company, response.phone, response.optIn, response.id, "1");
                that.closeDb(db);
                that.downloadQuotes();
                cb && cb("success");
            } else {
                cb && cb("error");
                alert("The details you have entered are incorrect.");
            }
        };
        xhr.onerror = function() {
            cb && cb("error");
            alert("There was an error connecting to the database, please try again.");
        };
        xhr.send(params);
    } else {
        cb && cb("error");
        alert("Please enter a username or password.");
    }
};

Database.prototype.createTables = function() {
    var db = this.openDb();
    db.execute("CREATE TABLE IF NOT EXISTS VersionCheck(id INTEGER PRIMARY KEY, category TEXT, version INTEGER);");
    db.execute("CREATE TABLE IF NOT EXISTS ChainType(id INTEGER PRIMARY KEY, code TEXT, name TEXT);");
    db.execute("CREATE TABLE IF NOT EXISTS EndFittings(id INTEGER PRIMARY KEY, code TEXT, name TEXT, type TEXT, grade10 TEXT, grade8_1 INTEGER, grade8_2 INTEGER, grade8_3 INTEGER, grade8_4 INTEGER, grade10_1 INTEGER, grade10_2 INTEGER, grade10_3 INTEGER, grade10_4 INTEGER);");
    db.execute("CREATE TABLE IF NOT EXISTS Shorteners(id INTEGER PRIMARY KEY, code TEXT, name TEXT, grade8_1 INTEGER, grade8_2 INTEGER, grade8_3 INTEGER, grade8_4 INTEGER, grade10_1 INTEGER, grade10_2 INTEGER, grade10_3 INTEGER, grade10_4 INTEGER);");
    db.execute("CREATE TABLE IF NOT EXISTS Slings(id INTEGER PRIMARY KEY, code TEXT, description TEXT, price TEXT, grade INTEGER, size INTEGER, legs INTEGER, length INTEGER, end INTEGER, end_b INTEGER, shortener TEXT, img TEXT, img_status INTEGER, bom TEXT);");
    db.execute("CREATE TABLE IF NOT EXISTS WorkingLoadLimits(id INTEGER PRIMARY KEY, size INTEGER, grade INTEGER, legs INTEGER, limit45 INTEGER, limit60 INTEGER, type TEXT);");
    db.execute("CREATE TABLE IF NOT EXISTS LoggedIn(id INTEGER PRIMARY KEY, value INTEGER);");
    db.execute("CREATE TABLE IF NOT EXISTS UserProfile(id INTEGER PRIMARY KEY, email TEXT, name TEXT, company TEXT, phone TEXT, optIn INTEGER, userId INTEGER, loggedIn INTEGER);");
    db.execute("CREATE TABLE IF NOT EXISTS Quotes(id INTEGER PRIMARY KEY, type TEXT, Grade INTEGER, legs INTEGER, load TEXT, length TEXT, partCode TEXT, price TEXT, description TEXT, date TEXT, synced INTEGER, ref TEXT, user TEXT);");
    db.execute("CREATE TABLE IF NOT EXISTS Boms(id INTEGER PRIMARY KEY, sling_code TEXT, comp_code TEXT, qty TEXT);");
    db.execute("CREATE TABLE IF NOT EXISTS Components(id INTEGER PRIMARY KEY, Code TEXT, description TEXT, measure TEXT);");
    this.closeDb(db);
};

Database.prototype.deleteQuote = function(online, ref, cb) {
    if (online) {
        var db = this.openDb(), that = this, params = {
            ref: ref
        }, xhr = Ti.Network.createHTTPClient();
        xhr.open("POST", "http://whackett.hippocreative.com/sync.php?task=deleteQuote");
        xhr.onload = function() {
            var json = JSON.parse(this.responseText);
            Ti.API.info(json.reply);
            if (1 !== json.reply) alert("There was a problem connecting to the database, please try again."); else {
                db.execute('DELETE FROM Quotes WHERE ref = "' + ref + '" LIMIT 1');
                that.closeDb(db);
                cb && cb();
            }
        };
        xhr.onerror = function() {
            alert("There was a problem connecting to the database, please try again.");
        };
        xhr.timeout = 6e4;
        xhr.send(params);
    }
};

Database.prototype.pushQuotes = function(currentUser) {
    var db = this.openDb(), row = db.execute('SELECT * FROM Quotes WHERE sync = "0" and user = "' + currentUser + '"');
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
            synced: row.fieldByName("synced"),
            ref: row.fieldByName("ref"),
            user: row.fieldByName("user")
        };
        var xhr = Ti.Network.createHTTPClient({
            onload: function() {
                JSON.parse(this.responseText);
            },
            onerror: function() {
                alert("There was a problem connection to the database");
            },
            timeout: 6e4
        });
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(obj);
        row.next();
    }
};

Database.prototype.insertQuoteOffline = function(data) {
    var db = this.openDb();
    db.execute("INSERT INTO Quotes (type, Grade, legs, load, length, partCode, price, description, date, synced, ref, user) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", data.type, data.grade, data.legs, data.load, data.length, data.partCode, data.price, data.description, data.date, "0", data.ref, data.user);
    this.closeDb(db);
};

Database.prototype.insertQuoteOnline = function(data) {
    var xhr = Ti.Network.createHTTPClient(), params = {
        type: data.type,
        grade: data.grade,
        legs: data.legs,
        load: data.load,
        length: data.length,
        partcode: data.partCode,
        price: data.price,
        description: data.description,
        date: data.date,
        ref: data.ref,
        user: data.user,
        addtodb: data.addtodb,
        sync: 1
    };
    xhr.open("POST", "http://whackett.hippocreative.com/sync.php?task=pushQuote");
    xhr.onload = function() {
        var response = JSON.parse(this.responseText);
        if (1 !== data.addtodb) {
            alert("Your quote was sent successfully.");
            return;
        }
        alert(1 !== response.reply ? "Your quote failed to send, please try again." : "Your quote was sent successfully.");
    };
    xhr.onerror = function() {
        alert("There was an error connecting to the database, please try again.");
    };
    xhr.send(params);
};

Database.prototype.downloadQuotes = function() {
    var i, xhr = Ti.Network.createHTTPClient(), params = {
        user: this.getCurrentUser()
    }, that = this;
    xhr.open("POST", "http://whackett.hippocreative.com/sync.php?task=pullQuotes");
    xhr.onload = function() {
        var response = JSON.parse(this.responseText), db = that.openDb(), user = that.getCurrentUser();
        Ti.API.info("Quotes: " + response);
        if (null !== response) for (i = 0; i < response.reply.length; i++) {
            var obj = response.reply[i];
            Ti.API.info(obj);
            db.execute("INSERT INTO Quotes(type, Grade, legs, load, length, partCode, price, description, date, synced, ref, user) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", obj.type, obj.grade, obj.legs, obj.load, obj.length, obj.partcode, obj.price, obj.description, obj.date, "1", obj.ref, user);
        }
        that.closeDb(db);
    };
    xhr.onerror = function() {
        Ti.API.info("Problem connecting to database");
    };
    xhr.send(params);
};

Database.prototype.getWorkingLoadLimits = function() {
    var workingLoadLimitsURL = "http://whackett.hippocreative.com/sync.php?task=getWorkingLoadLimits", that = this, firstRunLoadLimits = Ti.Network.createHTTPClient({
        onload: function() {
            var i, responseArray = JSON.parse(this.responseText), db = that.openDb();
            for (i = 0; i < responseArray.reply.length; i++) {
                var json = responseArray.reply[i];
                db.execute("INSERT INTO WorkingLoadLimits(size, grade, legs, limit45, limit60, type) VALUES (?, ?, ?, ?, ?, ?)", json.size, json.grade, json.legs, json.limit45, json.limit60, json.type);
            }
            that.ready++;
            responseArray = null;
            i = null;
            that.closeDb(db);
        },
        onerror: function() {
            alert("problem connecting to the Working Load Limits Database");
        },
        timeout: 6e4
    });
    firstRunLoadLimits.open("GET", workingLoadLimitsURL);
    firstRunLoadLimits.send();
};

Database.prototype.getSlings = function() {
    var slingsURL = "http://whackett.hippocreative.com/sync.php?task=getSlings", that = this, firstRunSlings = Ti.Network.createHTTPClient({
        onload: function() {
            var i, responseArray = JSON.parse(this.responseText), db = that.openDb();
            for (i = 0; i < responseArray.reply.length; i++) {
                var json = responseArray.reply[i];
                db.execute("INSERT INTO Slings(code, description, price, grade, size, legs, length, end, end_b, shortener, img, img_status, bom) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", json.code, json.description, padIntRight(json.price), json.grade, json.size, json.legs, json.length, json.end, json.end_b, json.shortener, json.img, 0, json.bom);
            }
            that.ready++;
            responseArray = null;
            i = null;
            that.closeDb(db);
        },
        onerror: function() {
            alert("problem connecting to the Slings Database");
        },
        timeout: 6e4
    });
    firstRunSlings.open("GET", slingsURL);
    firstRunSlings.send();
};

Database.prototype.getShorteners = function() {
    var shorteningsURL = "http://whackett.hippocreative.com/sync.php?task=getShorteners", that = this, firstRunShorteners = Ti.Network.createHTTPClient({
        onload: function() {
            var i, responseArray = JSON.parse(this.responseText), db = that.openDb();
            for (i = 0; i < responseArray.reply.length; i++) {
                var json = responseArray.reply[i];
                db.execute("INSERT INTO Shorteners(code, name, grade8_1, grade8_2, grade8_3, grade8_4, grade10_1, grade10_2, grade10_3, grade10_4) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", json.code, json.name, json.grade8_1, json.grade8_2, json.grade8_3, json.grade8_4, json.grade10_1, json.grade10_2, json.grade10_3, json.grade10_4);
            }
            that.ready++;
            that.closeDb(db);
            responseArray = null;
            i = null;
        },
        onerror: function() {
            alert("problem connecting to the Shorteners Database");
        },
        timeout: 6e4
    });
    firstRunShorteners.open("GET", shorteningsURL);
    firstRunShorteners.send();
};

Database.prototype.getEndFittings = function() {
    var endFittingsURL = "http://whackett.hippocreative.com/sync.php?task=getEndFittings", that = this, firstRunEndFittings = Ti.Network.createHTTPClient({
        onload: function() {
            var i, responseArray = JSON.parse(this.responseText), db = that.openDb();
            for (i = 0; i < responseArray.reply.length; i++) {
                var json = responseArray.reply[i];
                Ti.API.info(json.code);
                db.execute("INSERT INTO EndFittings(code, name, type, grade10, grade8_1, grade8_2, grade8_3, grade8_4, grade10_1, grade10_2, grade10_3, grade10_4) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", json.code, json.name, json.type, json.grade10, json.grade8_1, json.grade8_2, json.grade8_3, json.grade8_4, json.grade10_1, json.grade10_2, json.grade10_3, json.grade10_4);
            }
            that.ready++;
            that.closeDb(db);
            responseArray = null;
            i = null;
        },
        onerror: function() {
            alert("problem connecting to the End Fittings Database");
        },
        timeout: 6e4
    });
    firstRunEndFittings.open("GET", endFittingsURL);
    firstRunEndFittings.send();
};

Database.prototype.getChainTypes = function() {
    var chainTypeURL = "http://whackett.hippocreative.com/sync.php?task=getChainType", that = this, firstRunChainType = Ti.Network.createHTTPClient({
        onload: function() {
            var i, responseArray = JSON.parse(this.responseText), db = that.openDb();
            for (i = 0; i < responseArray.reply.length; i++) {
                var json = responseArray.reply[i];
                db.execute("INSERT INTO ChainType(code, name) VALUES (?, ?)", json.code, json.name);
            }
            that.ready++;
            that.closeDb(db);
            responseArray = null;
            i = null;
        },
        onerror: function() {
            alert("problem connecting to the Chain types Database");
        },
        timeout: 6e4
    });
    firstRunChainType.open("GET", chainTypeURL);
    firstRunChainType.send();
};

Database.prototype.getBoms = function() {
    var bomUrl = "http://whackett.hippocreative.com/sync.php?task=getBoms", that = this, xhr = Ti.Network.createHTTPClient({
        onload: function() {
            var i, responseArray = JSON.parse(this.responseText), db = that.openDb();
            for (i = 0; i < responseArray.reply.length; i++) {
                var json = responseArray.reply[i];
                db.execute("INSERT INTO Boms(sling_code, comp_code, qty) VALUES (?, ?, ?)", json.sling_code, json.comp_code, json.qty);
            }
            that.ready++;
            that.closeDb(db);
            responseArray = null;
            i = null;
        },
        onerror: function() {
            alert("problem connecting to the Chain types Database");
        },
        timeout: 6e4
    });
    xhr.open("GET", bomUrl);
    xhr.send();
};

Database.prototype.getComponents = function() {
    var componentsUrl = "http://whackett.hippocreative.com/sync.php?task=getComponents", that = this, xhr = Ti.Network.createHTTPClient({
        onload: function() {
            var i, responseArray = JSON.parse(this.responseText), db = that.openDb();
            for (i = 0; i < responseArray.reply.length; i++) {
                var json = responseArray.reply[i];
                db.execute("INSERT INTO Components(code, description, measure) VALUES (?, ?, ?)", json.code, json.description, json.measure);
            }
            that.ready++;
            that.closeDb(db);
            responseArray = null;
            i = null;
        },
        onerror: function() {
            alert("problem connecting to the Chain types Database");
        },
        timeout: 6e4
    });
    xhr.open("GET", componentsUrl);
    xhr.send();
};

Database.prototype.getVersions = function() {
    var versionURL = "http://whackett.hippocreative.com/sync.php?task=versionCheck", that = this, firstRun = Ti.Network.createHTTPClient({
        onload: function() {
            var json = JSON.parse(this.responseText), db = that.openDb();
            Ti.API.info(json);
            for (key in json) json.hasOwnProperty(key) && db.execute("INSERT INTO VersionCheck (category, version) VALUES (?, ?)", key, json[key]);
            that.ready++;
            that.closeDb(db);
            responseArray = null;
            i = null;
        },
        onerror: function() {
            alert("problem connecting to the Versions Database");
        },
        timeout: 6e4
    });
    firstRun.open("GET", versionURL);
    firstRun.send();
};

Database.prototype.findBomDetails = function(partcode) {
    var db = this.openDb();
    db.execute('SELECT * FROM Components AS c, Boms AS b WHERE b.sling_code = "' + partcode + '" AND b.comp_code = c.code');
};

Database.prototype.emptyTable = function(tableName) {
    var db = this.openDb();
    db.execute("DELETE FROM " + tableName);
    this.closeDb(db);
};

Database.prototype.updateVersions = function(category, value) {
    var db = this.openDb();
    db.execute("UPDATE VersionCheck SET version = ? WHERE category = ?", value, category);
    this.closeDb(db);
};

Database.prototype.updateTables = function() {
    var versionURL = "http://whackett.hippocreative.com/sync.php?task=versionCheck", self = this, update = Ti.Network.createHTTPClient({
        onload: function() {
            var response = JSON.parse(this.responseText), db = self.openDb(), row = db.execute("SELECT * FROM VersionCheck"), versionObj = {};
            while (row.isValidRow()) {
                var category = row.fieldByName("category"), value = row.fieldByName("version");
                versionObj[category] = value;
                row.next();
            }
            for (versionKey in versionObj) {
                var dbValue = versionObj[versionKey], dbCat = versionKey;
                for (key in response) {
                    var jsonVal = response[key], jsonCat = key;
                    if (dbCat === jsonCat && dbValue != jsonVal) switch (dbCat) {
                      case "chain_type":
                        self.emptyTable("ChainType");
                        self.getChainTypes();
                        self.updateVersions(dbCat, jsonVal);
                        break;

                      case "end_fittings":
                        self.emptyTable("EndFittings");
                        self.getEndFittings();
                        self.updateVersions(dbCat, jsonVal);
                        break;

                      case "shorteners":
                        self.emptyTable("Shorteners");
                        self.getShorteners();
                        self.updateVersions(dbCat, jsonVal);
                        break;

                      case "slings":
                        self.emptyTable("Slings");
                        self.getSlings();
                        self.updateVersions(dbCat, jsonVal);
                        break;

                      case "working_load_limit":
                        self.emptyTable("WorkingLoadLimits");
                        self.getWorkingLoadLimits();
                        self.updateVersions(dbCat, jsonVal);
                        break;

                      case "boms":
                        self.emptyTable("Boms");
                        self.getBoms();
                        self.updateVersions(dbCat, jsonVal);
                        break;

                      case "components":
                        self.emptyTable("Components");
                        self.getComponents();
                        self.updateVersions(dbCat, jsonVal);
                    }
                }
            }
            self.closeDb(db);
        }
    });
    update.open("GET", versionURL);
    update.send();
};

module.exports = Database;