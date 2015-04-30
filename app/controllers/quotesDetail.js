var args = arguments[0] || {};

(function(){
	
	$.ref.text = args.ref;
	$.slingType.text = args.type;
	$.grade.text = args.grade;
	$.legs.text = args.legs;
	$.load.text = args.load;
	$.length.text = args.length;
	$.description.text = args.description;
	$.specPartcode.text = 'Part code: ' + args.partCode;
	
	if( args.price !== null ){
		$.quotedPrice.text = args.price;
	}else{
		
		$.priceContainer.height = 0;
		$.priceContainer.hide();
	}
	
	Ti.API.info( 'price: ' + args.price );
	
	checkImage(args.partCode);
	
}());

function checkImage(partCode) {
	
	// Hide the view button by default
	$.viewSlingAssembly.hide();
	$.slingAssemblyImg.setHeight(0);
	$.slingAssemblyImg.hide();
	
	var database = new Database('SlingDB.sqlite'),
		db = database.openDb(),
		row = db.execute('SELECT img FROM Slings WHERE code = ? AND img_status = ? LIMIT 1', partCode, 1),
		img = null,
		imgPath = null,
		f = null;
	
	if (row.isValidRow()) {
		img = row.fieldByName('img');
		imgPath = Ti.Filesystem.applicationDataDirectory + "slings_temp/" + img + ".jpg";
		f = Ti.Filesystem.getFile(imgPath);
		Ti.API.info("Valid! Partcode " + partCode + " has img " + img + ": " + imgPath);
		$.viewSlingAssembly.show();
		$.slingAssemblyImg.image = f;
	} else {
		Ti.API.info("Sling assembly image " + img + " does not exist.");
	}
	
	row.close();
	db.close();
	
}

function viewSlingAssembly() {
	if ($.slingAssemblyImg.getVisible()) {
		$.slingAssemblyImg.hide();
		$.slingAssemblyImg.setTop(0);
		$.slingAssemblyImg.setBottom(0);
		$.slingAssemblyImg.setHeight(0);
	} else {
		$.slingAssemblyImg.show();
		$.slingAssemblyImg.setTop("8dip");
		$.slingAssemblyImg.setBottom("16dip");
		$.slingAssemblyImg.setHeight("auto");	
	}
}

function sendQuote(){
	Ti.API.info('Clicked');
	
	var Common = require('common'),
		common = new Common(),
		Connection = require('connections'),
		connection = new Connection(),
		Database = require('databaseObj'),
		database = new Database('SlingDB.sqlite'),
		user = database.getCurrentUserDetails();
		online = connection.onlineCheck(function(data){
			var online;
		
			if(data === 1){
				online = true;
			}else{
				online = false;
			}
			
			return online;
		});
		
	Ti.API.info(user);
		
	if( online ){
		
		var quoteData = {
			type: args.type,
			grade: args.grade,
			legs: args.legs,
			load: args.load,
			length: args.length,
			partCode: args.partCode,
			price: args.price,
			description: args.description,
			date: args.date,
			ref: args.ref,
			user: args.user,
			addtodb: 0
		};
		
		database.insertQuoteOnline(quoteData);	// args.type, args.grade, args.legs, args.load, args.length, args.partCode, args.quotedPrice, args.description, args.date, args.ref, args.user, 0);		
	}
}

function deleteQuote(){
	
	var Connection = require('connections'),
		connection = new Connection(),
		Database = require('databaseObj'),
		database = new Database('SlingDB.sqlite'),
		online = connection.onlineCheck(function(data){
			var online;
		
			if(data === 1){
				online = true;
			}else{
				online = false;
			}
			
			return online;
		});
			
	database.deleteQuote( online, args.ref, function(){
		
		$.quotesDetail.close({modal: true});
	});	
}

//alert(args);

function closeModal(){
	
	$.quotesDetail.close({modal: true});
}
