// Check if Sling legs has been set
// If so, highlight the correct image
if( Alloy.Globals.sling.legs !== null ){
	
	if(Alloy.Globals.sling.legs === 1){
		
		$.one.borderColor = '#f7561e';
		$.one.borderWidth = '8px';
		
	}else if(Alloy.Globals.sling.legs === 2){
		
		$.two.borderColor = '#f7561e';
		$.two.borderWidth = '8px';
		
	}else if(Alloy.Globals.sling.legs === 3){
		
		$.three.borderColor = '#f7561e';
		$.three.borderWidth = '8px';
		
	}else if(Alloy.Globals.sling.legs === 4){
		
		$.four.borderColor = '#f7561e';
		$.four.borderWidth = '8px';
	}
}

function chooseLegs(e){
	
	var obj = e.source;
	
	$.one.borderColor = '#2b3b94';
	$.two.borderColor = '#2b3b94';
	$.three.borderColor = '#2b3b94';
	$.four.borderColor = '#2b3b94';
	
	$.one.borderWidth = '1px';
	$.two.borderWidth = '1px';
	$.three.borderWidth = '1px';
	$.four.borderWidth = '1px';
	
	obj.borderColor = '#f7561e';
	obj.borderWidth = '8px';
	
	if(obj.id === 'one'){
		
		Alloy.Globals.sling.legs = 1;
		
		Alloy.Globals.sling.angle = 45;
		
	}else if( obj.id === 'two'){
		
		Alloy.Globals.sling.legs = 2;
		Alloy.Globals.sling.angle = null;
		
	}else if( obj.id === 'three'){
		
		Alloy.Globals.sling.legs = 3;
		Alloy.Globals.sling.angle = null;
		
	}else if( obj.id === 'four'){
		
		Alloy.Globals.sling.legs = 4;
		Alloy.Globals.sling.angle = null;
	}
}

