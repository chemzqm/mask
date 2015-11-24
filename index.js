var Mask = require('..')
var m = new Mask(null, true)
m.spin(30)
document.getElementById('trigger').addEventListener('click', function(e) {
  m.show()
  setTimeout(function() {
    m.hide()
  }, 2000)
}, false)
var m1 = new Mask(document.querySelector('.container'))
document.getElementById('mask').addEventListener('click', function(e) {
  m1.show()
  setTimeout(function() {
    m1.hide()
  }, 2000)
}, false)
