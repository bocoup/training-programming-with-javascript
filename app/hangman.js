/**
 * Namespace for our application.
 */
var Hangman = window.Hangman = window.Hangman || {};

/**
 * The list of words we'll choose from.
 * source: http://answers.yahoo.com/question/index?qid=20080510101849AAN28jL
 */
Hangman.WORDS = 'abbey abruptly affix askew axiom azure bagpipes banjo bayou bikini blitz bookworm boxcar boxful buckaroo buffalo buffoon cobweb croquet daiquiri disavow duplex dwarves equip exodus fishhook fixable foxglove galaxy gazebo gizmo glowworm guffaw haiku hyphen icebox injury ivory ivy jaundice jaywalk jazzy jigsaw jiujitsu jockey jovial joyful juicy jumbo kazoo keyhole khaki kilobyte kiosk knapsack larynx luxury marquis mystify nowadays ovary oxidize oxygen pajama peekaboo pixel pizazz polka quartz quiz quorum rhubarb rickshaw sphinx spritz squawk subway swivel topaz unknown unworthy unzip uptown vaporize vixen vodka vortex walkway waltz wavy waxy wheezy whiskey whomever wimpy wizard woozy yippee youthful zephyr zigzag zilch zodiac zombie'.split(' ');

/**
 *
 */
Hangman.createGame = function () {
  var model = new Hangman.Model(Hangman.WORDS);
  var view = new Hangman.View($('.hangman'));
  return new Hangman.Controller(model, view);
};
