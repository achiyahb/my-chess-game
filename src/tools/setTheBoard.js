import pieces from "@/tools/pieces";
import chessGame from "../views/About"

export default {
    setTheBoard,
}

function setTheBoard(){
    let abc = ['a','b','c','d','e','f','g','h']
    let board = []
    for (let i = 0; i < 8; i++) {
        let row = []
        for (let j = 0; j < 8; j++) {
            row.push({boardX:abc[i], boardY:j+1,x:i, y:j, piece:undefined})
        }
       board.push(row)
    }
    return setThePieces(board)

}

function setThePieces(board){
    let piecesArray = pieces.getPieces()
    let order = [0,1,2,3,4,2,1,0]
    const color = ['b', 'w']
    for (let a = 0 ; a<2;a++){
        let pieceColor = color[a]
        let black = pieceColor === 'b'
        let row = black ? 0 : 7

        for(let b = 0; b<8; b++){
            let i = black ? 1 : 6
            let j = black ? 11 : 5
            let index = black ? order[b]+6 : order[b]
           board[b][i].piece = piecesArray[j]
            board[b][row].piece = piecesArray[index]
        }
    }
    return board
}
