// * **index.js**: The file containing the logic for the course of the game, which depends on `Word.js` and:

//   * Randomly selects a word and uses the `Word` constructor to store it

//   * Prompts the user for each guess and keeps track of the user's remaining guesses
var Word = require("./Word.js");
var inquirer = require('inquirer');


wordList = ["BARRY BONDS", "BUSTER POSEY", "BENITO SANTIAGO", "HANK AARON", "CODY BELLINGER", "YADIER MOLINA", "PABLO SANDOVAL", "BRANDON CRAWFORD"];
var select = 0;
var chosenWord = "";
var gameWord = "";
var counter = 0;


function startGame() {
    if (wordList.length<2) {
        wordList = ["BARRY BONDS", "BUSTER POSEY", "BENITO SANTIAGO", "HANK AARON", "CODY BELLINGER", "YADIER MOLINA", "PABLO SANDOVAL", "BRANDON CRAWFORD"];
    }
    select = Math.floor(Math.random()*wordList.length);
    chosenWord = wordList[select];
    gameWord = new Word(chosenWord);
    gameWord.makeWord();
    if (select > -1) {
        wordList.splice(select, 1);
    }
    console.log("\n10 Attempts to guess the letters in this baseball players name.\n")
    promptUser();
}

//Allows the user to input a letter guess, restarts the game if player is out of wrong guesses.
function promptUser() {
    if (counter<10) {
        console.log(gameWord.showWord());
        inquirer.prompt([
            {
                type: "input",
                name: "letter",
                message: "\nPick a letter and press enter. "
            }
        ]).then(function(data) {
                checkAnswer(data);
        });
    }
    else{
        console.log("\nSorry, you're out of guesses.\n");
        console.log(chosenWord);
        chosenWord = "";
        gameWord = "";
        select = 0;
        counter = 0;
        startGame();
    }
}

//checks that the user's input is in correct format and compares the letter to gameWord to see if guess is correct
function checkAnswer(data) {
    if ((data.letter.length === 1) && /^[a-zA-Z]+$/.test(data.letter)) {
        var checkable = data.letter.toUpperCase();
        var temp = gameWord.showWord();
        gameWord.checkGuess(checkable);
        if (temp === gameWord.showWord()) {
            console.log("\nSorry, wrong letter!\n");
            counter++;
            console.log(((10 - counter) + " guesses remaining"));
            promptUser();
        }
        else {
            correctGuess();
        }
    }
    else {
        console.log("\nPlease enter one letter at a time.\n");
        promptUser();
    }
}

function correctGuess() {
    console.log("\nYou are correct.\n");
    if (chosenWord.replace(/ /g,"") == (gameWord.showWord()).replace(/ /g,"")) {
        console.log(gameWord.showWord());
        console.log('\nYou win!!\n');
        chosenWord = "";
        gameWord = "";
        select = 0;
        counter = 0;
        startGame();
    }
    else {
        promptUser();
    }
}

startGame();
