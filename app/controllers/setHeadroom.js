
/**
 * This is a new panel to ask the user what the headroom is, when it is restricted. 
 * 
 * If headroom is restricted, we need to ask the user what the restricted headroom is.
 * Then use the calculations to work out the leg length.
 * 
 * This *replaces* the previous behaviour of working out the minimum the leg length has to be.
 * 
 */

var Common = require('common'),
	common = new Common(),
	args = arguments[0] || {};

if ($.headMeterDone) {
	$.headMeterDone.addEventListener('click', function(e){	
		$.headMeter.blur();
		if( $.headMeter.value === "" || $.headMeter.value === null ){
			$.headMeter.setValue("00");
		}
	});	
}

if ($.headFractionDone) {
	$.headFractionDone.addEventListener('click', function(e) {
		$.headFraction.blur();
		if ($.headFraction.value === "" || $.headFraction.value === null) {		
			$.headFraction.setValue("00");
		}
		Ti.API.info($.headFraction.value);
	});	
}


// Do it
function setHead(){
	
	var headroom,
		nominalLength,
		meter = $.headMeter.value,
		fraction = $.headFraction.value;
		
	if (meter === '00' && fraction === '00') {
		
		alert('Please enter the restricted headroom.');
		
	} else {	
		
		headroom = parseFloat(meter + '.' + fraction);
		
		var angleB = Alloy.Globals.sling.angle,
			angleA = 90 - angleB,
			angleC = 90;
		
		var sideA = headroom,
			sideB = 0,
			sideC = 0;
		
		sideC = sideA / Math.sin(DegreesToRadians(angleA));
		sideC = sideC.toFixed(2);
		
		var confirmHead = Titanium.UI.createAlertDialog({
	        title: "Leg length",
	        message: "Based on a headroom of " + headroom + "m, the calculated leg length is " + sideC + "m. Continue?",
	        buttonNames: ['Yes', 'No'],
	        cancel: 1
		});
		
		confirmHead.addEventListener('click', function(e) {
			
	        if (e.cancel === e.index || e.cancel === true) {
				// No
				return;	
	        } else if (e.index === 0) {
				// Yes
				Alloy.Globals.sling.nominalLength = common.padIntRight(sideC);		
				closeModal();
	        }
	        
		});
		
		// Show the alert box
		confirmHead.show();
		
	}
}


function closeModal(e) {
	
	var isManual = (e !== null && e && e['type']);
	
	$.setHeadroom.close({ modal: true });
	
	// Was the modal dialog closed manually, and do we have the closeAction passed of going back?
	// This is used to go back to the "Load" page on single leg configs.
	if (isManual && args && args['closeAction'] && args.closeAction === 'back') {
		Alloy.Globals.goBack();
	}
	
}


/**
 * Math functions for calculating angles and stuff.
 * 
 * Copied from: http://www.carbidedepot.com/formulas-trigright.asp 
 * 
 */

function RadiansToDegrees(valRad) {
	return (360/(2*Math.PI)*valRad);
}

function DegreesToRadians(valDeg) {
	return ((2*Math.PI)/360*valDeg);
}
