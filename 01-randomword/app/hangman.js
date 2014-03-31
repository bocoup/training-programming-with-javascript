var words = ['abbey', 'bagpipes', 'cobweb', 'daiquiri', 'equip', 'fishhook', 'galaxy', 'haiku', 'icebox', 'jaundice', 'kazoo', 'larynx', 'marquis', 'nowadays', 'ovary', 'pajama', 'quartz', 'rhubarb', 'sphinx', 'topaz', 'unknown', 'vaporize', 'walkway', 'yippee', 'xylophone', 'zephyr'];

/**
 * Randomly select an element from a provided array.
 *
 * Implementation:
 *   1. Generate a random number from 0 to 1.
 *   2. Get the maximum size of the number (the length of the wordlist).
 *   3. Multiply the random number and the max size together.
 *   4. Round the number down to an integer.
 *   5. Return that item from the provided wordlist.
 *
 * @param {Array} wordlist
 *   An array of possible words to select.
 * @return {String}
 */
var randomElement = function (wordlist) {

};

/**
 * Continuously update the game board.
 */
setInterval(function () {
  var game = document.getElementById('hangman');
  game.innerHTML = '<u>Guess Word</u><br><strong>'+randomElement(words)+'</strong>';
}, 100);
