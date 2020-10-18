export default {
    checkHowThreatOnEachSquare,
}
let start = true
let knightSquaresToCheck = []

function checkHowThreatOnEachSquare(board){
    knightSquaresToCheck = []
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            let square = board[x][y]
            if (square.piece && square.piece.letterName === 'n'){
                knightSquaresToCheck.push(square)
            }
            square.threatBy = []
            straightCheck(square,board)
            diagonallyCheck(square,board)
        }
    }
    console.log(knightSquaresToCheck)
}

function straightCheck(square,board){
    let piecesToCheck = ['r','q','k']
    for (let i = -1; i<2; i+=2){
        for (let j = 0; j<2; j++){
            start = true
            let a = j === 0 ? i : 0
            let b = j === 1 ? i : 0
            checkSideSquare(square,board, a,b, piecesToCheck,square)
        }
    }
}
function diagonallyCheck(square,board){
    let piecesToCheck = ['b','q','k']
    for (let i = -1; i<2; i+=2){
        for (let j = -1; j<2; j+=2){
            start = true
            checkSideSquare(square,board, i,j, piecesToCheck,square)
        }
    }
}

function checkSideSquare(square,board,i,j, piecesToCheck,checkSquare){
    if (square.x+j > 7 || square.x+j < 0 || square.y+i > 7 || square.y+i < 0) return
    let sideSquare = board[square.x+j][square.y+i]
    if (sideSquare.piece){
        if (piecesToCheck.includes(sideSquare.piece.letterName)){
            let threatenPiece = {
                pieceColor: sideSquare.piece.color,
                pieceLetter: sideSquare.piece.letterName,
                locationX: sideSquare.x ,
                locationY: sideSquare.y
            }
            checkSquare.threatBy.push(threatenPiece)
        }
    } else {
        if(start){
            start = false
            piecesToCheck.pop()
        }
        checkSideSquare(sideSquare,board,i,j,piecesToCheck,checkSquare)
    }
}
