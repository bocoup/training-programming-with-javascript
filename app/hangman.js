/**
 * Namespace for our application.
 */
var Hangman = window.Hangman = window.Hangman || {};

/**
 * The list of words we'll choose from.
 * source: http://answers.yahoo.com/question/index?qid=20080510101849AAN28jL
 */
Hangman.WORDLIST = 'abbey abruptly affix askew axiom azure bagpipes banjo bayou bikini blitz bookworm boxcar boxful buckaroo buffalo buffoon cobweb croquet daiquiri disavow duplex dwarves equip exodus fishhook fixable foxglove galaxy gazebo gizmo glowworm guffaw haiku hyphen icebox injury ivory ivy jaundice jaywalk jazzy jigsaw jiujitsu jockey jovial joyful juicy jumbo kazoo keyhole khaki kilobyte kiosk knapsack larynx luxury marquis mystify nowadays ovary oxidize oxygen pajama peekaboo pixel pizazz polka quartz quiz quorum rhubarb rickshaw sphinx spritz squawk subway swivel topaz unknown unworthy unzip uptown vaporize vixen vodka vortex walkway waltz wavy waxy wheezy whiskey whomever wimpy wizard woozy yippee youthful zephyr zigzag zilch zodiac zombie'.split(' ');

/**
 * The possible states our game could be in.
 */
Hangman.WON = "won";
Hangman.LOST = "lost";
Hangman.PLAYING = "playing";

/**
 * Randomly select an element from a provided array.
 *
 * @param {Array} wordlist
 *   The word to guess as an array of characters.
 * @return {String}
 *   A single element from the provided array.
 */
Hangman.randomWord = function (wordlist) {
  return wordlist[Math.floor(Math.random() * wordlist.length)];
};

/**
 * Create a new instance of our game on a provided element.
 *
 * @param {HTMLElement} el
 *   An HTML element that wraps the game board.
 * @return {String}
 *   A single element from the provided array.
 */
Hangman.createGame = function (el) {
  var model = new Hangman.Model(Hangman.randomWord(Hangman.WORDLIST));
  var view = new Hangman.View(el);
  return new Hangman.Controller(model, view);
};
