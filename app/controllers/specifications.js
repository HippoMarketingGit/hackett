
/* 
 *  Example Chain Sling Part code
 * 
 *  A08.202.7G
 *  123.456.78
 * 
 * 	1 = Chain Type 										A = Grade 8	X = Grade 10
 * 	2 & 3 = Chain Size 									8mm/10mm/13mm+
 * 	4 = Number of Legs
 * 	5 & 6 = Leg Lengths a.k.a Nominal Length
 * 	7 = End Fittings									Grab Hooks/Foundry Hooks/Plain Ends
 *  8 = Type of Shortener								Clutch
 * 
 * 
 *  Example Wire Rope Sling Part code
 * 
 *  RS016.404.31
 * 	12345.678.90
 * 
 *  1 & 2 = Rope Sling
 * 	3, 4, 5 = Rope Size
 * 	6 = Number of Legs
 * 	7 & 8 = Leg Lengths a.k.a Nominal Length
 * 	9 = End Fittings									Grab Hooks/Foundry Hooks/Plain Ends
 * 	0 = End Fittings || ONLY AVAILABLE ON 1 LEG ||		Grab Hooks/Foundry Hooks/Plain Ends
 */

(function(){
	
	// Hide the back to dash button so that it cannot be clicked
	// until the quote has been sent
	$.backToDash.hide();
	//$.backToDash.height = 0;
	
	Ti.API.info("nominalLength " + Alloy.Globals.sling.nominalLength);
	
	var Database = require('databaseObj'),
		database = new Database('SlingDB.sqlite'),
		db = database.openDb(),
		legLength = Math.ceil(Alloy.Globals.sling.nominalLength),
		angle,
		grade,
		shortener,
		end,
		upper;
		
	Ti.API.info("Sling " + JSON.stringify(Alloy.Globals.sling));
	
	// Set the IDs of the items that make up the chosen sling spec.
	// We will set these, based on what we we can find based on requirements, 
	// and use them later for displaying sling specification along side requirements.
	// We just store the IDs so we can retrieve them later and pass them to the quoteRequest API call.
	Alloy.Globals.wllAngle = null;
	Alloy.Globals.wllId = null;
	Alloy.Globals.slingId = null;
		
	// Find a part code form the phone database
	if( Alloy.Globals.sling.type === 'Chain' ){
		
		var angle,
			grade,
			shortener,
			end,
			upper;
			
		// Perform all query string changes here
		// Query changes to "IS NULL" if no termination is selected
		// The checks below allow for this
		if( Alloy.Globals.sling.angle === 45 ){
			angle = 'wll.limit45';
			Alloy.Globals.wllAngle = "limit45";
		}else{	
			angle = 'wll.limit60';
			Alloy.Globals.wllAngle = "limit60";
		}
		
		if( Alloy.Globals.sling.shorteningDeviceCode === "NONE"){
			shortener = 'AND s.shortener LIKE ""';
		}else{
			shortener = 'AND s.shortener LIKE "' + Alloy.Globals.sling.shorteningDeviceCode + '"';
		}
		
		if( Alloy.Globals.sling.lowerTerminationCode === 'NONE'){
			end = 'AND end = ""';
		}else{
			end = 'AND end = "' + Alloy.Globals.sling.lowerTerminationCode + '"';
		}
		
		if( Alloy.Globals.sling.upperTerminationCode === 'NONE'){
			upper = 'AND end = ""';
		}else{
			upper = 'AND end = "' + Alloy.Globals.sling.upperTerminationCode + '"';
		}
		
		// If grade is equal to 8 or 10 perform the query below
		// the query changes vastly for auto
		if( Alloy.Globals.sling.grade === 8 || Alloy.Globals.sling.grade === 10 ){
			
			Ti.API.info('Grade ' + Alloy.Globals.sling.grade);
			Ti.API.info('wllAngle ' + Alloy.Globals.wllAngle);
			
			grade = Alloy.Globals.sling.grade;
			
			var sql = 'SELECT *, wll.id AS wllId, s.id AS slingId ' +
			'FROM WorkingLoadLimits AS wll, Slings AS s ' +
			'WHERE ' + angle + ' >= ' + Alloy.Globals.sling.load + ' ' + 
			'AND wll.type="c" ' + 
			'AND wll.legs = ' + Alloy.Globals.sling.legs + ' ' +
			'AND s.legs=wll.legs ' + 
			'AND (wll.grade = ' + grade + ') ' + 
			'AND (s.size=wll.size AND s.grade=wll.grade ' + end + ' ' + shortener + ' AND s.length = "' + legLength + '") ' + 
			'GROUP BY wll.id ' + 
			'ORDER BY ' + angle + ' ' + 
			'LIMIT 1';

			Ti.API.info(sql);

			var row = db.execute(sql);
			
			if( row.isValidRow() ){
				
				Ti.API.info('part code: ' + row.fieldByName('code') );
				
				Alloy.Globals.wllId = row.fieldByName("wllId");
				Alloy.Globals.slingId = row.fieldByName("slingId");
				
				Ti.API.info('wllId ' + Alloy.Globals.wllId);
				Ti.API.info('slingId ' + Alloy.Globals.slingId);
				
				Alloy.Globals.sling.partCode = row.fieldByName('code');
				Alloy.Globals.sling.quotedPrice = row.fieldByName('price');
				Alloy.Globals.sling.slingDescription = row.fieldByName('description');
				
			}else{				
				Ti.API.info('row 10 create part code');
				createPartcode();
			}
		
		// If the grade is "auto" we have to perform two querys and find
		// the best sling for the job out of the two
		//
		// If the price is the same for a grade 8 adn grade 10 sling
		// then always pick the grade 10 as it is better value for money
		}else if( Alloy.Globals.sling.grade === 'Auto' ){
			
			Ti.API.info('Grade ' + Alloy.Globals.sling.grade);
			var price8,
				code8,
				description8,
				wllId8,
				slingId8,
				price10,
				code10,
				description10,
				wllId10,
				slingId10,
				angle,
				grade,
				shortener,
				end,
				upper;
			
			// Perform all query string changes here
			// Query changes to "IS NULL" if no termination is selected
			// The checks below allow for this
			if( Alloy.Globals.sling.angle === 45 ){
				angle = 'wll.limit45';
				Alloy.Globals.wllAngle = "limit45";
			}else{	
				angle = 'wll.limit60';
				Alloy.Globals.wllAngle = "limit60";
			}
			
			if( Alloy.Globals.sling.shorteningDeviceCode === "NONE"){
				shortener = 'AND s.shortener IS NULL';
			}else{
				shortener = 'AND s.shortener LIKE "' + Alloy.Globals.sling.shorteningDeviceCode + '"';
			}
			
			if( Alloy.Globals.sling.lowerTerminationCode === 'NONE'){
				end = 'AND s.end IS NULL';
			}else{
				end = 'AND s.end = "' + Alloy.Globals.sling.lowerTerminationCode + '"';
			}
			
			if( Alloy.Globals.sling.upperTerminationCode === 'NONE'){
				upper = 'AND s.end IS NULL';
			}else{
				upper = 'AND s.end = "' + Alloy.Globals.sling.upperTerminationCode + '"';
			}
			
			Ti.API.info('wllAngle ' + Alloy.Globals.wllAngle);
						
			// Perform the query for a grade 8 sling
			var sql = 'SELECT *, wll.id AS wllId, s.id AS slingId ' + 
						'FROM WorkingLoadLimits AS wll, Slings AS s ' + 
						'WHERE ' + angle + ' >= ' +  Alloy.Globals.sling.load + ' ' +
						'AND wll.type="c" ' + 
						'AND wll.legs = ' + Alloy.Globals.sling.legs + ' ' + 
						'AND s.legs = wll.legs ' + 
						'AND (wll.grade = "8" ) ' + 
						'AND (s.size=wll.size AND s.grade=wll.grade ' + end + ' ' + shortener + ' AND s.length = ' + legLength + ') ' + 
						'GROUP BY wll.id ' + 
						'ORDER BY ' + angle +' ASC';
						
			Ti.API.info(sql);
			
			var row8 = db.execute(sql);
			
			// Check to see if a chain was found
			if( row8.isValidRow() ){
				Ti.API.info('Row 8 valid Row');
				price8 = row8.fieldByName('price');
				code8 = row8.fieldByName('code');
				description8 = row8.fieldByName('description');
				wllId8 = row8.fieldByName("wllId");
				slingId8 = row8.fieldByName("slingId");		
			}else{				
				// This else is purely for dev purposes, can be removed
				// before final build	
				Ti.API.info('Row 8 not valid');
			}
			
			var sql = 'SELECT *, wll.id AS wllId, s.id AS slingId ' + 
						'FROM WorkingLoadLimits AS wll, Slings AS s ' + 
						'WHERE ' + angle + ' >= ' + Alloy.Globals.sling.load + ' ' + 
						'AND wll.type="c" ' + 
						'AND wll.legs = ' + Alloy.Globals.sling.legs + ' ' + 
						'AND s.legs=wll.legs ' + 
						'AND (wll.grade = "10" ) ' + 
						'AND (s.size=wll.size AND s.grade=wll.grade ' + end + ' ' + shortener + ' AND s.length = ' + legLength + ') ' + 
						'GROUP BY wll.id ' + 
						'ORDER BY ' + angle +' ASC';
						
			Ti.API.info(sql);
			
			var row10 = db.execute(sql);

			if( row10.isValidRow() ){
				Ti.API.info('Row 10 valid row');
				price10 = row10.fieldByName('price');
				code10 = row10.fieldByName('code');
				description10 = row10.fieldByName('description');
				wllId10 = row10.fieldByName("wllId");
				slingId10 = row10.fieldByName("slingId");
			
			}else{				
				// This else is purely for dev purposes, can be removed
				// before final build
				Ti.API.info('Row 10 not valid');
			}
			
			// If price is undefined for both grade 8 and grade 10
			// build a part code.
			if( (price8 === undefined || price8 === null) && (price10 === undefined || price10 === null) ){
				
				Alloy.Globals.sling.quotedPrice = null;
				Alloy.Globals.sling.slingDescription = null;
				
				createPartcode();
			
			}else if( price10 === undefined || price10 === null ){
				
				Alloy.Globals.sling.partCode = code8;
				Alloy.Globals.sling.quotedPrice = price8;
				Alloy.Globals.sling.slingDescription = description8;
				Alloy.Globals.wllId = wllId8;
				Alloy.Globals.slingId = slingId8;
			
			}else if( price8 === undefined || price8 === null ){
				
				Alloy.Globals.sling.partCode = code10;
				Alloy.Globals.sling.quotedPrice = price10;
				Alloy.Globals.sling.slingDescription = description10;
				Alloy.Globals.wllId = wllId10;
				Alloy.Globals.slingId = slingId10;
			
			}else if( parseInt(price8) < parseInt(price10) ){
				
				Alloy.Globals.sling.partCode = code8;
				Alloy.Globals.sling.quotedPrice = price8;
				Alloy.Globals.sling.slingDescription = description8;
				Alloy.Globals.sling.gradeCode = 8;
				Alloy.Globals.wllId = wllId8;
				Alloy.Globals.slingId = slingId8;
			
			}else if( parseInt(price8) > parseInt(price10) ){
				
				Alloy.Globals.sling.partCode = code10;
				Alloy.Globals.sling.quotedPrice = price10;
				Alloy.Globals.sling.slingDescription = description10;
				Alloy.Globals.sling.gradeCode = 10;
				Alloy.Globals.wllId = wllId10;
				Alloy.Globals.slingId = slingId10;	
			
			}else if( parseInt(price8) === parseInt(price10) ){
				
				Alloy.Globals.sling.partCode = code10;
				Alloy.Globals.sling.quotedPrice = price10;
				Alloy.Globals.sling.slingDescription = description10;
				Alloy.Globals.sling.gradeCode = 10;
				Alloy.Globals.wllId = wllId10;
				Alloy.Globals.slingId = slingId10;
			}
			
				Ti.API.info('Alloy.Globals.sling.partCode' + Alloy.Globals.sling.partCode);
				Ti.API.info('Alloy.Globals.sling.quotedPrice' + Alloy.Globals.sling.quotedPrice);
				Ti.API.info('Alloy.Globals.sling.slingDescription' + Alloy.Globals.sling.slingDescription);
				Ti.API.info('Alloy.Globals.sling.gradeCode' + Alloy.Globals.sling.gradeCode);
				Ti.API.info('Alloy.Globals.wllId' + Alloy.Globals.wllId);
				Ti.API.info('Alloy.Globals.slingId' + Alloy.Globals.slingId);
		}
	
	// Currently William Hackett have no part code prices for Wire
	// Rope slings.
	}else if( Alloy.Globals.sling.type === 'Wire Rope' ){
		
		var angle,
			grade,
			shortener,
			end,
			upper;
			
		// Perform all query string changes here
		// Query changes to "IS NULL" if no termination is selected
		// The checks below allow for this
		if( Alloy.Globals.sling.angle === 45 ){
			angle = 'wll.limit45';
			Alloy.Globals.wllAngle = "limit45";
		}else{	
			angle = 'wll.limit60';
			Alloy.Globals.wllAngle = "limit60";
		}		
		
		if( Alloy.Globals.sling.lowerTerminationCode === 'NONE'){
			end = ' AND end = "" ';
		}else{
			end = ' AND end = "' + Alloy.Globals.sling.lowerTerminationCode + '" ';
		}
		
		if( Alloy.Globals.sling.upperTerminationCode === 'NONE' || Alloy.Globals.sling.upperTerminationCode === null){
			upper = ' AND end_b = "" ';
		}else{
			upper = ' AND end_b = "' + Alloy.Globals.sling.upperTerminationCode + '" ';
		}
		
		var sql = "SELECT *, wll.id AS wllId, s.id AS slingId " + 
				"FROM WorkingLoadLimits AS wll, Slings AS s " +
				"WHERE " + angle + " >= " + Alloy.Globals.sling.load + " " +
				"AND wll.type='r' " + 
				"AND wll.legs = " + Alloy.Globals.sling.legs + " " +
				"AND s.grade = '' " +
				"AND s.legs = wll.legs " +
				"AND s.size = wll.size " + 
				"AND s.length = " + legLength + " " +
				end + 
				upper + 
				"GROUP BY wll.id " +
				"ORDER BY " + angle + " ASC " +
				"LIMIT 1";
				
		Ti.API.info(sql);
		
		var row = db.execute(sql);
		
		if( row.isValidRow() ){
			
			Ti.API.info('DB part code: ' + row.fieldByName('code') );
			
			Alloy.Globals.sling.partCode = row.fieldByName('code');
			Alloy.Globals.sling.quotedPrice = row.fieldByName('price');
			Alloy.Globals.sling.slingDescription = row.fieldByName('description');
			Alloy.Globals.wllId = row.fieldByName("wllId");
			Alloy.Globals.slingId = row.fieldByName("slingId");
			
		}else{
			
			Ti.API.info('wire rope create part code');
			createPartcode();
			
			Alloy.Globals.sling.grade = null;
			Alloy.Globals.sling.quotedPrice = null;
			Alloy.Globals.sling.slingDescription = null;
			
		}
		
	}
	
	Ti.API.info('Alloy.Globals.wllId ' + Alloy.Globals.wllId);
	Ti.API.info('Alloy.Globals.slingId ' + Alloy.Globals.slingId);
	if (Alloy.Globals.wllId !== null && Alloy.Globals.slingId !== null) {		
		outputDetails( Alloy.Globals.sling.type, Alloy.Globals.sling.grade, Alloy.Globals.sling.legs, Alloy.Globals.sling.load, Alloy.Globals.sling.nominalLength, Alloy.Globals.sling.slingDescription, Alloy.Globals.sling.partCode, Alloy.Globals.sling.quotedPrice);
		checkImage(Alloy.Globals.sling.partCode);
		checkSpec();
	}
	else
	{
		//openDash();
		//$.specifications.close({modal: true});
		$.slingType.text = 'No Matches';
	}
	database.closeDb(db);
	
})();

