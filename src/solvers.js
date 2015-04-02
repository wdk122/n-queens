/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting

/*

bool Solve(configuration conf, column)
{
  if (no more choices) // BASE CASE
     return (conf is goal state);
     
  for (all available choices) {
    try one choice c;
    // solve from here, if works out, you're done
    if (Solve(conf with choice c made)) return true;
     unmake choice c;
  }
    return false; // tried all choices, no soln found
}

row 0


 1 0 0
 0 1 0
 0 0 0

 0 1 0
 0 0 1
 1 0 0

 */


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

/*

PC START
window.findNRooksSolution = function(n) {
  var colCheck = function(r){
    if row too big
     return this.rows();;
    for each col c in row  
      put rook at rc
      if rookconflictcheck
        grid[r][c] = 0
      else
        colcheck(r+1)

  }
  colcheck(0);
    
PC END

*/

window.findNRooksSolution = function(n) {
  var board = new Board({n: n});

  var colCheck = function(r){
    
    if(r === n){
      
      return;
    }
    for(var c = 0; c < n; c++){
      board.togglePiece(r,c);
      if(board.hasAnyRooksConflicts()){
        board.togglePiece(r,c);
      }
      else
        colCheck(r+1);
    }

  };
  colCheck(0);
  var solution = board.rows();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  
  /*
  solutionCount = 0;
  loop thru putting each elm in first row
  put elm in next row
  ..
  put elm in nth row
    if noconflict then solutionCount++
    reset board
  return solutionCount;
  */

  /*
0 0
0 0


  */
 

  // var recursive = function (r) {

  //   for (var c = 0; c < n; c++) {
  //     console.log(r);
  //     if (r === 0){
  //       var board = new Board ({n:n});
  //       solutionCount++;
  //       return;
  //     }
  //     board.togglePiece(r,c);
  //     if (board.hasAnyRooksConflicts()) {
  //        board.togglePiece(r,c);
  //     } else {
  //       recursive(r+1);
  //       board.togglePiece(r,c);
  //     }
  //   } return;

  // };

  var solutionCount = 0;
  var board = new Board ({n:n});
  var recursive = function (r) {

    if(r === n) {
      solutionCount++;
      return;
    }

    for (var c = 0; c < n; c++) {
      
     board.togglePiece(r,c);
      if (board.hasAnyRooksConflicts()) {
         board.togglePiece(r,c);
      } else {
        recursive(r+1);
        board.togglePiece (r,c);
      }
    
    } return;


  };
  recursive(0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n: n});
  var numPieces = function(){
    _.reduce(board.rows(), function(memo, row) {
      return memo + _.reduce(row, function(memo, col) {
        return memo + col;
      }, 0);
    }, 0);
  };
  var solution;
  if (n === 0) {
    return board.rows();
  }

  var colCheck = function(r){    
    if(r === n){
      // if (numPieces() === n) {
        return;
      // }
    }
    for(var c = 0; c < n; c++){
      board.togglePiece(r, c);
      if(board.hasAnyQueensConflicts()){
        board.togglePiece(r, c);
      }
      else{
        colCheck(r + 1);
        var numPieces = _.reduce(board.rows(), function(memo, row) {
          return memo + _.reduce(row, function(memo, col) {
            return memo + col;
          }, 0);
        }, 0);
        if (numPieces !== n) {
          board.togglePiece(r, c);
        } else {
          return;
        }
      }
    }

  };
  colCheck(0);

  solution = board.rows();

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board ({n:n});
  var recursive = function (r) {

    if(r === n) {
      solutionCount++;
      return;
    }

    for (var c = 0; c < n; c++) {
      
     board.togglePiece(r,c);
      if (board.hasAnyQueensConflicts()) {
         board.togglePiece(r,c);
      } else {
        recursive(r+1);
        board.togglePiece (r,c);
      }
    
    } return;


  };
  recursive(0);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

/*
var colCheck = function(r){    
    if(r === n){
      
        return;
    }
    for(var c = 0; c < n; c++){
      board.togglePiece(r,c);
      if(board.hasAnyQueensConflicts()){
        board.togglePiece(r,c);
      }
      else{
        colCheck(r+1);
        var numPieces = _.reduce(board.rows(), function(memo, row) {
          return memo + _.reduce(row, function(memo, col) {
      return memo + col;
       }, 0);
     }, 0);
        if (numPieces !== n) {
          board.togglePiece(r,c);
        } else {
          return;
        }
      }
    }

  };


*/


















