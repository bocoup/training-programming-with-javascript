// create a board
var board = [ ["_", "_", "_"],
              ["_", "_", "_"],
              ["_", "_", "_"]];

//create users
var player1 = "X";
var player2 = "O";

//get the element we'll put the game in
var game = document.getElementById('canvas');

//prompt the user to pick a spot
var make_choice = function(){
  var choice = prompt("pick a spot 1-9");
  return choice;
};

//place the appropriate marker on the spot
var mark_spot =  function(board, player, location) {
  if (location <= 3) {
    board[0][location-1]= player;
  }
  if (location <= 6 && location > 3) {
    board[1][location-4]= player;
  }
  if (location <= 9 && location > 6) {
    board[2][location-7]= player;
  }
  return board;
};

//turn the board into a string
var print_board = function(board) {
  var board_string = [];
  for(var i=0; i<board.length; i++){
    var row = board[i];
    var row_string = row.join(' | ');
    board_string.push(row_string);
  }
  return board_string.join('<br/>');
};

//take turns
var take_turn = function(player) {
  var choice = make_choice();
  var new_board = mark_spot(board, player, choice);
  //add the board to the page
  game.innerHTML = print_board(new_board);
};

//check if theres a win
var check_win = function(board) {
  if (  (board[0][0] === board[0][1] && board[0][1] === board[0][2]) ||
        (board[1][0] === board[1][1] && board[1][1] === board[1][2]) ||
        (board[2][0] === board[2][1] && board[2][1] === board[2][2]) ) {
    return true;
  }
  return false;
};

//check if game is over
var game_over = function() {
  if (roundcount >= 3) {
    if (check_win(board)) { return true; }
  }
  return false;
};

//count rounds
var roundcount = 0;

//play game
while(!game_over()){
  take_turn(player1);
  take_turn(player2);
  roundcount++;
}
