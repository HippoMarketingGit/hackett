if( Alloy.Globals.sling.legs === 1 ){
	var modal = Alloy.createController('nominalLength').getView();
		modal.open({modal: true});
}

// Check if anything has been set previously
// If it has, highlight the correct buttons
if( Alloy.Globals.sling.angle !== null){
	
	if( Alloy.Globals.sling.angle === 60){
		$.yes.backgroundColor = '#6b76d0';
	}else{
		$.no.backgroundColor = '#6b76d0';
	}
}

// The function that allows us to define the angle
function setAngle(e){
	
	$.yes.backgroundColor = '#2b3b94';
	$.no.backgroundColor = '#2b3b94';
	
	var obj = e.source;
	
	obj.backgroundColor = '#6b76d0';
	
	// If headroom is restricted, show the lifting points page
	if(obj.id === 'yes'){
		
		Alloy.Globals.sling.angle = 60;
		
		var modal = Alloy.createController('liftingPoints').getView();
			modal.open({modal: true});
			
		modal.addEventListener('close', function(e){
				
			if( Alloy.Globals.sling.nominalLength === 00.00 || Alloy.Globals.sling.nominalLength === null){
				$.yes.backgroundColor = '#2b3b94';
				$.no.backgroundColor = '#2b3b94';
			}
		});
		
	// If headroom isn't restricted give the user the option to enter
	// the nominal length manually
	}else{
		
		showAlert();
		Alloy.Globals.sling.angle = 45;
		
		Ti.API.info( Alloy.Globals.sling.checkLimit() );
	}
}

function showAlert(){
	
	// If Headroom isnt restricted check if user knows Leg Length
	var lengthKnown = Titanium.UI.createAlertDialog({
        title: 'Nominal Length',
        message: 'Do you know the Nominal Length?(Leg Length)',
        buttonNames: ['Yes', 'No'],
        cancel: 1
	});
	
	lengthKnown.addEventListener('click', function(e){
		
		var modal;
		
        if (e.cancel === e.index || e.cancel === true) {
			// Leg Length not known
			
			modal = Alloy.createController('liftingPoints').getView();
			modal.open({modal: true});

        }else if (e.index === 0){
			// Leg Length known
			
			modal = Alloy.createController('nominalLength').getView();
			modal.open({modal: true});
		}
		
		modal.addEventListener('close', function(e){
				
			if( Alloy.Globals.sling.nominalLength === 00.00 || Alloy.Globals.sling.nominalLength === null){
				$.yes.backgroundColor = '#2b3b94';
				$.no.backgroundColor = '#2b3b94';
			}
			
			
		});
	});
	
	lengthKnown.show();
	
}
