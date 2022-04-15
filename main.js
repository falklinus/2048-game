import Controller from './Controller.js'
import Grid from './Grid.js'

const gameGrid = document.querySelector('[data-gameGrid]')
const controller = new Controller(gameGrid, handleInput)
const scoreDisplay = document.querySelector('[data-score]')

const grid = new Grid({ htmlElement: gameGrid, size: 4 })
let score = 0

function startGame() {
  scoreDisplay.textContent = score
  window.addEventListener('resize', resize)
  grid.appendToEmpty()
  grid.appendToEmpty()
  controller.start()
}

function resize() {
  grid.resize()
}

async function handleInput(dir) {
  console.log(dir)
  let moved = false
  switch (dir) {
    case 'up':
      moved = grid.moveUp()
      break
    case 'left':
      moved = grid.moveLeft()
      break
    case 'down':
      moved = grid.moveDown()
      break
    case 'right':
      moved = grid.moveRight()
      break
  }

  if (moved) {
    controller.stop()
    grid.cells.forEach((cell) => {
      if (cell.merged) score += cell.value
      cell.merged = false
    })
    scoreDisplay.textContent = score
    const appended = await grid.appendToEmpty()
    console.log(appended)
    if (grid.checkGameOver()) {
      console.log('GAME OVER')
      alert('GAME OVER')
      return
    }
    controller.start()
  }
}

startGame()
