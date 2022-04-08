import Cell from './Cell.js'

class Grid {
  cells = []
  constructor({ htmlElement, size = 4 }) {
    console.log(htmlElement)
    this.size = size
    this.htmlElement = htmlElement
    this.htmlElement.style.setProperty('--grid-size', this.size)
    this.htmlElement.style.setProperty(
      '--grid-width',
      `${this.htmlElement.clientWidth}px`
    )
    this.createEmptyGrid()
    // this.printGrid()
  }

  resize() {
    this.htmlElement.style.setProperty(
      '--grid-width',
      `${this.htmlElement.clientWidth}px`
    )
  }

  createEmptyGrid() {
    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        this.cells.push(new Cell({ grid: this.htmlElement, x, y }))
      }
    }
  }

  appendToEmpty() {
    const available = []
    this.cells.forEach((cell, index) => {
      if (!cell.tile) available.push(index)
    })
    if (available.length == 0) return
    const index = available[Math.floor(Math.random() * available.length)]
    this.cells[index].makeTile(Math.random() < 0.5 ? 2 : 4)
    return this.cells[index].element
  }

  move(cells, order) {
    let moved = false
    for (let i = 0; i < cells.length - 1; i++) {
      for (let j = i + 1; j < cells.length; j++) {
        cells = cells.sort(order)
        if (cells[i].canAccept(cells[j])) {
          if (!cells[i].tile) {
            // MOVE TILE TO POSITION
            cells = this.makeSwitch(cells, i, j, order)
            moved = true
          } else if (!cells[i].merged) {
            // MERGE TILES
            cells[j].value = cells[j].value * 2
            cells[j].merged = true
            cells[j].cells = this.makeSwitch(cells, i, j, order)
            cells[j].element.animation = 'merge 4s linear'

            moved = true
          }
        } else if (cells[j].tile) {
          // MOVE TILE TO POSITION BEFORE
          break
        }
      }
    }
    return moved
  }

  makeSwitch(cells, i, j, order) {
    // save coords to insert new cell
    const x = cells[j].x
    const y = cells[j].y
    // move cell2 to cell1
    cells[j].move(cells[i])

    const removeIndex = this.cells.indexOf(cells[i])

    // replace cell1 with empty cell att old cell2 position
    this.htmlElement.removeChild(this.cells[removeIndex].element)
    this.cells[removeIndex] = new Cell({
      grid: this.htmlElement,
      x,
      y,
    })
    cells[i] = this.cells[removeIndex]
    return cells.sort(order)
  }

  moveUp() {
    let moved = false
    this.gridByColumns().forEach((column) => {
      if (this.move(column, (a, b) => a.y - b.y)) moved = true
    })
    return moved
    // })
  }
  moveLeft() {
    let moved = false
    this.gridByRows().forEach((row) => {
      if (this.move(row, (a, b) => a.x - b.x)) moved = true
    })
    return moved
  }
  moveDown() {
    let moved = false
    this.gridByColumns().forEach((column) => {
      if (this.move(column, (a, b) => b.y - a.y)) moved = true
    })
    return moved
  }
  moveRight() {
    let moved = false
    this.gridByRows().forEach((row) => {
      if (this.move(row, (a, b) => b.x - a.x)) moved = true
    })
    return moved
  }

  gridByColumns() {
    return this.cells.reduce(
      (agg, cell) => {
        agg[cell.x].push(cell)
        return agg
      },
      [[], [], [], []]
    )
  }

  gridByRows() {
    return this.cells.reduce(
      (agg, cell) => {
        agg[cell.y].push(cell)
        return agg
      },
      [[], [], [], []]
    )
  }

  checkGameOver() {
    for (let column of this.gridByColumns()) {
      column = column.sort((a, b) => a.y - b.y)
      for (let i = 0; i < column.length - 1; i++) {
        if (
          !column[i].tile ||
          !column[i + 1].tile ||
          column[i].value == column[i + 1].value
        )
          return false
      }
    }
    for (let row of this.gridByRows()) {
      row = row.sort((a, b) => a.x - b.x)
      for (let i = 0; i < row.length - 1; i++) {
        if (
          !row[i].tile ||
          !row[i + 1].tile ||
          row[i].value == row[i + 1].value
        )
          return false
      }
    }
    return true
  }
}

export default Grid
