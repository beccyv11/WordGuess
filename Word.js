// **Word.js**: Contains a constructor, Word that depends on the Letter constructor.
// This is used to create an object representing the current word the user is attempting to guess. 
//That means the constructor should define:

var Letter = require("./letter.js");

function Word (wordArray) {
    this.wordArray = wordArray;
    this.wordTest = [];
    this.makeWord = function () {
        for (var i=0; i<wordArray.length; i++) {
            var let = new Letter(wordArray[i]);
            this.wordTest.push(let);
        }
    };
    this.showWord = function() {
        var wordDisplay = [];
        for (var i=0; i<this.wordTest.length; i++) {
            wordDisplay.push(this.wordTest[i].displayLet());
        }
        return wordDisplay.join(" ");
    };
    this.checkGuess = function(guess) {
        for (var i=0; i<this.wordTest.length; i++) {
            this.wordTest[i].check(guess);
        }
    };
};

module.exports = Word;


// * An array of `new` Letter objects representing the letters of the underlying word

// * A function that returns a string representing the word. This should call the function 
//on each letter object (the first function defined in `Letter.js`) that displays the character or an underscore and concatenate those together.

// * A function that takes a character as an argument and calls the guess function on each letter 
//object (the second function defined in `Letter.js`)