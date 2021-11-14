/**
 * @classdesc Mode in which the Pads are used to play Notes
 * @class
 * @augments JamMode
 * 
 * @param {NoteView} noteView 
 * @param {DrumPadView} drumPadView 
 * @param {TrackViewContainer} trackView reference to Clip Mode object
 * @param {SceneView} sceneView reference to Clip Mode object
 * @param {Clip} cursorClip
 *
 * @returns {PadMode}
 */

 function BrowseMode(browseView, trackView, sceneView, cursorDevice,padMode, applicationControl) {
    JamMode.call(this, browseView, trackView, sceneView);
    var handleEvent = this.handleEvent;
    var searchByTag = this.searchByTag;

    var deviceBrowser = cursorDevice.createDeviceBrowser(1, 62);
    var cursorBrowsingSession = deviceBrowser.createCursorSession();
    cursorBrowsingSession.activate();
    var selectedName = "";
    var searchedName = "xy";
    var searching = false;
    var searchCounter = 0;
    var maxNext = 100;
    var cursorResult = cursorBrowsingSession.getCursorResult();
    var modeHandler = null;
    //Focus Browser Search Field
    //var application = applicationControl.getApplication();
    //applicationControl.invokeAction("focus_browser_search_field" );

    deviceBrowser.addIsBrowsingObserver(function(callback){
        if(callback === false && (modeHandler !== null && modeHandler !== undefined)){
            modeHandler.exitBrowseAndEnterPadMode();
        }
    });

    cursorBrowsingSession.addHitCountObserver(function (callback){
        maxNext = callback;
        println("maxNext: " + maxNext);
    })

        //rekursiver aufruf um plugin zu suchen kp warum man nicht einfach searchByTag aufrufen kann...
        cursorResult.addValueObserver    (99,"",function (value) {
            selectedName = value + "";

            if(searching && undefined != searchedName){
                if(!selectedName.contains(searchedName) ){                    
                    if(searchCounter < maxNext){
                        searchCounter++;
                        cursorResult.selectNext();            
                    }
                }else{
                 searching = false;
                 searchCounter = 0;
                 if(null !== modeHandler && undefined !== modeHandler){
                    modeHandler.exitBrowseAndEnterPadMode();
                }
            }
        }
    });

        this.handleEvent = function (sender, row, col, value, notenr){
            handleEvent.call(this,sender, row, col, value, notenr);
            if(value > 0){
                if(null !== cursorResult && null !== undefined){
                    cursorResult.selectFirst ();
                    if(notenr > 21 && notenr < 21+64){
                        searchedName = BROWSER_MAPPING[notenr-22];
                        searching = true;
                        if(undefined != searchedName){
                            this.searchByTag(searchedName);
                        }
                    }
                }
            }        
        }

        this.setModeHandler = function(mh){
            modeHandler = mh;
        }

        this.searchByTag = function(tag){
            if(!selectedName.contains(tag) ){
                if(null !== cursorResult && null !== undefined){
                    searchCounter++;
                    cursorResult.selectNext(); 
                }           
            }else{
                searchCounter = 0;
                searching = false;
                if(null !== modeHandler && undefined !== modeHandler){
                    modeHandler.exitBrowseAndEnterPadMode();
                }
            }
        }
    }

