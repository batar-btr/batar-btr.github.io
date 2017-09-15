
(function () {
    'use strict';

    $(document).ready(function(){

        $('.skills li').each(activeSkills);

        $(document).on('scroll', function(){
            $('.skills li').each(activeSkills);
        });

        $(document).on('scroll', rotateGear);
    });

    function rotateGear () {
        var currentScroll = $(document).scrollTop();
        $('#js').css({'transform': "rotate("+ currentScroll*1.44*0.5555555555555 +"deg)"});
        $('#css').css({'transform': "rotate("+ -currentScroll*1.44 +"deg)"});
        $('#html').css({'transform': "rotate("+ -currentScroll*1.44 +"deg)"});
    }

    function activeSkills() {
        var elem = $(this);
    
        if( elem.offset().top < $(window).height() + $(document).scrollTop() && elem.offset().top > $(document).scrollTop()) {
            elem.css({'backgroundSize': elem.data('skillsValue')+'% ' + '100%, 100% 100%'});
        } else {
            elem.css({'backgroundSize': '1% 100%, 100% 100%'});
        }
    }

}());
