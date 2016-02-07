/**
 * @author Ben Hall
 */

function showHidePages(showPage, hidePage ){
	
	showPage.height = Ti.UI.SIZE;
	showPage.show();
	
	hidePage.hide();
	hidePage.height = 0;
	hidePage = null;	
}

function showView(ele){
	
	ele.height = Ti.UI.SIZE;
	ele.show();
}

function hideView(ele){
	
	ele.hide();
	ele.height = 0;
	ele = null;
}

var style;
if (Ti.Platform.name === 'iPhone OS'){
	style = Ti.UI.ActivityIndicatorStyle.BIG;
}else{
	style = Ti.UI.ActivityIndicatorStyle.PLAIN;
}

var activityIndicator = Ti.UI.createActivityIndicator({
	width: 'auto',
	height: 'auto',
	message: 'Loading...', 
	color: '#FFF',
	id: 'activityIndicator',
	style: style
});

function showActivityIndicator(win){
	activityIndicator.show();
	win.add(activityIndicator);
}

function hideActivityIndicator(win){
	activityIndicator.hide();
	win.remove(activityIndicator);
	activityIndicator = null;
}

function padIntRight(num){

    var str = num.toString(),
        strArray = str.split(".");
    
    if (str === '' || strArray.length === 1) {
    	return '';
    }
    
    if( strArray[1].length < 2){
        
        strArray[1] += '0';
        console.log(strArray[1]);    
    }

    return strArray[0] + '.' + strArray[1];
}
