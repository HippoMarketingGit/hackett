/**
 * @author Ben Hall
 */

function Common(){};

Common.prototype.getDate = function(){
	
	var d = new Date();
				
	return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
};


// Generate a quote reference.
Common.prototype.generateQuoteRef = function(user) {
	
	var company = null,
		personal = null,
		id = null,
		ref = null;
	
	company = user["company"].substring(0, 1);
	personal = user["name"].substring(0, 2);
	id = user["id"];
	count = parseInt(user['quotes'], 10) + 1;
	
	ref = [company + personal + id, count].join("-").toUpperCase();
	
	return ref;
};


Common.prototype.createUnix = function(){
	return Math.round(new Date().getTime() / 1000);
};


Common.prototype.firstStart = function(database){
	
	var db = database.openDb(),
		row = db.execute('SELECT * FROM VersionCheck'),
		start;

	if( row.isValidRow() ){
		Ti.API.info('Not First Start');
		start = false;
	}else{
		Ti.API.info('First Start');
		start = true;
	}
	
	database.closeDb(db);
	return start;
};

Common.prototype.openApp = function(user){

	var Database = require('databaseObj'),
		database = new Database('SlingDB'),
		db = database.openDb(),
		logCheck = db.execute('SELECT * FROM UserProfile WHERE loggedIn = "1"');
	
	// check if user is logged in
	if( logCheck.isValidRow() ){
		
		var val = logCheck.fieldByName('loggedIn');
		
		// If they are logged in, go to dashboard
		if( val === 1){
			
			var dash = Alloy.createController('dashboard').getView();
				dash.open();
				
				database.closeDb(db);
				
		// Else ask them to log in 
		}else{
			
			var index = Alloy.createController('index').getView();		
				index.open();
				
				database.closeDb(db);
		}
		
	}else{
		
		var index = Alloy.createController('index').getView();
			index.open();
		
		database.closeDb(db);
	}
};

Common.prototype.padIntRight = function(num){
	var str = num.toString(),
        strArray = str.split(".");

    if (str === '' || strArray.length === 1) {
    	return '';
    }
    
    if( strArray[1].length < 2){
        
        strArray[1] += '0';   
    }

    return strArray[0] + '.' + strArray[1];
};

module.exports = Common;