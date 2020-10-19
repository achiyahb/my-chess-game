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
    knightSquaresToCheck.forEach(square => {
        knightCheck(square, board)
    })

}

function straightCheck(square,board){
    for (let i = -1; i<2; i+=2){
        for (let j = 0; j<2; j++){
            let piecesToCheck = ['r','q','k']
            start = true
            let a = j === 0 ? i : 0
            let b = j === 1 ? i : 0
            checkSideSquare(square,board, a,b, piecesToCheck,square)
        }
    }
}
function diagonallyCheck(square,board){
    for (let i = -1; i<2; i+=2){
        for (let j = -1; j<2; j+=2){
            let piecesToCheck = ['b','q','k']
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
            declareOnThreaten(sideSquare,checkSquare)
        }
    } else {
        if(start){
            start = false
            piecesToCheck.pop()
        }
        checkSideSquare(sideSquare,board,i,j,piecesToCheck,checkSquare)
    }
}

function knightCheck(square, board){
    for (let i = -2; i<3; i+=4){
        for (let j = 0; j<2; j++){
            for (let h = -1; h<2; h+=2) {
                let a = j === 0 ? i : h
                let b = j === 1 ? i : h
                checkKnightNextMoveSquare(square, board, a, b)
            }
        }
    }
}

function checkKnightNextMoveSquare(square,board,i,j){
    if (square.x+j > 7 || square.x+j < 0 || square.y+i > 7 || square.y+i < 0) return
    let sideSquare = board[square.x+j][square.y+i]
    declareOnThreaten(square,sideSquare)
}

function declareOnThreaten(threateningSquare,threatenedSquare){
    let threatenPiece = {
        pieceColor: threateningSquare.piece.color,
        pieceLetter: threateningSquare.piece.letterName,
        locationX: threateningSquare.x,
        locationY: threateningSquare.y
    }
    threatenedSquare.threatBy.push(threatenPiece)
    if (threatenedSquare.piece && threatenedSquare.piece.letterName === 'k' && threatenedSquare.piece.color !== threateningSquare.piece.color){
        console.log('check!')
    }
}