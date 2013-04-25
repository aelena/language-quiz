/* global var for namespace */
var _quizApp = _quizApp || {};

( function ( _ns ) {
    
    
    /**
     * @constructor
     * Represents an answer
     * @answerText {string} is the answer's text
     * @keycode {char} the key code for the question
     * @isCorrect {boolean} indicates whether this is the correct answer
     * this argument can be optional, and in that case it will default to false
     */
    _ns.Answer = function ( answerText, keycode, isCorrect ) {
        
        this.answerText = answerText;
        this.code = keycode;
        this.isCorrect = isCorrect || false;
    
    };
    
    
    /**
     * @constructor
     * Represents a question object, with its text and it's four
     * possible answers */
    _ns.Question = function ( questionText, answers ) {
        
        this.questionText = questionText;
        this.answers = answers;
        
         
        /**
         * parses the answer collection to get the right one
         * Reference: https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/filter
         */
        this.getCorrectCode = function () {
          
            /* since the filtering returns an array, pop() it
             * to return a single object to caller for easier manipulation */
            return this.answers.filter(getCorrectAnswer).pop();
            
        };
       
        function getCorrectAnswer(element, index, array) {
            if ( element.isCorrect) {
                return element;
            }
            return null;
        };
        
    };
    
    
    /**
     * this just adds some questions
     * should get from external source, like web service / json
     * but for now...
     */
    _ns.populateQuestionList  = function () {
      
        var _q1 = new _ns.Question( 'Which one is the correct spelling?',
                                    [new _ns.Answer('Broccolli','a'),
                                     new _ns.Answer('Broccoli','b', true),
                                     new _ns.Answer('Brocoli','c'),
                                     new _ns.Answer('Brocolli', 'd')]);
        
        var _q2 = new _ns.Question( 'Where did they left ______ coats?',
                                    [new _ns.Answer('their','a', true),
                                     new _ns.Answer('they\'re','b'),
                                     new _ns.Answer('there','c'),
                                     new _ns.Answer('ther', 'd')]);
        
        var _q3 = new _ns.Question( '\'The snake "slithered" \' means that',
                                    [new _ns.Answer('it stopped moving','a'),
                                     new _ns.Answer('it slept','b'),
                                     new _ns.Answer('it ate something','c'),
                                     new _ns.Answer('it moved', 'd', true)]);
        
        var _q4 = new _ns.Question( 'embezzlement is a form of ',
                                    [new _ns.Answer('industrial varnishing','a'),
                                     new _ns.Answer('musical arrangement','b'),
                                     new _ns.Answer('picture restoring technique','c'),
                                     new _ns.Answer('fraud', 'd', true)]);
        
        var _q5 = new _ns.Question( 'What is the right form of tear past tense?',
                                    [new _ns.Answer('teared','a'),
                                     new _ns.Answer('tore','b', true),
                                     new _ns.Answer('torned','c'),
                                     new _ns.Answer('torn', 'd')]);
        
        
        _ns.questions.push ( _q5 );
        _ns.questions.push ( _q4 );
        _ns.questions.push ( _q3 );
        _ns.questions.push ( _q2 );
        _ns.questions.push ( _q1 );
        
    };
    
    
})(_quizApp);