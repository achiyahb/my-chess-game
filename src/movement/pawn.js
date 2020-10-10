export default {
    pawnCanGoTO,
    enPassantMove
}
let canGoArray = []
function pawnCanGoTO(square, i,board, pieceColor){
    if (board[square.x][square.y+i].piece) return [canGoArray,board]
    board[square.x][square.y+i].canGo = true
    canGoArray.push(board[square.x][square.y+i])
    if (i === -1 && square.y === 6 || i === 1 && square.y === 1 ){
        if (board[square.x][square.y+(2*i)].piece) return [canGoArray,board]
        board[square.x][square.y+(2*i)].canGo = true
        canGoArray.push(board[square.x][square.y+(2*i)])
    }
    // when they can attack
    for (let j = -1; j<2; j+=2){
        if (square.x + j < 0 || square.x + j > 7) continue
        if (board[square.x + j][square.y+i].piece){
            if (board[square.x + j][square.y+i].piece.color !== pieceColor){
                board[square.x + j][square.y+i].canGo =true
                canGoArray.push(board[square.x + j][square.y+i])
            }
        }
        if (board[square.x + j][square.y+i].enPassant){
            board[square.x + j][square.y+i].canGo =true
            canGoArray.push(board[square.x + j][square.y+i])
        }
    }
    return [canGoArray,board]
}

function enPassantMove(square, self){
    let i = square.piece.color === 'w' ? -1 : 1
    if (square.enPassant){
        self.board[square.x][square.y - i].piece = undefined
    }
    if (self.whiteSquareMarked[0].y + 2*i === square.y) {
        self.board[square.x][square.y - i].enPassant = true
        self.enPassantSquare = self.board[square.x][square.y - i]
    }  else {
        self.enPassantSquare.enPassant = false
    }
}