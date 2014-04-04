/**
 * Create or retrieve the the namespace for our application.
 */
var Hangman = window.Hangman = window.Hangman || {};

/**
 * This is a constructor for creating an instance of our game
 * model. In this project, the model's responsibility is to
 * encapsulate the state of a running game.
 *
 * Implementation:
 *   1. Store an empty array on `this.hits`
 *   2. Store an empty array on `this.misses`
 *   3. Store the passed word on `this.guessWord`
 *   4. Store a null value on `this.maxMisses`
 *      The maximum number of misses will be determined later.
 *
 * @params {String} word
 *   The word to guess.
 * @constructs
 */
Hangman.Model = function (word) {

};

/**
 * Get array of letters from guessWord.
 *
 * Implementation:
 *   1. Return `this.guessWord` as an array of characters.
 *
 * @return {Array}
 */
Hangman.Model.prototype.guessWordLetters = function () {

};

/**
 * Get all of the guesses so far.
 *
 * Implementation:
 *   1. Return a combined array of `this.hits` and `this.misses`.
 *
 * @return {Array}
 */
Hangman.Model.prototype.guesses = function () {

};

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
Hangman.Model.prototype.validateGuess = function (letter) {

};

/**
 * Validate a guess and store in on the model.
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
Hangman.Model.prototype.guess = function (letter) {

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
Hangman.Model.prototype.won = function () {

};

/**
 * Determine if the game is currently in a losing state.
 *
 * Implementation:
 *   1. Return false if we don't know how many misses are allowed.
 *   2. Return true if the number of misses is greater than or
 *      equal to the maximum allowed.
 *
 * @return {Boolean}
 */
Hangman.Model.prototype.lost = function () {

};

/**
 * Determine the state of the game.
 *
 * Implementation:
 *   1. Return `Hangman.WON` if `this.won()` is true.
 *   2. Return `Hangman.LOST` if `this.lost()` is true.
 *   3. Return `Hangman.PLAYING` if neither was true.
 *
 * @return {String}
 */
Hangman.Model.prototype.state = function () {

};

/**
 * Prepare a copy of this model's data for usage by views.
 *
 * Implementation:
 *   1. Return an object with the following structure:
 *      {
 *        guessWordLetters: the letters in the guess word as an array
 *        hits: a copy of the hits array
 *        misses: a copy of the misses array
 *        missCount: the number of misses so far
 *        status: the game status
 *      }
 *
 * @return {Object}
 */
Hangman.Model.prototype.data = function () {

};
