/**
 * @author Craig Rodway
 */

var async = require("async");

// Base URL to where we will get images from
var baseUrl = 'http://whackett.hippocreative.com/img/';

// Which methods to call to handle downloads. Just slings for now but could be expaned in the future...
var methods = ["downloadSlings"];


function ImageSync(params) {
	this.database = params.database;
	this.db = this.database.openDb();
}


ImageSync.prototype.checkAndDownload = function() {
	
	Ti.API.info("ImageSync: checkAndDownload()");
	
	var self = this;
	
	_.each(methods, function(method) {
		self[method]();
	});
	
};


ImageSync.prototype.downloadSling = function(item, cb) {
	
	var xhr = null,
		self = this,
		dirName = item.dirName,
		img = item.img,
		db = null;
	
	xhr = Ti.Network.createHTTPClient({
		onload: function(e) {
			// Ti.API.info("SyncImage response");
			// Ti.API.info(this.status);
			// Ti.API.info(this.readyState);
			if (this.status === 200 || this.readyState === 4) {
				Ti.API.info("Saving to file " + this.localDir + this.localFile);
				
				// Save our response data (image) as a local file
				this.f.write(this.responseData);
				
				// Update the database to say that we have this file so that it isn't downloaded again.
				db = self.database.openDb();
				db.execute("UPDATE Slings SET img_status = ? WHERE img = ?", 1, img);
				db.close();
				
				// execute the callback to signal that we are done.
				// The lack of `err` key in the return object tells it we were successful.
				cb(item);
			}
		},
		onerror : function(e) {
			// Something went wrong (timeout, 404...)
			// Include an `err` item in the return object to tell it we were unsuccessful.
			cb({ err: e });
		},
		timeout: 3000
	});
	
	// Need to do our own URI encoding
	url = encodeURI(baseUrl + dirName + "/" + img + ".jpg");

	// Ti.API.info("Attempting to access " + url);
	
	xhr.localDir = Ti.Filesystem.applicationDataDirectory + dirName + "/";
	xhr.localFile = img + ".jpg";
	xhr.f = Ti.Filesystem.getFile(xhr.localDir + xhr.localFile);
	
	xhr.setAutoEncodeUrl(false);
	xhr.open("GET", url);
	xhr.send();	
};


ImageSync.prototype.downloadSlings = function() {
	
	// Get all slings from DB where img_status = 0;
	
	var self = this,
		dirName = 'slings',
		dirObj = null,
		db = null,
		rows = null,
		query = "SELECT img FROM Slings WHERE (img IS NOT NULL OR img != '') AND img_status = 0 ",
		rows = null,
		imgs = [],
		xhr = null,
		url = null,
		queue = null,
		process = null;
	
	dirObj = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, dirName);
	if ( ! dirObj.exists()) {
		dirObj.createDirectory();
	}
	
	db = this.database.openDb();
	rows = db.execute(query);
	
	while (rows.isValidRow()) {
		
		img = rows.fieldByName("img");
		
		// Check for valid image
		if (img !== "" && img !== "n/a") {
			// Add to an array of images we need to get
			imgs.push(rows.fieldByName("img"));	
		}
		
		rows.next();
	}
	
	rows.close();
	db.close();
	
	// Ensure we don't have duplicates in our image array - it would just cause us to download them multiple times.
	imgs = _.uniq(imgs);
	// Ti.API.info(imgs);
	
	if (imgs.length === 0) {
		// Ti.API.info("Image sync: No images to download.");
		return;
	}
	
	// This is the queue item processing function
	//  img: an image name from the Slings table
	//  cb: the queue callback function (we don't actually use it meaningfully in WHC)
	process = function(img, cb) {
		
		// Create a simple object which we pass to the download function
		var item = {
			img: img,
			dirName: dirName
		};
		
		// Call the downloadSling function with the item data - which will handle the XHR and local file writing
		self.downloadSling(item, function(res) {
			if ( ! res.err) {
				Ti.API.info("Download of " + img + " was successful.");
			} else {
				Ti.API.error("Download of " + img + " resulted in an error - " + res.err.error);
			}
			
			// When done, do the callback so that the queue manager knows it's completed
			cb(res.err);
		});
		
	};
	
	// Use a queue here to better handle the retrieval of potentially many images...
	// Just looping over the list of images could result in too many Network HTTP clients, which could result in request timeouts.
	// A queue is also better than a simple timer delay. The queu only advances when the XHR function completes, and we can control how many parallel queue tasks are executed at once.
	// See @http://www.clearlyinnovative.com/handling-multiple-file-downloads-appcelerator-titanium-async-js-2/
	
	// Create the new queue for our images downloading - use the `process` function for each item, and run 3 processes in parallel.
	imgQueue = async.queue(process, 3);
	
	// When the queue has finished processing... we don't need to do anything special.
	imgQueue.drain = function() {
	    Ti.API.info('Image sync queue: all items have been processed');
	};
	
	// Add our array of images to the queue - the `process` function will be called for each item in `imgs`.
	imgQueue.push(imgs);
	
};


// Create the module
module.exports = ImageSync;
