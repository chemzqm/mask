# Mask

Mask the entire viewport or element with auto adjustment.

default `z-index` is 30, change the `z-index` if you want some covered element to be shown.

[demo](http://chemzqm.github.io/mask/)

## Installation

Install with [component(1)](http://component.io):

    $ component install chemzqm/mask

## API

```js
var Mask = require('mask');
var mask = new Mask();

mask.show();
mask.hide();
```

### new Make([el])

Default to document.body (cover the entire viewport if body is not scrollable).

Make sure element is positioned `relative` or `absolute` or `fixed`

### .spin([size | 60])

Enable a spin in the middle of mask.


### .show()

Show overlay.

### .hide()

Hide overlay.

## License

MIT
