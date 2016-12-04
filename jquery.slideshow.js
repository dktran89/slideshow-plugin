(function($) {
    $.fn.slideShow = function(options) {
        $('#slideshow .slide:eq(0)').css('display', 'block');
        //Khai bao thuoc tinh mac dinh
        var defaults = {
                timeAuto: 7000,
                timeSwitch: 1000,
                dot: $('#slideshow ul li.dot'),
                slide: $('#slideshow .slide'),
                dAct: 'dot-active',
                sAct: 'slide-active',
                next: $('#slideshow .next'),
                prev: $('#slideshow .prev'),
            }
            // Khai bao bien ap vao bien default, khi nguoi dung ap thuoc tinh
        var options = $.extend(defaults, options);
        //Lenh thuc thi
        return this.each(function() {
            var o = options;

            function next() {
                var currentSlide = $('#slideshow .slide-active');
                var nextSlide = currentSlide.next();
                var currentDot = $('#slideshow .dot-active');
                var nextDot = currentDot.next();
                if (nextSlide.length === 0) {
                    nextSlide = o.slide.first();
                }
                if (nextDot.length === 0) {
                    nextDot = o.dot.first();
                }
                currentSlide.fadeOut(o.timeSwitch).removeClass(o.sAct);
                nextSlide.fadeIn(o.timeSwitch).addClass(o.sAct);
                currentDot.removeClass(o.dAct);
                nextDot.addClass(o.dAct);
            }
            o.next.click(function() {
                next();
            });

            o.prev.click(function() {
                var currentSlide = $('#slideshow .slide-active');
                var prevSlide = currentSlide.prev();
                var currentDot = $('#slideshow .dot-active');
                var prevDot = currentDot.prev();
                if (prevSlide.length === 0) {
                    prevSlide = o.slide.last();
                }
                if (prevDot.length === 0) {
                    prevDot = o.dot.last();
                }
                currentSlide.fadeOut(o.timeSwitch).removeClass('slide-active');
                prevSlide.fadeIn(o.timeSwitch).addClass('slide-active');
                currentDot.removeClass(o.dAct);
                prevDot.addClass(o.dAct);
            });

            function call(n) {
                $('#slideshow ul li:eq(' + n + ')').click(function() {
                    o.dot.removeClass('dot-active');
                    $(this).addClass('dot-active');
                    o.slide.fadeOut(1000).removeClass('slide-active');
                    $('#slideshow .slide:eq(' + n + ')').fadeIn(1000).addClass('slide-active');
                });
            }
            for (var i = 0; i < o.dot.length; i++) {
                call(i);
            }

            // Slide chay tu dong
            //khai báo biến set (global)
            var set;
            //Hàm tự động chuyển slide
            function auto() {
                set = setInterval(next, o.timeAuto);
            }
            //Hàm ngừng chuyển slide tự động
            function stop() {
                clearInterval(set); // xóa biến set global -> set local không hoạt động, vì mất khai báo
            }
            auto();
            o.slide.on({
                mouseenter: function() {
                    return stop();
                },
                mouseleave: function() {
                    return auto();
                }
            });
        });
    }

})(jQuery);