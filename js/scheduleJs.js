$(function () {
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
      $('.back,.share').css('top','');
      $('.backBtn,.shareBtn').css('top','');
    /*}*/
  }
  else {
    $('.banner .title').css('top','10px');
    $('.back,.share').css('top','9px');
    $('.backBtn,.shareBtn').css('top','0.05rem');
  }
  /*轮播*/
  var mySwiper = new Swiper ('.swiper-container', {
    direction: 'horizontal',
    loop: true,
    autoplay: 3000,
    // 如果需要分页器
    pagination: '.swiper-pagination',
    autoplayDisableOnInteraction : false,
    paginationClickable :true,
    paginationElement : 'li',
    observer:true,//修改swiper自己或子元素时，自动初始化swiper
    observeParents:true,
  })
  /*获取数据*/
  var lineSku = GetQueryString('sku');
  $.ajax({
    type: "GET",
    url: interface + '/api/v1.0/line/'+lineSku+'/detail',
    dataType: "json",
    async: false,
    success: function (data) {
     var dataList = data.data;
      if (data.code == 200) {
        console.log(dataList);
        var albums = dataList.lineImages;
        $('.slidesWrap >div:last-child').find('img').attr('src',albums[1].url);
        $('.slidesWrap >div:first-child').find('img').attr('src',albums[albums.length-1].url);
        $('.slidesWrap >div:nth-child(2)').remove();
        $.each(albums,function (i,album) {
          if (i>0) {
            $('.slidesWrap >div:last-child').before('<div class="swiper-slide slides"><img src="'+album.url+'"></div>');
          }
        })
        if(dataList.description ==undefined || dataList.description ==null || dataList.description =='null' || dataList.description =='undefined' || dataList.description ==''){
          $('.intro').hide();
        }
        else {
          $('.intro').html(dataList.description);
          $('.intro').show();
        }
        $('.linePrice a').html('￥'+parseInt(dataList.price));
        $('.origin').html(dataList.origin);
        $('.destination').html(dataList.destination);
        $('.info .name').html(dataList.planner.nickname);
        $('.planner .plannerSay').html(dataList.planner.plannerSaying);
        $('.headImg img').attr('src',dataList.planner.avatar);
      }
    }
  });
  var pic = $('.slides:nth-child(2)').find('img').attr('src');
$('.selects li:nth-child(1)').on('click',function () {
  window.location.href='scheduleLight.html?sku='+lineSku+'&pic='+pic+'&platForm='+platForm;
})
  $('.selects li:nth-child(2)').on('click',function () {
    window.location.href='scheduleLDaily.html?sku='+lineSku+'&pic='+pic+'&platForm='+platForm;
  })
  $('.selects li:nth-child(3)').on('click',function () {
    window.location.href='hotelInfo.html?sku='+lineSku+'&pic='+pic+'&platForm='+platForm;
  })
  $('.selects li:nth-child(4)').on('click',function () {
    window.location.href='flightInfo.html?sku='+lineSku+'&pic='+pic+'&platForm='+platForm;
  })
  $('.selects li:nth-child(5)').on('click',function () {
    window.location.href='expenseExplanation.html?sku='+lineSku+'&pic='+pic+'&platForm='+platForm;
  })
  $('.selects li:nth-child(6)').on('click',function () {
    window.location.href='reservationNotes.html?sku='+lineSku+'&pic='+pic+'&platForm='+platForm;
  })
  // 分享
  $('.share').on('click',function () {
    var i = 'schedule/schedule.html?sku='+lineSku;
    var p = pic;
    var t = '行程详情';
    route(i,p,t)
  })
  /*立即购买*/
  $('.robotBtn').on('click',function () {
    window.location.href='ydd://robotBtn';
  });
  $('.buyNow').on('click',function () {
    window.location.href='ydd://schedule?lineSku='+lineSku;
  })
  // 返回按钮
  $('.backBtn').on('click',function () {
    window.location.href = 'goback://';
  });

  /*航班详情获取数据*/
  $.ajax({
    type: "GET",
    url: interface + '/api/v1.0/line/'+lineSku+'/attr/airplane_info/',
    dataType: "json",
    success: function (data) {
      console.log(data);
      if (data.code == 200 && data.data.backInfo) {
          $('.scheFlight').show();
      }
      else {
        $('.scheFlight').hide();
      }
    }
  });
  //酒店详情页
  $.ajax({
    type: "GET",
    url: interface + '/api/v1.0/line/' + lineSku + '/attr/hotel_info/',
    dataType: "json",
    success: function (data) {
      if (data.code == 200) {
        $('.scheHotel').show();
      }
      else {
        $('.scheHotel').hide();
      }
    }
  })
})
