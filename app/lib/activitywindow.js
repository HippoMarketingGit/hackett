/**
 * Indicator window with a spinner and a label
 * 
 * @param {Object} args
 */
function createIndicatorWindow(args) {
    
    var width = 'auto',
        height = 'auto';

    var args = args || {};
    var top = args.top || 140;
    var message = args.message || "Loading...";
    
    var win = Titanium.UI.createWindow({
        // height:height,
        // width:width,
        // top:top,
        // borderRadius:0,
        // touchEnabled:false,
        // backgroundColor:'#000',
        // opacity:0.6
        backgroundColor: '#021b4b'
    });
    
    var view = Ti.UI.createView({
        width:Ti.UI.SIZE,
        height:Ti.UI.SIZE,
        layout: "vertical"
        // center: {x:(width/2), y:(height/2)},
        // layout:'horizontal'
    });
    
    function osIndicatorStyle() {
        
        style = Ti.UI.ActivityIndicatorStyle.PLAIN;
        
        if ('iPhone OS' !== Ti.Platform.name) {
            style = Ti.UI.ActivityIndicatorStyle.DARK;            
        }
        
        return style;
    }
    
    var logo = Ti.UI.createImageView({
		width: '95%',
		height: 'auto',
		image: '/images/WHC--logo.png'
	});
     
    var activityIndicator = Ti.UI.createActivityIndicator({
        style: osIndicatorStyle(),
        top: '20dip',
		width: 'auto',
		height: 'auto',
		message: message,
		color: '#FFF',
        //left: 0,
        //height: Ti.UI.FILL,
        //width: 30,
    });
    
    view.add(logo);
    view.add(activityIndicator);
    //view.add(label);
    win.add(view);

    function openIndicator() {
        win.open();
        activityIndicator.show();
    }
    
    win.openIndicator = openIndicator;
    
    function closeIndicator() {
        activityIndicator.hide();
        win.close();
    }
    
    win.closeIndicator = closeIndicator;
    
    win.setMessage = function(message) {
    	activityIndicator.setMessage(message);
    };
    
    return win;
}

// Public interface
exports.createIndicatorWindow = createIndicatorWindow;