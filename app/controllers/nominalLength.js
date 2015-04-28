var Common = require('common'),
	common = new Common(),
	args = arguments[0] || {};

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

function closeModal(e){
	
	var isManual = (e !== null && e && e['type']);
	
	$.nominalLength.close({modal: true});
	
	// Was the modal dialog closed manually, and do we have the closeAction passed of going back?
	// This is used to go back to the "Load" page on single leg configs.
	if (isManual && args && args['closeAction'] && args.closeAction === 'back') {
		Alloy.Globals.goBack();
	}
	
}
