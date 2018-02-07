$(function () {
  function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)return unescape(r[2]);
    return null;
  }
  // var isIphoneX = GetQueryString('isiPhoneX');
  if(navigator.userAgent.match(/(iPhone|iPod|iPad);?/i) || navigator.userAgent.indexOf('iPhone') > -1){
   /* if(isIphoneX == 1){
      $('.mainTitle').css({'padding-top':'35px','height':'1.7rem'});
      $('.backBtn').css('top','0.75rem');
      $('.lightContent').css('margin-top','1.7rem');
      $('.lightDetail').css('margin-top','1.7rem');
      $('.back_hotel').css('top','42px');
      $('.blueBg').css('height','5.2rem');
    }
    else {*/
      $('.mainTitle').css({'padding-top':'17px','height':''});
      $('.backBtn').css('top','0.35rem');
      $('.back_hotel').css('top','');
      $('.lightContent').css('margin-top','');
      $('.lightDetail').css('margin-top','');
      $('.blueBg').css('height','');
    /*}*/
  }else if(navigator.userAgent.match(/android/i)){
    $('.mainTitle').css('padding-top','8px');
    $('.back_hotel').css('top','20px');
    $('.backBtn').css('top','0.05rem');
  }
  var lineSku = GetQueryString('sku');
  /*行程亮点获取数据*/
  $.ajax({
    type: "GET",
    url: interface + '/api/v1.0/line/'+lineSku+'/attr/highlight/',
    dataType: "json",
    success: function (data) {
      if (data.code == 200) {
        $('.scheduleLight').html(data.data);
      }
    }
  });
  /*每日行程获取数据*/
  $.ajax({
    type: "GET",
    url: interface + '/api/v1.0/line/'+lineSku+'/attr/day_work/',
    dataType: "json",
    success: function (data) {
      if (data.code == 200) {
        $('.scheduleDaily').html(data.data);
      }
    }
  });
  /*费用说明获取数据*/
  $.ajax({
    type: "GET",
    url: interface + '/api/v1.0/line/'+lineSku+'/attr/cost_description/',
    dataType: "json",
    success: function (data) {
      if (data.code == 200) {
        $('.feeDetail').html(data.data)
      }
    }
  });
  /*预定须知获取数据*/
  $.ajax({
    type: "GET",
    url: interface + '/api/v1.0/line/'+lineSku+'/attr/booking_limit/',
    dataType: "json",
    success: function (data) {
      if (data.code == 200) {
        $('.reservationDetail').html(data.data);
      }
    }
  });
  /*航班详情获取数据*/
  $.ajax({
    type: "GET",
    url: interface + '/api/v1.0/line/'+lineSku+'/attr/airplane_info',
    dataType: "json",
    success: function (data) {
      if (data.code == 200) {
        $('.go').html(data.data.goInfo);
        $('.flightBack').html(data.data.backInfo);
      }
    }
  });
  //酒店详情页
  var attrId = GetQueryString('attrId');
  $.ajax({
    type: "GET",
    url: interface + '/api/v1.0/line/attr/hotel_info/'+attrId+'/',
    dataType: "json",
    success: function (data) {
      if (data.code == 200) {
        $('.hotel_title').html(data.data.name);
        $('.scheduleLight').html(data.data.description);
      }
    }
  })
  //返回按钮
  $('.backBtn').on('click',function () {
    window.history.back(-1);
  });
  // 分享
  var pic = GetQueryString('pic')
  $('.share').on('click',function () {
    var i = 'schedule/schedule.html?sku='+lineSku;
    var p = pic;
    var t = '行程详情';
    route(i,p,t)
  })
});
