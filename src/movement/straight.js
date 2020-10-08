
export default {
    straightCanGoTO
}
let canGoArray = []

function straightCanGoTO(square,board){
    let color = square.piece.color
    for (let i = -1; i<2; i+=2){
        for (let j = 0; j<2; j++){
            let a = j === 0 ? i : 0
            let b = j === 1 ? i : 0
            checkSideSquare(square,board, a,b, color)
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





/*function straightCanGoTO(square,board){
    let color = square.piece.color
    for (let i = -1; i<2; i+=2){
        for (let j = 0; j<2; j++){
            array
            checkSideSquare(square,board, i,j, color)
        }
    }
    return [canGoArray,board]
}

function checkSideSquare(square,board,i,j, color){
    if (square.x+a > 7
        || square.x+a < 0 || square.y+i > 7 || square.y+i < 0) return
    let sideSquare = board[square.x+a][square.y+i]
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
}*/