function createPartcode(){
	
	Ti.API.info("createPartcode call");
	
	var Database = require('databaseObj'),
		database = new Database('SlingDB.sqlite'),
		db = database.openDb(),
		gradeCode,
		limit,
		type,
		slingSize,
		slingSizeAuto8,
		slingSizeAuto10,
		legLength = Math.ceil(parseFloat(Alloy.Globals.sling.nominalLength));
	
	// sort Angle
	if( Alloy.Globals.sling.angle === 45 ){
		limit = 'limit45';
	}else{	
		limit = 'limit60';
	}
	
	if( Alloy.Globals.sling.type === 'Chain'){
	// Configure a part code for a Chain Sling
		
		// sort Code	
		if( Alloy.Globals.sling.grade === 8 ){
			
			// 'A' represents Grade 8 in the finished part code
			gradeCode = 'A';
			
			var sql = 'SELECT * FROM WorkingLoadLimits WHERE legs = "' + Alloy.Globals.sling.legs + '" AND grade = "8" AND ' + limit + ' >= ' + Alloy.Globals.sling.load + ' AND type = "c" ORDER BY ' +  limit + ' ASC LIMIT 1';
			
			Ti.API.info(sql);
				
			var newRow = db.execute(sql);
			
			// Store Sling size
			if( newRow.isValidRow() ){	
				slingSize = newRow.fieldByName('size');
			
			}else{
				
				Ti.API.info('Grade 8 Limited Exceeded');
				
				Alloy.Globals.sling.limitExceeded = true;
			}
			
		}else if( Alloy.Globals.sling.grade === 10){
			
			// 'X' represents Grade 10 in the finished part code
			gradeCode = 'X';
			
			var sql = 'SELECT * FROM WorkingLoadLimits WHERE legs = "' + Alloy.Globals.sling.legs + '" AND grade = "10" AND ' + limit + ' >= ' + Alloy.Globals.sling.load + ' AND type = "c" ORDER BY ' +  limit + ' ASC LIMIT 1';
			
			Ti.API.info(sql);
			
			var newRow = db.execute(sql);
			
			// Store Sling size
			if( newRow.isValidRow() ){	
				slingSize = newRow.fieldByName('size');
			
			}else{
				
				Ti.API.info('Grade 10 Limited Exceeded');
				
				Alloy.Globals.sling.limitExceeded = true;
			}
			
		}else if( Alloy.Globals.sling.grade === 'Auto'){
			// Query DB with known info to get sling size
			
			var sql = 'SELECT * FROM WorkingLoadLimits WHERE legs = "' + Alloy.Globals.sling.legs + '" AND grade = "8" AND ' + limit + ' >= ' + Alloy.Globals.sling.load + ' AND type = "c" ORDER BY ' +  limit + ' ASC LIMIT 1';
			
			Ti.API.info(sql);
			
			var row8 = db.execute(sql);
				
			// Store Sling size
			if( row8.isValidRow() ){	
				slingSizeAuto8 = row8.fieldByName('size');
				
				Ti.API.info('sling size 8: ' + slingSizeAuto8 );
			}else{
				
				Ti.API.info('Auto 8 Limited Exceeded');
				
				Alloy.Globals.sling.limitExceeded = true;
			}
			
			var sql = 'SELECT * FROM WorkingLoadLimits WHERE legs = "' + Alloy.Globals.sling.legs + '" AND grade = "10" AND ' + limit + ' >= ' + Alloy.Globals.sling.load + ' AND type = "c" ORDER BY ' +  limit + ' ASC LIMIT 1';
			
			Ti.API.info(sql);
			
			var row10 = db.execute(sql);
					
			// Store Sling size
			if( row10.isValidRow() ){	
				slingSizeAuto10 = row10.fieldByName('size');
				
				Ti.API.info('sling size 10: ' + slingSizeAuto10 );
			}else{
				
				Ti.API.info('Auto 10 Limited Exceeded');
				
				Alloy.Globals.sling.limitExceeded = true;
			}
		}
		
	}else{
	// Configure a part code for a Wire Rope Sling
		
		type = 'r';
		
		var sql = 'SELECT * FROM WorkingLoadLimits WHERE legs = "' + Alloy.Globals.sling.legs + '" AND ' + limit + ' >= ' + Alloy.Globals.sling.load + ' AND type = "' + type + '" ORDER BY ' +  limit + ' ASC LIMIT 1';
		Ti.API.info(sql);
		// Query DB with known info to get sling size
		var newRow = db.execute(sql);
		
		// Store Sling size
		if( newRow.isValidRow() ){	
			
			slingSize = newRow.fieldByName('size');
		
		}else{
				
				Ti.API.info('Limited Exceeded');
				
				Alloy.Globals.sling.limitExceeded = true;
			}
	}
	
	if( Alloy.Globals.sling.shorteningDeviceCode === 'NONE' ){
		Alloy.Globals.sling.shorteningDeviceCode = 0;
	}
	if( Alloy.Globals.sling.lowerTerminationCode === 'NONE' ){
		Alloy.Globals.sling.lowerTerminationCode = 0;
	}
	if( Alloy.Globals.sling.upperTerminationCode === 'NONE' ){
		Alloy.Globals.sling.upperTerminationCode = 0;
	}
	
	// If the sling load limit has not been exceeded
	// Continue to format the sling size
	if( !Alloy.Globals.sling.limitExceeded ){
		// Pad sling size if neccessary
		if( slingSize < 10 ){
			slingSize = '0' + slingSize;
		}
		
		if( slingSizeAuto8 < 10 ){
			slingSizeAuto8 = '0' + slingSizeAuto8;
		}
		
		if( slingSizeAuto10 < 10 ){
			slingSizeAuto10 = '0' + slingSizeAuto10;
		}
		
		// Pad nominal length if neccessary
		if( legLength < 10 ){
			legLength = '0' + legLength;
		}
	}
	
	// Create a Chain Sling part code
	if( Alloy.Globals.sling.type === 'Chain' ){
		
		if( Alloy.Globals.sling.grade !== 'Auto'){
			
			Alloy.Globals.sling.partCode = gradeCode + slingSize + '.' + Alloy.Globals.sling.legs + legLength + '.' + Alloy.Globals.sling.lowerTerminationCode + Alloy.Globals.sling.shorteningDeviceCode;
			
		}else{
			
			Alloy.Globals.sling.partCode = 'A' + slingSizeAuto8 + '.' + Alloy.Globals.sling.legs + legLength + '.' + Alloy.Globals.sling.lowerTerminationCode + Alloy.Globals.sling.shorteningDeviceCode
											+ ' or ' +
											'X' + slingSizeAuto10 + '.' + Alloy.Globals.sling.legs + legLength + '.' + Alloy.Globals.sling.lowerTerminationCode + Alloy.Globals.sling.shorteningDeviceCode;
		}
	
	
	// Create a Wire Rope sling part code	
	}else{
		
		// If legs === 1 add upper temination
		if( Alloy.Globals.sling.legs === 1){

			if(Alloy.Globals.sling.upperTerminationCode === 'NONE'){
				
				Alloy.Globals.sling.partCode = 'RS0' + slingSize + '.' + Alloy.Globals.sling.legs + legLength + '.' + Alloy.Globals.sling.lowerTerminationCode;
			}else{
				
				Alloy.Globals.sling.partCode = 'RS0' + slingSize + '.' + Alloy.Globals.sling.legs + legLength + '.' + Alloy.Globals.sling.lowerTerminationCode + Alloy.Globals.sling.upperTerminationCode;
			}
		}else{
			
			Alloy.Globals.sling.partCode = 'RS0' + slingSize + '.' + Alloy.Globals.sling.legs + legLength + '.' + Alloy.Globals.sling.lowerTerminationCode;
		}
	}
	
	database.closeDb(db);
	
	Ti.API.info("createPartcode generated code: " + Alloy.Globals.sling.partCode);
	
	return Alloy.Globals.sling.partCode;
}

