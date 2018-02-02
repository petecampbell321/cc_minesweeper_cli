export class Board {
    constructor(numberOfRows, numberOfColumns, numberOfBombs) {
      this._numberOfBombs = numberOfBombs;
      this._numberOfTiles = (numberOfRows * numberOfColumns);
      this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
      this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
    }
  
    get playerBoard() {
      return this._playerBoard;
    }
  
    flipTile(rowIndex, columnIndex) {
      if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
        'This tile has already been flipped!';
        return;
      } else if (this._bombBoard[rowIndex][columnIndex] == 'B') {
        this._playerBoard[rowIndex][columnIndex] = 'B';
      } else {
        this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighbourBombs(rowIndex, columnIndex);
      }
      this._numberOfTiles--;
    }
  
    getNumberOfNeighbourBombs(rowIndex, columnIndex) {
      const neighbourOffsets = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1]
      ];
      const numberOfRows = this._bombBoard.length;
      const numberOfColumns = this._bombBoard[0].length;
      let numberOfBombs = 0;
    
      neighbourOffsets.forEach(offset => {
        const neightbourRowIndex =  rowIndex + offset[0];
        const neighbourColumnIndex = columnIndex + offset[1];
        if (neightbourRowIndex >= 0
          && neightbourRowIndex < numberOfRows
          && neighbourColumnIndex >= 0
          && neighbourColumnIndex < numberOfColumns) {
            if (this._bombBoard[neightbourRowIndex][neighbourColumnIndex] === 'B') {
              numberOfBombs++;
            }
          }
      });
      return numberOfBombs;
    }
  
    hasSafeTiles() {
      return this._numberOfTiles !== this._numberOfBombs;
    }
  
    print() {
      console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
    }
  
    static generatePlayerBoard(numberOfRows, numberOfColumns) {
      let board = [];
    
      for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
        // Code inside this block gets run based on the number of rows (3)
        let row = [];
        for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
          // Code inside this block gets run based on the number of columns (3)
          row.push(' ');
        }
        board.push(row);
      }
      return board;
    }
  
    static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
      let board = [];
    
      for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
        // Code inside this block gets run based on the number of rows (3)
        let row = [];
        for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
          // Code inside this block gets run based on the number of columns (3)
          row.push(null);
        }
        board.push(row);
      }
    
      let numberOfBombsPlaced = 0;
    
      while (numberOfBombsPlaced < numberOfBombs) {
        // Later this while loop will be ammended using control flow to stop
        // bombs being placed ontop of each other.
        let randomRowIndex = Math.floor(Math.random() * numberOfRows);
        let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
    
        if (board[randomRowIndex][randomColumnIndex] != 'B') {
          board[randomRowIndex][randomColumnIndex] = 'B';
          numberOfBombsPlaced++;
        }
      }
      return board;
    }
  };