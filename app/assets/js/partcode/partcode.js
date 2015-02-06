function generatePartcode(){
	
	var db = Titanium.Database.open('SlingDB');
	
	var legLength = Math.ceil(Alloy.Globals.nominalLength),
			angle,
			grade,
			shortener,
			end,
			upper;
			
		if( Alloy.Globals.angle === 45 ){
			angle = 'wll.limit45';
		}else{	
			angle = 'wll.limit60';
		}
		
		if( Alloy.Globals.shorteningCode === "NONE"){
			shortener = 'AND shortener IS NULL';
		}else{
			shortener = 'AND shortener = "' + Alloy.Globals.shorteningCode + '"';
		}
		
		if( Alloy.Globals.lowerTermCode === 'NONE'){
			end = 'AND end IS NULL';
		}else{
			end = 'AND end = "' + Alloy.Globals.lowerTermCode + '"';
		}
		
		if( Alloy.Globals.lowerTermCode === 'NONE'){
			upper = 'AND end IS NULL';
		}else{
			upper = 'AND end = "' + Alloy.Globals.lowerTermCode + '"';
		}
	
	// Create Part Code
	if( Alloy.Globals.sling === 'Chain' ){
		
		//alert( 'leg length: ' + legLength + ' angle: ' + angle + ' grade: ' + grade + ' shortener: ' + shortener + ' end: ' + end);
			
		if( Alloy.Globals.grade === 80 || Alloy.Globals.grade === 100 ){
			
			grade = Alloy.Globals.grade;
			
			//alert( 'leg length: ' + legLength + ' angle: ' + angle + ' grade: ' + grade + ' shortener: ' + shortener + ' end: ' + end + ' load: ' + Alloy.Globals.load + 'legs: ' + Alloy.Globals.legs);
			
			var row = db.execute('SELECT * FROM WorkingLoadLimits AS wll, Slings AS s WHERE ' + angle + ' >= ' + Alloy.Globals.load + ' AND wll.type="c" AND wll.legs = ' + Alloy.Globals.legs + ' AND s.legs=wll.legs AND (wll.grade = ' + grade + ') AND (s.size=wll.size AND s.grade=wll.grade ' + end + ' ' + shortener + ' AND s.length >= ' + legLength + ') group by wll.id ORDER BY ' + angle +' LIMIT 1');
			
			if( row.isValidRow() ){
				
				Alloy.Globals.partCode = row.fieldByName('code');
				Alloy.Globals.quotedPrice = '£' + row.fieldByName('price');
				Alloy.Globals.slingDescription = row.fieldByName('description');
			}else{
					
				createPartcode();
			}
			
		}else if( Alloy.Globals.grade === 'Auto' ){
			
			alert('Auto');
			
			var price80,
				code80,
				description80,
				price100,
				code100,
				description100;
			
			var row80 = db.execute('SELECT * FROM WorkingLoadLimits AS wll, Slings AS s WHERE ' + angle + ' >= ' + Alloy.Globals.load + ' AND wll.type="c" AND wll.legs = ' + Alloy.Globals.legs + ' AND s.legs=wll.legs AND (wll.grade = "80" ) AND (s.size=wll.size AND s.grade=wll.grade ' + end + ' ' + shortener + ' AND s.length >= ' + legLength + ') group by wll.id ORDER BY ' + angle +' LIMIT 1');
			
			if( row80.isValidRow() ){
				
				alert('row 80');
				
				price80 = row80.fieldByName('price');
				code80 = row80.fieldByName('code');
				description80 = row80.fieldByName('description');
			}else{
					
				createPartcode();
			}
			
			var row100 = db.execute('SELECT * FROM WorkingLoadLimits AS wll, Slings AS s WHERE ' + angle + ' >= ' + Alloy.Globals.load + ' AND wll.type="c" AND wll.legs = ' + Alloy.Globals.legs + ' AND s.legs=wll.legs AND (wll.grade = "100" ) AND (s.size=wll.size AND s.grade=wll.grade ' + end + ' ' + shortener + ' AND s.length >= ' + legLength + ') group by wll.id ORDER BY ' + angle +' LIMIT 1');
			
			if( row100.isValidRow() ){
				
				alert('row 100');
				
				price100 = row100.fieldByName('price');
				code100 = row100.fieldByName('code');
				description100 = row100.fieldByName('description');
			}else{
					
				createPartcode();
			}
			
			if( price100 === undefined || price100 === null ){
				
				Alloy.Globals.partCode = code80;
				Alloy.Globals.quotedPrice = '£' + price80;
				Alloy.Globals.slingDescription = description80;
			
			}else if( price100 === undefined || price100 === null ){
				
				Alloy.Globals.partCode = code100;
				Alloy.Globals.quotedPrice = '£' + price100;
				Alloy.Globals.slingDescription = description100;
			
			}else{
				
				if( parseInt(price80) <= parseInt(price100) ){
				
					Alloy.Globals.partCode = code80;
					Alloy.Globals.quotedPrice = '£' + price80;
					Alloy.Globals.slingDescription = description80;
					Alloy.Globals.gradeCode = 80;
				}else{
					
					Alloy.Globals.partCode = code100;
					Alloy.Globals.quotedPrice = '£' + price100;
					Alloy.Globals.slingDescription = description100;
					Alloy.Globals.gradeCode = 100;
				}	
			}
		}
		
	}else if( Alloy.Globals.sling === 'Wire Rope' ){
		
		createPartcode();
	}
	
	/*var newRow = db.execute( 'SELECT * FROM Slings WHERE code = ?', Alloy.Globals.partCode);
	
	while( newRow.isValidRow() ){
		
		var price = newRow.fieldByName('price'),
			desc = newRow.fieldByName('description');
			
			Alloy.Globals.quotedPrice = "£" + price;
		
		newRow.next();
	}*/
	
	db.close();
	
}

