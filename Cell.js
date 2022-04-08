class Cell {
  #x
  #y
  #value
  constructor({ grid, x, y }) {
    this.tile = false
    this.element = document.createElement('div')
    this.element.classList.add('cell')
    this.x = x
    this.y = y
    if (grid) grid.appendChild(this.element)
  }
  makeTile(value) {
    this.tile = true
    this.element.classList.add('tile')
    this.value = value
    this.element.style.opacity = 1
  }

  get x() {
    return this.#x
  }

  set x(x_new) {
    this.#x = x_new
    this.element.style.setProperty('--x-pos', x_new)
  }

  get y() {
    return this.#y
  }

  set y(y_new) {
    this.#y = y_new
    this.element.style.setProperty('--y-pos', y_new)
  }

  get value() {
    return this.#value
  }

  set value(v) {
    this.#value = v
    this.element.textContent = v
    const power = Math.log2(v)
    const backgroundLightness = 100 - power * 9
    this.element.style.setProperty(
      '--background-lightness',
      `${backgroundLightness}%`
    )
    this.element.style.setProperty(
      '--text-lightness',
      `${backgroundLightness <= 50 ? 90 : 10}%`
    )
  }

  canAccept(cell) {
    // console.log(this, cell)

    if (!this.tile) return cell.tile
    return this.value == cell.value
  }

  move(cell) {
    if (cell.x == this.x) this.y = cell.y
    else if (cell.y == this.y) this.x = cell.x
    if (cell.value == this.value) {
    }
  }
}

export default Cell
