const readline = require("readline");

type Colors = "r" | "b" | "g" | "y" | "p" | "o";

const colors: Colors[] = ["r", "b", "g", "y", "p", "o"];
// red, blue, green, yellow, purple, orange

// answer -- check input against
// order matters
// white or black pegs -- output x number of white/black
const answer = [];
//game ends if you run out of guesses | or | if you guess correctly
const guesses = 12;
let userInputGuess = [];

function makeSecretKey(colors: Colors[]): Array<string> {
  const secretKey: Array<string> = [];
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

  const recursiveAsyncReadLine = function (guessCount: number) {
    if (guessCount === 0) {
      console.log("you ran out of guesses! :(");
      return rl.close();
    }
    rl.question("test: ", (userInput: any) => {
      if (sanitizeInput(userInput)) {
        console.log('Got it! Your guess was: "', userInput, '"');
        guessCount--;
        console.log(`you have ${guessCount} guesses left`);
        // console.log(userInputGuess);

        recursiveAsyncReadLine(guessCount); //Calling this function again to ask new question
      } else {
        console.log("please input a correct color!");
        recursiveAsyncReadLine(guessCount); //Calling this function again to ask new question
      }
    });
  };

  recursiveAsyncReadLine(guesses);
}

function sanitizeInput(userInput: Colors): boolean {
  const cleanInput = userInput.split("") as Colors[];
  cleanInput.forEach((c: Colors) => {
    if (colors.indexOf(c) === -1) {
      return false;
    }
  });
  userInputGuess = cleanInput;
  return true;
}

runGame();
