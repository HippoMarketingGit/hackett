/**
 * @author Ben Hall
 */

function Navigation(){
	this.count = 0;
	this.currentWin;
}

Navigation.prototype.openFirstPage = function(currentWin, array){
	// Create the first window
	// Open the first window
	var win = Alloy.createController(array[this.count]).getView('content');
		this.currentWin = win;
		currentWin.add(win);
};

Navigation.prototype.nextPage = function(scrollview, array, sling){
	
	if( this.errorHandling(sling) ){
		
		// If count is equal to the number of pages, stop
		if( (this.count) < array.length - 1 ){
			// Add one to count to get next page
			this.count++;
				
			// Check if the sling is Wire Rope
			// If so, skip the masterlink page
			/*if( sling.type === 'Wire Rope' && this.count === 3){
				
				this.count = 4;
			}*/
			
			var win = Alloy.createController(array[this.count]).getView('content');
				scrollview.remove(scrollview.children[0]);
				scrollview.add(win);
			
		}else{
			
			var modal = Alloy.createController('specifications').getView();
				modal.open({modal: true});
		}
	}
};

Navigation.prototype.previousPage = function(scrollview, array, sling, current){
	
	// If count is less than number of pages, stop
	if( this.count > 0 ){
		
		this.count--;
		
		// Check if the sling is Wire Rope
		// If so, skip the masterlink page
		/*if( sling.type === 'Wire Rope' && this.count === 3){
			
			this.count = 2;
		}*/
		
		var win = Alloy.createController(array[this.count]).getView('content');
			scrollview.remove(scrollview.children[0]);
			scrollview.add(win);
	}else{
		
		this.slingCancel(current);
	}
};

Navigation.prototype.slingCancel = function(current){
	
	// If Headroom isnt restricted check if user knows Leg Length
	var returnToDash = Titanium.UI.createAlertDialog({
	        title: 'Return to Dashboard',
	        message: 'Are you sure you want to return to Dashboard? Doing so will delete your current Sling Configuration if it has not been saved.',
	        buttonNames: ['Yes', 'No'],
	        cancel: 1
		});
	
	returnToDash.addEventListener('click', function(e){
		
        if (e.cancel === e.index || e.cancel === true) {

			return;

        }else if (e.index === 0){

			var dash = Alloy.createController('dashboard').getView();
				dash.open();
				
			current.close();
        }
	});
	
	returnToDash.show();
	
};

/*
 *  @param    sling    Enter the sling object as a parameter 
 */

Navigation.prototype.errorHandling = function(sling){
	
	var progress = false;
	
	// Sling type page
	if( this.count === 0){
	
		if(sling.type === null){
			
			alert('Please chose a Sling Type.');
		
		}else if( sling.type === 'Chain' && sling.grade === null ){
			
			alert('Please chose a Grade of Chain.');
		}else{
			progress = true;
		}
	
	// Sling legs page
	}else if( this.count === 1 ){
		
		if( sling.legs === null ){
			alert('Please chose how many legs you would like your sling to have.');
		}else{
			progress = true;
		}
	
	// Sling load page
	}else if( this.count === 2 ){
		
		if( sling.load === null ){
			
			alert('Please enter a weight.');
		}else{
			progress = true;
		}
		
	// Sling masterlink page
	}/*else if( this.count === 3 && sling.type === 'Chain'){
		
		if( sling.masterLink === null){
			
			alert('Please select a master link.');
		}else{
			progress = true;
		}
		
	// Nominal Length page
	}*/else if( this.count === 3){
		
		if( sling.nominalLength === null ){
			
			alert('Please enter a Nominal Length (Leg Length)');
		}else{
			progress = true;
		}
	
	// End Terminations page
	}else if( this.count === 4){
		
		if( sling.type === "Chain"){
			
			if( sling.lowerTermination === null || sling.shorteningDevice === null){
				alert('Please select your End Devices.');
			}else{
				progress = true;
			}
			
		}else{
			
			if( sling.legs === 1 ){
				
				if( sling.lowerTermination === null ){
					alert('Please select a Lower Termination.');
				}else{
					progress = true;
				}
			}else{
				
				if( sling.lowerTermination === null ){
					alert('Please select a Lower Termination.');
				}else{
					progress = true;
				}
			}
			
		}
		
	}
	
	// Return Progress
	// If progress is returned as true then we will be allowed to progress to the next step
	// If false then an error alert will be displayed
	return progress;
};

module.exports = Navigation;
