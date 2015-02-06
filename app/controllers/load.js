var Common = require('common'),
	common = new Common(),
	load,
	tonne = $.tonne.value,
	fraction = $.fraction.value;
	
if( Alloy.Globals.sling.load !== null ){
	
	var str = Alloy.Globals.sling.load.toString();
		str = str.split('.');
		
	$.tonne.value = str[0];
	$.fraction.value = str[1];
	
}

$.fractionDone.addEventListener('click', function(e){

	if( $.fraction.value == "" || $.fraction.value === null){
		
		$.fraction.setValue('00');
	}

	$.fraction.blur();
});

$.tonneDone.addEventListener('click', function(e){
	
	if( $.tonne.value == "" || $.tonne.value === null){
		
		$.tonne.setValue('00');
	}

	$.tonne.blur();
});

$.tonne.addEventListener('change', function(e){
	
	var obj = e.source;
	
	tonne = obj.value;
	load = tonne + '.' + fraction;
	Alloy.Globals.sling.load = common.padIntRight(load);
});

$.fraction.addEventListener('change', function(e){
	
	var obj = e.source;
	
	fraction = obj.value;
	load = tonne + '.' + fraction;
	Alloy.Globals.sling.load = common.padIntRight(load);
});
