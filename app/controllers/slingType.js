
//var args = arguments[0] || {};
//var next = Alloy.createController('slingConfiguration').getView('next');

//next.addEventListener('click', function(e){
	
//});

// Hide the grade buttons
$.extra.hide();
$.extra.height = 0;

// Check if anything has been set previously
// If it has, highlight the correct buttons
// Check for sling type first
if( Alloy.Globals.sling.type !== null ){
	
	if(Alloy.Globals.sling.type === 'Chain'){
		
		// show the grade buttons
		$.extra.show();
		$.extra.height = Ti.UI.SIZE;
		
		// Also set the grade if possible
		if( Alloy.Globals.sling.grade === 'Auto'){
			$.auto.backgroundColor = '#6b76d0';
		}else if( Alloy.Globals.sling.grade === 8 ){
			$.eight.backgroundColor = '#6b76d0';
		}else if( Alloy.Globals.sling.grade === 10 ){
			$.ten.backgroundColor = '#6b76d0';
		}
		
		$.chain.backgroundColor = '#6b76d0';
	
	}else if( Alloy.Globals.sling.type === 'Wire Rope' ){
		
		$.wireRope.backgroundColor = '#6b76d0';
	}
}

function setSlingType(e){
	
	if( e.source.id === 'chain'){
		
		$.extra.show();
		$.extra.height = Ti.UI.SIZE;
		Alloy.Globals.sling.type = 'Chain';
	}else{
		
		$.extra.hide();
		$.extra.height = 0;
		Alloy.Globals.sling.type = 'Wire Rope';
		Alloy.Globals.sling.grade = null;
	}
	
	$.chain.backgroundColor = '#2b3b94';
	$.wireRope.backgroundColor = '#2b3b94';
	
	e.source.backgroundColor = '#6b76d0';
}


function setGrade(e){
	
	if( e.source.id === 'auto'){
		
		Alloy.Globals.sling.grade = 'Auto';
	}else if( e.source.id === 'eight'){
		
		Alloy.Globals.sling.grade = 8;
	}else if( e.source.id === 'ten'){
		
		Alloy.Globals.sling.grade = 10;
	}
	
	Ti.API.info(Alloy.Globals.sling.grade);
	
	$.ten.backgroundColor = '#2b3b94';
	$.eight.backgroundColor = '#2b3b94';
	$.auto.backgroundColor = '#2b3b94';
	
	e.source.backgroundColor = '#6b76d0';
}
