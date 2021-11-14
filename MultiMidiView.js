function MultiMidiView(noteInput) {

var baseNote = 0;

this.setBaseNote = function(newBaseNote){
    baseNote = newBaseNote;
};

this.enter = function () {
        active = true;
        
        resendColors();
    };

this.handleEvent = function(){

}

this.notifyModifier = function (modifierState) {
        if (active) {
            println("ok?");
        }
    };

this.receiveNote = function (on, note /*, velocity*/) {
        
    };

var resendColors = function () {
        if (!active) {
            return;
        }        

/*        for (var i = 0; i < BROWSER_COLOR.length; i++) {
            sendToJam(i, BROWSER_COLOR[i], true, true);
        }*/
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