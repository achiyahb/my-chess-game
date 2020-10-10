export default {
    getPieces
}


let rookW = {color:'w',letterName:'r',movement:['straight'],limit:false,start:true}
let knightW = {color:'w',letterName:'n',movement:['jumps']}
let bishopW = {color:'w',letterName:'b',movement:['diagonally'],limit:false}
let queenW = {color:'w',letterName:'q',movement:['straight','diagonally'],limit:false}
let kingW = {color:'w',letterName:'k',movement:['king'],limit:true,start:true}
let pawnW = {color:'w',letterName:'p',movement:['forward'],attack:'diagonally',limit:true,start:true}

let rookB = {color:'b',letterName:'r',movement:['straight'],limit:false,start:true}
let knightB = {color:'b',letterName:'n',movement:['jumps']}
let bishopB = {color:'b',letterName:'b',movement:['diagonally'],limit:false}
let queenB = {color:'b',letterName:'q',movement:['straight','diagonally'],limit:false}
let kingB = {color:'b',letterName:'k',movement:['king'],limit:true}
let pawnB = {color:'b',letterName:'p',movement:['forward'],attack:'diagonally',limit:true}

const piecesArray = [rookW,knightW,bishopW,queenW,
    kingW,pawnW,rookB,knightB,bishopB,queenB,kingB,pawnB]

function getPieces(){
    return piecesArray
}
