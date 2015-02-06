var Database = require('databaseObj'),
	database = new Database('SlingDB.sqlite'),
	db = database.openDb();

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

var row = db.execute('SELECT * FROM UserProfile'),
	userData = {};
	
while( row.isValidRow() ){

	var name = row.fieldByName('name'),
		company = row.fieldByName('company'),
		phone = row.fieldByName('phone'),
		email = row.fieldByName('email'),
		optIn = row.fieldByName('optIn');
		
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
	
	if( $.name.value !== "" || $.companyName.value !== "" || $.phoneNumber.value !== ""
		 || $.emailAddress.value !== "" ){
		
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


