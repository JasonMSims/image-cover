;(function($) {

      $.fn.cover = function(options) {

        o = $.extend({
          target: 'img',
        }, options);

        return this.each(function() {
          var container = $(this);
          var image = container.children(o.target);

          var position = function() {
            var containerRatio = (container.width() / container.height());
            var imageRatio = (image.width() / image.height());
            if (containerRatio < imageRatio) { // The image is wider than the container
              image.css({ // height to 100% and left margin offset
                height: '100%',
                width: 'auto'
              });
              image.css({
                marginLeft: '-' + ((image.width() - container.width()) / 2) + 'px',
                marginTop: 0
              });
            }
            else { // The image is not as wide as the container
              image.css({ // width to 100% and top margin offset
                height: 'auto',
                width: '100%'
              }),
              image.css({ // width to 100% and top margin offset
                marginLeft: 0,
                marginTop: '-' + ((image.height() - container.height()) / 2) + 'px'
              })
            }
          };

          position();

          $(window).resize(function() {
            position();
          });
        });
      };

    }(jQuery, window, document));