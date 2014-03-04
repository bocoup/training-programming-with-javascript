/**
 * Namespace for our application.
 */
var Hangman = window.Hangman = window.Hangman || {};

/**
 * This is the constructor that creates a new instance of our game
 * model.  The responsibility of the model is to hold the state of
 * a running game.
 *
 * @params {Array} wordlist An array of possible words to pick from.
 * @constructs
 */
Hangman.Model = function (wordlist) {
  this.guessWord = wordlist[Math.floor(Math.random() * wordlist.length)];
  this.hits = [];
  this.misses = [];
};

/**
 * The Model prototype. Methods and properties defined in this
 * object will be shared by all instances of Hangman.Model.
 */
Hangman.Model.prototype = {

  /**
   * Split the guess word into an array of letters.
   * @return {Array}
   */
  guessWordLetters: function () {
    return this.guessWord.split('');
  },

  /**
   * Return an array of all our guesses.
   * @return {Array}
   *   All the values from hits and misses combined.
   */
  guesses: function () {
    return this.hits.concat(this.misses);
  },

  /**
   * Determine whether a provided guess is a valid.
   * @param {String} guess The guess to check
   * @return {Boolean}
   *   Returns true if guess is valid, false otherwise.
   */
  validateGuess: function (guess) {
    return /^[A-Za-z]$/.test(guess) && this.guesses().indexOf(guess) === -1;
  },

  /**
   * Determines the indicies at which a given guess matches the
   * chosen word, if any.
   * @param {String} guess The guess to check
   * @return {Array}
   *   An array of indices at which the guess matches.
   */
  compareGuessToWord: function (guess) {
    var matches = [];
    this.guessWordLetters().forEach(function (letter, index) {
      if (letter === guess) {
        matches.push(index);
      }
    });
    return matches;
  },

  /**
   * If a guess is valid, check to see if the letter is in the
   * guessWord.  If it is, add the guess to hits, if it isn't,
   * add the guess to misses.
   * @param {String} guess The guess to try.
   * @return {Boolean}
   *   Returns true if guess was a hit, false otherwise.
   */
  guess: function (letter) {
    letter = letter.toLowerCase();
    if (!this.validateGuess(letter)) {
      return false;
    }
    if (this.guessWord.indexOf(letter) !== -1) {
      this.hits.push(letter);
      return true;
    } else {
      this.misses.push(letter);
    }

    return false;
  },

  /**
   * Serialize a copy of the model's data to be used by views.
   * Should contain the following properties:
   * guessWordLetters, hits, misses
   * @return {Object}
   */
  serialize: function () {
    return {
      guessWordLetters: this.guessWordLetters(),
      hits: this.hits.slice(),
      misses: this.misses.slice()
    };
  }

};
