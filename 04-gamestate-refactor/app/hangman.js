var words = ['abbey', 'bagpipes', 'cobweb', 'daiquiri', 'equip', 'fishhook', 'galaxy', 'haiku', 'icebox', 'jaundice', 'kazoo', 'larynx', 'marquis', 'nowadays', 'ovary', 'pajama', 'quartz', 'rhubarb', 'sphinx', 'topaz', 'unknown', 'vaporize', 'walkway', 'yippee', 'xylophone', 'zephyr'];

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
 * Set the maximum number of times you can miss.
 */
var maxMisses = 5;

/**
 * Determine whether a provided guess is a valid.
 *
 * Implementation:
 *   1. Return false if guess is blank or undefined.
 *   2. Return false if guess is more than one character.
 *   3. Return false if guess is not a lower-case letter.
 *   4. Return false if guess is has already been made.
 *   5. Return true if you made it this far, the guess is valid!
 *
 * @param {String} letter
 *   The guess to validate.
 * @return {Boolean}
 */
var validateGuess = function (letter) {
  var isSingleLowercaseLetter = /^[a-z]$/.test(letter);
  var inHits = hits.indexOf(letter) !== -1;
  var inMisses = misses.indexOf(letter) !== -1;
  if (isSingleLowercaseLetter && !inHits && !inMisses) {
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
 * @param {String} letter
 *   The letter to guess with.
 * @return {Boolean}
 */
var guess = function (letter) {
  letter = letter.toLowerCase();
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

// WON METHOD HERE

/**
 * Determine if the game is currently in a losing state.
 *
 * Implementation:
 *   1. Return true if the number of misses is greater than or
 *      equal to the maximum allowed.
 *
 * @return {Boolean}
 */

// LOST METHOD HERE

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
  // Refactor this logic into separate methods.
  if (misses.length >= maxMisses) {
    return 'lost';
  }
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
  if (hitCount === uniqueLetters.length) {
    return 'won';
  }
  return 'playing';
};

/**
 * Continuously update the game board.
 */
var refresh = function () {
  var game = document.getElementById('hangman');
  var html = [];
  html.push('<u>The Word</u><br><strong>'+guessWord+'</strong>');
  html.push('<u>Correct Guesses</u><br><strong>'+hits.join(', ')+'</strong>');
  html.push('<u>Incorrect Guesses</u><br><strong>'+misses.join(', ')+'</strong>');
  html.push('<u>Game State</u><strong><br>'+state()+'</strong>');
  game.innerHTML = html.join('<br><br>');
};

setInterval(refresh, 100);