function createPartcode(){

	var db = Titanium.Database.open('SlingDB'),
		gradeCode,
		limit,
		type,
		slingSize,
		legLength = Math.ceil(parseFloat(Alloy.Globals.nominalLength));
		
	// sort Code	
	if( Alloy.Globals.grade === 80 ){
		gradeCode = 'A';
	}else{
		gradeCode = 'X';
	}
	
	// sort Angle
	if( Alloy.Globals.angle === 45 ){
		limit = 'limit45';
	}else{	
		limit = 'limit60';
	}
	
	if( Alloy.Globals.shorteningCode === 'NONE' ){
		Alloy.Globals.shorteningCode = 0;
	}
	if( Alloy.Globals.lowerTermCode === 'NONE' ){
		Alloy.Globals.lowerTermCode = 0;
	}
	if( Alloy.Globals.upperTermCode === 'NONE' ){
		Alloy.Globals.upperTermCode = 0;
	}
	
	// sort Sling type
	if( Alloy.Globals.sling === 'Chain' ){
		type = 'c';
	}else{	
		type = 'r';
	}
	
	if( Alloy.Globals.grade != 'Auto'){
		// Query DB with known info to get sling size
		var newRow = db.execute('SELECT * FROM WorkingLoadLimits WHERE legs = "' + Alloy.Globals.legs + '" AND grade = "' + Alloy.Globals.grade + '" AND ' + limit + ' >= ' + Alloy.Globals.load + ' AND type = "' + type + '" ORDER BY ' +  limit + ' ASC LIMIT 1');
		
		// Store Sling size
		if( newRow.isValidRow() ){	
			slingSize = newRow.fieldByName('size');
			
			alert( 'sling size: ' + slingSize);
		}	
	}else{
		
		alert('Cannot configure chain');
	}
	
	// Pad sling size if neccessary
	if( slingSize < 10 ){
		slingSize = '0' + slingSize.toString();
	}else{
		slingSize = slingSize.toString();
	}
	
	// Pad nominal length if neccessary
	if( legLength < 10 ){
		legLength = '0' + legLength.toString();
	}else{
		legLength = legLength.toString();
	}
	
	// Create a Chain Sling part code
	if( Alloy.Globals.sling === 'Chain' ){
		
		Alloy.Globals.partCode = gradeCode + slingSize + '.' + Alloy.Globals.legs + legLength + '.' + Alloy.Globals.lowerTermCode + Alloy.Globals.shorteningCode;
	
	// Create a Wire Rope sling part code	
	}else{
		
		// If legs === 1 add upper temination
		if( Alloy.Globals.legs === 1){

			if(Alloy.Globals.upperTermCode === 'NONE'){
				
				Alloy.Globals.partCode = 'RS0' + slingSize + '.' + Alloy.Globals.legs + legLength + '.' + Alloy.Globals.lowerTermCode;
			}else{
				
				Alloy.Globals.partCode = 'RS0' + slingSize + '.' + Alloy.Globals.legs + legLength + '.' + Alloy.Globals.lowerTermCode + Alloy.Globals.upperTermCode;
			}
		}else{
			
			Alloy.Globals.partCode = 'RS0' + slingSize + '.' + Alloy.Globals.legs + legLength + '.' + Alloy.Globals.lowerTermCode;
		}
	}
	
	db.close();
	
	return Alloy.Globals.partCode;
}



