// ========================================================
// Create Activity Indicator Icon
// ========================================================
var Database = require('databaseObj'),
	database = new Database('SlingDB.sqlite');
	
Alloy.Globals.callHandler($.tel);
	

$.register.addEventListener('click', function(e){
	
	var win = Alloy.createController('register').getView();
	win.open();
		
	$.index.close();
	$.index = null;
	

	
});

function openDashboard(e){
	
	database.logIn($.username.value, $.password.value, function(result){
		
		if(result === 'success'){
	
			var win = Alloy.createController('dashboard').getView();
				win.open();
	
			$.index.close();
			$.index = null;
		
		}
		
	});
}