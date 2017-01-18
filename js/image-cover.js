;(function($) {

  $.fn.cover = function(options) {

    var defaults = {
      target: 'img',
      delay: 100,
      scale: 'fill',
      responsive: []
    };

    var o = $.extend(defaults, options);

    var container = $(this);
    var images = container.find(o.target);
    var timer;
    var scale = o.scale;

    function position(image) {

        if (o.responsive.length) {
          $(o.responsive).each(function(index, obj) {
            if (obj.breakpoint !== undefined) {
              if ($(window).width() <= obj.breakpoint) {
                if(obj.settings !== undefined) {
                  $.each(obj.settings, function(key, value) {
                    scale = value;
                  });
                }
              }
              else {
                scale = o.scale;
              }
            }
          });
        }

        var containerRatio = (container.width() / container.height());
        var imageRatio = (image.width() / image.height());
        var fillHeight = container.height();
        var fillWidth = container.width();

        if (scale === 'fill') {
          if (containerRatio < imageRatio) { // the image is wider than the container
            image.css({ // height to 100% and left margin offset
              height: fillHeight,
              width: 'auto'
            });
            image.css({
              marginLeft: '-' + ((image.width() - container.width()) / 2) + 'px',
              marginTop: 0
            });
          }
          else { // the image is not as wide as the container
            image.css({ // width to 100% and top margin offset
              height: 'auto',
              width: fillWidth
            });
            image.css({ // width to 100% and top margin offset
              marginLeft: 0,
              marginTop: '-' + ((image.height() - container.height()) / 2) + 'px'
            });
          }
        }
        else if (scale === 'fill-height') {
          image.css({ // height to 100% and left margin offset
            height: fillHeight,
            width: 'auto'
          });
          image.css({
            marginLeft: '-' + ((image.width() - container.width()) / 2) + 'px',
            marginTop: 0
          });
        }
        else if (scale === 'fill-width') {
          image.css({ // width to 100% and top margin offset
            height: 'auto',
            width: fillWidth
          });
          image.css({ // width to 100% and top margin offset
            marginLeft: 0,
            marginTop: 0
          });
        }
        else {
          scale = 'fill';
          position(image);
        }
      }

    $(window).on('resize', function() {
      clearTimeout(timer);
      timer = setTimeout(function() {
        images.each(function() {
          position($(this));
        });
      }, o.delay);
    });

    return images.each(function() {

      var image = $(this);

      image.load(function() { // when the image is loaded, run the position function
        position(image);
      });

      if (this.complete) { // if the image is cached, run the position function
        position(image);
      }
    });
  };

}(jQuery, window, document));