function outputDetails( type, grade, legs, load, nominalLength, description, partCode, quote ){
	Ti.API.info("outputDetails()");
	$.slingType.text = type;
	$.grade.text = grade;
	$.legs.text = legs;
	$.load.text = load;
	$.length.text = nominalLength;
	$.description.text = description;
	
	if( type === 'Wire Rope'){
		
		if ($.labelGrade) {
			//$.labelGrade.setHeight(0);
			$.labelGrade.hide();
		}
		
		if ($.labelGradeReq) {
			//$.labelGradeReq.setHeight(0);
			$.labelGradeReq.hide();
		}
		
		if ($.labelGradeSling) {
			//$.labelGradeSling.setHeight(0);
			$.labelGradeSling.hide();
		}
		
		//$.grade.setHeight(0);
		$.grade.hide();
		
		//$.slingSpecGrade.setHeight(0);
		$.slingSpecGrade.hide();
	}
	
	if( description === null ){
		$.descriptionContainer.hide();
		$.descriptionContainer.height = 0;
		
	}else{
		
		$.description.text = 'Description: ' + description;
	}
	
	Ti.API.info('price: ' + Alloy.Globals.sling.quotedPrice + ' grade: ' + Alloy.Globals.sling.grade );
	
	if( !Alloy.Globals.sling.limitExceeded ){
		
		if( Alloy.Globals.sling.quotedPrice === null && Alloy.Globals.sling.grade === 'Auto'){
			
			$.specPartcode.text = 'Based on your requirements, we have identified two possible sling configurations: ' + partCode;
			$.quotedPrice.text = "We cannot quote you a price for your configured slings, this may be because we do not offer these terminations in this size or grade. Please contact William Hackett Chains and reference your part code.";
			$.requestQuote.hide();
		
		}else if( Alloy.Globals.sling.quotedPrice === null && Alloy.Globals.sling.grade !== 'Auto'){
			
			$.specPartcode.text = 'Based on your requirements, we recommend the following sling configuration: ' + partCode;
			$.quotedPrice.text = "We cannot quote you a price for your configured slings, this may be because we do not offer these terminations in this size or grade. Please contact William Hackett Chains and reference your part code.";
			$.requestQuote.hide();
		
		}else if( Alloy.Globals.sling.quotedPrice !== null && Alloy.Globals.sling.grade !== 'Auto' ){
			
			$.quotedPrice.text = 'Price (RRP): £' + Alloy.Globals.sling.quotedPrice;
			$.specPartcode.text = 'Based on your requirements, we recommend the following sling configuration: ' + partCode;
			$.requestQuote.show();
			
		}else if( Alloy.Globals.sling.quotedPrice !== null && Alloy.Globals.sling.grade === 'Auto' ){
			
			$.quotedPrice.text = 'Price (RRP): £' + Alloy.Globals.sling.quotedPrice;
			$.specPartcode.text = 'Based on your requirements, we recommend the following sling configuration: ' + partCode;
			$.requestQuote.show();
			
		}
	
	}else{
		alert('The Maximum Working Load Limit has been exceeded for your sling. Please go back and enter a new load.');
		$.quotedPrice.text = "We cannot quote you a price for your configured slings, this may be because we do not offer these terminations in this size or grade. Please contact William Hackett Chains and reference your part code.";
		$.requestQuote.hide();
				
	}
}


