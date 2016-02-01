Alloy.Globals.callHandler($.tel);

function openConfigurator(e){
	var win = Alloy.createController('slingConfiguration').getView();
	win.open();
	$.dashboard.close();
	$.dashboard = null;
}

function openAccountSettings(e){
	
	var win = Alloy.createController('accountSettings').getView();
		win.open();
		
	$.dashboard.close();
	$.dashboard = null;
}

function openQuotes(e){
	
	var win = Alloy.createController('quotes').getView();
		win.open();
		
	$.dashboard.close();
	$.dashboard = null;
}
