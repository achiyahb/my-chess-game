import sideCheck from "@/movement/sideCheck";

export default {
    diagonallyCanGoTO
}


function diagonallyCanGoTO(square,board,canGoArray){
    let color = square.piece.color
    for (let i = -1; i<2; i+=2){
        for (let j = -1; j<2; j+=2){
            if (square.x+j > 7 || square.x+j < 0 || square.y+i > 7 || square.y+i < 0) continue
           let partOfArray = sideCheck.checkSquareBeside(square,board, i,j, color, canGoArray)
            console.log(partOfArray)
        }
    }
    return [canGoArray,board]
}

