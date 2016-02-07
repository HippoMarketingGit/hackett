
var Common = require('common'),
	common = new Common(),
	load,
	tonne = $.tonne.value,
	fraction = $.fraction.value;


// Check to see if a load has already been entered
// if so, insert the correct values in to the text boxes
if( Alloy.Globals.sling.load !== null ){
	
	var str = Alloy.Globals.sling.load.toString();
		str = str.split('.');
		
	$.tonne.value = str[0];
	$.fraction.value = str[1];
}

// Check if any values have been entered when the 'Done' button is pressed,
// if not set the value to "00"
if ($.fractionDone) {
	$.fractionDone.addEventListener('click', function(e){
		if ($.fraction.value == "" || $.fraction.value === null) {
			$.fraction.setValue('00');
		}
		$.fraction.blur();
	});
}

// Check if any values have been entered when the 'Done' button is pressed,
// if not set the value to "00"
if ($.tonneDone) {
	$.tonneDone.addEventListener('click', function(e){		
		if ($.tonne.value == "" || $.tonne.value === null) {
			$.tonne.setValue('00');
		}
		$.tonne.blur();
	});
}

// When the text box value changes, set the global load variable
$.tonne.addEventListener('change', function(e){
	
	var obj = e.source;
	
	tonne = obj.value;
	load = tonne + '.' + fraction;
	Alloy.Globals.sling.load = common.padIntRight(load);
});

// When the text box value changes, set the global load variable
$.fraction.addEventListener('change', function(e){
	
	var obj = e.source;
	
	fraction = obj.value;
	load = tonne + '.' + fraction;
	Alloy.Globals.sling.load = common.padIntRight(load);
});
