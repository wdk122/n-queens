// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    columns: function () {
        return _.zip.apply(null, this.rows());
    },

    majorDiags : function (inputGrid) {
      var grid = inputGrid || this.rows();
      var n = grid.length;
      var results = [];
      for(var i = n - 2; i >= 0; i--){ // iterating over every diag starting in col 0
        var diag = [];
        // keep going until end of diagonal
        for (var j = 0; i + j < n; j++) {
          diag.push(grid[i+ j][j]);
        }
        results.push(diag);
      }
      // iterate over every diag starting in r0c1
      for(var i = 1; i < n - 1; i++){
        var diag = [];
        for (var j = 0; i + j < n; j++) {
          diag.push(grid[j][i + j]);
        }
        results.push(diag);
      }
      return results;
    },

    minorDiags : function () {

      var grid = [];

      _.each (this.rows(), function (value) {
        var row = value.slice();
        grid.push (row.reverse());

      });
      //console.log (grid);
      //debugger;
      return this.majorDiags(grid);
    },


      /*
      a b c       c b a
      d e f       f e d
      g h i       i h g



      */

      /*
      for loop for each diagonal
      [n-2, 0], [n-1, 1]
      [n-3, 0], [n-1, 1]

      rc
               30 41
            20 31 42
         10 21 32 43
      00 11 22 33 44
      01 12 23 34 
      02 13 24
      03 14   

      [0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0]

      (0,0) (0,1) (0,2)


      for (var i = 0, i < n - 2; i ++){
        array.push (grid (i, )

      }

      */  



    // TODO: define methods here for majorDiags and minorDiags


    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex + this.rows().length - 2;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex - 1;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    /*
    
      sum elements
      return sum > 1
    =======
    for each row
      test if row has conflict
      if conflict
        return true
    return false

    */
    hasRowConflictAt: function(rowIndex) {
     var row = this.rows()[rowIndex];
     var sum =  _.reduce (row, function (a, b) {
           return a + b;
      });
      return sum > 1; 
    },

    // test if any rows on this board contain conflict

    hasAnyRowConflicts: function() {
      
      for (var i =0; i < this.rows().length; i++) {
        if (this.hasRowConflictAt (i)){
          return true;
        }
      }
      return false; 
    },

    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {

      var column = this.columns()[colIndex];
      var sum =  _.reduce (column, function (a, b) {
           return a + b;
      });
      return sum > 1; 
     
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
     for (var i =0; i < this.columns().length; i++) {
        if (this.hasColConflictAt (i)){
          return true;
        }
      }
      return false; 
    },


    /*
    Major Pseudocode

    // for each diagonal
    // if sum > 1 --> collision
    // -2, -1,  0,  1,  2, 
    // 20, 10, 00, 01, 02,

       [1, 0, 0, 0],
       [0, 0, 0, 0],
       [1, 0, 0, 0],
       [0, 0, 0, 0]


    */
    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var length = this.rows().length;
      if(majorDiagonalColumnIndexAtFirstRow === -1 ||
         majorDiagonalColumnIndexAtFirstRow === 2 * length - 3){
        return false;        
      }
      var diag = this.majorDiags()[majorDiagonalColumnIndexAtFirstRow];
      var sum =  _.reduce (diag, function (a, b) {
        return a + b;
      });
      return sum > 1; 
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      for (var i =0; i < this.majorDiags().length; i++) {
        if (this.hasMajorDiagonalConflictAt(i)){
          return true;
        }
      }
      return false; 
    },

    /*
    Minor Pseudocode

    // for each diagonal
    // if sum > 1 --> collision
    // 10, 20, 30, 31, 32

       [1, 0, 0, 0],
       [0, 0, 0, 0],
       [1, 0, 0, 0],
       [0, 0, 0, 0]


    */


    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var length = this.rows().length;
      if(minorDiagonalColumnIndexAtFirstRow === -1 ||
         minorDiagonalColumnIndexAtFirstRow === 2 * length - 3){
        return false;        
      }
      var diag = this.minorDiags()[minorDiagonalColumnIndexAtFirstRow];
      var sum =  _.reduce (diag, function (a, b) {
        return a + b;
      });
      return sum > 1; 
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      for (var i =0; i < this.minorDiags().length; i++) {
      if (this.hasMinorDiagonalConflictAt(i)){
          return true;
        }
      }
      return false; 
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
