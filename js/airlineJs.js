$(function () {
  /*var interface = 'http://yidou.easyto.com/mall';*/
  /*var interface = 'http://demo.easyto.com/mall';*/
  getHeights();
  function getHeights() {
    var deviceWidth = document.documentElement.clientWidth / 7.5;
    var airLineDetailH = ($('.airlineDetail').outerHeight() / deviceWidth) + 2;
    $('.airlineBg').css('height', airLineDetailH + 'rem');
  }
  window.onresize = function () {
    getHeights();
    window.location.reload();
  };
  /*****************获取数据******************/
  /*获取url*/
  function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)return unescape(r[2]);
    return null;
  }
  var osType = GetQueryString('osType')
  var platForm = GetQueryString('platForm')
  var isIphoneX = GetQueryString('isiPhoneX')
  if (osType == 'ios' && platForm == 'yidou') {
     if(isIphoneX == 1){
       $('.mainTitle').css({'padding-top':'35px','height':'1.7rem'});
       $('.backBtn').css('top','0.73rem');
       $('.total').css('bottom','34px');
       $('.airlineDetail').css('margin-top','1.7rem');
       var airLineDetailH = ($('.airlineDetail').outerHeight() / 50) + 2.5;
       $('.airlineBg').css('height', airLineDetailH + 'rem');
     }
     else {
       $('.mainTitle').css({'padding-top':'16px','height':''});
       $('.backBtn').css('top','');
       $('.total').css('bottom','');
       $('.airlineDetail').css('margin-top','1.3rem');
     }
  }
  else {
    $('.backBtn').css('top','0.21rem');
    $('.mainTitle').css('padding-top','8px');
  }

//时间戳转化
  function getLocalTime(nS) {
    var date = new Date(nS);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
    /*var tt = new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/, '')
    return tt.replace(/\//g, "-");*/
  }

  //星期转化
  var arrDays = new Array("日", "一", "二", "三", "四", "五", "六");
  //24计算
  function turnTime(times) {
    var year_hours = getLocalTime(times);
    var year = year_hours.split(" ")[0];
    var month = year.substr(5);
    var arrYear = year.split(/[- : \/]/)
    var dates = new Date(arrYear[0], arrYear[1]-1, arrYear[2]).getDay();
    var weekDay = arrDays[dates];
    var hour = year_hours.split(" ")[1].split(/[- : \/]/);
    var timeRight = hour[0]+':'+hour[1]
    /*if (hour.indexOf('上午') >= 0) {
      hour = hour.split('上午')[1];
    }
    if (hour.indexOf('下午') >= 0) {
      hour = (parseInt(hour.split('下午')[1].split(':')[0]) + 12) + ':' + hour.split('下午')[1].split(':')[1];
    }*/
    var timeObj = {
      "年月": month,
      "星期": '周' + weekDay,
      "时间点": timeRight
    }
    return timeObj
  }

  //时间差值计算
  function days(mss) {
    var days = parseInt(mss / (1000 * 60 * 60 * 24));
    return days;
  }
  function hours(mss) {
    var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return hours;
  }

  function minutes(mss) {
    var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
    return minutes;
  }

  var sku = GetQueryString('sku');
  $.ajax({
    type: "GET",
    url: interface + "/api/v1.0/air_ticket/" + sku + "/detail",
    dataType: "json",
    success: function (data) {
      var airlineParent = $('.airlineDetail');
      var goChild = $('.go');
      var lineChild = $('.lines');
      var dataLists = data.data;
      if (data.code == 200) {
        var tripInfoLists = dataLists.tripInfo;
        $.each(tripInfoLists, function (i, list) {
          var airlineCloner = goChild.clone(true);
          var lineCloner = lineChild.clone(true);
          var startTime = list.departureTime;
          var arrivalTime = list.arrivalTime;
          var dayDif = days(arrivalTime - startTime);
          var hourDif = hours(arrivalTime - startTime)+(dayDif*24);
          var minDif = minutes(arrivalTime - startTime);
          if (list.type == '0') {
            airlineCloner.find('.goSign').html('去');
          }
          else if (list.type == '1') {
            airlineCloner.find('.goSign').html('返');
          }
          airlineCloner.find('h1').append(list.fromCity + '-' + list.toCity + ' 总时长' + hourDif + 'h' + minDif + 'm');
            var startTimeObj = turnTime(dataLists.tripInfo[i].departureTime);
            airlineCloner.find('.startTime').find('a').html(startTimeObj['时间点']);
            airlineCloner.find('.startTime').find('p').html(startTimeObj['年月'] + '&nbsp;' + startTimeObj['星期']);
            airlineCloner.find('.startStation').html(list.fromStation);
            airlineCloner.find('.endStation').html(list.arrivalStation);
            if(list.stopStation =='null' || list.stopStation =='undefined' || list.stopStation ==null || list.stopStation ==undefined){
              airlineCloner.find('.passStation').html(list.goFight);
            }
            else {
              airlineCloner.find('.passStation').html(list.goFight + '<br/>' + '经停' + list.stopStation);
            }
            var endTimeObj = turnTime(dataLists.tripInfo[i].arrivalTime);
            airlineCloner.find('.endTime a').html(endTimeObj['时间点']);
            airlineCloner.find('.endTime p').html(endTimeObj['年月'] + '&nbsp;' + endTimeObj['星期']);
          airlineParent.append(airlineCloner);
          airlineParent.append(lineCloner);
          goChild.remove();
          lineChild.remove();
        })
        $('.rules').append(dataLists.retreatRules);
        $('.price').html('￥'+parseInt(dataLists.totalPrice));
        if (dataLists.taxPrice) {
          $('.tax').html('(含税￥'+parseInt(dataLists.taxPrice)+')');
        }
        else {
          $('.tax').html('(含税￥0)');
       }
      }
      $('.airlineDetail').find('.lines:last-child').hide();
      /*****************立即购买协议******************/
      $('.buyFrame').on('click', function () {
        var sku = dataLists.sku;
        window.location.href = 'ydd://airlineBuy?sku='+sku;
      })
      $('.go').each(function () {
        var deviceWidth = document.documentElement.clientWidth / 7.5;
        var hh=$(this).find('.airLine').height();
        $(this).find('.endTime').css('margin-top',hh/deviceWidth-1.35+'rem')
      })
    }
  });
  //返回按钮
  $('.backBtn').on('click',function () {
    window.location.href = 'goback://';
  });
  //分享按钮
  $('.share').on('click',function () {
    var i = 'airlineTicket.html?sku='+sku;
    var p = '';
    var t = '机票详情';
    route(i,p,t)
  })
})
