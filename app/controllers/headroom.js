/*
 * If the user has a 1 leg chain then we do not need to worry about a lifting angle
 * 
 * This means we can just open the nominal length page and
 * prompt the user to enter a nominal length.
 * 
 * When done, go to the next page.
 */


if( Alloy.Globals.sling.legs === 1 ){
	
	// var modal = Alloy.createController('nominalLength', { closeAction: 'back' }).getView();
	var modal = Alloy.createController('nominalLength', { navigateOnClose: true, back: true, next: true }).getView();
	modal.open({ modal: true });
	
} else {
	
	setHeadroomImg();
	
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


function setHeadroomImg() {
	
	var src = "",
		imgType = Alloy.Globals.sling.type,
		imgLegs = "";
	
	// Specify which images to use for different sling types and number of legs
	var images = {
		"Wire Rope": {
			"2": "2-leg-thimble-eyes-headroom.png",
			"4": "4-leg-wire-rope-headroom.png"
		},
		"Chain": {
			"2": "7mm-2-leg-set-up-headroom.png",
			"4": "7mm-4-leg-set-up.png"
		}
	};
	
	switch (Alloy.Globals.sling.legs) {
		case 2:
			imgLegs = "2";
			break;
		case 3:
		case 4:
			imgLegs = "4";
			break;
		// No default
	}
	
	if (imgType && imgLegs) {
		src = '/images/headroom/' + images[imgType][imgLegs];
		$.headroomImg.image = src;
	}
}

// The function that allows us to define the angle
function setAngle(e){
	
	//Set both of the buttons to the default background image
	$.yes.backgroundColor = '#2b3b94';
	$.no.backgroundColor = '#2b3b94';
	
	var obj = e.source;
	
	// Set the background image of the active button
	obj.backgroundColor = '#6b76d0';
	
	// If headroom is restricted, show the lifting points page
	if (obj.id === 'yes') {
		
		// Headroom is restricted 
		// angle is now 60
		Alloy.Globals.sling.angle = 60;
			
		// Open the lifting points modal to calculate the headroom and leg room
		var modal = Alloy.createController('liftingPoints', { navigateOnClose: true, back: false, next: true }).getView();
		modal.open({modal: true});
		
		
		// Change: *don't* ask the user for the headroom now.
		/* 
		var modal = Alloy.createController("setHeadroom").getView();
		modal.open({ modal: true });
		*/
		
			
		// When the modal is closed and no values are entered reset the buttons to their default state
		// This will prompt the user to enter a value before moving on
		modal.addEventListener('close', function(e){
			if (Alloy.Globals.sling.nominalLength === 00.00 || Alloy.Globals.sling.nominalLength === null) {
				$.yes.backgroundColor = '#2b3b94';
				$.no.backgroundColor = '#2b3b94';
			}
		});
		
	// If headroom isn't restricted give the user the option to enter
	// the nominal length manually
	} else {
		
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
			// Leg Length not known (No)
			
			modal = Alloy.createController('liftingPoints', { navigateOnClose: true, back: false, next: true }).getView();
			modal.open({modal: true});

        }else if (e.index === 0){
			// Leg Length known (Yes)
			
			modal = Alloy.createController('nominalLength', { navigateOnClose: true, back: false, next: true }).getView();
			modal.open({modal: true});
		}
		
		// When the modal is closed and no values are entered reset the buttons to their default state
		// This will prompt the user to enter a value before moving on
		modal.addEventListener('close', function(e){
				
			if( Alloy.Globals.sling.nominalLength === 00.00 || Alloy.Globals.sling.nominalLength === null){
				$.yes.backgroundColor = '#2b3b94';
				$.no.backgroundColor = '#2b3b94';
			}
		});
	});
	
	lengthKnown.show();
}
