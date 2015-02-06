// ========================================================
// Create Activity Indicator Icon
// ========================================================
var Database = require('databaseObj'),
	database = new Database('SlingDB.sqlite');
	
$.register.addEventListener('click', function(e){
	
	var win = Alloy.createController('register').getView();
	
	$.index.close();
	$.index = null;
	
	win.open();
	
});

function openDashboard(e){
	
	/*var activityView = Ti.UI.createView({
			backgroundColor: '#021b4b',
			border: '1px',
			borderColor: '#FFF'	,
			height: Ti.UI.SIZE,
			width: Ti.UI.SIZE
		}),
		style;
	
	if (Ti.Platform.name === 'iPhone OS'){

		style = Ti.UI.iPhone.ActivityIndicatorStyle.BIG;
		
	}else{
		
		style = Ti.UI.ActivityIndicatorStyle.PLAIN;
	}

	var activityIndicator = Ti.UI.createActivityIndicator({
			width: 'auto',
			height: 'auto',
			top: '10dip',
			bottom: '10dip',
			right: '10dip',
			left: '10dip',
			message: 'Loading...',
			color: '#FFF',
			style: style
		}),

	activityIndicator.show();
	activityView.add(activityIndicator);*/
	
	// Show indicator
	//$.loaderContainer.add(activityView);
	
	database.logIn($.username.value, $.password.value, function(result){
		
		if(result === 'success'){
	
			var win = Alloy.createController('dashboard').getView();
				win.open();
	
			$.index.close();
			$.index = null;
		
		}/*else{
			
			$.loaderContainer.remove(activityView);
		}*/
		
	});
}