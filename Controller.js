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
    console.log('start')
    this.swipeDetector.start()
    window.addEventListener('keydown', this.handleKeyDown)
    window.addEventListener('keyup', this.handleKeyUp)
  }

  handleKeyDown = ({ key }) => {
    if (!this.keysMap[key] || this.keyPressed[this.keysMap[key]]) {
      return
    }
    this.keyPressed[this.keysMap[key]] = true
    this.handleInput(this.keysMap[key])
  }

  handleKeyUp = ({ key }) => {
    this.keyPressed[this.keysMap[key]] = false
  }

  stop() {
    console.log('stop')
    this.swipeDetector.stop()
    window.removeEventListener('keydown', this.handleKeyDown)
    window.removeEventListener('keyup', this.handleKeyUp)
  }
}

export default Controller
