if (Alloy.Globals.sling.type === "Chain") {

	$.upperTermView.hide();
	$.upperTermView.height = 0;

} else if (Alloy.Globals.sling.type === 'Wire Rope') {

	if (Alloy.Globals.sling.legs === 1) {

		$.shorteningDeviceView.hide();
		$.shorteningDeviceView.height = 0;
	} else {

		$.shorteningDeviceView.hide();
		$.shorteningDeviceView.height = 0;
		$.upperTermView.hide();
		$.upperTermView.height = 0;
	}
}

Alloy.Globals.shorteningCode = 0;
Alloy.Globals.lowerTermCode = 0;
Alloy.Globals.upperTermCode = 0;

function createPicker(e) {

	var upperTerminations = [],
	    lowerTerminations = [],
	    shorteningDevices = [];

	var db = Ti.Database.open('SlingDB.sqlite');

	if (Alloy.Globals.sling.type === 'Chain') {

		var row;

		if( Alloy.Globals.sling.grade === 10 ){
			
			row = db.execute('SELECT * FROM EndFittings WHERE type = "c" AND grade10_' + Alloy.Globals.sling.legs + ' ="1"');
		
		}else if( Alloy.Globals.sling.grade === 8 ){
			
			row = db.execute('SELECT * FROM EndFittings WHERE type = "c" AND grade8_' + Alloy.Globals.sling.legs + ' ="1"');
			
		}else{
			
			row = db.execute('SELECT * FROM EndFittings WHERE type = "c"');
		}

		while (row.isValidRow()) {

			var code = row.fieldByName('code'),
			    name = row.fieldByName('name');

			var obj = {
				'code' : code,
				'name' : name
			};
			
			// Grab Hooks - not permitted for lower terminations
			if (code != 4) {
				lowerTerminations.push(obj);	
			}

			upperTerminations.push(obj);

			row.next();
		}

	} else if (Alloy.Globals.sling.type === 'Wire Rope') {

		var row = db.execute('SELECT * FROM EndFittings WHERE type = "r"');

		while (row.isValidRow()) {

			var code = row.fieldByName('code'),
			    name = row.fieldByName('name');

			var obj = {
				'code' : code,
				'name' : name
			};

			upperTerminations.push(obj);
			lowerTerminations.push(obj);

			row.next();
		}
	}

	var row = db.execute('SELECT * FROM Shorteners');

	while (row.isValidRow()) {

		var code = row.fieldByName('code'),
		    name = row.fieldByName('name');

		var obj = {
			'code' : code,
			'name' : name
		};

		shorteningDevices.push(obj);

		row.next();
	}

	db.close();

	var picker = Ti.UI.createPicker(),
	    row = Ti.UI.createPickerRow({
		title : 'Select a device...',
		val : false
	}),
	    noDevice = Ti.UI.createPickerRow({
		title : 'No Device',
		val : ''
	}),
	    pickerView = Ti.UI.createView({
		layout : 'vertical',
		bottom : '0dip',
		width : '100%',
		height : Ti.UI.SIZE
	}),
	    pickerMenu = Ti.UI.createView({
		backgroundColor : '#f7561e',
		top : 0,
		height : Ti.UI.SIZE
	}),
	    doneButton = Ti.UI.createButton({
		title : 'Done',
		top : 0,
		right : 0,
		height : Titanium.UI.SIZE,
		width : '60dip',
		backgroundColor : '#f7561e',
		color : '#FFF',
		font : {
			fontSize : 14
		}
	}),


	wrapper = $.content.getParent().getParent();

	picker.add(row);
	picker.add(noDevice);
	pickerMenu.add(doneButton);
	pickerView.add(pickerMenu);
	pickerView.add(picker);

	if (e.source.className === 'shortening') {

		var i;

		for ( i = 0; i < shorteningDevices.length; i++) {

			var obj = Ti.UI.createPickerRow({
				title : shorteningDevices[i].name,
				val : shorteningDevices[i].code
			});

			obj.addEventListener('click', function(e) {

				$.shorteningDeviceText.value = e.title;

				wrapper.remove(pickerView);

			});

			picker.add(obj);

		}

		picker.addEventListener('change', function(e) {

			$.shorteningDeviceText.value = e.row.title;

			$.shorteningImage.image = '/images/shorteners/' + e.row.title + '.jpg';
			
			Ti.API.info(JSON.stringify(e.row));

			Alloy.Globals.sling.shorteningDevice = e.row.title;
			Alloy.Globals.sling.shorteningDeviceCode = e.row.val;

		});

		doneButton.addEventListener('click', function(e) {

			wrapper.remove(pickerView);

		});

		Ti.API.info(wrapper);

	} else if (e.source.className === 'lowerTerminations') {

		var i;

		for ( i = 0; i < lowerTerminations.length; i++) {

			var obj = Ti.UI.createPickerRow({
				title : lowerTerminations[i].name,
				val : lowerTerminations[i].code
			});

			obj.addEventListener('click', function(e) {

				$.lowerTermText.value = e.title;

				wrapper.remove(pickerView);
			});

			picker.add(obj);

		}

		picker.addEventListener('change', function(e) {

			$.lowerTermText.value = e.row.title;

			$.lowerTermImage.image = '/images/terminations/' + e.row.title + '.jpg';
			Ti.API.info("lower term image " + '/images/terminations/' + e.row.title + '.jpg');
			
			Ti.API.info(JSON.stringify(e.row));

			Alloy.Globals.sling.lowerTermination = e.row.title;
			Alloy.Globals.sling.lowerTerminationCode = e.row.val;

		});

		doneButton.addEventListener('click', function(e) {

			wrapper.remove(pickerView);

		});

	} else if (e.source.className === 'upperTerminations') {

		var i;

		for ( i = 0; i < upperTerminations.length; i++) {

			var obj = Ti.UI.createPickerRow({
				title : upperTerminations[i].name,
				val : upperTerminations[i].code
			});

			obj.addEventListener('click', function(e) {

				$.upperTermText.value = e.title;

				wrapper.remove(pickerView);
			});

			picker.add(obj);

		}

		picker.addEventListener('change', function(e) {

			$.upperTermText.value = e.row.title;

			$.upperTermImage.image = '/images/terminations/' + e.row.title + '.jpg';
			Ti.API.info("upper term image " + '/images/terminations/' + e.row.title + '.jpg');
			
			Ti.API.info(JSON.stringify(e.row));

			Alloy.Globals.sling.upperTermination = e.row.title;
			Alloy.Globals.sling.upperTerminationCode = e.row.val;

		});

		doneButton.addEventListener('click', function(e) {

			wrapper.remove(pickerView);

		});

	}

	wrapper.add(pickerView);

}

