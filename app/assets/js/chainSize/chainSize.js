/**
 * @author Ben Hall
 */

// Workout the Chain size

function setChainSize(){
	
	var limit = 'limit' + Alloy.Globals.angle,
		db = Titanium.Database.open('SlingDB');
		
	if( Alloy.Globals.sling === 'Chain' ){
		
		if( Alloy.Globals.grade == 80 ){
		
			if( Alloy.Globals.angle == 45 || Alloy.Globals.angle == 0 ){
								
				var returnedRow = db.execute('SELECT * FROM WorkingLoadLimits WHERE grade = 80 AND legs = ? AND limit45 >= ?', Alloy.Globals.legs, Alloy.Globals.load );
				
				var lastNum = 10000;
			
				while( returnedRow.isValidRow() ){
					
					if( returnedRow.fieldByName('limit45') < lastNum ){
					
						lastNum = returnedRow.fieldByName('limit45');
						
						Alloy.Globals.chainSize = parseInt( returnedRow.fieldByName('size') );
						
					}
					
					returnedRow.next();
				}
					
			}else if( Alloy.Globals.angle == 60){
	
				var returnedRow = db.execute('SELECT * FROM WorkingLoadLimits WHERE grade = 80 AND legs = ? AND limit60 >= ?', Alloy.Globals.legs, Alloy.Globals.load );
				
				var lastNum = 10000;
	
				while( returnedRow.isValidRow() ){
	
					if( returnedRow.fieldByName('limit60') < lastNum ){
	
						lastNum = returnedRow.fieldByName('limit60');
	
						Alloy.Globals.chainSize = parseInt( returnedRow.fieldByName('size') );
					}
	
					returnedRow.next();
				}
				
				//alert('Chain Size: ' + Alloy.Globals.chainSize );
			}
			
		}else if( Alloy.Globals.grade == 100 ){
		
			if( Alloy.Globals.angle == 45 || Alloy.Globals.angle == 0){
													
				var returnedRow = db.execute('SELECT * FROM WorkingLoadLimits WHERE grade = 100 AND legs = ? AND limit45 >= ?', Alloy.Globals.legs, Alloy.Globals.load );
	
				var lastNum = 10000;
	
				while( returnedRow.isValidRow() ){
	
					if( returnedRow.fieldByName('limit45') < lastNum ){
	
						lastNum = returnedRow.fieldByName('limit45');
	
						 Alloy.Globals.chainSize = parseInt( returnedRow.fieldByName('size') );
						
					}
	
					returnedRow.next();
				}
				
				//alert('Chain Size: ' + Alloy.Globals.chainSize );
	
			}else if( Alloy.Globals.angle == 60){
			
				var returnedRow = db.execute('SELECT * FROM WorkingLoadLimits WHERE grade = 100 AND legs = ? AND limit60 >= ?', Alloy.Globals.legs, Alloy.Globals.load );
	
				var lastNum = 10000;
	
				while( returnedRow.isValidRow() ){
	
					if( returnedRow.fieldByName('limit60') < lastNum ){
	
						lastNum = returnedRow.fieldByName('limit60');
	
						Alloy.Globals.chainSize = parseInt( returnedRow.fieldByName('size') );
						
					}
	
					returnedRow.next();
				}
				
				//alert('Chain Size: ' + Alloy.Globals.chainSize );
			}
			
		}
		
	}else if( Alloy.Globals.sling === 'Wire Rope'){
		
		if( Alloy.Globals.angle == 45 || Alloy.Globals.angle == 0){
													
			var returnedRow = db.execute('SELECT * FROM WorkingLoadLimits WHERE type = "r" AND legs = ? AND limit45 >= ?', Alloy.Globals.legs, Alloy.Globals.load );
	
			var lastNum = 10000;
	
			while( returnedRow.isValidRow() ){
	
				if( returnedRow.fieldByName('limit45') < lastNum ){
	
					lastNum = returnedRow.fieldByName('limit45');
	
					 Alloy.Globals.ropeSize = parseInt( returnedRow.fieldByName('size') );
					
				}
	
				returnedRow.next();
			}
			
			//alert('Chain Size: ' + Alloy.Globals.chainSize );
	
		}else if( Alloy.Globals.angle == 60){
		
			var returnedRow = db.execute('SELECT * FROM WorkingLoadLimits WHERE type = "r" AND legs = ? AND limit60 >= ?', Alloy.Globals.legs, Alloy.Globals.load );
	
			var lastNum = 10000;
	
			while( returnedRow.isValidRow() ){
	
				if( returnedRow.fieldByName('limit60') < lastNum ){
	
					lastNum = returnedRow.fieldByName('limit60');
	
					Alloy.Globals.ropeSize = parseInt( returnedRow.fieldByName('size') );
					
				}
	
				returnedRow.next();
			}	
		}	
	}

}
