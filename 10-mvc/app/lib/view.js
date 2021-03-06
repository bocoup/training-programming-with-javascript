/**
 * Create or retrieve the namespace for our application.
 */
var Hangman = window.Hangman = window.Hangman || {};

/**
 * This is a constructor for creating an instance of our game
 * view. In this project, the view's responsibility is to
 * display our game board using data from a model, as provided
 * by the controller.
 *
 * Implementation:
 *   1. Store the passed jQuery selection on `this.$el`
 *   2. Find canvas tag inside $el and instantiate fabric.Canvas using it.
 *      Store the result on `this.canvas`.
 *   3. Find tag with class ".board" inside $el. Store it on `this.board`.
 *   4. Find tag with class ".input" inside $el. Store it on `this.input`.
 *   5. Find tag with class ".won" inside $el. Store it on `this.won`.
 *   6. Find tag with class ".lost" inside $el. Store it on `this.lost`.
 *   7. Find tag with class ".misses" inside $el. Store it on `this.misses`.
 *   8. Find tag with class ".button" inside $el. Store it on `this.button`.
 *   9. Find tag with class ".guess" inside $el. Store it on `this.guessField`.

 * @param {HTMLElement} el
 *   An HTML element which wraps the game board.
 * @constructs
 */
Hangman.View = function (el) {
  var $el = $(el);
  this.$el = $el;
  this.canvas = new fabric.Canvas($el.find('canvas').get(0));
  this.letters = $el.find('.letters');
  this.input = $el.find('.input');
  this.won = $el.find('.won');
  this.lost = $el.find('.lost');
  this.misses = $el.find('.misses');
  this.button = $el.find('button');
  this.guessField = $el.find('.guess');
};


/**
 * The order in which parts of the hangman board are drawn
 *
 * An array of strings matching static function on Hangman.View. The order of
 * this array will determine how the hangman is drawn each time an incorrect
 * guess is registered. The number of elements in this array will be used to
 * determine how many times a player can guess incorrectly before losing the
 * game.
 *
 * @property steps
 * @type Array
 */
Hangman.View.prototype.steps = [
  'gallows',
  'noose',
  'head',
  'body',
  'leftArm',
  'rightArm',
  'leftLeg',
  'rightLeg'
];

/**
 * Build the letter boxes that appear at the bottom of the canvas.
 *
 * Implementation:
 *   1. Empty the board element.
 *   2. Create a div element with a class of ".letter".
 *   2. Iterate over the provided letters. Do the following with each:
 *        - Clone the the div created in step #2.
 *        - If letter is in hits, set innerHTML of div to the letter.
 *        - If not, set innerHTML of div to "&nbsp;".
 *        - Append div to the board element.
 *   3. Return self to allow chaining.
 *
 * @param {Array} letters
 *   The word to guess as an array of characters.
 * @param {Array} hits
 *   The letters in the guess word which have been found
 * @return {Hangman.View}
 */
Hangman.View.prototype.drawBoardLetters = function (letters, hits) {

};

/**
 * Show used letters at the bottom of the board.
 *
 * Implementation:
 *   1. Set innerHTML of misses element to the letters, joined by commas.
 *   2. Return self to allow chaining.
 *
 * @param {Array} letters
 *   The letters to display as being used.
 * @return {Hangman.View}
 */
Hangman.View.prototype.drawMissedLetters = function (letters) {

};

/**
 * Show a won or lost message depending on the game state.
 *
 * Implementation:
 *   1. If status is Hangman.WON, hide input element and show won element.
 *   2. If status is Hangman.LOST, hide input element and show lost element.
 *   3. If status is anything else, hide won and lost elements and show input.
 *   4. Return self to allow chaining.
 *
 * @param {String} status
 *   A string representing the status of the game.
 * @return {Hangman.View}
 */
Hangman.View.prototype.drawWinOrLose = function (state) {

};

/**
 * Draw a fabric.js object on the view's canvas.
 *
 * Implementation:
 *   1. Add passed object to canvas.
 *   2. Return self to allow chaining.
 *
 * @param {fabric.*} item
 *   A fabric canvas object.
 * @return {Hangman.View}
 */
Hangman.View.prototype.draw = function (ob) {

};

