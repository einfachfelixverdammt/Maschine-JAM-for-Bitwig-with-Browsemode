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
//noch nicht eingebunden
function MultiMidiMode(noteView, trackView, sceneView, multiMidiView) {
    JamMode.call(this, multiMidiView, trackView, sceneView);
    var handleEvent = this.handleEvent;
    var baseNote;
    var modeHandler = null;

    this.handleEvent = function (sender, row, col, value, notenr) {
        handleEvent.call(this,sender, row, col, value, notenr);
        //TODO 
        host.showPopupNotification("löpt");
        println("handleEvent");
    };

    this.receiveNote = function (on, note, velocity) {
        this.mainView.receiveNote(on, note, velocity);
        println("receiveNote");
    };

/*    this.updateTrackColor = function (color) {
        noteView.updateTrackColor(color);
        drumPadView.updateTrackColor(color);
    };*/

/*    this.inNoteView = function () {
        return this.mainView === noteView;
    };

    this.inDrumView = function () {
        return this.mainView === drumPadView;
    };*/

/*    this.setToNoteView = function () {
        if (this.mainView !== noteView) {
            this.mainView.exit();
            this.mainView = noteView;
            this.mainView.enter();
        }
    };*/

/*    this.setToDrumView = function () {
        drumPadView.setStepMode(false);
        if (this.mainView !== drumPadView) {
            this.mainView.exit();
            this.mainView = drumPadView;
            this.mainView.enter();
        }
    };*/

/*    this.selectionModAction = function () {
        noteView.selectionModAction();
    };*/

    this.update = function () {
        sceneView.update();
        this.mainView.update();
    };


    this.notifyShift = function (shiftDown) {
        this.mainView.notifyShift(shiftDown);
    };

    this.notifyModifier = function (modifierState) {
        this.mainView.notifyModifier(modifierState);
    };

    /**
     * @return {NoteView}
     */
/*    this.getNoteView = function () {
        return noteView;
    };*/

    this.navigate = function (direction) {
        this.mainView.navigate(direction);
    };

    this.notifyClear = function (clearDown) {
        if (clearDown)
            cursorClip.clearSteps();
    };

    this.setModeHandler = function(mh){
            modeHandler = mh;
        }

    this.postEnter = function () {
        baseNote = noteView.getBaseNote();
        modifiers.setLockButtonState(false);
        modifiers.setLockButtonHandler(function (value) {

        });
    };

}

