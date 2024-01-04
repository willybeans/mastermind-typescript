"use strict";
const readline = require("readline");
const colors = ["r", "b", "g", "y", "p", "o"];
// red, blue, green, yellow, purple, orange
// answer -- check input against
// order matters
// white or black pegs -- output x number of white/black
const answer = [];
//game ends if you run out of guesses | or | if you guess correctly
const guesses = 12;
function makeSecretKey(colors) {
    const secretKey = [];
    for (let i = 0; i < 4; i++) {
        const random = Math.floor(Math.random() * 6);
        secretKey.push(colors[random]);
    }
    return secretKey;
}
function runGame() {
    console.log("Please guess from these colors: ");
    colors.forEach((c) => {
        console.log(c, ",");
    });
    const secretKey = makeSecretKey(colors);
    // Create an interface to read input from the terminal
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    const recursiveAsyncReadLine = function (guessCount) {
        if (guessCount === 0) {
            console.log("you ran out of guesses! :(");
            return rl.close();
        }
        rl.question("test: ", (userInput) => {
            if (colors.indexOf(userInput) !== -1) {
                console.log('Got it! Your guess was: "', userInput, '"');
                guessCount--;
                console.log(`you have ${guessCount} guesses left`);
                recursiveAsyncReadLine(guessCount); //Calling this function again to ask new question
            }
            else {
                console.log("please input a correct color!");
                recursiveAsyncReadLine(guessCount); //Calling this function again to ask new question
            }
        });
    };
    recursiveAsyncReadLine(guesses);
    // Prompt the user for input 12 times
    // for (let i = guesses; i > 0; i--) {
    //   rl.question("Please enter your guess: ", (userInput: any) => {
    //     // Print the user's input back to the terminal
    //     console.log("You entered: " + userInput);
    //     console.log("guesses remaining: " + i);
    //     // Close the readline interface
    //   });
    // }
}
runGame();
