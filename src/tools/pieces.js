export default {
    getPieces
}


let rookW = {color:'w',letter:'r',movement:['straight'],limit:false,start:true}
let knightW = {color:'w',letter:'n',movement:['jumps']}
let bishopW = {color:'w',letter:'b',movement:['diagonally'],limit:false}
let queenW = {color:'w',letter:'q',movement:['straight','diagonally'],limit:false}
let kingW = {color:'w',letter:'k',movement:['straight','diagonally'],limit:true,start:true}
let pawnW = {color:'w',letter:'p',movement:['forward'],attack:'diagonally',limit:true,start:true}

let rookB = {color:'b',letter:'r',movement:['straight'],limit:false,start:true}
let knightB = {color:'b',letter:'n'}
let bishopB = {color:'b',letter:'b',movement:['diagonally'],limit:false}
let queenB = {color:'b',letter:'q',movement:['straight','diagonally'],limit:false}
let kingB = {color:'b',letter:'k',movement:['straight','diagonally'],limit:true,start:true}
let pawnB = {color:'b',letter:'p',movement:['forward'],attack:'diagonally',limit:true,start:true}

const piecesArray = [rookW,knightW,bishopW,queenW,
    kingW,pawnW,rookB,knightB,bishopB,queenB,kingB,pawnB]

function getPieces(){
    return piecesArray
}
