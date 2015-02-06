/**
 * @author Ben Hall
 */

function Sling(){

	this.type = null;
	this.grade = null;
	this.legs = null;
	this.load = null;
	this.masterLink = null;
	this.angle = null;
	this.nominalLength = null;
	this.lowerTermination = null;
	this.lowerTerminationCode = null;
	this.upperTermination = null;
	this.upperTerminationCode = null;
	this.shorteningDevice = null;
	this.shorteningDeviceCode = null;
	this.partCode = null;
	this.quotedPrice = null;
	this.slingDescription = null;
	this.limitExceeded = false;
	
}

Sling.prototype.getPartCode = function(database){
	
	var self = this,
		db = database.openDb(),
		legLength = Math.ceil( self.nominalLength ),
		angle,
		grade,
		shortener,
		end,
		upper;
		
	// Create Part Code
	if( self.type === 'Chain' ){
		
		var grade,
			shortener,
			end;
		
		if( self.grade === 8 || self.grade === 10 ){
			
			var row = db.execute('SELECT * FROM WorkingLoadLimits AS wll, Slings AS s WHERE wll.limit' + self.angle +' >= ' + self.load + ' AND wll.type=\"c\" AND wll.legs = ' + self.legs + ' AND s.legs=wll.legs AND (wll.grade = ' + self.grade + ') AND (s.size=wll.size AND s.grade=wll.grade AND end = \"' + self.lowerTerminationCode + '\" AND s.shortener LIKE "' + self.shorteningDeviceCode + '" AND s.length = "' + legLength + '") group by wll.id ORDER BY ' + angle +' LIMIT 1');
			
			if( row.isValidRow() ){
				
				self.partCode = row.fieldByName('code');
				self.quotedPrice = row.fieldByName('price');
				self.slingDescription = row.fieldByName('description');
				
			}else{
				
				createPartcode();
			}
			
		}else if( self.grade === 'Auto' ){
			
			var price8,
				code8,
				description8,
				price10,
				code10,
				description10,
				grade,
				shortener,
				end;
		
		if( self.shorteningDeviceCode === ""){
			shortener = 'AND s.shortener IS NULL';
		}else{
			shortener = 'AND s.shortener LIKE "' + self.shorteningDeviceCode + '"';
		}
		
		if( self.lowerTerminationCode === ""){
			end = 'AND s.end IS NULL';
		}else{
			end = 'AND s.end = "' + self.lowerTerminationCode + '"';
		}
			
			var row8 = db.execute('SELECT * FROM WorkingLoadLimits AS wll, Slings AS s WHERE wll.limit' + self.angle + ' >= ' +  self.load + ' AND wll.type="c" AND wll.legs = ' + self.legs + ' AND s.legs = wll.legs AND (wll.grade = "8" ) AND (s.size=wll.size AND s.grade=wll.grade ' + end + ' ' + shortener + ' AND s.length = ' + legLength + ') group by wll.id ORDER BY ' + angle +' ASC');
			
			if( row8.isValidRow() ){

				price8 = row8.fieldByName('price');
				code8 = row8.fieldByName('code');
				description8 = row8.fieldByName('description');
			
			}else{
				//row 8 create part code
				
				createPartcode();
			}
			
			var row10 = db.execute('SELECT * FROM WorkingLoadLimits AS wll, Slings AS s WHERE wll.limit' + self.angle + ' >= ' + self.load + ' AND wll.type="c" AND wll.legs = ' + self.legs + ' AND s.legs=wll.legs AND (wll.grade = "10" ) AND (s.size=wll.size AND s.grade=wll.grade ' + end + ' ' + shortener + ' AND s.length = ' + legLength + ') group by wll.id ORDER BY ' + angle +' ASC');

			if( row10.isValidRow() ){

				price10 = row10.fieldByName('price');
				code10 = row10.fieldByName('code');
				description10 = row10.fieldByName('description');
			
			}else{
				
				//row 10 create part code
				
				createPartcode();
			}
			
			if( (price8 === undefined || price8 === null) && (price10 === undefined || price10 === null) ){
				self.quotedPrice = null;
				self.slingDescription = null;
			
			}else if( price10 === undefined || price10 === null ){
				
				self.partCode = code8;
				self.quotedPrice = price8;
				self.slingDescription = description8;
			
			}else if( price8 === undefined || price8 === null ){
				
				self.partCode = code10;
				self.quotedPrice = price10;
				self.slingDescription = description10;
			
			}else if( parseInt(price8) < parseInt(price10) ){
				
				self.partCode = code8;
				self.quotedPrice = price8;
				self.slingDescription = description8;
				self.gradeCode = 8;
			
			}else if( parseInt(price8) > parseInt(price10) ){
				
				self.partCode = code10;
				self.quotedPrice = price10;
				self.slingDescription = description10;
				self.gradeCode = 10;	
			
			}else if( parseInt(price8) === parseInt(price10) ){
				
				self.partCode = code10;
				self.quotedPrice = price10;
				self.slingDescription = description10;
				self.gradeCode = 10;
			}
		}
		
	}else if( self.type === 'Wire Rope' ){
		
		self.grade = null;
		self.quotedPrice = null;
		self.slingDescription = null;
		
		createPartcode();
		
		if( cb ){
			
			// return details of the object to a callback
			// if it exists
			cb(self);
		}
	}
	
	if( cb() ){
			
		// return details of the object to a callback
		// if it exists
		cb(self);
	}
	
	database.closeDb(db);
	
};

Sling.prototype.checkLimit = function(){
	
	// Definte the working load limits for the different grade chains
	// The working load limit varies depending on leg length and grade
	var self = this,
		angle,
		proceed = false,
		limits = {
			4: {
				grade8: {
					45: 45,
					60: 31.5
				},
				grade10: {
					45: 40,
					60: 28
				}
			},
			3: {
				grade8: {
					'fortyFive': 67,
					'sixty': 47.5
				},
				grade10: {
					'fortyFive': 40,
					'sixty': 28
				}
			},
			2: {
				grade8: {
					'fortyFive': 45,
					'sixty': 31.5
				},
				grade10: {
					'fortyFive': 26.5,
					'sixty': 19
				}
			},
			1: {
				grade8: {
					'fortyFive': 31.5,
					'sixty': 31.5
				},
				grade10: {
					'fortyFive': 19,
					'sixty': 19
				}
			}
		};
		
	if(this.angle === 45 ){
		
		angle = 'fortyFive';
		
	}else if(this.angle === 60){
		
		angle = 'sixty';
	}
	
	// Loop through Leg objects inside of Limits
	for( legs in limits ){
		
		var legObj = limits[legs];
		
		// If the amount legs selected by the user is equal to "legObj"
		// perform another check 
		if( legs === self.legs.toString() ){
			
			//Ti.API.info(legObj);
	
			// Loop through grade Objects inside of Leg Objects
			for( x in legObj){
				
				// grade10 or grade8
				var obj = legObj[x];

				// This will now be the grade 8 or grade 10 object
				// Within the legs objects
				if( ('grade' + self.grade) === x){
					
					// Get the angle 
					var limit = obj[self.angle];
					
					Ti.API.info('limit: ' + limit );
					Ti.API.info('load: ' + parseFloat(self.load) );
					
					if( parseFloat(self.load) > limit ){
						
						Ti.API.info('false');
						proceed = false;
					}else{
						Ti.API.info('true');
						proceed = true;
					}
				}
			// Second For ends
			}	
		// Legs 'If' end	
		}
	// For end
	}
	
	return proceed;
};

module.exports = Sling;