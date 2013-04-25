/* global var for namespace */
var _quizApp = _quizApp || {};

/* IIFE for namespace simulation */
( function ( _ns ) {
    
    var points = 0,
        playerName,
        cContext,
        originX = 100,
        originY = 250,
        _slope = 30;
        
    _ns._validChars = [65,66,67,68,97,98,99,100];
    _ns.currentQuestion;
    _ns.questions = new Array();
    _ns._wildCardUsedInCurrentTurn = false;
    
    /**
     * Initializes some canvas properties for writing
     */
    _ns.initializeCanvas = function () {
        cContext.textAlign = "start";
        cContext.font = "bold 24px sans-serif";
        cContext.fillStyle = "white";
        /* taken from http://falcon80.com/HTMLCanvas/TextManipulation/SpecifyShadow&Bevel.html */
        /** draw a shadow */
        cContext.shadowColor = "black";
        cContext.shadowOffsetX = 2;
        cContext.shadowOffsetY = 2;
        /** Blur the shadow to create a bevel effect. */
        cContext.shadowBlur = 3;
    }
    
   
    /**
     * Draw a custom hexagon to hold text on the canvas.
     * @x {integer} marks the origin x position of the polygon
     * @y {integer} marks the origin x position of the polygon
     * @l {integer} optional parameter to specify a custom length
     * for the long side of the polygon
     */
    _ns.drawQuestionFrame = function ( x, y, l ) {
      
        var _length = l || 225;
            
        cContext.fillStyle = '#00e';
        cContext.beginPath();
        cContext.moveTo(x, y);
        cContext.lineTo(x + _slope, y - _slope);
        cContext.lineTo(x + _length + _slope, y - _slope);
        cContext.lineTo(x + _length + ( _slope * 2 ), y );
        cContext.lineTo(x + _length + _slope, y + _slope);
        cContext.lineTo(x + _slope, y + _slope);
        cContext.lineTo(x, y);
        cContext.closePath();
        cContext.fill();
        
    };
    
    
    /** @ignore
     * draws the actual frames for text
    */
    _ns.drawFrames = function() {
        
        _ns.drawQuestionFrame(originX, originY - 75, 525);
        _ns.drawQuestionFrame(originX, originY);
        _ns.drawQuestionFrame(originX + 300, originY);
        _ns.drawQuestionFrame(originX, originY + 75);
        _ns.drawQuestionFrame(originX + 300, originY + 75);
        
    };
    
    
    /**
     * When the player uses a wildcard, this hides two of the wrong answers
     */
    _ns.hideAnswers = function () {
    
        var _used = new Array();
        
        do
        {
            var _r1 = Math.floor( (Math.random() * 4));
            if( _used.indexOf (_r1) < 0 || _used.length === 0) {
               
                /** hide if this is an incorrect answer
                 * not that I like this a lot but for the time being... */
                if ( !_ns.currentQuestion.answers[_r1].isCorrect) {
                     _used.push(_r1);
                    switch(_r1) {
                        case 0:
                            _ns.drawQuestionFrame(originX, originY);
                            break;
                        case 1:
                            _ns.drawQuestionFrame(originX + 300, originY);
                            break;
                        case 2:
                            _ns.drawQuestionFrame(originX, originY + 75);
                            break;
                        case 3:
                            _ns.drawQuestionFrame(originX + 300, originY + 75);
                            break;
                    };
                    
                };
            };
            
        } while ( _used.length < 2);
        
    };
    
    
    _ns.drawQuestion = function( question, usingWildcard ) {
   
        usingWildcard = usingWildcard || false;
        /** this effectively clears out the canvas which we need to do */
        document.getElementById('canvas').width = 1000;
        document.getElementById('canvas').height = 1000;
   
        /** pop the next question from the array */
        if (!usingWildcard) {
            _ns.currentQuestion = _ns.questions.pop();
            _ns._wildCardUsedInCurrentTurn = false;
            /** check if this was the last question and there aren't any more */
            if ( _ns.currentQuestion === undefined ) {
                _ns.initializeCanvas ();
                cContext.fillText('Congrats, you finished the quiz', originX + (_slope * 2), originY-68);
                /** also hide the wildcard icons */
                _ns.removeAll('img', 'wildCardImage');
                return;
            }
        }
        
        
        /** draw frames on canvas. do this first for order in canvas, of course */
        _ns.drawFrames ();
        
        _ns.initializeCanvas ();
        
        /** Display the text with only shadow. */
        cContext.fillText(_ns.currentQuestion.questionText, originX + (_slope * 2), originY-68);
        
        cContext.fillStyle = "#ff0000";
        cContext.fillText("A", originX + (_slope / 1.2), originY+8);
        cContext.fillText("B", (originX * 4) + (_slope / 1.2), originY+8);
        cContext.fillText("C", originX + (_slope / 1.2), originY+84);
        cContext.fillText("D", (originX * 4) + (_slope / 1.2), originY+84);
        
        cContext.font = "bold 16px sans-serif";
        cContext.fillStyle = "white";
        cContext.fillText(_ns.currentQuestion.answers[0].answerText, originX + (_slope + 20), originY+6);
        cContext.fillText(_ns.currentQuestion.answers[1].answerText, originX * 4 + (_slope + 20), originY+6);
        cContext.fillText(_ns.currentQuestion.answers[2].answerText, originX + (_slope + 20), originY + 80);
        cContext.fillText(_ns.currentQuestion.answers[3].answerText, originX * 4 + (_slope + 20), originY + 80);
        
        /** if we are using one of the wildcards, just hide two answers by
         * repainting the shape on top of them ;-) */
        if (usingWildcard) {
            
            if ( !_ns._wildCardUsedInCurrentTurn) {
                _ns._wildCardUsedInCurrentTurn = true;
                _ns.hideAnswers();
            };
            
        };
        
    }
    
    
    /**
     * updates the points on screen
     */
    _ns.updatePoints = function (penalize) {
        
        /** this is not working so good - check! */
        if ( penalize ) {
            ( points <= 0 || points === 25) ? points -= 25 : points -= Math.floor(points / 2);
        }
        else {
            if ( points < 0) {
                (points <-25) ? points /= 2 : points = 0;
            }
            else{
                ( points === 0 ? points = 25 : points = Math.abs(points *= 2));
            }
        }
        
        document.getElementById('pointsLabel').innerHTML = points + ' points';        

    };
   
    
    /**
     * Starts the game by drawing the board and the first question
     */
    _ns.startGame = function () {
        
        _ns.initialize();
        cContext = document.getElementById('canvas').getContext('2d');
        _ns.populateQuestionList();
       
        /** draw the question's text now */  
        _ns.drawQuestion();

    };
    
    
    
})(_quizApp);
// end of namespace