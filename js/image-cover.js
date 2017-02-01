;(function($) {

  $.fn.cover = function(options) {

    var defaults = {
      target: 'img',
      delay: 100,
      scale: 'fill',
      align: 'center',
      breakpoints: []
    };

    var o = $.extend(defaults, options);

    // Instance of Cover
    var c = this;

    // Store original options
    c.o = o;
    c.oo = $.extend({}, c.o);
    c.container = $(this);
    c.images = c.container.find(c.o.target);

    /*=========================
    Breakpoints
    =========================*/

    c.curBreakpoint = undefined;

    // Get the Active Breakpoint
    c.getActiveBreakpoint = function() {
      if (!c.o.breakpoints) return false; // If there are no breakpoints, leave the function
      var breakpoint = false;
      var breakpoints = [];
      $.each(c.o.breakpoints, function(k, v) {
        breakpoints.push(k);
      });

      for (var i = 0; i < breakpoints.length; i++) { // Loop through the breakpoints array and check the current viewport against breakpoint criteria
        bp = breakpoints[i];
        if(bp >= window.innerWidth && !breakpoint) {
          breakpoint = bp;
        }
      }
      return breakpoint || 'max';
    };

    // Set the breakpoint
    c.setBreakpoint = function() {
      var breakpoint = c.getActiveBreakpoint();
      if(breakpoint && c.curBreakpoint !== breakpoint) { // If breakpoint exists and the current breakpoint is not equal to breakpoint then
        // var breakpointOptions = (breakpoint in c.o.breakpoints) ? c.o.breakpoints[breakpoint] : breakpointOptions = c.oo; // If breakpoint is in the breakpoint object, use those options, otherwise use the default options
        if (breakpoint in c.o.breakpoints) {
          breakpointOptions = c.o.breakpoints[breakpoint];
        }
        else {
          breakpointOptions = c.oo;
        }
        for (var option in breakpointOptions) {
          c.o[option] = breakpointOptions[option];
        }
        c.curBreakpoint = breakpoint;
      }
      console.log('breakpoint is: ' + breakpoint + ' ... scale is: ' + c.o.scale);
    };

    //  Set breakpoint on load
    if (c.o.breakpoints) {
      c.setBreakpoint();
    }

    /*=========================
    Methods
    =========================*/

    c.methods = {

      // Various different scale methods
      scale: {
        fill: function(r) {
          if (r.container.ratio < r.image.ratio) {
            r.image.css({
              height: r.container.height,
              width: 'auto'
            });
            r.image.css({
              marginBottom: 0,
              marginLeft: '-' + ((r.image.width() - r.container.width) / 2) + 'px',
              marginRight: 0,
              marginTop: 0
            });
          }
          else {
            r.image.css({ // width to 100% and top margin offset
              height: 'auto',
              width: r.container.width
            });
            r.image.css({ // width to 100% and top margin offset
              marginBottom: 0,
              marginLeft: 0,
              marginRight: 0,
              marginTop: '-' + ((r.image.height() - r.container.height) / 2) + 'px'
            });
          }
        },

        fillHeight: function(r) {
          r.image.css({ // height to 100% and left margin offset
            height: r.container.height,
            width: 'auto'
          });
          r.image.css({
            marginBottom: 0,
            marginLeft: '-' + ((r.image.width() - r.container.width) / 2) + 'px',
            marginRight: 0,
            marginTop: 0
          });
        },

        fillWidth: function(r) {
          r.image.css({ // width to 100% and top margin offset
            height: 'auto',
            width: r.container.width
          });
          r.image.css({
            marginBottom: 0,
            marginLeft: 0,
            marginRight: 0,
            marginTop: 0
          });
        },

        stretch: function(r) {
          r.image.css({
            height: r.container.height,
            width: r.container.width
          });
          r.image.css({
            marginBottom: 0,
            marginLeft: 0,
            marginRight: 0,
            marginTop: 0
          });
        },
      }
    };

    /*=========================
    Position
    =========================*/

    function position(image) {

      // Establish ratios and dimensions and pass to the relevant scale method
      var r = {};

      r.container = {
        height: c.container.height(),
        ratio: (c.container.width() / c.container.height()),
        width: c.container.width(), 
      };

      r.image = image;
      r.image.ratio = (image.width() / image.height());

      // If the method exists, call it, otherwise go to fill method
      (c.o.scale in c.methods.scale) ? c.methods.scale[c.o.scale](r) : c.methods.scale.fill(r);
    }

    /*=========================
    Resize Refresh
    =========================*/

    $(window).on('resize', function() {
      clearTimeout(c.timer);
      c.timer = setTimeout(function() {
        if (c.o.breakpoints) { // If breakpoints exist, requery the current breakpoint on resize
          c.setBreakpoint();
        }
        c.images.each(function() {
          position($(this));
        });
      }, c.o.delay);
    });

    /*=========================
    Inital Run
    =========================*/

    return c.images.each(function() {

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