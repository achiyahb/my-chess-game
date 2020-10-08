import sideCheck from "@/movement/sideCheck";

export default {
    queenCanGoTO
}


function queenCanGoTO(square,board,canGoArray){
    let color = square.piece.color
    for (let i = -1; i<2; i++){
        for (let j = -1; j<2; j++){
            if (square.x+j > 7 || square.x+j < 0 || square.y+i > 7 || square.y+i < 0) continue
          let partOfArray =  sideCheck.checkSquareBeside(square,board, i,j, color, canGoArray)
            console.log(partOfArray)
            if (partOfArray === 'empty') return
            for (let part of partOfArray){
                canGoArray.push(part)
            }
        }
    }
    console.log(canGoArray)
    return [canGoArray,board]
}