/**
 * Check if we have an image to display
 * 
 */
function checkImage(partCode) {
	// Display Image
	Ti.API.info('specifications: checkImage()');
	// Hide the view button by default
	//$.viewSlingAssembly.hide();
	//$.slingAssemblyImg.setHeight(0);
	$.slingAssemblyImg.hide();
	
	var data = new Database('SlingDB.sqlite'),
		db = database.openDb(),
		row = db.execute('SELECT img FROM Slings WHERE code = ? LIMIT 1', partCode),
		//row = db.execute('SELECT img FROM Slings WHERE code = ? AND img_status = ? LIMIT 1', partCode, 1),
		img = null,
		imgPath = null,
		f = null;
	
	if (row.isValidRow()) {		
		img = row.fieldByName('img');			
		var url = 'http://whackett.hippocreative.com/img/' + "slings/" + img + ".jpg";		
		imgPath = Ti.Filesystem.applicationDataDirectory + "slings/" + img + ".jpg";		
		//f = Ti.Filesystem.getFile(imgPath);
		Ti.API.info("Valid! Partcode " + partCode + " has img " + img + ": " + imgPath);
		//$.viewSlingAssembly.hide();
		//Ti.API.info('image set ' + f.nativePath);
		//$.slingAssemblyImg.image = f;
		$.slingAssemblyImg.image = url;
		Ti.API.info('image set ' + url);
		$.slingAssemblyImg.show();
	} else {
		Ti.API.info("Sling assembly image " + img + " does not exist.");
	}
	row.close();
	db.close();
}


