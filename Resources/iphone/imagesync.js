function ImageSync(params) {
    this.database = params.database;
    this.db = this.database.openDb();
}

var async = require("async");

var baseUrl = "http://whackett.hippocreative.com/img/";

var methods = [ "downloadSlings" ];

ImageSync.prototype.checkAndDownload = function() {
    Ti.API.info("ImageSync: checkAndDownload()");
    var self = this;
    _.each(methods, function(method) {
        self[method]();
    });
};

ImageSync.prototype.downloadSling = function(item, cb) {
    var xhr = null, self = this, dirName = item.dirName, img = item.img, db = null;
    xhr = Ti.Network.createHTTPClient({
        onload: function() {
            if (200 === this.status || 4 === this.readyState) {
                Ti.API.info("Saving to file " + this.localDir + this.localFile);
                this.f.write(this.responseData);
                db = self.database.openDb();
                db.execute("UPDATE Slings SET img_status = ? WHERE img = ?", 1, img);
                db.close();
                cb(item);
            }
        },
        onerror: function(e) {
            cb({
                err: e
            });
        },
        timeout: 3e3
    });
    url = encodeURI(baseUrl + dirName + "/" + img + ".jpg");
    xhr.localDir = Ti.Filesystem.applicationDataDirectory + dirName + "/";
    xhr.localFile = img + ".jpg";
    xhr.f = Ti.Filesystem.getFile(xhr.localDir + xhr.localFile);
    xhr.setAutoEncodeUrl(false);
    xhr.open("GET", url);
    xhr.send();
};

ImageSync.prototype.downloadSlings = function() {
    var self = this, dirName = "slings", dirObj = null, db = null, rows = null, query = "SELECT img FROM Slings WHERE (img IS NOT NULL OR img != '') AND img_status = 0 ", rows = null, imgs = [], process = null;
    dirObj = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, dirName);
    if (!dirObj.exists()) {
        Ti.API.info("Created image directory " + Ti.Filesystem.applicationDataDirectory + dirName);
        dirObj.createDirectory();
    }
    db = this.database.openDb();
    rows = db.execute(query);
    while (rows.isValidRow()) {
        img = rows.fieldByName("img");
        "" !== img && "n/a" !== img && "img" !== img && imgs.push(rows.fieldByName("img"));
        rows.next();
    }
    rows.close();
    db.close();
    imgs = _.uniq(imgs);
    Ti.API.info(imgs);
    if (0 === imgs.length) {
        Ti.API.info("Image sync: No images to download.");
        return;
    }
    process = function(img, cb) {
        var item = {
            img: img,
            dirName: dirName
        };
        self.downloadSling(item, function(res) {
            res.err ? Ti.API.error("Download of " + img + " resulted in an error - " + res.err.error) : Ti.API.info("Download of " + img + " was successful.");
            cb(res.err);
        });
    };
    imgQueue = async.queue(process, 3);
    imgQueue.drain = function() {
        Ti.API.info("Image sync queue: all items have been processed");
    };
    imgQueue.push(imgs);
};

module.exports = ImageSync;