$(document).ready(function(){
    history.scrollRestoration = "manual";
    mainScrollEvnet();
    mainScrollListClick();

    tab();

    if($(window).width() < 1280){
        mobileMenu();
    }

    $(window).resize(function(){
        
    })
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
                // $prevBoolean = $(this).prev().hasClass('mainBGArea');
                $prevBoolean = $(this).prev().children().attr('data-event') == 'scroll';
                if($('.scrollArea').scrollTop() == 0 && $prevBoolean){
                    $scrollTop = $('[data-event="scroll"]').last().offset().top;
                    $('header').addClass('scrollMenu');
                    // $('.mainBGArea > div').fadeIn();
                    // $('.scrollIcon').fadeIn();
                    $('[data-event="scroll"]').parent().children().not('[data-event="scroll"]').fadeIn();
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
                    $('[data-event="scroll"]').parent().children().not('[data-event="scroll"]').fadeOut();
                    // $('.mainBGArea > div').fadeOut();
                    // $('.scrollIcon').fadeOut();
                    $('header').removeClass('scrollMenu');
                }else{
                }
            }

            mainScrollAnimate($scrollTop);
            mainScrollList($scrollIdx);
        })
    })

};
function mainScrollListClick(){
    $('.mainScrollNavArea ul li').click(function(){
        mainScrollAnimate($('[data-event="scroll"]').eq($(this).index()).offset().top);
        mainScrollList($(this).index());
    });
}
function mainScrollAnimate(offsetTop){
    $('html, body').stop().animate({scrollTop: offsetTop},800); 
}
function mainScrollList(idx){
    $('.mainScrollNavArea ul li').removeClass('active');
    $('.mainScrollNavArea ul li').eq(idx).addClass('active');
}

function mobileMenu(){
    $('.M_menuBtn').click(function(){
        $('header').toggleClass('active');
        $('header > div nav').fadeToggle();
    })
    $('header > div nav > ul > li > a').click(function(e){
        e.preventDefault();
        $(this).next().slideToggle();
    })
}


function tab(){
    var tabInd;
    $('.tabArea .tabBtn > li a').click(function(e){
        e.preventDefault();
        tabInd = $(this).parent().index();
        $(this).parent().addClass('active').siblings().removeClass('active');
        $('.tabArea .tabContents > *').eq(tabInd).addClass('active').siblings().removeClass('active');
    })
}