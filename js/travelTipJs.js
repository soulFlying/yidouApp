/*var interface = 'http://yidou.easyto.com/article';*/
/*var interface = 'http://demo.easyto.com/article';*/
$(function () {
  //获取url
  function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)return unescape(r[2]);
    return null;
  }
  var osType = GetQueryString('osType')
  var platForm = GetQueryString('platForm')
 /* var isIphoneX = GetQueryString('isiPhoneX');*/
  if (osType == 'ios' && platForm == 'yidou') {
    /*if(isIphoneX == 1){
      $('.banner .title').css('top','50px')
      $('.back').css('top','50px');
      $('.backBtn').css('top','0.85rem');
    }
    else {*/
      $('.banner .title').css('top','')
      $('.back').css('top','');
      $('.backBtn').css('top','');
    /*}*/
  }
  else {
    $('.banner .title').css('top','11px');
    $('.back').css('top','9px');
    $('.backBtn').css('top','0.05rem');
  }
  //轮播图
  var mySwiper = new Swiper ('.swiper-container', {
    direction: 'horizontal',
    loop: true,
    autoplay: 3000,
    autoplayDisableOnInteraction : false,
    paginationClickable :true,
    observer:true,//修改swiper自己或子元素时，自动初始化swiper
    observeParents:true,
  })
  var id = GetQueryString('targetId');
  //获取数据
  $.ajax({
    type: "GET",
    url: inter_face+"/api/1.0/guides/"+id,
    dataType: "jsonp",
    jsonp: "callback",
    jsonpCallback:"callback",
    success: function (data) {
      if (data.code == 200) {
        var datas = data.data;
        console.log(datas);
        $('.banner .title').html(datas.title);
        $('.describe').html(datas.summary);
        $('.bestTime .content').html(datas.bestPeriod);
        $('.reminder .content').html(datas.preTips);
        if(datas.consumptionLevel == ''){
          $('.consumption').hide();
        }
        else {
          $('.consumption').show();
          $('.consumption .content').html(datas.consumptionLevel);
        }
        if(datas.currency == ''){
          $('.currency').hide();
        }
        else {
          $('.currency').show();
          $('.currency .content').html(datas.currency);
        }
        if(datas.timeDifference == ''){
          $('.jetLag').hide();
        }
        else {
          $('.jetLag').show();
          $('.jetLag .content').html(datas.timeDifference);
        }
        var albums = datas.imgs;
        if(albums.length<=1){
          mySwiper.stopAutoplay();
        }
        else {
          mySwiper.startAutoplay();
        }
        $('.slidesWrap >div:last-child').find('img').attr('src',albums[0]);
        $('.slidesWrap >div:first-child').find('img').attr('src',albums[albums.length-1]);
        $('.slidesWrap >div:nth-child(2)').remove();
        $.each(albums,function (i,album) {
          $('.slidesWrap >div:last-child').before('<div class="swiper-slide slides"><img src="'+album+'"></div>');
        })
      }
    }
  });
  // 返回按钮
  $('.backBtn').on('click',function () {
    window.location.href = 'goback://';
  });
  //机器人按钮
  $('.robotBtn').on('click',function () {
    window.location.href='ydd://robotBtn';
  })
  /*******************下拉详情*********************/
  $('.advant>div>h2').on('click',function () {
    if($(this).siblings('.content').is(':hidden') == true){
      $(this).siblings('.content').stop(true,true).slideDown(400);
      $(this).css('background-image','url(images/up.png)');
    }
    else {
      $(this).siblings('.content').stop(true,true).slideUp(200);
      $(this).css('background-image','url(images/down.png)');
    }
  })
})


