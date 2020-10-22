import pieces from "@/tools/pieces";

export default {
   kingCanGoTO
}
let canGoArray = []

function kingCanGoTO(square,board){
    let color = square.piece.color
    for (let i = -1; i<2; i++){
        for (let j = -1; j<2; j++){
            checkSideSquare(square,board, i,j, color)
        }
    }
    return [canGoArray,board]
}

function checkSideSquare(square,board,i,j, color){
    if (square.x+j > 7 || square.x+j < 0 || square.y+i > 7 || square.y+i < 0) return
    let sideSquare = board[square.x+j][square.y+i]
    if (sideSquare.threatBy){
        if (sideSquare.threatBy.some(piece => piece.pieceColor !== color)) {
            return;
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
   return
}

