<template>
  <div>
    <h3>{{whiteCurrentTurn?'white turn':'black turn'}}</h3>
  <div class='board' style="width: 40rem;">
    <div v-for="(row,x) of board">
      <div v-for="(square,y) of row">
        <div
            :class="square.canGo && square.piece ? 'red' : !square.mark ? ((x+y)%2 === 0 ? 'white':'green') : ((x+y)%2 === 0 ? 'grab':'darkGrab' )"
            :style="`width: 5rem; height:5rem;`"
        >
          <img v-if="square.piece" :src="`https://images.chesscomfiles.com/chess-themes/pieces/neo/100/${square.piece.color}${square.piece.letterName}.png`"
               :style="`width: 5rem; height:5rem;`"
               @click="grab(square)"
               class="piece"
               alt="piece"
          />
          <div v-if="square.canGo"
            :class="!square.mark ? ((x+y)%2 === 0 ? 'white':'green') : ((x+y)%2 === 0 ? 'grab':'darkGrab' )"
            :style="`width: 5rem; height:5rem;`"
               @click="move(square)"
          >
            <div
                 id="circle"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import setTheBoard from "@/tools/setTheBoard";
import pawn from "@/movement/pawn";
import diagonally from "@/movement/diagonally";
import straight from "@/movement/straight";
import queen from "@/movement/queen";
import knight from "@/movement/knight";
import king from "@/movement/king";

export default {
  data: () => ({
    whiteSquareMarked : [],
    blackSquareMarked : [],
    board: [],
    canGoArray: [],
    whiteCurrentTurn: true,
    enPassantSquare: {}
  }),
  methods:{
    grab(square){
      let isItWhite = square.piece.color === 'w'
      if (square.canGo){
        if (this.whiteCurrentTurn === isItWhite) return
        this.move(square)
        this.cantGo()
        return
      }
      if (square.mark){
        this.unmarkTheSquare()
        this.cantGo()
        this.$forceUpdate()
        return
      }
      if (this.whiteCurrentTurn !== isItWhite) return
      this.markTheSquare(square)
      this.whereCanGo(square)
      this.$forceUpdate()
    },
    markTheSquare(square){
      square.mark = true
      this.unmarkTheSquare()
      this.whiteSquareMarked.push(square)
    },
    unmarkTheSquare(){
      while(this.whiteSquareMarked.length){
        this.whiteSquareMarked[0].mark = false
        this.whiteSquareMarked.shift()
      }
    },
    whereCanGo(square){
      let responseArray
      this.cantGo()
      let piece = square.piece
      let i = piece.color === 'w' ? -1 : 1
      let letterName = piece.letterName
      if (letterName === "p"){
        responseArray = pawn.pawnCanGoTO(square, i, this.board, piece.color)
      }
      if (letterName === 'b'){
        responseArray = diagonally.diagonallyCanGoTO(square, this.board)
      }
      if (letterName === "r"){
        responseArray = straight.straightCanGoTO(square, this.board)
      }
      if (letterName === 'n'){
        responseArray = knight.knightCanGoTO(square, this.board)
      }
      if (letterName === 'q'){
        responseArray = queen.queenCanGoTO(square, this.board)
      }
      if (letterName === 'k'){
        responseArray = king.kingCanGoTO(square, this.board)
      }
      this.canGoArray = responseArray[0]
      this.board = responseArray[1]
    },
    cantGo(){
      for (let square of this.canGoArray){
        square.canGo = false
      }
    },
    move(square){
      square.mark = true
      this.whiteSquareMarked.push(square)
      square.piece = this.whiteSquareMarked[0].piece
      if (square.piece.letterName === 'p') {
        const self = this
        pawn.enPassantMove(square, self)
      } else {
        this.enPassantSquare.enPassant = false
      }
      this.whiteSquareMarked[0].piece = undefined

      this.cantGo()
      this.whiteCurrentTurn = !this.whiteCurrentTurn
    },
  },
  created() {
   this.board = setTheBoard.setTheBoard()
    console.log(this.board)
  }
}
</script>

<style>
.board{
  display: grid;
  grid-template-columns: repeat(8, 1fr);
}
.red{
  background-color: red;
}
.white{
  background-color: #ede9ca;
}
.green{
  background-color: #707a30;
}
.grab{
  background-color: #f5e263;
}
.darkGrab{
  background-color: #b6ad2a;
}
.lastMove{
  background-color: #f5e263;
}
.lastPosition{
  background-color: #b6ad2a;
}
.piece{
  cursor: grab;
}
#circle {
  width: 32px;
  height: 32px;
  background: #bfbfa8;
  border-radius: 50%;
}

</style>
