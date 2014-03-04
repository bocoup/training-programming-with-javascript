/**
 * Create or retrieve the namespace for our application.
 */
var Hangman = window.Hangman = window.Hangman || {};

/**
 * This is a constructor for creating an instance of our game
 * model. In this project, the model's responsibility is to
 * encapsulate the state of a running game.
 *
 * @params {Array} wordlist
 *   An array of possible words to pick from.
 * @constructs
 */
Hangman.Model = function (wordlist) {
  this.hits = [];
  this.misses = [];
  this.guessWord = wordlist[Math.floor(Math.random() * wordlist.length)];
};

/**
 * The Model prototype. Methods and properties defined in this
 * object will be shared by all instances of Hangman.Model.
 */
Hangman.Model.prototype = {

  /**
   * The word being guessed as an array of letters.
   *
   * @return {Array}
   */
  guessWordLetters: function () {
    return this.guessWord.split('');
  },

  /**
   * Get an array of all our guesses.
   *
   * @return {Array}
   *   Hits and misses combined.
   */
  guesses: function () {
    return this.hits.concat(this.misses);
  },

  /**
   * Determine whether a provided guess is a valid.
   *
   * A valid guess is a single, alphanumeric character that has
   * not already been guessed during the game.
   *
   * @param {String} guess
   *   The guess to validate.
   * @return {Boolean}
   *   True if guess is valid, false otherwise.
   */
  validateGuess: function (guess) {
    return /^[A-Za-z]$/.test(guess) && this.guesses().indexOf(guess) === -1;
  },

  /**
   * Determine the positions at which a given letter matches the
   * chosen word, if any.
   *
   * @param {String} guess
   *   The letter to locate inside the guessWord.
   * @return {Array}
   *   An array of positions at which the guess matches.
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
   * If a guess is valid, check to see if the letter being guessed
   * is in the guessWord.  If it is, add the letter to the model's
   * array of hits.  If it isn't, add the letter to the model's
   * array of misses.
   *
   * @param {String} guess
   *   The letter to guess with.
   * @return {Boolean}
   *   True if guess was a hit, false otherwise.
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
   * Determine if the current state of the game is winning.
   *
   * Note: A non-winning game is not necessarily lost.
   *
   * @return {Boolean}
   *   True if each letter in the guessWord exists in
   *   the hits array, otherwise false.
   */
  won: function () {
    return this.guessWordLetters().every(function (letter) {
      return this.hits.indexOf(letter) !== -1;
    }, this);
  },

  /**
   * Serialize a copy of model's data to be used by views.
   * Should contain the following properties:
   *
   * guessWordLetters, hits, misses
   *
   * @return {Object}
   */
  serialize: function () {
    return {
      guessWordLetters: this.guessWordLetters(),
      hits: this.hits.slice(),
      misses: this.misses.slice(),
      won: this.won()
    };
  }

};
