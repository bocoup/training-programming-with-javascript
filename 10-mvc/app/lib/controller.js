/**
 * Create or retrieve the namespace for our application.
 */
var Hangman = window.Hangman = window.Hangman || {};

/**
 * This is a constructor for creating an instance of our game
 * controller. In this project, the controller's responsibility
 * is to orchestrate communication between our view and model.
 *
 * Implementation:
 *   1. Store the passed model on `this.model`
 *   2. Store the passed view on `this.view`
 *
 * @param {Hangman.Model} model
 *   An instance of Hangman.Model
 * @param {Hangman.View} view
 *   An instance of Hangman.View
 * @constructs
 */
Hangman.Controller = function (model, view) {

};

/**
 * Tell the view to draw the game board using data from our model.
 *
 * Implementation:
 *   1. Extract the game state from the model.
 *   2. Call refreshBoard on the view using the serialized data.
 */
Hangman.Controller.prototype.refreshGame = function () {

};

/**
 * Process a guess from the game.
 *
 * Implementation:
 *   1. Call guess method on model using the passed letter.
 *   2. Call refreshGame method to update the board.
 *
 * @param {String} letter
 *   The letter to guess.
 */
Hangman.Controller.prototype.guess = function (letter) {

};

/**
 * Initialize the game board.
 *
 * Implementation:
 *   1. Call refreshGame for initial board setup.
 *   2. Create a click handler for on the view's button.
 *      It should get the current letter and call guess
 *      on the controller using it.
 *   3. Derive the maximum number of steps to lose a game
 *      from the view and set maxMisses on the model to
 *      that number.
 */
Hangman.Controller.prototype.start = function () {

};
