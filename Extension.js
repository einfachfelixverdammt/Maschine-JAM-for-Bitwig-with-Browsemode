function Extension() {
    
    var blockPlayback = false;
    var lastPlayTime = Date.now();
    var lastStopTime = Date.now();
    var playTimeCredit = 20000;
    var maximumPlayTimeCredit = 20000;

    this.updatePlayTimeLimit = function () {
        lastPlayTime = Date.now();
        increasePlayTimeCredit();
    };
    
    this.updatePauseTimeLimit = function (){
        lastStopTime = Date.now();
        decreasePlayTimeCredit();
    };
    
    this.getBlockPlayback = function (){
        return blockPlayback;
    };
    
    this.getPlayTimeCredit = function (){
        return playTimeCredit;
    };
    
    var decreasePlayTimeCredit = function(){
        
        var difference  =  lastStopTime - lastPlayTime;
        playTimeCredit -= difference;
        if(playTimeCredit < 0 ){
            blockPlayback = false;
        }
       
    };
    
    var increasePlayTimeCredit = function (){
        var difference = lastPlayTime - lastStopTime;
        playTimeCredit += difference;
        if(playTimeCredit >= maximumPlayTimeCredit){
            playTimeCredit = maximumPlayTimeCredit;
            blockPlayback = false;
        }
        //host.showPopupNotification("block playback?: " + blockPlayback + "/ playtimecredit: " + playTimeCredit);
    };
    
    
}