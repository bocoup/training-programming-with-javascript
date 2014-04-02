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

/*
 * Calculate the maximum number of steps before a player loses.
 */
var maxMisses = 5;

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
  var isSingleUppercaseLetter = /^[A-Z]$/.test(letter);
  var inHits = hits.indexOf(letter) !== -1;
  var inMisses = misses.indexOf(letter) !== -1;
  if (isSingleUppercaseLetter && !inHits && !inMisses) {
    return true;
  }
  return false;
};

/**
 * Validate a guess.
 *
 * Implementation:
 *   1. Convert letter to lowercase.
 *   2. Return false if guessed letter doesn't pass `validateGuess`.
 *   3. If letter appears in guess word, add it to hits and return true.
 *   4. Otherwise, add it to misses and return false.
 *
 * @param {String} guess
 *   The letter to guess with.
 * @return {Boolean}
 */
var guess = function (letter) {
  letter = letter.toUpperCase();
  if (!validateGuess(letter)) {
    return false;
  }
  if (guessWord.indexOf(letter) !== -1) {
    hits.push(letter);
    return true;
  }
  misses.push(letter);
  return false;
};

/**
 * Determine if the game is currently in a winning state.
 *
 * Implementation:
 *   1. Return true if each letter in the guess word
 *      exists in the hits array.
 *   2. Return false otherwise.
 *
 * @return {Boolean}
 */
var won = function () {
  var uniqueLetters = [];
  var hitCount = 0;
  for (var i=0; i < guessWord.length; i++) {
    var letter = guessWord[i];
    if (uniqueLetters.indexOf(letter) === -1) {
      uniqueLetters.push(letter);
      if (hits.indexOf(letter) !== -1) {
        hitCount++;
      }
    }
  }
  return hitCount === uniqueLetters.length;
};

/**
 * Determine if the game is currently in a losing state.
 *
 * Implementation:
 *   1. Return true if the number of misses is greater than or
 *      equal to the maximum allowed.
 *
 * @return {Boolean}
 */
var lost = function () {
  return misses.length >= maxMisses;
};

/**
 * Determine the state of the game.
 *
 * Implementation:
 *   1. Return 'won' if `won()` returns true.
 *   2. Return 'lost' if `lost()` is true.
 *   3. Return 'playing' if neither was true.
 *
 * @return {String}
 */
var state = function () {
  if (won()) {
    return 'won';
  }
  if (lost()) {
    return 'lost';
  }
  return 'playing';
};

/**
 * Accept a guess for the game.
 *
 * Implementation:
 *   1. If the game state is not playing, alert that the game is over.
 *   2. If the game state is playing, prompt for a guess and pass the
 *      resulting letter to the guess method.
 *
 */
var promptGuess = function () {

};

/**
 * Continuously update the game board.
 */
var refresh = function () {
  var game = document.getElementById('canvas');
  var guessButton = document.getElementById('input');
  var wonMessage = document.getElementById('won');
  var lostMessage = document.getElementById('lost');
  var gameState = state();

  var html = [];
  html.push('<u>The Word</u><br><strong>'+guessWord+'</strong>');
  html.push('<u>Correct Guesses</u><br><strong>'+hits.join(', ')+'</strong>');
  html.push('<u>Incorrect Guesses</u><br><strong>'+misses.join(', ')+'</strong>');
  game.innerHTML = html.join('<br><br>');

  if (gameState === 'playing') {
    guessButton.style.display = 'block';
    wonMessage.style.display = 'none';
    lostMessage.style.display = 'none';
  }
  if (gameState === 'won') {
    guessButton.style.display = 'none';
    wonMessage.style.display = 'block';
    lostMessage.style.display = 'none';
  }
  if (gameState === 'lost') {
    guessButton.style.display = 'none';
    wonMessage.style.display = 'none';
    lostMessage.style.display = 'block';
  }
};

setInterval(refresh, 100);
