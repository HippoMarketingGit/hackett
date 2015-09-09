var args = arguments[0] || {};

$.back.addEventListener('click', function(e){
	var win = Alloy.createController('index').getView();

	$.register.close();
	win.open();
});

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

var xhr = Titanium.Network.createHTTPClient();

function registerUser(e){
	
	var valid = validateFields();
	
	if (valid === true) {
	
		xhr.open("POST", "http://whackett.hippocreative.com/sync.php?task=pushUser");
		
		var params = {
		    name : $.name.value,
		    company : $.companyName.value,
		    phone : $.phoneNumber.value,
		    email: $.emailAddress.value,
		    password: $.password1.value,
		    optIn: $.mailingList.value
		};
		
		xhr.onload = function(e){
			
			var response = JSON.parse(this.responseText);
			
			if( response.reply === 1){
				
				alert('You have registered successfully. Please login to continue using the app.');
				
				var index = Alloy.createController('index').getView();
					index.open();
				
				$.register.close();
				
			}else{
				
				alert('This email address is already in use, if you have forgotten your account details you can reset your password from the login screen.');
			}
			
		};
		
		xhr.send(params);
				
	} else {
		alert(valid);
	}
	
}




function validateFields() {

	if ($.name.value === '') {
		return "Please enter a name.";
	}
	
	if ($.companyName.value == '') {
		return "Please enter a company name.";
	}
	
	if ($.phoneNumber.value == '') {
		return "Please enter a phone number.";
	}
	
	var emailReg = /^([A-Za-z0-9_\-\.\+])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	if ($.emailAddress.value == '' || emailReg.test($.emailAddress.value) === false) {
		return "Please enter a valid email address.";
	}
	
	if ($.password1.value == '' || $.password1.value != $.password2.value) {
		return "Please enter a password and make sure they match.";
	}
	
	return true;

}
