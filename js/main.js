$(document).ready(function(){
    history.scrollRestoration = "manual";
    mainScrollEvnet();
});

function mainScrollEvnet(){
    var $scrollArray = [$('[data-event="scroll"]'),$('.scrollArea')];
    var $delta;
    var $scrollTop;
    var $scrollIdx;
    var $prevBoolean;
    var $nextBoolean;
    $.each($scrollArray,function(){
        $(this).on('mousewheel DOMMouseScroll',function(e){
            $delta = e.originalEvent.wheelDelta;
            if($('html, body').is(':animated')){
                return;
            }
            if($delta > 0){
                // 마우스 휠을 위로
                $scrollBoolean = true;
                $prevBoolean = $(this).prev().hasClass('mainBGArea');
                if($('.scrollArea').scrollTop() == 0 && $prevBoolean){
                    $scrollTop = $('.mainBGArea section').last().offset().top;
                    $('header').addClass('active');
                    $('.mainBGArea > div').fadeIn();
                }else if(!($(this).prev().offset() == undefined) && !$prevBoolean){
                    $scrollTop = $(this).prev().offset().top;
                    $scrollIdx = $(this).index() - 1;
                }
            }else{
                // 마우스 휠을 아래로
                $scrollBoolean = true;
                $nextBoolean = $(this).next().hasClass('scrollIcon');
                if(!($(this).next().offset() == undefined) && !$nextBoolean){
                    $scrollTop = $(this).next().offset().top;
                    $scrollIdx = $(this).index() + 1;
                }else if($nextBoolean){
                    $scrollTop = $('.scrollArea').offset().top;
                    $('.mainBGArea > div').fadeOut();
                    $('header').removeClass('active');
                }else{
                }
            }

            $('html, body').stop().animate({scrollTop: $scrollTop},800); 
            mainScrollList($scrollIdx);
        })
    })

    function mainScrollList(idx){
        $('.mainScrollNavArea ul li').removeClass('active');
        $('.mainScrollNavArea ul li').eq(idx).addClass('active');
    }
};