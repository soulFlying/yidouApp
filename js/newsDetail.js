$(function () {
  //获取url
  function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)return unescape(r[2]);
    return null;
  }
  //时间戳转化
  function getLocalTime(nS) {
    var tt = new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/, '')
    return tt.replace(/\//g, "-");
  }
  //
  /*function days(mss) {
    var days = parseInt(mss / (1000 * 60 * 60 * 24));
    return days;
  }
  function hours(mss) {
    var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return hours;
  }*/

  /*function minutes(mss) {
    var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
    return minutes;
  }*/

  // 调整头部样式
  var osType = GetQueryString('osType')
  var platForm = GetQueryString('platForm')
  if (osType == 'ios' && platForm == 'yidou') {
      $('.mainTitle').css({'height':'','padding-top':'0.3rem'});
      $('.newsTitle').css('margin-top','');
      $('.backBtn').css('top', '');
  }
  else {
    $('.mainTitle').css('padding-top', '0.1rem');
    $('.backBtn').css('top', '0.15rem');
  }
  //获取数据
  var id = GetQueryString('targetId');
  var deltaTime =0;
  /*var dateStr="2013/5/12 00:10:20";
  var date=new Date(dateStr);
  console.log(date.getTime());
  var creatTime = getLocalTime(date.getTime()).split(/[- : \/]/);
  console.log(creatTime)*/
  $.ajax({
    type: "GET",
    url: inter_face + "/api/1.0/news/" + id,
    dataType: "json",
    success: function (data) {
      var dataLists = data.data;
      if (data.code == 200) {
        $('.newsTitle').html(dataLists.title);
        $('.author').html(dataLists.author+'<a class="restTime"></a>');
        $('.newsDetail').html(dataLists.content);
        var creatTime = getLocalTime(dataLists.createTime).split(/[- : \/]/);
        var currentTime = getLocalTime(Date.parse(new Date())).split(/[- : \/]/);
        var interval = 60000;
        getDate()
        function getDate() {
         if(creatTime[0] == currentTime[0] && creatTime[1] == currentTime[1] && creatTime[2] == currentTime[2]){
           var times = creatTime[3].split('午');
           var tt
           if(times[0] == '上' && times[1] < 10){
             tt = '0'+times[1]
           }
           else if(times[0] == '上' && times[1] >= 10 && times[1] !=12){
             tt = times[1]
           }
           else if(times[0] == '上' && times[1] ==12){
             tt = parseInt(times[1]) + 12
           }
           else if (times[0] == '下' && times[1] != 12){
             tt = parseInt(times[1]) + 12
           }
           else if (times[0] == '下' && times[1] == 12){
             tt = times[1]
           }
           $('.restTime').html(tt+':'+creatTime[4]);
         }
         else if(creatTime[0] == currentTime[0] && creatTime[1] == currentTime[1] && currentTime[2] - creatTime[2] == 1){
           $('.restTime').html('昨天')
         }
         else {
           $('.restTime').html(creatTime[1]+'月'+creatTime[2]+'日');
         }
        }
        setInterval(function () {
          getDate();
        }, interval)
      }
      //分享按钮
      $('.share').on('click',function () {
        var i = 'news_detail.html?targetId='+id;
        var p = dataLists.imgs[0];
        var t = dataLists.title;
        route(i,p,t)
      })
    }
  })
  //返回按钮
  $('.backBtn').on('click',function () {
    window.location.href = 'goback://';
  });
  //分享
  function signFn() {
    var url = window.location.href;
    var title = $('#infoTitle').html();
    var desc = '皮皮虾邀您体验不一样的旅行！';
    var picUrl = $('.banner img').attr('src');
    $.ajax({
      type: "POST",
      url: "http://api.ppx.easyto.com/wxapi/wechat/sign",
      data: {
        "url": url
      },
      dataType: "json",
      success: function (data) {
        if (data.result == true) {
          var signData = data.datum;
          wx.config({
            debug: false,
            appId: signData.appId,
            timestamp: signData.timestamp,
            signature: signData.signature,
            nonceStr: signData.nonceStr,
            jsApiList: [
              'onMenuShareTimeline', 'onMenuShareAppMessage'
            ]
          });
          wx.ready(function () {
            wx.onMenuShareTimeline({
              title: title, // 分享标题
              link: url, // 分享链接'
              imgUrl: picUrl, // 分享图标
              success: function () {
                // 分享纪录
                alert("分享到朋友圈成功")
              },
              cancel: function () {
                alert("分享失败,您取消了分享!")
              }
            });
            wx.onMenuShareAppMessage({
              title: title, // 分享标题
              desc: desc, // 分享描述
              link: url, // 分享链接
              imgUrl: picUrl, // 分享图标
              success: function () {
                alert("成功分享给朋友")
              },
              cancel: function () {
                alert("分享失败,您取消了分享!")
              }
            });
          });
        }
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
      }
    });
  }
})

