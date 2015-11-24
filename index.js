var computedStyle = require('computed-style')
var classes = require('classes')
var body = document.body


function Mask(el) {
  if (!(this instanceof Mask)) return new Mask(el)
  el = el || body
  if (el !== body && computedStyle(el, 'position') === 'static') {
    throw new Error('target element should not be static positioned')
  }
  this._parent = el
  this.el = this.create()
}

Mask.prototype.spin = function (size) {
  size = size || 60
  var el = this.spinEl = document.createElement('div')
  el.appendChild(el.cloneNode())
  el.className = 'mask-spin'
  this.el.appendChild(el)
  el.style.fontSize = (size/5) + 'px'
  el.style.marginLeft = (- (size/2)) + 'px'
  //el.style.marginTop = (- (size/2)) + 'px'
}

Mask.prototype.create = function () {
  var m = this._parent.querySelector('.mask')
  if (m) return m
  var el = document.createElement('div')
  el.className = 'mask hidden'
  this._parent.appendChild(el)
  return el
}

Mask.prototype.show = function () {
  var vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
  if (this._parent == body) {
    var bh = body.scrollHeight
    this.el.style.height = Math.max(bh, vh) + 'px'
  }
  this.el.style.display = 'block'
  if (this.spinEl) {
    var h = this.spinEl.getBoundingClientRect().height
    if (this._parent == body) {
      this.spinEl.style.top = (body.scrollTop + vh/2 - h/2) + 'px'
    } else {
      var th = this._parent.getBoundingClientRect().height
      this.spinEl.style.top = (this._parent.scrollTop + th/2 - h/2) + 'px'
    }
  }
  var self = this
  setTimeout(function() {
    classes(self.el).remove('hidden')
  })
}

Mask.prototype.hide = function () {
  classes(this.el).add('hidden')
  this.el.style.display = 'none'
}

Mask.prototype.remove = function () {
  var self = this
  setTimeout(function(){
    self.el.parentNode.removeChild(this.el)
  }, 350)
}


module.exports = Mask
