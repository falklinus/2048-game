import Controller from './Controller.js'
import Grid from './Grid.js'

const gameGrid = document.querySelector('[data-gameGrid]')
const controller = new Controller(gameGrid, handleInput)

const grid = new Grid({ htmlElement: gameGrid, size: 4 })

function startGame() {
  window.addEventListener('resize', resize)
  grid.appendToEmpty()
  grid.appendToEmpty()
  controller.start()
}

function resize() {
  grid.resize()
}

function handleInput(dir) {
  // controller.stop()
  console.log(dir)
  let moved = false
  switch (dir) {
    case 'up':
      moved = grid.moveUp()
      controller.stop()
      break
    case 'left':
      moved = grid.moveLeft()
      controller.stop()
      break
    case 'down':
      moved = grid.moveDown()
      controller.stop()
      break
    case 'right':
      moved = grid.moveRight()
      controller.stop()
      break
  }

  if (moved) {
    const appended = grid.appendToEmpty()
    if (grid.checkGameOver()) {
      alert('GAME OVER')
    } else {
      grid.cells.forEach((cell) => (cell.merged = false))
      controller.start()
    }
  }
}

startGame()
