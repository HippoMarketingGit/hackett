var Database = require('databaseObj'),
	database = new Database('SlingDB.sqlite'),
	db = database.openDb();

/*
 * 
 * Mailing list is faked below
 * 
 * Titanium does not have a checkbox by default and so this is faked
 * by using a button ui element
 * 
 */
$.mailingList.on = function() {
    this.backgroundColor = '#FFF';
    this.title='\u2713';
    this.value = true;
};
 
$.mailingList.off = function() {
    this.backgroundColor = '#FFF';
    this.title='';
    this.value = false;
};
 
$.mailingList.addEventListener('click', function(e) {
    if(false == e.source.value) {
        e.source.on();
    } else {
        e.source.off();
    }
});


// Get the currently logged in user 
var row = db.execute('SELECT * FROM UserProfile WHERE loggedIn = "1"'),
	userData = {};
	

while( row.isValidRow() ){

	var name = row.fieldByName('name'),
		company = row.fieldByName('company'),
		phone = row.fieldByName('phone'),
		email = row.fieldByName('email'),
		optIn = row.fieldByName('optIn');
		
	// Use the "value" property to set the information
	// for the user
	$.name.value = name;
	$.companyName.value = company;
	$.phoneNumber.value = phone;
	$.emailAddress.value = email;
	
	userData = {
		name: name,
		company: company,
		phone: phone,
		email: email
	};
	
	if(optIn === 1){
		
		$.mailingList.backgroundColor = '#FFF';
		$.mailingList.title='\u2713';
		$.mailingList.value = true;
		
		userData.optIn = true;
	}else{
		
		this.backgroundColor = '#FFF';
		this.title='';
		this.value = false;
		
		userData.optIn = false;
	}
	
	// The next() method allows you to skip to the next row if there is one
	row.next();	
}

db.close();

function openDash(e){
	
	var win = Alloy.createController('dashboard').getView();
		win.open();
		
	$.accountSettings.close();
	$.accountSettings = null;
}

function update(e){
	
	var changed = false,
		currentUser = db.getCurrentUser();
	
	// Perform a check to see if any fields have been missed
	if( $.name.value !== "" || $.companyName.value !== "" || $.phoneNumber.value !== ""
		 || $.emailAddress.value !== "" ){
		
		// Use the database object updateUserDetails function to update
		// the users account details
		database.updateUserDetails( currentUser, $.name.value, $.companyName.value, $.phoneNumber.value, $.emailAddress.value, $.mailingList.value, $.password.value);
	}else{
		
		alert('Please check all fields marked with * are entered.');
	}
}

function logout(e){
	
	database.logout(function(){
		
		var win = Alloy.createController('index').getView();
			win.open();
		
		$.accountSettings.close();
		$.accountSettings = null;
	});
}


