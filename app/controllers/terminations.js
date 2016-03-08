// Flags to determine if a given thing termination should be done.
// This gets changed based on sling type.
var doShorteningDevs = true,
	doUpperTerms = true,
	doLowerTerms = true;

if (Alloy.Globals.sling.type === "Chain") {

	doUpperTerms = false;
	$.upperTermView.hide();
	$.upperTermView.height = 0;

} else if (Alloy.Globals.sling.type === 'Wire Rope') {

	if (Alloy.Globals.sling.legs === 1) {
		doShorteningDevs = false;
		$.shorteningDeviceView.hide();
		$.shorteningDeviceView.height = 0;
	} else {
		doShorteningDevs = false;
		$.shorteningDeviceView.hide();
		$.shorteningDeviceView.height = 0;
		doUpperTerms = false;
		$.upperTermView.hide();
		$.upperTermView.height = 0;
	}
	
}

// Defaults
Alloy.Globals.shorteningCode = 0;
Alloy.Globals.lowerTermCode = 0;
Alloy.Globals.upperTermCode = 0;

// Get the lists of available items
var lists = generateLists();

// Determine how to do the UI based on platform and then call the appropriate function
switch (Ti.Platform.osname) {
	case "iphone":
	case "ipad":
		setupAppleUI();
	break;
	case "android":
		setupAndroidUI();
	break;
}


/**
 * Do the Apple UI for iOS on iPhone and iPad.
 * The Apple Picker UI is a fixed height (same as keyboard, for interface rules!)...
 * This means that the Apple picker UI needs to be placed in a separate window/dialog, and appear on demand.
 * 
 */
function setupAppleUI() {
	
	var windowOpts = {
		layout : 'vertical',
		bottom : '0dip',
		width : '100%',
		height : Ti.UI.SIZE,
		exitOnClose: true,
		layout: 'vertical',
		backgroundColor: '#f7561e'
	};
	
	var menuOpts = {
		backgroundColor: '#f7561e',
		top: 0,
		height: Ti.UI.SIZE
	};
	
	var buttonOpts = {
		title: 'Done',
		top: 0,
		right: 0,
		height: Titanium.UI.SIZE,
		width: '60dip',
		backgroundColor: '#f7561e',
		color: '#FFF',
		font: {
			fontSize: 14
		}
	};
	
	if (doShorteningDevs) {
		
		var shortenersWin = Ti.UI.createWindow(windowOpts),
			shortenersPickerMenu = Ti.UI.createView(menuOpts),
			shortenersDoneButton = Ti.UI.createButton(buttonOpts);
			
		shortenersWin.add(shortenersDoneButton);
		shortenersWin.add(shortenersPickerMenu);
		
		shortenersDoneButton.addEventListener("click", function() {
			shortenersWin.close();
		});
		
		setupPicker({
			itemList: lists.shorteningDevices, 
			parentEl: shortenersPickerMenu,
			selectCb: function(e) {
				Ti.API.info(e);
			},
			changeCb: function(e) {
				$.shorteningDeviceText.value = e.row.title;
				$.shorteningImage.image = '/images/shorteners/' + e.row.title + '.jpg';
				Ti.API.info(JSON.stringify(e.row));
				Alloy.Globals.sling.shorteningDevice = e.row.title;
				Alloy.Globals.sling.shorteningDeviceCode = e.row.val;
			}
		});
		
		$.shorteningDeviceText.addEventListener("click", function() {
			shortenersWin.open();
		});
		
		$.buttonPickShortener.addEventListener("click", function() {
			shortenersWin.open();
		});
		
	}
	
	if (doUpperTerms) {
		
		var uppersWin = Ti.UI.createWindow(windowOpts),
			uppersPickerMenu = Ti.UI.createView(menuOpts),
			uppersDoneButton = Ti.UI.createButton(buttonOpts);
			
		uppersWin.add(uppersDoneButton);
		uppersWin.add(uppersPickerMenu);
		
		uppersDoneButton.addEventListener("click", function() {
			uppersWin.close();
		});
		
		setupPicker({
			itemList: lists.upperTerminations, 
			parentEl: uppersPickerMenu,
			selectCb: function(e) {
				Ti.API.info(e);
			},
			changeCb: function(e) {
				$.upperTermText.value = e.row.title;
				$.upperTermImage.image = '/images/terminations/' + e.row.title + '.jpg';
				Ti.API.info(JSON.stringify(e.row));
				Alloy.Globals.sling.upperTermination = e.row.title;
				Alloy.Globals.sling.upperTerminationCode = e.row.val;
			}
		});
		
		$.upperTermText.addEventListener("click", function() {
			uppersWin.open();
		});
		
		$.buttonPickUpper.addEventListener("click", function() {
			uppersWin.open();
		});

	}
	
	if (doLowerTerms) {
		
		var lowersWin = Ti.UI.createWindow(windowOpts),
			lowersPickerMenu = Ti.UI.createView(menuOpts),
			lowersDoneButton = Ti.UI.createButton(buttonOpts);
			
		lowersWin.add(lowersDoneButton);
		lowersWin.add(lowersPickerMenu);
		
		lowersDoneButton.addEventListener("click", function() {
			lowersWin.close();
		});
		
		setupPicker({
			itemList: lists.lowerTerminations, 
			parentEl: lowersPickerMenu,
			selectCb: function(e) {
				Ti.API.info(e);
			},
			changeCb: function(e) {
				$.lowerTermText.value = e.row.title;
				$.lowerTermImage.image = '/images/terminations/' + e.row.title + '.jpg';
				Ti.API.info(JSON.stringify(e.row));
				Alloy.Globals.sling.lowerTermination = e.row.title;
				Alloy.Globals.sling.lowerTerminationCode = e.row.val;
			}
		});
		
		$.lowerTermText.addEventListener("click", function() {
			lowersWin.open();
		});
		
		$.buttonPickLower.addEventListener("click", function() {
			lowersWin.open();
		});

	}

}


