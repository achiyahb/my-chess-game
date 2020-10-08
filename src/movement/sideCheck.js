export default {
    checkSquareBeside
}


function checkSquareBeside(square,board,i,j, color, canGoArray){
    if (square.x+j > 7
        || square.x+j < 0 || square.y+i > 7 || square.y+i < 0) return
    let sideSquare = board[square.x+j][square.y+i]
    if (square.piece){
        if (square.piece.limit){
            sideSquare.canGo = true
            canGoArray.push(sideSquare)
            return
        }
    }
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
    checkSquareBeside(sideSquare,board,i,j, canGoArray)
}
