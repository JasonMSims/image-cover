;(function($) {

  $.fn.cover = function(options) {

    var defaults = {
      target: 'img',
      delay: 100
    };

    var o = $.extend(defaults, options);

    var container = $(this);
    var images = container.find(o.target);
    var timer;

    function position(image) {
        var containerRatio = (container.width() / container.height());
        var imageRatio = (image.width() / image.height());
        if (containerRatio < imageRatio) { // the image is wider than the container
          image.css({ // height to 100% and left margin offset
            height: '100%',
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
            width: '100%'
          });
          image.css({ // width to 100% and top margin offset
            marginLeft: 0,
            marginTop: '-' + ((image.height() - container.height()) / 2) + 'px'
          });
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