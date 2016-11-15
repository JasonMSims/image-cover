# image-cover.js
Super lightweight jQuery plugin to emulate background-size: cover for img's

## Usage
Simply include the file

```
<script type="text/javascript" src="js/image-cover.min.js"></script>
```

And initialize the plugin on the image container inside of $(document).ready

```Javascript
$(document).ready(function() {
  $('.container').cover();
});
```

## Options

Currently there is only one option to pass in

* target (change the target element to resize)

```Javascript
$('.container').cover({
  target: 'div.not-image'
});
```



