import SwipeDetector from './swipeDetect.js'

class Controller {
  keysMap = {
    ArrowUp: 'up',
    ArrowLeft: 'left',
    ArrowDown: 'down',
    ArrowRight: 'right',
  }

  keyPressed = {
    up: false,
    left: false,
    down: false,
    right: false,
  }

  constructor(area, handleInput) {
    this.handleInput = handleInput
    this.area = area
    console.log(area)
    this.swipeDetector = new SwipeDetector(this.area, (swipeDir) => {
      this.handleInput(swipeDir)
    })
  }

  start() {
    this.swipeDetector.start()
    window.addEventListener('keydown', ({ key }) => this.handleKeyDown(key))
    window.addEventListener('keyup', ({ key }) => this.handleKeyUp(key))
  }

  handleKeyDown(key) {
    if (!this.keysMap[key] || this.keyPressed[this.keysMap[key]]) {
      return
    }
    this.keyPressed[this.keysMap[key]] = true
    this.handleInput(this.keysMap[key])
  }

  handleKeyUp(key) {
    this.keyPressed[this.keysMap[key]] = false
  }

  stop() {
    this.swipeDetector.stop()
    window.removeEventListener('keydown', ({ key }) => this.handleKeyDown(key))
    window.removeEventListener('keyup', ({ key }) => this.handleKeyUp(key))
  }
}

export default Controller
