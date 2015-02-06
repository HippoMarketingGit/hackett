/**
 * @author Ben Hall
 */

function Connection(){};

// Performs an online check
// Returns true if can connect, returns false if not
Connection.prototype.onlineCheck = function(cb){
	
	var xhr = Ti.Network.createHTTPClient({
		onload: function(e){
			var response = JSON.parse(this.responseText);
			
			if( this.status === 200 && this.readyState === 4){
				
				Ti.API.info('ready');
				
				if(cb){
					cb(response.online);
				}
			}
		},
		onerror: function(){
			alert('There was an error connecting to the database');
		},
		timeout: 5000
	});
	
	xhr.open('POST', 'http://whackett.hippocreative.com/sync.php?task=onlineTest');
	xhr.send();
	
	return cb;
};

// Create the module
module.exports = Connection;