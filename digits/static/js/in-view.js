// Copyright (c) 2016, NVIDIA CORPORATION.  All rights reserved.

(function($) {
    function get_viewport_height() {
        var height = window.innerHeight;
        var mode = document.compatMode;

        if ((mode || !$.support.boxModel)) {
            height = (mode == 'CSS1Compat') ?
                document.documentElement.clientHeight :
                document.body.clientHeight;
        }
        return height;
    }

    $(window).scroll(function() {
        var vp_height = get_viewport_height();
        var scroll_top = (document.documentElement.scrollTop ?
                          document.documentElement.scrollTop :
                          document.body.scrollTop);
        var elements = [];

        $.each($.cache, function() {
            if (this.events && this.events.in_view) {
                elements.push(this.handle.elem);
            }
        });

        $(elements).each(function() {
            var element = $(this);
            var top = element.offset().top;
            var height = element.height();
            var in_view = element.data('in-view') || false;

            if (scroll_top > (top + height) || scroll_top + vp_height < top) {
                if (in_view) {
                    element.data('in-view', false);
                    element.trigger('in-view', [ false ]);
                }
            } else if (scroll_top < (top + height)) {
                if (!in_view) {
                    element.data('in-view', true);
                    element.trigger('in-view', [ true ]);
                }
            }
        });
    });

    $(function() {
        $(window).scroll();
    });
})(jQuery);
