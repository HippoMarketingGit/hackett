//var args = arguments[0] || {};

// Check if anything has been set previously
// If it has, highlight the correct buttons
if( Alloy.Globals.sling.masterLink !== null ){
	
	if(Alloy.Globals.sling.masterLink === 'Standard'){
		
		$.standard.backgroundColor = '#6b76d0';
	
	}else if( Alloy.Globals.sling.masterLink === 'Oversized' ){
		
		$.oversized.backgroundColor = '#6b76d0';
	}
}

function setMasterlink(e){

	$.standard.backgroundColor = '#2b3b94';
	$.oversized.backgroundColor = '#2b3b94';
	
	var obj = e.source;
	
	obj.backgroundColor = '#6b76d0';
	
	if(obj.id === 'oversized'){
		
		Alloy.Globals.sling.masterLink = 'Oversized';
	}else{
		
		Alloy.Globals.sling.masterLink = 'Standard';
	}	

}
