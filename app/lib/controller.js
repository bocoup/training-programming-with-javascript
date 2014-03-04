/**
 * Namespace for our application.
 */
var Hangman = window.Hangman = window.Hangman || {};

/**
 * This is the constructor that creates a new instance of our game
 * controller. The responsibility of the controller is to orchestrate
 * communication between our view and model.
 *
 * @param {Hangman.Model} model An instance of Hangman.Model
 * @param {Hangman.View} view An instance of Hangman.View
 * @constructs
 */
Hangman.Controller = function (model, view) {
  this.model = model;
  this.view = view;
};

/**
 * The Controller prototype. Methods and properties defined in this
 * object will be shared by all instances of Hangman.View.
 */
Hangman.Controller.prototype = {


  /**
   * Update the game board and link the guess button in our view
   * to the guess method in our model.
   */
  start: function () {
    this.updateBoard();
    this.view.button.click(function () {
      this.guess(this.view.currentGuess());
    }.bind(this));
  },

  /**
   * Process a guess from the game by passing it to our model and
   * requesting that the view update with the results.
   *
   * @param {String} letter The letter to guess.
   */
  guess: function (letter) {
    this.model.guess(letter);
    this.updateBoard();
  },

  /**
   * Tell the view to draw the game board using data from our model.
   */
  updateBoard: function () {
    this.view.buildBoard(this.model.serialize());
  },

  /**
   * Determine whether the game is over.
   *
   * @return {Boolean}
   *   True if the game is over, false otherwise.
   */
  isGameOver : function() {
    if (this.model.guesses >= this.view.steps.length) {
      return true;
    }
    if (this.model.hits >= this.word.length) {
      return true;
    }
    return false;
  }

};
