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
	connection = new Connection();

var loader = Ti.UI.createWindow({
		backgroundColor: '#021b4b'
	}),
	container = Ti.UI.createView({
		height: Ti.UI.SIZE,
		width: Ti.UI.SIZE,
		layout: 'vertical'	
	}),
	style;

if (Ti.Platform.name === 'iPhone OS') {
	style = Ti.UI.iPhone.ActivityIndicatorStyle.BIG;
} else {
	style = Ti.UI.ActivityIndicatorStyle.PLAIN;
}

var activityIndicator = Ti.UI.createActivityIndicator({
		top: '20dip',
		width: 'auto',
		height: 'auto',
		message: 'Loading...',
		color: '#FFF',
		style: style
	}),
	logo = Ti.UI.createImageView({
		width: '95%',
		height: 'auto',
		image: '/images/WHC--logo.png'
	});

activityIndicator.show();

container.add(logo);
container.add(activityIndicator);

loader.add(container);
loader.open();

// ====================================================================
// Include Connections file
// ====================================================================
Ti.include('js/globals/globals.js');

// Create all Tables
database.createTables();

var online = connection.onlineCheck(function(data) {
	var bool;

	if (data === 1) {
		bool = true;
	} else {
		bool = false;
	}
	return bool;
});

if (online) {
	
	// Online Mode

	Ti.API.info('online');

     // Check if App is being launched for first time
	if (common.firstStart(database)) {
		
		// If app is being launched for the first time
		// Download all of the neccessary data
		database.downloadData();
		
		var interval = setInterval(function(){
		
			if (database.databaseReady(8)) {
				
				Ti.API.info('Ready');
				
				var index = Alloy.createController('index').getView();
				index.open();
				
				loader.close();
				loader = null;
				
				clearInterval(interval);
				
				imageSync.checkAndDownload();
			}
			
		}, 500);

	} else {
		
		//Ti.API.info('Not First Start');
		// If this is not the first time logging in check versions and update accordingly
		
		database.updateTables();
		
		var interval = setInterval(function(){
			
			if (database.databaseUpdated()) {
				
				Ti.API.info('Ready (finished updating)');
				
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
				
				loader.close();
				loader = null;
				
				clearInterval(interval);
				imageSync.checkAndDownload();
				
			}
			
		}, 500);
		
	}

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
	
	loader.close();
	loader = null;
	
	alert('You are working in offline mode. Any quotes you receive are accurate since your last login. Prices may vary when you next come back online. Your quotes will be saved locally to your handset.');
	
}
 
 
