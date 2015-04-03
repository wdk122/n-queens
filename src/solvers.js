/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting



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
  var solutionCount = 0;
  var board = new Board ({n:n});
  var recursive = function (r) {

    if(r === n) {
      solutionCount++;
      return;
    }
    for (var c = 0; c < n; c++) {
      
      board.togglePiece(r,c);
      if(!board.hasAnyRooksConflicts()){
        recursive(r + 1);
      }
      board.togglePiece(r, c);
    }
  };
  recursive(0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

    //   SB's old code for countNRooksSolutions
    //   if (board.hasAnyRooksConflicts()) {
    //      board.togglePiece(r,c);
    //   } else {
    //     recursive(r+1);
    //     board.togglePiece (r,c);
    //   }
    
    // } return;
    //   }
    // recursive(0);



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























