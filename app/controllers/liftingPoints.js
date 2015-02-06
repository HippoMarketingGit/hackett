function setLegLength(e){
	
	var num = parseFloat( $.liftingPointMeter.value + '.' + $.liftingPointFraction.value ),
		legLength;
		
	Ti.API.info('num: ' + num);
	
	if ( Alloy.Globals.sling.angle === 60 ){
		
		var distance;
		
		if( Alloy.Globals.sling.legs === 2 || Alloy.Globals.sling.legs === 4 ){
			
			distance = num / 2;
		}else{
			
			distance = num;
		}
		
		var n = distance / 0.866;
		
		legLength = n.toFixed(2);
		
	}else if( Alloy.Globals.sling.angle === 45 ){
		
		var distance;
		
		if( Alloy.Globals.sling.legs === 2 || Alloy.Globals.sling.legs === 4 ){
			
			distance = num / 2;
		}else{
			
			distance = num;
		}
		
		var n = distance / 0.707;
		
		legLength = n.toFixed(2);
			
	}
	
	Alloy.Globals.sling.nominalLength = legLength;
	
	Ti.API.info('Leg Length: ' + Alloy.Globals.sling.nominalLength );
}

function getHeadroom(){
	
	var distance;
	
	if(Alloy.Globals.sling.legs === 2 || Alloy.Globals.sling.legs === 4 ){
		distance = parseFloat( $.liftingPointMeter.value + '.' + $.liftingPointFraction.value ) / 2;
	}else{
		distance = parseFloat( $.liftingPointMeter.value + '.' + $.liftingPointFraction.value );
	}
	
	var	distanceSquared = distance * distance,
		nominalLengthSquared = Alloy.Globals.sling.nominalLength * Alloy.Globals.sling.nominalLength,
		minusNumber = nominalLengthSquared - distanceSquared,
		result = Math.sqrt(minusNumber);
		
		Ti.API.info('distance: ' + distance);
		Ti.API.info('distance squared: ' + distanceSquared);
		Ti.API.info('Nominal Length squared: ' + nominalLengthSquared);
		Ti.API.info('minusNumber: ' + minusNumber);
		Ti.API.info('Result: ' + result.toFixed(2) );
		
		return result.toFixed(2);
	
}

function setLength(){
	
	setLegLength();
	
	if( $.liftingPointMeter.value === '00' && $.liftingPointFraction.value === '00'){
		
		alert('Please enter the distance between lifting points');
		
	}else{
		
		showHeadroomAlert();	
	}
}

function showHeadroomAlert(){

	// If Headroom isnt restricted check if user knows Leg Length
	var headroom = Titanium.UI.createAlertDialog({
        title: 'Headroom',
        message: 'You will require a minimum headroom of ' + getHeadroom() + ' (m) to operate this sling. Do you wish to continue?',
        buttonNames: ['Yes', 'No'],
        cancel: 1
	}),
	proceed;
	
	headroom.addEventListener('click', function(e){
		
        if (e.cancel === e.index || e.cancel === true) {
			// No	
			
		return;

        }else if (e.index === 0){
			// Yes
			
			closeModal();
        }
	});
	
	headroom.show();
}

function closeModal(){
	
	$.liftingPoints.close({modal: true});
}

$.liftingPointDone.addEventListener('click', function(e){

	if( $.liftingPointMeter.value === "" || $.liftingPointMeter.value == null ){
		
		$.liftingPointMeter.setValue("00");
	}

	$.liftingPointMeter.blur();

});

$.liftingPointFractionDone.addEventListener('click', function(e){
	
	if( $.liftingPointFraction.value === "" || $.liftingPointFraction.value == null ){
		
		$.liftingPointFraction.setValue("00");
	}

	$.liftingPointFraction.blur();

});

var liftingPointImg = Ti.UI.createImageView({
	image: '/images/lifting-points/WHC--' + Alloy.Globals.sling.legs.toString() + '-leg--lifting-points.png',
	width: 'Auto'
});

if( Alloy.Globals.sling.legs === 3 ){
	liftingPointImg.height = '100dip';
}else{
	
	liftingPointImg.height = '60dip';
}

$.liftingPointsImage.add(liftingPointImg);
