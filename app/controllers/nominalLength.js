var Common = require('common'),
	common = new Common();

$.legMeterDone.addEventListener('click', function(e){

	$.legMeter.blur();
	
	if( $.legMeter.value === "" || $.legMeter.value === null ){
		
		$.legMeter.setValue("00");
	}
	
	Ti.API.info( $.legMeter.value );
});

$.legFractionDone.addEventListener('click', function(e){

	$.legFraction.blur();
	
	if( $.legFraction.value === "" || $.legFraction.value === null ){
		
		$.legFraction.setValue("00");
	}
	
	Ti.API.info( $.legFraction.value );
});

function setLength(){
	
	var nominalLength,
		meter = $.legMeter.value,
		fraction = $.legFraction.value;
		
	if( meter === '00' && fraction === '00'){
		
		alert('Please enter the nominal length.');
	
	}else{
		
		nominalLength = meter + '.' + fraction;
		Alloy.Globals.sling.nominalLength = common.padIntRight(nominalLength);
		
		closeModal();
	}
}

function closeModal(){
	$.nominalLength.close({modal: true});
}
