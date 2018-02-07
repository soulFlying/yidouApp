$(function () {
  $('html,body').animate({scrollTop:0},0)
  /*监听页面是否滚动*/
  $(window).scroll(function () {
    if($('body').scrollTop() > 20){
      $('.detail_top').css('background','rgba(255,255,255,0.9)')
    }else {
      $('.detail_top').css('background','')
    }
  })
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
      $('.norms,.afterSale').css('padding-top','2.4rem')
  }
  else {
    $('.detail_top .header').css('padding-top','0.3rem');
    $('.norms,.afterSale').css('padding-top','2.1rem')
  }

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
    $('html,body').animate({scrollTop:0},0)
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
    var h = ($(document).height())*0.2256 + 'px'
    $('html,body').animate({scrollTop:h},200)
  })
})
