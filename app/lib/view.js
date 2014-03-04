/**
 * Namespace for our application.
 */
var Hangman = window.Hangman = window.Hangman || {};

/**
 * This is the constructor that creates a new instance of our game
 * view. The responsibility of the view is to display our game board
 * using data from our model, as provided by the controller.
 *
 * @constructs
 */
Hangman.View = function (el) {
  $el = $(el);
  this.$el = $el;
  this.canvas = new fabric.Canvas($el.find('canvas').get(0));
  this.board = $el.find('.board');
  this.misses = $el.find('.misses');
  this.button = $el.find('button');
  this.guessField = $el.find('.guess');
};

/**
 * The View prototype. Methods and properties defined in this
 * object will be shared by all instances of Hangman.View.
 */
Hangman.View.prototype = {

  steps: ['gallows', 'noose', 'head', 'body', 'leftArm',
          'rightArm', 'leftLeg', 'rightLeg'],

  currentGuess: function () {
    return this.guessField.val();
  },

  /**
   * Reset the game board:
   *
   * 1. Empty the guess field.
   * 2. Clear bad letters.
   * 3. Remove letter boxes.
   * 4. Remove all canvas objects.
   *
   */
  resetBoard: function () {
    this.guessField.val('');
    this.misses.empty();
    this.board.empty();
    this.canvas.clear();
  },

  /**
   * Given the word to guess as an array of letters, and an array of
   * letters that have been guessed already, add an div to the board
   * for each letter.  Letters which have been guessed should be filled
   * in.
   *
   * @param {Array} letters The word to guess as an array of characters.
   * @param {Array} hits The letters in the guess word which have been found
   */
  showHits: function (letters, hits) {
    this.board.empty();
    letters.forEach(function (letter, index) {
      var input = $('<div>&nbsp;</div>').addClass('letter');
      if (hits.indexOf(letter) !== -1) {
        input.html(letter);
      }
      this.board.append(input);
    }, this);
  },

  /**
   * Show used letters at the bottom of the board.
   *
   * @param {Array} letters the used letters to display.
   */
  showMisses: function (letters) {
    this.misses.html(letters.sort().join(', '));
  },

  /**
   * Build the game board.
   *
   * @param {Object} context
   *   @param {Array} context.wordLetters
   *     the word being guessed, as an array of characters.
   *   @param {Array} context.hits
   *     the letters which have been guessed so far.
   *   @param {Array} context.guesses
   *     the letters which have been guessed so far.
   */
  buildBoard: function (context) {
    this.resetBoard();
    this.showHits(context.guessWordLetters, context.hits);
    this.showMisses(context.misses);
    this.drawSteps(context.misses.length);
  },

  /**
   * Draw a fabric object on the canvas.
   *
   * @return {Hangman.View} Return self for chaining.
   */
  draw: function (item) {
    this.canvas.add(item);
    return this;
  },

  /**
   * Draw a specified step on the canvas by name.
   *
   * @param {String) step the name of the step to draw.
   * @return {Hangman.View}
   *   Self for chaining.
   */
  drawStep: function (step) {
    this.draw(this[step]());
    return this;
  },

  /**
   * Draw multiple steps on the canvas.
   *
   * @param {Integer) count the number of steps to draw.
   * @return {Hangman.View}
   *   Self for chaining.
   */
  drawSteps: function (count) {
    for(var i=0;i<count;i++) {
      this.drawStep(this.steps[i]);
    }
    return this;
  },

  /**
   * Build a fabric.Line to represent the top of the gallows.
   *
   * @return {fabric.Line}
   */
  gallows: function () {
    return new fabric.Line([50, 20, 520, 20], {
      stroke: '#666',
      strokeWidth: 10,
      selectable: false
    });
  },

  /**
   * Build a fabric.Line to represent the noose on the gallows.
   *
   * @return {fabric.Line}
   */
  noose: function () {
    return new fabric.Line([275, 20, 275, 100], {
      stroke: '#666',
      strokeWidth: 5,
      selectable: false
    });
  },

  /**
   * Build a fabric.Circle to represent the hangman's head.
   *
   * @return {fabric.Circle}
   */
  head: function () {
    return new fabric.Circle({
      left: 200,
      top: 55,
      radius: 50,
      strokeWidth: 5,
      stroke: '#666',
      fill: '#fff',
      selectable: false
    });
  },

  /**
   * Build a fabric.Line to represent the hangman's body.
   *
   * @return {fabric.Line}
   */
  body: function () {
    return new fabric.Line([275, 150, 275, 250], {
      stroke: '#666',
      strokeWidth: 5,
      selectable: false
    });
  },

  /**
   * Build a fabric.Line to represent the hangman's left arm.
   *
   * @return {fabric.Line}
   */
  leftArm: function () {
    return new fabric.Line([275, 180, 175, 250], {
      stroke: '#666',
      strokeWidth: 5,
      selectable: false
    });
  },

  /**
   * Build a fabric.Line to represent the hangman's right arm.
   *
   * @return {fabric.Line}
   */
  rightArm: function () {
    return new fabric.Line([275, 180, 375, 250], {
      stroke: '#666',
      strokeWidth: 5,
      selectable: false
    });
  },

  /**
   * Build a fabric.Line to represent the hangman's left leg.
   *
   * @return {fabric.Line}
   */
  leftLeg: function (){
    return new fabric.Line([275, 250, 175, 350], {
      stroke: '#666',
      strokeWidth: 5,
      selectable: false
    });
  },

  /**
   * Build a fabric.Line to represent the hangman's right leg.
   *
   * @return {fabric.Line}
   */
  rightLeg: function () {
    return new fabric.Line([275, 250, 375, 350], {
      stroke: '#666',
      strokeWidth: 5,
      selectable: false
    });
  }
};
