/**
 * Create or retrieve the namespace for our application.
 */
var Hangman = window.Hangman = window.Hangman || {};

/**
 * This is a constructor for creating an instance of our game
 * controller. In this project, the controller's responsibility
 * is to orchestrate communication between our view and model.
 *
 * @param {Hangman.Model} model
 *   An instance of Hangman.Model
 * @param {Hangman.View} view
 *   An instance of Hangman.View
 * @constructs
 */
Hangman.Controller = function (model, view) {
  this.model = model;
  this.view = view;
};

/**
 * The Controller prototype. Methods and properties defined in this
 * object will be shared by all instances of Hangman.Controller.
 */
Hangman.Controller.prototype = {

  /**
   * Initialize the game board and link the guess button in our
   * view to the guess method in our model.
   */
  start: function () {
    this.refreshGame();
    this.view.button.click(function () {
      this.guess(this.view.guessField.val());
    }.bind(this));
  },

  /**
   * Process a guess from the game by passing it to our model and
   * requesting that the view update itself using the results.
   *
   * @param {String} letter
   *   The letter to guess.
   */
  guess: function (letter) {
    this.model.guess(letter);
    this.refreshGame();
  },

  /**
   * Tell the view to draw the game board using data from our model.
   */
  refreshGame: function () {
    this.view.refreshBoard(this.model.serialize());
  }

};
