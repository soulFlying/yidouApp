$(function () {
 /* $('html,body').animate({scrollTop:0},0)*/
  /*获取url参数*/
  function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)return unescape(r[2]);
    return null;
  }
  var osType = GetQueryString('osType')
  var platForm = GetQueryString('platForm')
  if (osType == 'ios' && platForm == 'yidou') {
    $('.detail_top .header').css('padding-top','0.6rem');
  }
  else {
    $('.detail_top .header').css('padding-top','0.3rem');
  }
  /*监听页面是否滚动*/
  var headerHeight = $('.detail_top').outerHeight()
  var navOffset = $('.nav_title').offset().top - headerHeight
  $(window).scroll(function () {
    var scrollTop = $('body').scrollTop()
    var totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
    if(scrollTop > 40){
      $('.detail_top').css('background','rgba(255,255,255,0.9)')
    }else{
      $('.detail_top').css('background','')
    }
    /*判断页面是否到底*/
    if(($(document).height()) > totalheight && scrollTop > navOffset){
      $('.nav_title').css({'position':'fixed','top':headerHeight,'left':'0','background':'rgba(255,255,255,0.9)'})
    } else if(($(document).height()) <= totalheight && $('.nav_title').css('position') == 'fixed' && scrollTop > navOffset){
      $('.nav_title').css({'position':'fixed','top':headerHeight,'left':'0','background':'rgba(255,255,255,0.9)'})
    } else {
      $('.nav_title').css({'position':'','top':'','left':'','background':''})
    }
  })
/*按钮点击*/
  $('.buyNow').on('click',function () {
    window.location.href = 'ydd://buyTranslator'
  });
  $('.back').on('click',function () {
    window.location.href = 'goback://';
  });
  $('.use_info').on('click',function () {
    window.location.href = 'user_info.html?osType='+osType+'&platForm='+platForm;
  })
  //nav点击切换
  var bannerHeight = $('.yidou_banner').outerHeight() - headerHeight - 1
  $('.nav li').on('click',function () {
    $(this).addClass('active').siblings('li').removeClass('active')
    if ($(this).index() == 0) {
      $('.product_info').fadeIn(0)
      $('.product_info').css('transform','translateX(0)')
      $('.norms').fadeOut(0)
      $('.afterSale').fadeOut(0)
      $('.norms,.afterSale').css('transform','translateX(20%)')
    } else if ($(this).index() == 1) {
      $('.norms').fadeIn(0)
      $('.norms').css('transform','translateX(0)')
      $('.product_info').fadeOut(0)
      $('.afterSale').fadeOut(0)
      $('.product_info').css('transform','translateX(-20%)')
      $('.afterSale').css('transform','translateX(20%)')
    } else if ($(this).index() == 2) {
      $('.afterSale').fadeIn(0)
      $('.afterSale').css('transform','translateX(0)')
      $('.product_info').fadeOut(0)
      $('.norms').fadeOut(0)
      $('.norms,.product_info').css('transform','translateX(-20%)')
    }
    $('html,body').animate({scrollTop:bannerHeight+'px'},0)
  })
  //点击关闭视频
  $('.playClose').on('click',function () {
    var Media = document.getElementById('media')
    Media.pause()
    $('.mask').fadeOut(0)
  })
  //点击打开视频
  $('.open_player').on('click',function () {
    var Media = document.getElementById('media')
    Media.currentTime = 0
    Media.play()
    $('.mask').fadeIn(200)
    $('.mask').bind("touchmove",function(e){
      e.preventDefault();
    });
    var h = ($(document).height())*0.12 + 'px'
    $('html,body').animate({scrollTop:h},200)
  })
})
