$(document).ready(function(){
    history.scrollRestoration = "manual";
    mainScrollEvnet();
    mainScrollListClick();

    tab();
    popup();
    mobileMenu();
});

function mainScrollEvnet(){
    var $scrollArray = [$('[data-event="scroll"]'),$('.scrollArea')];
    var $delta;
    var $scrollTop;
    var $scrollIdx;
    var $prevBoolean;
    var $nextBoolean;
    
    var $touchEventX = 0;
    var $touchEventY = 0;
    var $touchCompareX = 0;
    var $touchCompareY = 0;
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
                    $('header').removeClass('scrollMenu');
                }else{
                }
            }

            mainScrollAnimate($scrollTop);
            mainScrollList($scrollIdx);
        })
        
        $(this).on('touchstart',function(e){
            $touchEventX = e.changedTouches[0].clientX;
            $touchEventY = e.changedTouches[0].clientY;
        })

        $(this).on('touchend',function(e){
            $touchCompareX = Math.abs($touchEventX - e.changedTouches[0].clientX);
            $touchCompareY = Math.abs($touchEventY - e.changedTouches[0].clientY);

            if($touchCompareX < $touchCompareY){
                if($touchEventY < e.changedTouches[0].clientY){
                    console.log(1);
                    // 터치을 위로
                    $scrollBoolean = true;
                    $prevBoolean = $(this).prev().children().attr('data-event') == 'scroll';
                    if($('.scrollArea').scrollTop() == 0 && $prevBoolean){
                        $scrollTop = $('[data-event="scroll"]').last().offset().top;
                        $('header').addClass('scrollMenu');
                        $('[data-event="scroll"]').parent().children().not('[data-event="scroll"]').fadeIn();
                    }else if(!($(this).prev().offset() == undefined) && !$prevBoolean){
                        $scrollTop = $(this).prev().offset().top;
                        $scrollIdx = $(this).index() - 1;
                    }
                }else{
                    console.log(2);
                    // 터치을 아래로
                    $scrollBoolean = true;
                    $nextBoolean = $(this).next().hasClass('scrollIcon');
                    if(!($(this).next().offset() == undefined) && !$nextBoolean){
                        $scrollTop = $(this).next().offset().top;
                        $scrollIdx = $(this).index() + 1;
                    }else if($nextBoolean){
                        $scrollTop = $('.scrollArea').offset().top;
                        $('[data-event="scroll"]').parent().children().not('[data-event="scroll"]').fadeOut();
                        $('header').removeClass('scrollMenu');
                    }else{
                    }
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
        if($(window).width() < 1280){
            $('header').toggleClass('active');
            $('header > div nav').fadeToggle();
        }
    })
    $('header > div nav > ul > li > a').click(function(e){
        if($(window).width() < 1280){
            e.preventDefault();
            $(this).parent().toggleClass('active');
            $(this).next().slideToggle();
        }
    })

    if($('header > div nav > ul > li').hasClass('active')){
        $(this).children('ul').slideToggle();
    }

    $(window).resize(function(){
        if($(window).width() > 1280){
            $('header > div nav').show();
            $('header > div nav > ul > li > ul').hide();
        }else{
            $('header').removeClass('active');
            $('header > div nav').hide();
        }
    })
}


function popup(){
    $('[data-event="popup"] + .popupArea').hide();
    $('[data-event="popup"]').click(function(e){
        e.preventDefault();
        $('[data-event="popup"] + .popupArea').fadeIn();
    });
    $('[data-event="popup"] + .popupArea').click(function(){
        console.log($(this).children('div').children('iframe')[0]);
        $(this).children('div').children('iframe')[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
        $(this).fadeOut();
    })
    $('[data-event="popup"] + .popupArea > div').click(function(e){
        e.stopPropagation();
    })

    $('[data-event="popup"] + .popupArea > div .closeBtn').click(function(){
        $(this).next()[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
        $(this).parent().parent().fadeOut();
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
