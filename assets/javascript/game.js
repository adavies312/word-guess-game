// goals:

// initialize variables
var winsCounter = 0;
var lossesCounter = 0;

// these variables will be set in the reset function
var blankSpaces;
var guessesCounter;
var guessesMade;
var randomWord;

// store dynamic html elements as variables
var blankSpacesP = document.getElementById("blankSpaces");
var winsSpan = document.getElementById("wins");
var lossesSpan = document.getElementById("losses");
var guessesLeftSpan = document.getElementById("guessesLeft");
var guessesMadeSpan = document.getElementById("guessesMade");

// update the dom
winsSpan.textContent = winsCounter;
lossesSpan.textContent = lossesCounter;

// run reset function
reset();
console.log(randomWord);

// validate the user's keypress with the randomly selected word:
// - detect the user's keypress
document.onkeyup = function (event) {
  var userInput = event.key.toLowerCase();
  var alphabet = "abcdefghijklmnopqrstuvwxyz";

  if (alphabet.includes(userInput)) {
    console.log(userInput);

    for (var i = 0; i < randomWord.length; i++) {
      // - check if the keypress is in the word
      if (randomWord[i].toLowerCase() === userInput) {
        // -- if it is
        // ---- replace the blanks in the word with the correct letter
        blankSpaces[i] = randomWord[i];
        blankSpacesP.textContent = blankSpaces.join("\xa0");

        // check win condition
        // -- if the word has been entirely guessed
        if (!blankSpaces.includes("_")) {
          // increment winCounter and update dom
          winsCounter++;
          winsSpan.textContent = winsCounter;

          alert("you win!");
          // reset the game
          reset();
        }
      } else {
        // if the randomWord does not include userInput
        // and if the userInput has not been guessed already
        if (!randomWord.toLowerCase().includes(userInput) && !guessesMade.includes(userInput)) {
          // ---- decrement guessesCounter
          // ---- add it to the guessed letters list [array] and update dom
          guessesCounter--;
          guessesMade.push(userInput);
          guessesLeftSpan.textContent = guessesCounter;
          guessesMadeSpan.textContent = guessesMade;

          // check loss condition
          // -- if the guesses run out (= 0)
          if (guessesCounter === 0) {
            // incrememnt lossesCounter and update dom
            lossesCounter++;
            lossesSpan.textContent = lossesCounter;

            alert("you lose!");
            // reset the game
            reset();
          }
        }
      }
    }
  }
} // end of document.onkeyup function

// reset the game
function reset() {

  // resets the guesses counter and guesses made and updates the DOM
  guessesCounter = 10;
  guessesMade = [];

  guessesLeftSpan.textContent = guessesCounter;
  guessesMadeSpan.textContent = guessesMade;

  // creates a random number and uses it to select a random word
  var wordBank = ["Luke Skywalker", "Princess Leia", "Han Solo", "Yoda", "Millenium Falcon", "The Force", "The Dark Side", "Wookies", "Chewbacca", "Jabba the Hutt", "Darth Vader", "Kylo Ren", "Obi Wan Kenobi", "Darth Maul", "Lightsaber", "Lightspeed", "Droids", "X Wing Fighter", "Destroyer", "Jedi Master", "Tattoine"];
  var randomIndex = Math.floor(Math.random() * wordBank.length);
  randomWord = wordBank[randomIndex];

  // if the character in the word is a space
  // don't push an underscore
  // push a space
  blankSpaces = [];
  for (var i = 0; i < randomWord.length; i++) {
    // - parse the word into blanks
    if (randomWord[i] === " ") {
      blankSpaces.push(" ");
    } else {
      blankSpaces.push("_");
    }
  }

  // "\xa0" is a nonbreakable space
  blankSpacesP.textContent = blankSpaces.join("\xa0");

  gameStart = true;
} // end of function reset()
