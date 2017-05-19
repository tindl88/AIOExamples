(function($, window, document, undefined) {
  // Create the defaults once
  var pluginName = "flexgrid",
    defaults = {
      propertyName: "value"
    };

  // The actual plugin constructor
  function Plugin(element, options) {
    this.element = element;
    this.options = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      this.changeText(this.element, this.options);
    },

    changeText: function(el, options) {
      $(this.element).text(this.options.propertyName);
      console.log(el);
    }
  };

  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$.data(this, "plugin_" + pluginName)) {
        $.data(this, "plugin_" + pluginName, new Plugin(this, options));
      }
    });
  };
})(jQuery, window, document);