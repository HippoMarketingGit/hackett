// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

// ====================================================================
// Set up loading screen
// ====================================================================
var Common = require('common'),
	User = require('user'),
	Database = require('databaseObj'),
	ImageSync = require('imagesync'),
	Connection = require('connections'),
	common = new Common(),
	user = new User(),
	database = new Database('SlingDB.sqlite'),
	imageSync = new ImageSync({ database: database }),
	connection = new Connection(),
	actwin = require('activitywindow');


Alloy.Globals.callHandler = function(el) {
	el.text = "01665 604200";
	el.addEventListener("click", function() {
		// Ti.API.info("Clicking call");
		if (Ti.Platform.Android) {
			var intent = Ti.Android.createIntent({
		        action: Ti.Android.ACTION_DIAL,
		        data: 'tel:+441665604200'
		    });
		    Ti.Android.currentActivity.startActivity(intent);
		} else {
			Ti.Platform.openURL("tel:+441665604200");	
		}
	});
};


Ti.include('js/globals/globals.js');


var online = connection.onlineCheck(function(data) {
	return (data === 1 ? true : false);	
});


var loader = actwin.createIndicatorWindow({ message: "Starting up..." });
loader.openIndicator();


Ti.API.info("App path is " + Ti.Filesystem.applicationDirectory);


if (online) {
	
	// Online Mode
	
	Ti.API.info('online');

	database.updateTables();
	
	var interval = setInterval(function(){
		
		loader.setMessage("Updating database...");
		
		if (database.databaseUpdated()) {
			
			Ti.API.info('Ready (finished updating)');
			
			if (database.userIsLogged()) {
				Ti.API.info('A user is logged in');
				// Automatically gets the current user from database obj
				// If logged in, open the Dashboard
				var dash = Alloy.createController('dashboard').getView();
				dash.open();
			} else {
				Ti.API.info("No user is logged in.");
				var index = Alloy.createController('index').getView();
				index.open();
			}
			
			clearInterval(interval);
			loader.closeIndicator();
			imageSync.checkAndDownload();
			
		}
		
	}, 1000);	


} else {
	
	// Offline Mode
	Ti.API.info('offline');
     
	if (database.userIsLogged()) {
		Ti.API.info('A user is Logged In');
		// Automatically gets the current user from database obj
		// If logged in, open the Dashboard
		var dash = Alloy.createController('dashboard').getView();
		dash.open();
	} else {
		var index = Alloy.createController('index').getView();
		index.open();
	}
	
	loader.closeIndicator();
	
	alert('You are working in offline mode. Any quotes you receive are accurate since your last login. Prices may vary when you next come back online. Your quotes will be saved locally to your handset.');
	
}
 
 
