var body = document.body;
var styles = require('computed-style');
var classes = require('classes');


function Mask(el) {
  if (!(this instanceof Mask)) return new Mask(el);
  if (el && styles(el).position === 'static') {
    throw new Error('target element should not be static positioned');
  }
  this._parent = el || body;
  this.el = this.create();
}

Mask.prototype.spin = function () {
  var el = document.createElement('div');
  el.appendChild(el.cloneNode());
  el.className = 'mask-spin';
  this.el.appendChild(el);
  var w = parseInt(styles(el).width);
  var h = parseInt(styles(el).height);
  el.style.marginLeft = (- (w/2)) + 'px'
  el.style.marginTop = (- (h/2)) + 'px'
}

Mask.prototype.create = function () {
  var m = this._parent.querySelector('.mask');
  if (m) return m;
  var el = document.createElement('div');
  el.className = 'mask hidden';
  this._parent.appendChild(el);
  return el;
}

Mask.prototype.show = function () {
  if (this._parent == body) {
    var bh = parseInt(styles(body).height);
    var vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    if (bh > vh) {
      this.el.style.height = bh + 'px';
    }
  }
  this.el.style.display = 'block';
  var self = this;
  setTimeout(function() {
    classes(self.el).remove('hidden');
  })
}

Mask.prototype.hide = function () {
  classes(this.el).add('hidden');
  this.el.style.display = 'none';
}

Mask.prototype.remove = function () {
  var self = this;
  setTimeout(function(){
    self.el.parentNode.removeChild(this.el);
  }, 350);
}


module.exports = Mask;
