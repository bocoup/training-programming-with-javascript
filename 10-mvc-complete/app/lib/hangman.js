 /**
 * This is a constructor for creating an instance of our game.
 *
 * Implementation:
 *   1. Instantiate Hangman.Model with a word to guess.
 *   2. Instantiate Hangman.View with a provided HTML element.
 *   3. Instantiate Hangman.Controller, passing it the model and view.
 *   4. Return Hangman.Controller.
 *
 * @param {HTMLElement} el
 *   An HTML element that wraps the game board.
 * @return {Hangman.Controller}
 */
function Hangman(el) {
  var word = Hangman.randomElement(Hangman.WORDLIST);
  var model = new Hangman.Model(word);
  var view = new Hangman.View(el);
  return new Hangman.Controller(model, view);
}

/**
 * The list of words we'll choose from.
 * source: http://answers.yahoo.com/question/index?qid=20080510101849AAN28jL
 */
Hangman.WORDLIST = 'abbey abruptly affix askew axiom azure bagpipes banjo bayou bikini blitz bookworm boxcar boxful buckaroo buffalo buffoon cobweb croquet daiquiri disavow duplex dwarves equip exodus fishhook fixable foxglove galaxy gazebo gizmo glowworm guffaw haiku hyphen icebox injury ivory ivy jaundice jaywalk jazzy jigsaw jiujitsu jockey jovial joyful juicy jumbo kazoo keyhole khaki kilobyte kiosk knapsack larynx luxury marquis mystify nowadays ovary oxidize oxygen pajama peekaboo pixel pizazz polka quartz quiz quorum rhubarb rickshaw sphinx spritz squawk subway swivel topaz unknown unworthy unzip uptown vaporize vixen vodka vortex walkway waltz wavy waxy wheezy whiskey whomever wimpy wizard woozy yippee youthful zephyr zigzag zilch zodiac zombie'.toUpperCase().split(' ');

/**
 * The possible states our game could be in.
 */
Hangman.WON = 'won';
Hangman.LOST = 'lost';
Hangman.PLAYING = 'playing';

/**
 * Randomly select an element from a provided array.
 *
 * Implementation:
 *   1. Generate a random number from 0 to 1.
 *   2. Get the maximum size of the number (the length of the wordlist).
 *   3. Multiply the random number and the max size together.
 *   4. Round the number down to an integer.
 *   5. Return that item from the wordlist.
 *
 * @param {Array} wordlist
 *   An array of possible words to select.
 * @return {String}
 */
Hangman.randomElement = function (wordlist) {
  var randomNumber = Math.random();
  var maxSize = wordlist.length;
  var index = Math.floor(randomNumber*maxSize);
  return wordlist[index];
};
