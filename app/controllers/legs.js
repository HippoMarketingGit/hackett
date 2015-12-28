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

// Determine which images to set based on the type
var imgPath = "";
switch (Alloy.Globals.sling.type) {
	case "Chain":
		imgPath = "/images/slings/chain/";
	break;
	
	case 'Wire Rope':
		imgPath = "/images/slings/wire/";
	break;
}

$.oneImg.image = imgPath + "1-leg.png";
$.twoImg.image = imgPath + "2-legs.png";
$.threeImg.image = imgPath + "3-legs.png";
$.fourImg.image = imgPath + "4-legs.png";

function chooseLegs(e){
	
	var obj = e.source;
	
	// Reset the borders on all buttons to defaults
	//$.one.borderColor = '#2b3b94';
	//$.two.borderColor = '#2b3b94';
	//$.three.borderColor = '#2b3b94';
	//$.four.borderColor = '#2b3b94';
	
	$.one.backgroundColor = '#2b3b94';
	$.two.backgroundColor = '#2b3b94';
	$.three.backgroundColor = '#2b3b94';
	$.four.backgroundColor = '#2b3b94';
	
	//$.one.borderWidth = '1px';
	//$.two.borderWidth = '1px';
	//$.three.borderWidth = '1px';
	//$.four.borderWidth = '1px';
	
	// Change the border of the highlighted button
	//obj.borderColor = '#f7561e';
	//obj.borderWidth = '8px';
	obj.backgroundColor = '#f7561e';
	
	// Set the amount of legs to a global object called slings
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