function checkSpec() {
	Ti.API.info("checkSpec");
	
	// Hide the view button by default
	$.slingSpecification.hide();
	
	var wllAngle = Alloy.Globals.wllAngle,
		wllId = Alloy.Globals.wllId,
		slingId = Alloy.Globals.slingId,
		database = new Database('SlingDB.sqlite'),
		db = database.openDb(),
		sql = null,
		row = null;
			
	if (wllId === null && slingId === null) {
		return;
	}
	
	row = db.execute('SELECT * FROM WorkingLoadLimits AS wll, Slings AS s WHERE wll.id = ? AND s.id = ? LIMIT 1', wllId, slingId);
	
	if (row.isValidRow()) {
			
		Ti.API.info('Found Working Load Limit and Sling Specification by IDs!');
		
		switch (row.fieldByName("type")) {
			case "c": $.slingSpecType.text = "Chain"; break;
			case "r": $.slingSpecType.text = "Wire Rope"; break;
			// No default
		}
		
		$.slingSpecGrade.text = row.fieldByName("grade");
		$.slingSpecLegs.text = row.fieldByName("legs");
		$.slingSpecLoad.text = row.fieldByName(wllAngle);
		$.slingSpecLength.text = row.fieldByName("length");
		$.slingSpecSize.text = row.fieldByName("size");
		
		$.slingSpecification.show();
		
		Alloy.Globals.sling.specLoad = row.fieldByName(wllAngle);
		
	} else {
		
		Alloy.Globals.sling.specLoad = null;
		
	}
	
	row.close();
	db.close();
		
}


