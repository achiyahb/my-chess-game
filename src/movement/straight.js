import sideCheck from "@/movement/sideCheck";

export default {
    straightCanGoTO
}


function straightCanGoTO(square,board, canGoArray){
    let color = square.piece.color
    for (let i = -1; i<2; i+=2){
        for (let j = 0; j<2; j++){
            let a = j === 0 ? i : 0
            let b = j === 1 ? i : 0
            if (square.x+b > 7 || square.x+b < 0 || square.y+a > 7 || square.y+a < 0) continue
            let partOfArray = sideCheck.checkSquareBeside(square,board, a,b, color, canGoArray)
            console.log(partOfArray)
            if (partOfArray === 'empty') return
            for (let part of partOfArray){
                canGoArray.push(part)
            }
        }
    }

    return [canGoArray,board]
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