/**
 * Find a step by name and draw on the view's canvas.
 *
 * Implementation:
 *   1. Take passed step and see if there is a matching method on the view.
 *   2. If it is, invoke the method and pass the result to `this.draw`.
 *   3. Return self to allow chaining.
 *
 * @param {String) step
 *   The name of the step to draw.
 * @return {Hangman.View}
 */
Hangman.View.prototype.drawStep = function (name) {

};

/**
 * Draw a specified number objects from the step listing on the view's
 * canvas.
 *
 * Implementation:
 *   1. Starting at zero, count up until you reach the passed number.
 *   2. For each number, do the following:
 *      - Find the name of the step by checking `this.step[#]`
 *      - Call `this.drawStep` with the name.
 *   3. Return self to allow chaining.
 *
 * @param {Integer) number
 *   The number of steps to draw.
 * @return {Hangman.View}
 */
Hangman.View.prototype.drawToStep = function (number) {

};

/**
 * Build the game board.
 *
 * Implementation:
 *   1. Clear the guess field.
 *   2. Clear the misses element.
 *   3. Clear the board element.
 *   4. Clear the canvas.
 *   5. Call `this.drawBoardLetters` with correct data from context.
 *   6. Call `this.drawMissedLetters` with correct data from context.
 *   7. Call `this.drawToStep` with correct data from context.
 *   8. Call `this.drawWinOrLoss` with correct data from context.
 *   9. Return self to allow chaining.
 *
 * @param {Object} context
 *   @param {Array} context.guessWordLetters
 *     The word being guessed, as an array of characters.
 *   @param {Array} context.hits
 *     The matching letters which have been guessed so far.
 *   @param {Array} context.misses
 *     The missed letters which have been guessed so far.
 *   @param {Boolean} context.status
 *     The state of the game.  One of the following:
 *     Hangman.WON, Hangman.LOST or Hangman.Playing
 * @return {Hangman.View}
 *   Self for chaining.
 */
Hangman.View.prototype.refreshBoard = function (context) {

};


/**
 * Build a fabric.Line to represent the top of the gallows.
 *
 * @return {fabric.Line}
 */
Hangman.View.gallows = function () {
  return new fabric.Line([50, 20, 520, 20], {
    stroke: '#666',
    strokeWidth: 10,
    selectable: false
  });
};

/**
 * Build a fabric.Line to represent the noose on the gallows.
 *
 * @return {fabric.Line}
 */
Hangman.View.noose = function () {
  return new fabric.Line([275, 20, 275, 100], {
    stroke: '#666',
    strokeWidth: 5,
    selectable: false
  });
};

/**
 * Build a fabric.Circle to represent the hangman's head.
 *
 * @return {fabric.Circle}
 */
Hangman.View.head = function () {
  return new fabric.Circle({
    left: 200,
    top: 55,
    radius: 50,
    strokeWidth: 5,
    stroke: '#666',
    fill: '#fff',
    selectable: false
  });
};

/**
 * Build a fabric.Line to represent the hangman's body.
 *
 * @return {fabric.Line}
 */
Hangman.View.body = function () {
  return new fabric.Line([275, 150, 275, 250], {
    stroke: '#666',
    strokeWidth: 5,
    selectable: false
  });
};

/**
 * Build a fabric.Line to represent the hangman's left arm.
 *
 * @return {fabric.Line}
 */
Hangman.View.leftArm = function () {
  return new fabric.Line([275, 180, 175, 250], {
    stroke: '#666',
    strokeWidth: 5,
    selectable: false
  });
};

/**
 * Build a fabric.Line to represent the hangman's right arm.
 *
 * @return {fabric.Line}
 */
Hangman.View.rightArm = function () {
  return new fabric.Line([275, 180, 375, 250], {
    stroke: '#666',
    strokeWidth: 5,
    selectable: false
  });
};

/**
 * Build a fabric.Line to represent the hangman's left leg.
 *
 * @return {fabric.Line}
 */
Hangman.View.leftLeg = function (){
  return new fabric.Line([275, 250, 175, 350], {
    stroke: '#666',
    strokeWidth: 5,
    selectable: false
  });
};

/**
 * Build a fabric.Line to represent the hangman's right leg.
 *
 * @return {fabric.Line}
 */
Hangman.View.rightLeg = function () {
  return new fabric.Line([275, 250, 375, 350], {
    stroke: '#666',
    strokeWidth: 5,
    selectable: false
  });
};
