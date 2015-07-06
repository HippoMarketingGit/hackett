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

// Events object to fire things on and listen to
Alloy.Globals.goBack = function() {
	navigation.previousPage( $.scrollView, pages, Alloy.Globals.sling, $.slingConfiguration);
};

Alloy.Globals.goNext = function() {
	navigation.nextPage($.scrollView, pages, Alloy.Globals.sling);
}

// Open the first page
navigation.openFirstPage($.scrollView, pages);

$.next.addEventListener('click', function(e){
	
	navigation.nextPage( $.scrollView, pages, Alloy.Globals.sling);

});

$.back.addEventListener('click', function(e){
	
	navigation.previousPage( $.scrollView, pages, Alloy.Globals.sling, $.slingConfiguration);

});
