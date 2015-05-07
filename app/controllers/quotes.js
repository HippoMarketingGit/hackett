var args = arguments[0] || {};

function getData(){
	
	var Database = require('databaseObj'),
		database = new Database('SlingDB.sqlite'),
		db = database.openDb(),
		user = database.getCurrentUser(),
		row = db.execute('SELECT * FROM Quotes WHERE user = "' + user + '"'),
		array = [];
	
	while( row.isValidRow() ){
		
		var obj = {
				type: row.fieldByName('type'),
				grade: row.fieldByName('Grade'),
				legs: row.fieldByName('legs'),
				load: row.fieldByName('load'),
				length: row.fieldByName('length'),
				partCode: row.fieldByName('partCode'),
				price: row.fieldByName('price'),
				description: row.fieldByName('description'),
				date: row.fieldByName('date'),
				ref: row.fieldByName('ref'),
				user: row.fieldByName('user')
			};
			
	
		var tableRow = Ti.UI.createTableViewRow({
				width: '100%',
			}),
			container = Ti.UI.createView({
				top:'10dip',
				left: '0',
				layout: 'vertical',
				height: Ti.UI.SIZE,
				width: '100%'
			}),
			separator = Ti.UI.createView({
				height: '1dip',
				width: '100%',
				top: '4dip',
				left: '20dip',
				backgroundColor: '#1e4fa2'
			}),
			partCode = Ti.UI.createLabel({
				left: '20dip',
				top: '0',
				text: row.fieldByName('partCode'),
				font:{
					fontSize: '14px'
				},
				color: '#FFF'
			}),
			date = Ti.UI.createLabel({
				left: '20dip',
				top: '4dip',
				text: "Created on " + row.fieldByName('date'),
				font:{
					fontSize: '14px'
				},
				color: '#FFF'
			}),
			ref = Ti.UI.createLabel({
				left: '20dip',
				top: '4dip',
				text: row.fieldByName('ref'),
				font:{
					fontSize: '16px'
				},
				color: '#FFF'
			}),
			description = Ti.UI.createLabel({
				left: '20dip',
				top: '4dip',
				right: '20dip',
				text: row.fieldByName('description'),
				font:{
					fontSize: '12px'
				},
				color: '#FFF'
			});
			
		container.add(ref);
		container.add(date);
		container.add(description);
		container.add(partCode);
		container.add(separator);
		
		tableRow.add(container);
		tableRow.hasChild = true;
		tableRow.dest = 'quotesDetail';
		tableRow.quote = obj;
		tableRow.borderColor = 'transparent';
		
		array.push(tableRow);
		
		row.next();
	}
	
	return array;
	
	database.closeDb(db);
}

(function(){
	
	var table = Ti.UI.createTableView({
			height: '100%',
			width: '100%',
			backgroundColor: "transparent"
		});
		
	if (Ti.Platform.name === 'iPhone OS'){
		table.separatorStyle = Titanium.UI.iPhone.TableViewSeparatorStyle.NONE;
	}
	// Get the data and store it in the array
	table.setData(getData());
	
	$.container.add(table);
	
	table.addEventListener('click', function(e){
		
		if( e.row.hasChild){
			
			var data = e.row,
				details = Alloy.createController('quotesDetail', data.quote).getView();
			
			// Ti.API.info("quote row click");
			// Ti.API.info(JSON.stringify(data));
			
			details.open({modal:true});
			
			details.addEventListener('close', function(){
				
				var data = getData();
				
				table.setData(data);
			});
		}
	});
}());

function openDash(e){
	
	var win = Alloy.createController('dashboard').getView();
	win.open();
	
	$.quotes.close();
	$.quotes = null;

}