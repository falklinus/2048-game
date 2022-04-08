function SwipeDetector(el, callback) {
  let swipedir,
    startX,
    startY,
    distX,
    distY,
    restraint = 100, // maximum distance allowed at the same time in perpendicular direction
    allowedTime = 1000, // maximum time allowed to travel that distance
    elapsedTime,
    startTime,
    touchsurface = el,
    threshold = el.clientHeight / 5, //required min distance traveled to be considered swipe
    handleswipe = callback || function (swipedir) {}

  function start() {
    touchsurface.addEventListener('touchstart', touchStart, false)
    touchsurface.addEventListener('touchmove', touchMove, false)
    touchsurface.addEventListener('touchend', touchEnd, false)
  }

  function stop() {
    touchsurface.removeEventListener('touchstart', touchStart, false)
    touchsurface.removeEventListener('touchmove', touchMove, false)
    touchsurface.removeEventListener('touchend', touchEnd, false)
  }

  function touchStart(e) {
    var touchobj = e.changedTouches[0]
    swipedir = 'none'
    distX = 0
    distY = 0
    startX = touchobj.pageX
    startY = touchobj.pageY
    startTime = new Date().getTime() // record time when finger first makes contact with surface
    e.preventDefault()
  }

  function touchMove(e) {
    e.preventDefault() // prevent scrolling when inside DIV
  }

  function touchEnd(e) {
    var touchobj = e.changedTouches[0]
    distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
    distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
    elapsedTime = new Date().getTime() - startTime // get time elapsed
    if (elapsedTime <= allowedTime) {
      // first condition for awipe met
      if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
        // 2nd condition for horizontal swipe met
        swipedir = distX < 0 ? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
      } else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) {
        // 2nd condition for vertical swipe met
        swipedir = distY < 0 ? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
      }
    }
    handleswipe(swipedir)
    e.preventDefault()
  }

  return { start, stop }
}

//USAGE:
/*
var el = document.getElementById('someel')
swipedetect(el, function(swipedir){
    swipedir contains either "none", "left", "right", "top", or "down"
    if (swipedir =='left')
        alert('You just swiped left!')
})
*/

export default SwipeDetector
