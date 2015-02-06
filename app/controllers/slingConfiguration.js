// Require lib files
// Create new objects where neccessary
var Common = require('common'),
	common = new Common(),
	Navigation = require('navigation'),
	navigation = new Navigation(),
	Sling = require('sling'),
	sling = new Sling(),
	pages = ['slingType', 'legs', 'load', 'headroom', 'terminations'];
	
	// Create a Global Object called sling
	Alloy.Globals.sling = sling;

// Open the first page
navigation.openFirstPage($.scrollView, pages);

$.next.addEventListener('click', function(e){
	
	navigation.nextPage( $.scrollView, pages, Alloy.Globals.sling);

});

$.back.addEventListener('click', function(e){
	
	navigation.previousPage( $.scrollView, pages, Alloy.Globals.sling, $.slingConfiguration);

});
