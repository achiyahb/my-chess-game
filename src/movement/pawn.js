export default {
    pawnCanGoTO
}
let canGoArray = []
function pawnCanGoTO(square, i,board){
    board[square.x][square.y+i].canGo = true
    canGoArray.push(board[square.x][square.y+i])
    if (i === -1 && square.y === 6 || i === 1 && square.y === 1 ){
        board[square.x][square.y+(2*i)].canGo = true
        canGoArray.push(board[square.x][square.y+(2*i)])
    }
    return [canGoArray,board]
}

