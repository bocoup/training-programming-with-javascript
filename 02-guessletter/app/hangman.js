var words = ['ABBEY', 'BAGPIPES', 'COBWEB', 'DAIQUIRI', 'EQUIP', 'FISHHOOK', 'GALAXY', 'HAIKU', 'ICEBOX', 'JAUNDICE', 'KAZOO', 'LARYNX', 'MARQUIS', 'NOWADAYS', 'OVARY', 'PAJAMA', 'QUARTZ', 'RHUBARB', 'SPHINX', 'TOPAZ', 'UNKNOWN', 'VAPORIZE', 'WALKWAY', 'YIPPEE', 'XYLOPHONE', 'ZEPHYR'];

/**
 * Randomly select an element from a provided array.
 *
 * Implementation:
 *   1. Generate a random number from 0 to 1.
 *   2. Get the maximum size of the number (the length of the wordlist).
 *   3. Multiply the random number and the max size together.
 *   4. Round the number down to an integer.
 *   5. Return that item from the provided wordlist.
 *
 * @param {Array} wordlist
 *   An array of possible words to select.
 * @return {String}
 */
var randomElement = function (wordlist) {
  var randomNumber = Math.random();
  var maxSize = wordlist.length;
  var index = Math.floor(randomNumber*maxSize);
  return wordlist[index];
};

/**
 * Randomly select a word and save it.
 */
var guessWord = randomElement(words);

/**
 * Create an array to save correct guesses in.
 */
var hits = [];

/**
 * Create an array to save incorrect guesses in.
 */
var misses = [];

/**
 * Determine whether a provided guess is a valid.
 *
 * Implementation:
 *   1. Return false if guess is blank or undefined.
 *   2. Return false if guess is more than one character.
 *   3. Return false if guess is not an upper-case letter.
 *   4. Return false if guess is has already been made.
 *   5. Return true if you made it this far, the guess is valid!
 *
 * @param {String} letter
 *   The guess to validate.
 * @return {Boolean}
 */
var validateGuess = function (letter) {

};

/**
 * Validate a guess.
 *
 * Implementation:
 *   1. Convert letter to uppercase.
 *   2. Return false if guessed letter doesn't pass `validateGuess`.
 *   3. If letter appears in guess word, add it to hits and return true.
 *   4. Otherwise, add it to misses and return false.
 *
 * @param {String} letter
 *   The letter to guess with.
 * @return {Boolean}
 */
var guess = function (letter) {

};


/**
 * Continuously update the game board.
 */
var refresh = function () {
  var game = document.getElementById('canvas');
  game.innerHTML = '<u>Guess Word</u><br><strong>'+guessWord+'</strong><br><br>';
  game.innerHTML += '<u>Correct Guesses</u><br><strong>'+hits.join(', ')+'</strong><br><br>';
  game.innerHTML += '<u>Incorrect Guesses</u><br><strong>'+misses.join(', ')+'</strong><br><br>';
};

setInterval(refresh, 100);
