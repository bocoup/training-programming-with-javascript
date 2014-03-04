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
 * @param {HTMLElement} el An HTML element wrapping the game board.
 * @constructs
 */
Hangman.View = function (el) {
  var $el = $(el);
  this.$el = $el;
  this.canvas = new fabric.Canvas($el.find('canvas').get(0));
  this.board = $el.find('.board');
  this.input = $el.find('.input');
  this.won = $el.find('.won');
  this.lost = $el.find('.lost');
  this.misses = $el.find('.misses');
  this.button = $el.find('button');
  this.guessField = $el.find('.guess');
};

/**
 * The View prototype. Properties defined in this object will
 * be shared by all instances of Hangman.View.
 */
Hangman.View.prototype = {

  /**
   * The order in which parts of the hangman board are drawn
   *
   * @property steps
   * @type Array
   */
  steps: ['gallows', 'noose', 'head', 'body', 'leftArm',
          'rightArm', 'leftLeg', 'rightLeg'],

  /**
   * Build the game board.
   *
   * @param {Object} context
   *   @param {Array} context.guessWordLetters
   *     The word being guessed, as an array of characters.
   *   @param {Array} context.hits
   *     The matching letters which have been guessed so far.
   *   @param {Array} context.misses
   *     The missed letters which have been guessed so far.
   *   @param {Boolean} context.won
   *     True or false, depending on if the game has been won.
   */
  refreshBoard: function (context) {
    this.guessField.val('');
    this.misses.empty();
    this.board.empty();
    this.canvas.clear();
    this.drawHits(context.guessWordLetters, context.hits);
    this.drawMisses(context.misses);
    this.drawToStep(context.misses.length);
    this.drawWinOrLose(context);
  },

  /**
   * Given the word to guess as an array of letters, and an array of
   * letters that have been guessed already, add an div to the board
   * for each letter.  Letters which have been guessed should be filled
   * in.
   *
   * @param {Array} letters
   *   The word to guess as an array of characters.
   * @param {Array} hits
   *   The letters in the guess word which have been found
   * @return {Hangman.View}
   *   Self for chaining.
   */
  drawHits: function (letters, hits) {
    this.board.empty();
    letters.forEach(function (letter, index) {
      var input = $('<div>&nbsp;</div>').addClass('letter');
      if (hits.indexOf(letter) !== -1) {
        input.html(letter);
      }
      this.board.append(input);
    }, this);
    return this;
  },

  /**
   * Show used letters at the bottom of the board.
   *
   * @param {Array} letters
   *   The letters to display as being used.
   * @return {Hangman.View}
   *   Self for chaining.
   */
  drawMisses: function (letters) {
    this.misses.html(letters.sort().join(', '));
    return this;
  },

  /**
   * Show a won or lost message depending on the game state.
   *
   * @param {context} letters
   *   The letters to display as being used.
   * @return {Hangman.View}
   *   Self for chaining.
   */
  drawWinOrLose: function (context) {
    if (context.won) {
      this.input.hide();
      this.won.show();
    } else if (context.misses.length >= this.steps.length) {
      this.input.hide();
      this.lost.show();
    }
    return this;
  },

  /**
   * Draw a fabric.js object on the view's canvas.
   *
   * @return {Hangman.View}
   *   Self for chaining.
   */
  draw: function (item) {
    this.canvas.add(item);
    return this;
  },

  /**
   * Look up a step defined on the view by name and draw it on our canvas.
   *
   * @param {String) step
   *   The name of the step to draw.
   * @return {Hangman.View}
   *   Self for chaining.
   */
  drawStep: function (step) {
    var item = this[step]();
    this.canvas.add(item);
    return this;
  },

  /**
   * Draw a specified number objects from the step listing on the view's
   * canvas.
   *
   * @param {Integer) count
   *   The number of steps to draw.
   * @return {Hangman.View}
   *   Self for chaining.
   */
  drawToStep: function (count) {
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
