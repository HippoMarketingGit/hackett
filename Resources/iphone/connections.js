function Connection() {}

Connection.prototype.onlineCheck = function(cb) {
    var xhr = Ti.Network.createHTTPClient({
        onload: function() {
            var response = JSON.parse(this.responseText);
            if (200 === this.status && 4 === this.readyState) {
                Ti.API.info("ready");
                cb && cb(response.online);
            }
        },
        onerror: function() {
            alert("There was an error connecting to the database");
        },
        timeout: 5e3
    });
    xhr.open("POST", "http://whackett.hippocreative.com/sync.php?task=onlineTest");
    xhr.send();
    return cb;
};

module.exports = Connection;