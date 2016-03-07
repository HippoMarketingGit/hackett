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


function recoverPassword() {
	
	var resetUrl = "http://slingcalc.co.uk/reset.php",
		offlineMsg = "Please connect to the internet before recovering your password.",
		errorMsg = "Sorry, there was an error connecting to the password reset service.";

	var xhr = Ti.Network.createHTTPClient({
		onload: function(e){
			if (this.status === 200 && this.readyState === 4) {
				// Now we have determined the connection is OK, launch the URL
				if (Ti.Platform.Android) {
					var intent = Ti.Android.createIntent({
				        action: Ti.Android.ACTION_VIEW,
				        data: resetUrl
				    });
				    Ti.Android.currentActivity.startActivity(intent);
				} else {
					Ti.Platform.openURL(resetUrl);	
				}
			} else {
				alert(errorMsg);
			}
		},
		onerror: function(){
			alert(offlineMsg);
		},
		timeout: 1500
	});

	xhr.open('GET', resetUrl);
	xhr.send();
}
