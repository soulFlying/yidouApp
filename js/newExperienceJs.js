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
  /*var isIphoneX = GetQueryString('isiPhoneX');*/
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
    $('.banner .title').css('top','13px')
    $('.back').css('top','10px');
    $('.backBtn').css('top','0.05rem');
  }
  //轮播图
  var mySwiper = new Swiper ('.swiper-container', {
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
    url: inter_face+"/api/1.0/experiences/"+id,
    dataType: "json",
    success: function (data) {
      if (data.code == 200) {
        var datas = data.data;
        /*console.log(datas);*/
        $('.banner .title').html(datas.title);
        /*$('.titleNovelty h2').html(datas.subTitle);*/
        $('.titleNovelty p').html(datas.spots);
        if(datas.country){
          $('.country ul li').eq(0).show();
          $('.cityName').html(datas.country);
        }
        else {
          $('.country ul li').eq(0).hide();
        }
        $('.day').html(datas.daysOfPlay);
        $('.month').html(datas.playMonth);
        $('.playWay .content').html(datas.gameplay);
        $('.charge .content').html(datas.expenseDetails);
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
      //分享按钮
      $('.share').on('click',function () {
        var i = 'newExperience.html?targetId='+id;
        var p = datas.imgs[0];
        var t = datas.imgs.title;
        route(i,p,t)
      })
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
})