/**
 * Set up the picker stuff for Android.
 * 
 * For Android, the native one behaves much more like a web-based dropdown menu.
 * As such, the Picker view is placed directly in the view, and sized appropriately.
 * 
 */
function setupAndroidUI() {
	
	$.shorteningDeviceText.hide();
	$.shorteningDeviceText.height = 0;
	$.buttonPickShortener.hide();
	$.buttonPickShortener.height = 0;
	
	$.upperTermText.hide();
	$.upperTermText.height = 0;
	$.buttonPickUpper.hide();
	$.buttonPickUpper.height = 0;
	
	$.lowerTermText.hide();
	$.lowerTermText.height = 0;
	$.buttonPickLower.hide();
	$.buttonPickLower.height = 0;

	if (doShorteningDevs) {
		setupPicker({
			itemList: lists.shorteningDevices, 
			parentEl: $.pickerWrapperShortening, 
			selectCb: function(e) {
				Ti.API.info(e);
			},
			changeCb: function(e) {
				$.shorteningImage.image = '/images/shorteners/' + e.row.title + '.jpg';
				Ti.API.info(JSON.stringify(e.row));
				Alloy.Globals.sling.shorteningDevice = e.row.title;
				Alloy.Globals.sling.shorteningDeviceCode = e.row.val;
			}
		});
				
	}
	
	if (doUpperTerms) {
		setupPicker({
			itemList: lists.upperTerminations, 
			parentEl: $.pickerWrapperUpper, 
			selectCb: function(e) {
				Ti.API.info(e);
			},
			changeCb: function(e) {
				$.upperTermImage.image = '/images/terminations/' + e.row.title + '.jpg';
				Ti.API.info(JSON.stringify(e.row));
				Alloy.Globals.sling.upperTermination = e.row.title;
				Alloy.Globals.sling.upperTerminationCode = e.row.val;
			}
		});
	}
	
	if (doLowerTerms) {
		setupPicker({
			itemList: lists.lowerTerminations, 
			parentEl: $.pickerWrapperLower, 
			selectCb: function(e) {
				Ti.API.info(e);
			},
			changeCb: function(e) {
				$.lowerTermImage.image = '/images/terminations/' + e.row.title + '.jpg';
				Ti.API.info(JSON.stringify(e.row));
				Alloy.Globals.sling.lowerTermination = e.row.title;
				Alloy.Globals.sling.lowerTerminationCode = e.row.val;
			}
		});		
	}

	
}


/**
 * Create a picker for a given list, and places it into the given parent.
 * 
 * The keys for the options are:
 * 
 * - itemList: the array of items to add to the picker.
 * - parentEl: the parent View (or descendant class) in which to place the generated picker.
 * - selectCb: a function to be called when an item is selected (event on individual item)
 * - changeCb: a function to be called when the picker selection is changed (event on picker)
 * 
 * 
 * @param object options		Object of options (see above)
 * @return Picker
 * 
 */
function setupPicker(options) {
	
	var i = 0,
		obj = null,
		picker = Ti.UI.createPicker({
			width: Ti.UI.FILL
		}),
		row = Ti.UI.createPickerRow({
			title : 'Select a device...',
			val : false
		}),
		noDevice = Ti.UI.createPickerRow({
			title : 'No Device',
			val : ''
		});
		
	picker.add(row);
	picker.add(noDevice);
		
	for (i = 0; i < options.itemList.length; i++) {
		
		obj = Ti.UI.createPickerRow({
			title: options.itemList[i].name,
			val: options.itemList[i].code
		});

		obj.addEventListener('click', function(e) {
			options.selectCb(e);
		});

		picker.add(obj);
	}
	
	picker.addEventListener('change', function(e) {
		options.changeCb(e);
	});
	
	options.parentEl.add(picker);
	
	return picker;
}


/**
 * Based on the chosen sling type, generate lists of the available terminations.
 * 
 * @return object		Object with three keys of items.
 * 
 */
function generateLists() {
	
	var upperTerminations = [],
	    lowerTerminations = [],
	    shorteningDevices = [];

	var db = Ti.Database.open('SlingDB.sqlite');

	if (Alloy.Globals.sling.type === 'Chain') {

		var row;

		if (Alloy.Globals.sling.grade === 10) {
			row = db.execute('SELECT * FROM EndFittings WHERE type = "c" AND grade10_' + Alloy.Globals.sling.legs + ' ="1"');
		} else if (Alloy.Globals.sling.grade === 8 ){
			row = db.execute('SELECT * FROM EndFittings WHERE type = "c" AND grade8_' + Alloy.Globals.sling.legs + ' ="1"');
		} else {
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
	
	return {
		upperTerminations: upperTerminations, 
	    lowerTerminations: lowerTerminations,
	    shorteningDevices: shorteningDevices
	};

}
