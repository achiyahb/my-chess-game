export default {
    knightCanGoTO
}
let canGoArray = []

function knightCanGoTO(square,board){
    let color = square.piece.color
    for (let i = -2; i<3; i+=4){
        for (let j = 0; j<2; j++){
            for (let h = -1; h<2; h+=2) {
                let a = j === 0 ? i : h
                let b = j === 1 ? i : h
                checkSideSquare(square, board, a, b, color)
            }
        }
    }
    return [canGoArray,board]
}

function checkSideSquare(square,board,i,j, color){
    let con1 = square.x+j > 7
    let con2 = square.x+j < 0
    let con3 = square.y+i > 7
    let con4 = square.y+i < 0
    if (square.x+j > 7 || square.x+j < 0 || square.y+i > 7 || square.y+i < 0) return
    let sideSquare = board[square.x+j][square.y+i]
    if (sideSquare.piece) {
        if  (sideSquare.piece.color === color) return
    }
    sideSquare.canGo = true
    canGoArray.push(sideSquare)
    return
}
