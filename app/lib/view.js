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
   * Implementation:
   *   1. Create an array of strings matching function names on the
   *      view which can be used to draw parts of the hangman. The
   *      order of the steps will determine how the hangman is drawn.
   *      The number of elements in this array will be used to determine
   *      how many steps it takes to lose the game.
   *
   * @property steps
   * @type Array
   */
  steps: ['gallows', 'noose', 'head', 'body', 'leftArm',
          'rightArm', 'leftLeg', 'rightLeg'],

  /**
   * Build the letter boxes that appear at the bottom of the canvas.
   *
   * Implementation:
   *   1. Empty the board element.
   *   2. Iterate over the provided letters. Do the following with each:
   *        - Create a div with the class ".letter".
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
  drawBoardLetters: function (letters, hits) {
    this.board.empty();
    letters.forEach(function (letter, index) {
      var input = $('<div>').addClass('letter');
      if (hits.indexOf(letter) !== -1) {
        input.html(letter);
      } else {
        input.html('&nbsp;');
      }
      this.board.append(input);
    }, this);
    return this;
  },

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
  drawMissedLetters: function (letters) {
    this.misses.html(letters.join(', '));
    return this;
  },

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
  drawWinOrLose: function (status) {
    if (status === Hangman.WON) {
      this.input.hide();
      this.won.show();
    } else if (status === Hangman.LOST) {
      this.input.hide();
      this.lost.show();
    } else {
      this.input.show();
      this.won.hide();
      this.lost.hide();
    }
    return this;
  },

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
  draw: function (ob) {
    this.canvas.add(ob);
    return this;
  },

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
  drawStep: function (name) {
    var step = this[name];
    if (step) {
      var ob = step();
      this.draw(ob);
    }
    return this;
  },

  /**
   * Draw a specified number objects from the step listing on the view's
   * canvas.
   *
   * Implementation:
   *   1. Starting at zero, count up until you reach the passed number.
   *   2. For each number, do the following:
   *      - Find the name of the step by checking `this.step[idx]`
   *      - Call `this.drawStep` with the name.
   *   3. Return self to allow chaining.
   *
   * @param {Integer) number
   *   The number of steps to draw.
   * @return {Hangman.View}
   */
  drawToStep: function (number) {
    for (var idx=0; idx < number; idx++) {
      var step = this.steps[idx];
      this.drawStep(step);
    }
    return this;
  },

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
   *   @param {Boolean} context.won
   *     True or false, depending on if the game has been won.
   * @return {Hangman.View}
   *   Self for chaining.
   */
  refreshBoard: function (context) {
    this.guessField.val('');
    this.misses.empty();
    this.board.empty();
    this.canvas.clear();
    this.drawBoardLetters(context.guessWordLetters, context.hits);
    this.drawMissedLetters(context.misses);
    this.drawToStep(context.missCount);
    this.drawWinOrLose(context.status);
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
