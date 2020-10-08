
export default {
    diagonallyCanGoTO
}
let canGoArray = []

function diagonallyCanGoTO(square,board){
    let color = square.piece.color
    for (let i = -1; i<2; i+=2){
        for (let j = -1; j<2; j+=2){
            checkSideSquare(square,board, i,j, color)
        }
    }
    return [canGoArray,board]
}

function checkSideSquare(square,board,i,j, color){
    if (square.x+j > 7
        || square.x+j < 0 || square.y+i > 7 || square.y+i < 0) return
    let sideSquare = board[square.x+j][square.y+i]
    if (sideSquare.piece) {
      if  (sideSquare.piece.color !== color){
          sideSquare.canGo = true
          canGoArray.push(sideSquare)
          return
      } else {
        return
      }
    }
    sideSquare.canGo = true
    canGoArray.push(sideSquare)
    checkSideSquare(sideSquare,board,i,j)
}
