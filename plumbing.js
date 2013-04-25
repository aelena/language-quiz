/* global var for namespace */
var _quizApp = _quizApp || {};

( function ( _ns ) {
    
     _ns.canvasClickEventHandler = function (eventData) {
        // alert(eventData.pageX + "," + eventData.pageY);
    }
    
    /**
     * Handles key press to detect when the user has pressed the right key
     * for the answer or not
     */
    _ns.keyEventHandler = function (eventData) {
        if ( _ns._validChars.indexOf ( eventData.charCode ) >= 0){
            var _code = String.fromCharCode(eventData.charCode).toLowerCase();
            if ( _code == _ns.currentQuestion.getCorrectCode().code) {
               _ns.updatePoints (); 
               _ns.drawQuestion();
            }
            else {
               /** if the user made a mistake, substract some points */
               _ns.updatePoints(true);
            }
        }
        else{
            eventData.cancelBubble = true;
        }
    }
    
    /**
     * initializes event stuff for the canvas / window
     */
    _ns.initialize = function() {
        
        var _c = document.getElementById('canvas');
        _c.addEventListener('click', _ns.canvasClickEventHandler, true);
        window.addEventListener('keypress', _ns.keyEventHandler, true);
        
        /** find out our image buttons and associate a handling event.
         * for the limited nature and purpose of this game, we will
         * treat all three wildcards as a the same random event, whereby
         * two wrong answers will be removed from the board */
        
        /** of course we would have achieved the same quicker by using jQuery
         * but the idea was to make do without libraries */
        var _imgButtons = _ns.getElementsByClass('img', 'wildCardImage');
        for ( var i = 0; i < _imgButtons.length; i++ ) {
            _imgButtons[i].addEventListener('click', function(eventData) {
               if(!_ns._wildCardUsedInCurrentTurn) {
                    _ns.drawQuestion(_ns.currentQuestion, true);
                    /** remove the wildcard once it's been used */
                    eventData.srcElement.parentNode.removeChild(eventData.srcElement);
                    /** and penalize user */
                    _ns.updatePoints(true);
               }
               else {
                    alert("You've already used a wildcard in this turn!");
               }
            });
        };
    }
    
    
    _ns.getElementsByClass = function ( tagName, _className ) {
        
        var _returnArray = new Array();
        var _arr = document.getElementsByTagName(tagName);
        for (var i = 0; i < _arr.length; i++ ) {
            if ( _arr[i].className.indexOf (_className) >= 0  ) {
                _returnArray.push ( _arr[i] );
            }
        }
        
        return _returnArray;
    }
    
    
    _ns.removeAll = function ( tagName, _className ){
    
          var _arr = document.getElementsByTagName(tagName)
          for ( var i = _arr.length-1; i >= 0; i--){
               if ( _arr[i].className.indexOf(_className) >= 0 ) {
                    _arr[i].remove();
               }
          }
     
    }
    
    
})(_quizApp);