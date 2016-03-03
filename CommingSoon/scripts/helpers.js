var helperJs = (function(){
	'use strict';

	return {
		debounce: debounce,
		throttle: throttle,
		bzPopup: bzPopup
	};

	function debounce(fn, ms) {
        var timer = null;
        return function() {
            var context = this,
                args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function() {
                fn.apply(context, args);
            }, ms);
        };
    }

    function throttle(fn, ms, scope) {
        ms || (ms = 250);
        var last,
        deferTimer;
        return function () {
            var context = scope || this;

            var now = +new Date,
            args = arguments;
            if (last && now < last + ms) {
                clearTimeout(deferTimer);
                deferTimer = setTimeout(function () {
                    last = now;
                    fn.apply(context, args);
                }, ms);
            } else {
                last = now;
                fn.apply(context, args);
            }
        };
    }

    function bzPopup(params) {
        if (typeof($.magnificPopup) === 'undefined') {
            alert('bzPopup: magnificPopup not found!');
            return false;
        } else {
            var o = $.extend({
                rel: '',
                type: 'inline',
                width: 700,
                removeDelay: 0,
                closeOnBg: true,
                enableEscapeKey: true,
                alignTop: false,
                showCloseBtn: true,
                closeBtnInside: true,
                effect: 'bzFromTop',
                overflowY: 'auto',
                fixedBgPos: 'auto',
                index: null,
                beforeOpen: function() {
                    this.st.mainClass = o.effect;
                },
                open: function() {},
                beforeClose: function() {},
                close: function() {},
                afterClose: function() {}
            }, params);
            var $element = $(o.rel);
            if ($element.length > 0) {
                $element.css({
                    maxWidth: o.width
                });
                $.magnificPopup.open({
                    removalDelay: o.removeDelay,
                    enableEscapeKey: o.enableEscapeKey,
                    alignTop: o.alignTop,
                    overflowY: o.overflowY,
                    fixedBgPos: o.fixedBgPos,
                    showCloseBtn: o.showCloseBtn,
                    closeBtnInside: o.closeBtnInside,
                    closeOnBgClick: o.closeOnBg,
                    index: o.index,
                    callbacks: {
                        beforeOpen: o.beforeOpen,
                        open: o.open,
                        beforeClose: o.beforeClose,
                        close: o.close,
                        afterClose: o.afterClose
                    },
                    items: {
                        src: o.rel,
                        type: 'inline'
                    }
                });
            } else {
                alert('bzPopup: rel not found!');
                return false;
            }
        }
    }
})();