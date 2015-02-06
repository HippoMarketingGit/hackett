var args = arguments[0] || {};

(function(){
	
	$.slingType.text = args.type;
	$.grade.text = args.grade;
	$.legs.text = args.legs;
	$.load.text = args.load;
	$.length.text = args.length;
	$.description.text = args.description;
	$.specPartcode.text = 'Partcode: ' + args.partCode;
	
	if( args.price !== null ){
		$.quotedPrice.text = args.price;
	}else{
		
		$.priceContainer.height = 0;
		$.priceContainer.hide();
	}
	
	Ti.API.info( 'price: ' + args.price );
	
}());

function sendQuote(){
	Ti.API.info('Clicked');
	
	var Common = require('common'),
		common = new Common(),
		Connection = require('connections'),
		connection = new Connection(),
		Database = require('databaseObj'),
		database = new Database('SlingDB'),
		user = database.getCurrentUser();
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
		database.insertQuoteOnline( args.type, args.grade, args.legs, args.load, args.length, args.partCode, args.quotedPrice, args.description, args.date, args.ref, args.user, 0);		
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