/**
 * View the assembly image (button toggle)
 */
function viewSlingAssembly() {
	if ($.slingAssemblyImg.getVisible()) {
		$.slingAssemblyImg.hide();
		$.slingAssemblyImg.setTop(0);
		$.slingAssemblyImg.setBottom(0);
		//$.slingAssemblyImg.setHeight(0);
	} else {
		$.slingAssemblyImg.show();
		$.slingAssemblyImg.setTop("8dip");
		$.slingAssemblyImg.setBottom("16dip");
		//$.slingAssemblyImg.setHeight("auto");
	}
}


function closeModal(){
	$.specifications.close({modal: true});
}


function sendQuote(){
	
	var Common = require('common'),
		common = new Common(),
		Connection = require('connections'),
		connection = new Connection(),
		Database = require('databaseObj'),
		database = new Database('SlingDB.sqlite'),
		user = database.getCurrentUserDetails(),
		online = connection.onlineCheck(function(data){
			
			// perform an ajax call within the connection object
			// if a value is returned, there is an internet connection
			// Online will now equal "true"
			var online;
		
			if(data === 1){
				online = true;
			}else{
				online = false;
			}
			
			return online;
		});
	
	Ti.API.info("user");
	
	var quoteData = {
		type: Alloy.Globals.sling.type,
		grade: Alloy.Globals.sling.grade,
		legs: Alloy.Globals.sling.legs,
		load: Alloy.Globals.sling.load,
		length: Alloy.Globals.sling.nominalLength,
		partCode: Alloy.Globals.sling.partCode,
		price: Alloy.Globals.sling.quotedPrice,
		description: Alloy.Globals.sling.slingDescription,
		date: common.getDate(),
		user: user.email,
		specLoad: Alloy.Globals.sling.specLoad,
		addtodb: 1
	};
	
	quoteData.ref = common.generateQuoteRef(user, quoteData);
	
	database.insertQuoteOffline(quoteData);
	
	// perform a check to see if we are connected
	if( online ){
		database.insertQuoteOnline(quoteData);
		// If we are the quote must be stored locally as well as
		// on the online database
		//database.insertQuoteOnline( Alloy.Globals.sling.type, Alloy.Globals.sling.grade, Alloy.Globals.sling.legs, Alloy.Globals.sling.load, Alloy.Globals.sling.nominalLength, Alloy.Globals.sling.partCode, Alloy.Globals.sling.quotedPrice, Alloy.Globals.sling.slingDescription, common.getDate(), common.createUnix(), user, 1);
		//database.insertQuoteOffline( Alloy.Globals.sling.type, Alloy.Globals.sling.grade, Alloy.Globals.sling.legs, Alloy.Globals.sling.load, Alloy.Globals.sling.nominalLength, Alloy.Globals.sling.partCode, Alloy.Globals.sling.quotedPrice, Alloy.Globals.sling.slingDescription, common.getDate(), common.createUnix(), user);		
	}else{
		// If there isn't a connection make sure that 
		// the quote is stored offline for later
		//database.insertQuoteOffline( Alloy.Globals.sling.type, Alloy.Globals.sling.grade, Alloy.Globals.sling.legs, Alloy.Globals.sling.load, Alloy.Globals.sling.nominalLength, Alloy.Globals.sling.partCode, Alloy.Globals.sling.quotedPrice, Alloy.Globals.sling.slingDescription, common.getDate(), common.createUnix(), user);
	}
	
	

	// Hide the close button and the request a quote button.
	// This means a user can't make multiple requests for a quote
	// and so the only way back for the user is to the dashboard
	$.close.hide();
	//$.close.height = 0;
	$.requestQuote.hide();
	//$.requestQuote.height = 0;
	
	$.backToDash.show();
	//$.backToDash.height = '26dip';
}

function openDash(){
	
	$.specifications.close({modal: true});
	
	// Because this page is a modal and a child of the slingconfiguration page,
	// we must get the slingConfiguration view again and close it.
	//var slingConfig = Alloy.createController('slingConfiguration').getView();
	var dash = Alloy.createController('dashboard').getView();
	
	//slingConfig.close();
	dash.open();
}

