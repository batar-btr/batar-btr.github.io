$(document).ready(function () {
    $('#fullpage').fullpage({
        anchors: ['firstPage', 'secondPage', '3rdPage', '4thPage', '5thPage', '6thPage', '7thPage'],
        menu: '#menu',
        sectionsColor: ['#252525', '#2A9D8F', '#E9C46A', '#F4A261']
    });

    $('.title').lettering();
    animation();
    $('button').click(function () {
        animation();
    });
    function animation() {
        var title1 = new TimelineMax();
        title1.staggerFromTo(".title span", 0.5,
            { ease: Back.easeOut.config(4), opacity: 0, y: -80 },
            { ease: Back.easeOut.config(4), opacity: 1, y: 0 }, 0.05);

    }
    // =================================================================
    //                      ===== THIRD SECTION =====
    // =================================================================
    //   var scoreDisplay = $('.number');

    //   setInterval(function(){
    //       var date = new Date;
    //       var demo = {score: (date.getSeconds() -1) };
    //       var tween = TweenLite.to(demo, 1, {score: date.getSeconds(), onUpdate:showScore});
    //       function showScore() {
    //         scoreDisplay.html(demo.score.toFixed(2));
    //       }
    //   }, 1000);
    function Clock() {

        this.seconds = {
            firstDigit: {
                item: 0,
                index: 0,
                elem: $('.first-second')
            },
            secondDigit: {
                item: 0,
                index: 0,
                elem: $('.second-second')
            }
        };
        this.minutes = {
            firstDigit: {
                item: 0,
                index: 0,
                elem: $('.first-minute')
            },
            secondDigit: {
                item: 0,
                index: 0,
                elem: $('.second-minute')
            }
        };
        this.hours = {
            firstDigit: {
                item: 0,
                index: 0,
                elem: $('.first-hour')
            },
            secondDigit: {
                item: 0,
                index: 0,
                elem: $('.second-hour')
            }
        };
        //   this.second = 0;
        //   this.minute = 0;
        //   this.hour = 0;
        //   this.vis = $('.vis');
        //   this.invis = $('.invis');
        //   this.evenOdd = 0;
        //   this.visSec = $('.firstSeconds .future');
        //   this.invisSec = $('.firstSeconds .current');
    };

    var clock = new Clock;

    Clock.prototype.getCurrentTime = function () {
        var date = new Date;
        var second = date.getSeconds();
        var minute = date.getMinutes();
        var hour = date.getHours();

        this.seconds.firstDigit.item = Math.floor(second / 10);
        this.seconds.secondDigit.item = second % 10;

        this.minutes.firstDigit.item = Math.floor(minute / 10);
        this.minutes.secondDigit.item = minute % 10;

        this.hours.firstDigit.item = Math.floor(hour / 10);
        this.hours.secondDigit.item = hour % 10;

    };
    Clock.prototype.getEvenOddIndex = function () {

        for (var key in this) {
            if (this.hasOwnProperty(key)) {
                this[key].firstDigit.index = this[key].firstDigit.item % 2;
                this[key].secondDigit.index = this[key].secondDigit.item % 2
                // console.log(this[key]);
            }
        }

    };
    Clock.prototype.setTimeUnits = function () {
        for(var key in this) {
            if (this.hasOwnProperty(key)) {
                this[key].firstDigit.elem.find('.vis').html(this[key].firstDigit.item);
                this[key].secondDigit.elem.find('.vis').html(this[key].secondDigit.item);
            }
        }
    };
    clock.getCurrentTime();
    clock.getEvenOddIndex();
    clock.setTimeUnits();

    setInterval(function(){
        clock.getCurrentTime();

        var test = clock.seconds.secondDigit;
        var test1 = clock.seconds.firstDigit;
        (test.item%10)%2 == test.index ? test.elem.find('.vis').html(test.item) : test.elem.find('.invis').html(test.item);

        TweenLite.to(test.elem.find('.rotate'), 0.8, {
            ease: Back.easeOut,
            rotationY: "+=180"
        });
        if(test.item == 0) {
            (test1.item%10)%2 == test1.index ? test1.elem.find('.vis').html(test1.item) : test1.elem.find('.invis').html(test1.item);
            TweenLite.to(test1.elem.find('.rotate'), 0.8, {
                ease: Back.easeOut,
                rotationY: "+=180"
            });
        }
    }, 1000);

    //   clock.visSec.html(Math.floor(clock.second/10));
    //   clock.getEvenOdd();



    //   setInterval(function(){

    //     clock.getCurrentTime();

    //     (clock.second%10)%2 == clock.evenOdd ? clock.vis.html(clock.second%10) : clock.invis.html(clock.second%10);
    //     TweenLite.to('.number.lastSeconds .rotate', 0.8, {
    //         ease: Back.easeOut,
    //         rotationY: "+=180"
    //     });
    //     if(clock.second%10 == 0) {
    //         Math.floor(clock.second/10)%2 == clock.firstSecondEvenOdd ? clock.visSec.html(Math.floor(clock.second/10)) : clock.invisSec.html(Math.floor(clock.second/10));
    //         TweenLite.to('.firstSeconds .rotate', 0.8, {
    //             ease: Back.easeOut,
    //             rotationY: "+=180"
    //         });
    //     }
    //   }, 1000);
    // =================================================================
    //                        ===== HANDLERS =====
    // =================================================================
    $('.first-section li').each(function (index) {
        this.style.animationDelay = ('0.' + index + 's');
    });
    $('.play').on('click', function () {
        $('.first-section ul').toggleClass('stop');
        $('.play .rotate').toggleClass('paused');
    });
    $('.refresh').on('click', function () {
        var newElem = $('.first-section ul').clone().removeClass();
        $('.first-section ul').remove();
        $('.first-section').append(newElem);
        $(this).addClass('active');

        setTimeout(function () {
            $('.refresh').removeClass('active');
            console.log($(this));
        }, 300);


    });
    $('.fullScreen').on('click', function () {
        if (this.classList.contains('active')) {
            document.webkitExitFullscreen();
        } else {
            document.body.webkitRequestFullScreen();
        }
        $(this).toggleClass('active');
    });
    
});