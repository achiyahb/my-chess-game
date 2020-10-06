<template>
  <div class="container">
    <h3>{{ whiteCurrentTurn ? 'white turn' : 'black turn' }}</h3>
    <div class='board'>
      <div v-for="(row,x) of board">
        <div v-for="(square,y) of row">
          <div
              :class="!square.mark ? ((x+y)%2 === 0 ? 'white':'green') : ((x+y)%2 === 0 ? 'grab':'darkGrab' )"
              :style="`width: 5rem; height:5rem;`"
          >
            <img v-if="square.piece"
                 :src="`https://images.chesscomfiles.com/chess-themes/pieces/neo/100/${square.piece.color}${square.piece.letter}.png`"
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
import pieces from "@/tools/pieces";
import setTheBoard from "@/tools/setTheBoard";
import pawn from "@/movement/pawn";
import diagonally from "@/movement/diagonally";

export default {
  data: () => ({
    whiteSquareMarked: [],
    blackSquareMarked: [],
    board: [],
    canGoArray: [],
    whiteCurrentTurn: true
  }),
  methods: {
    grab(square) {
      let isItWhite = square.piece.color === 'w'
      if (square.canGo) {
        if (this.whiteCurrentTurn === isItWhite) return
        this.move(square)
        this.cantGo()
        return
      }
      if (square.mark) {
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
    markTheSquare(square) {
      square.mark = true
      this.unmarkTheSquare()
      this.whiteSquareMarked.push(square)
    },
    unmarkTheSquare() {
      while (this.whiteSquareMarked.length) {
        this.whiteSquareMarked[0].mark = false
        this.whiteSquareMarked.shift()
      }
    },
    whereCanGo(square) {
      let responseArray
      this.cantGo()
      let piece = square.piece
      let i = piece.color === 'w' ? -1 : 1
      let movement = piece.movement
      if (movement[0] === "forward") {
        responseArray = pawn.pawnCanGoTO(square, i, this.board)
      }
      if (movement[0] === 'diagonally') {
        responseArray = diagonally.diagonallyCanGoTO(square, this.board)
      }
      this.canGoArray = responseArray[0]
      this.board = responseArray[1]
    },
    cantGo() {
      for (let square of this.canGoArray) {
        square.canGo = false
      }
    },
    move(square) {
      square.mark = true
      this.whiteSquareMarked.push(square)
      square.piece = this.whiteSquareMarked[0].piece
      square.piece.start = false
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
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.board {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  width: 40rem;
}

.white {
  background-color: #ede9ca;
}

.green {
  background-color: #707a30;
}

.grab {
  background-color: #f5e263;
}

.darkGrab {
  background-color: #b6ad2a;
}

.lastMove {
  background-color: #f5e263;
}

.lastPosition {
  background-color: #b6ad2a;
}

.piece {
  cursor: grab;
}

#circle {
  width: 32px;
  height: 32px;
  background: #bfbfa8;
  border-radius: 50%;
}

</style>
