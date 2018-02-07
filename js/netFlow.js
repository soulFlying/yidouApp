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
    // if(isIphoneX == 1){
    //   $('.banner .title').css('top','50px')
    //   $('.back').css('top','50px');
    //   $('.backBtn').css('top','0.85rem');
    //   $('.advant .footer').css('bottom','20px')
    // }
    // else {
      $('.banner .title').css('top','')
      $('.back').css('top','');
      $('.backBtn').css('top','');
      $('.advant .footer').css('bottom','')
    /*}*/
  }
  else {
    $('.banner .title').css('top','13px')
    $('.back').css('top','12px');
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
  var id = GetQueryString('id');
  //获取数据
  $.ajax({
    type: "GET",
    url: interface+"/api/v1/card/" + id + "/detail",
    dataType: "json",
    success: function (data) {
      if (data.code == 200) {
        var datas = data.data;
        console.log(datas);
        var albums = datas.img;
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
        $('.titleFlow h2').html(datas.title);
        $('.prePrice').html('￥' + datas.price + '/张');
        $('.flowContent').html(datas.description);
      }
      var flowId = data.data.id;
      // 购买按钮
      $('.footer').on('click',function () {
        window.location.href = 'ydd://buyFlowCard?id='+flowId;
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

