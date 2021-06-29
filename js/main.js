$(document).ready(function(){
    mainScrollEvnet();
});

function mainScrollEvnet(){
    var $scrollArray = [$('.mainBGArea section'),$('.mainBGArea + *')];
    var $delta;
    var $scrollTop;
    var $scrollIdx;
    var $scrollBoolean;
    var $prevBoolean;
 /*    for(var i = 0; i < $('.mainBGArea section').length;i++){
        if($('.mainBGArea section').eq(i).offset().top < $(window).scrollTop()){
            console.log(i);
        }
    } */
    $.each($scrollArray,function(){
        $(this).on('mousewheel DOMMouseScroll',function(e){
            console.log(11);
            $delta = e.originalEvent.wheelDelta;
            // $scrollTop;
            // $scrollIdx;
            // $scrollBoolean;
            // $prevBoolean;
            if($('html, body').is(':animated')){
                return;
            }
            if($delta > 0){
                // 마우스 휠을 위로
                $scrollBoolean = true;
                $prevBoolean = $(this).prev().hasClass('mainBGArea');
                console.log($prevBoolean);
                if($('.mainBGArea + *').offset().top >= $(window).scrollTop() && $prevBoolean){
                    $scrollTop = $('.mainBGArea section').last().offset().top;
                    $('.mainBGArea > div').fadeIn();
                }else if(!($(this).prev().offset() == undefined) && !$prevBoolean){
                    $scrollTop = $(this).prev().offset().top;
                    $scrollIdx = $(this).index() - 1;
                }
            }else{
                // 마우스 휠을 아래로
                $scrollBoolean = true;
                if($(this).next()[0].nodeName == "SECTION"){
                    $scrollTop = $(this).next().offset().top;
                    $scrollIdx = $(this).index() + 1;
                }else if($(this).next().hasClass('scrollIcon')){
                    $scrollTop = $('.mainBGArea + *').offset().top;
                    $('.mainBGArea > div').fadeOut();
                }else{
                    $scrollBoolean = false;
                }
            }
            if($scrollBoolean){
                $('html, body').stop().animate({scrollTop: $scrollTop},1000); 
                mainScrollList($scrollIdx);
            }
        })
    })

    function mainScrollList(idx){
        $('.mainScrollNavArea ul li').removeClass('active');
        $('.mainScrollNavArea ul li').eq(idx).addClass('active');
    }
};