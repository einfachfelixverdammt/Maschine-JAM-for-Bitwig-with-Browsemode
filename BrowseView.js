function BrowseView(noteInput) {


this.enter = function () {
        active = true;
        
        resendColors();
    };

this.handleEvent = function(){

}

var resendColors = function () {
        if (!active) {
            return;
        }        

        for (var i = 0; i < BROWSER_COLOR.length; i++) {
            sendToJam(i, BROWSER_COLOR[i], true, true);
        }
    };

var sendToJam = function (index, color, queued, force) {
        if (!active) {
            return;
        }
        controls.buttonMatrix.sendValue(index, color, queued, force);
    };

this.exit = function () {
        active = false;
    };

}