$(document).ready(function () {
  /*var interface = 'http://yidou.easyto.com/mall'*/
  /*var interface = 'http://demo.easyto.com/mall'*/
  function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)return unescape(r[2]);
    return null;
  }
  /*var isIphoneX = GetQueryString('isiPhoneX');*/
  if(navigator.userAgent.match(/(iPhone|iPod|iPad);?/i) || navigator.userAgent.indexOf('iPhone') > -1){
    /*if(isIphoneX == 1){
      $('.mainTitle').css({'padding-top':'35px','height':'1.7rem'});
      $('.backBtn').css('top','0.75rem');
      $('.swiper-container').css('margin-top','1.7rem');
      $('.hotelBg').css('height','3.65rem');
    }
    else {*/
      $('.mainTitle').css({'padding-top':'17px','height':''});
      $('.backBtn').css('top','');
      $('.swiper-container').css('margin-top','');
      $('.hotelBg').css('height','');
    /*}*/
  }else if(navigator.userAgent.match(/android/i)){
    $('.mainTitle').css('padding-top','8px');
    $('.backBtn').css('top','0.05rem');
  }
  var loadFlag = true;
  var oi = 0;
  var mySwiper = new Swiper('.swiper-container',{
    direction: 'vertical',
    scrollbar: '.swiper-scrollbar',
    slidesPerView: 'auto',
    mousewheelControl: true,
    freeMode: true,
    onTouchMove: function(swiper){
      //手动滑动中触发
      var _viewHeight = document.getElementsByClassName('swiper-wrapper')[0].offsetHeight;
      var _contentHeight = document.getElementsByClassName('swiper-slide')[0].offsetHeight;

      // if(mySwiper.translate < 30 && mySwiper.translate > 0) {
      //   $(".init-loading").html('下拉刷新...').show();
      // }else if(mySwiper.translate > 30 ){
      //   $(".init-loading").html('释放刷新...').show();
      // }
    },
    onTouchEnd: function(swiper) {
      var _viewHeight = document.getElementsByClassName('swiper-wrapper')[0].offsetHeight;
      var _contentHeight = document.getElementsByClassName('swiper-slide')[0].offsetHeight;
      if(mySwiper.translate >= 20 || mySwiper.translate <= -20) {
        mySwiper.update();
      }
      // 下拉刷新
      /*if(mySwiper.translate >= 30) {
        $(".init-loading").html('正在刷新...').show();
        // loadFlag = true;

        setTimeout(function() {
          $(".init-loading").html('刷新成功！');
          setTimeout(function(){
            $(".init-loading").html('').hide(200);
          },800);
          //刷新操作
          mySwiper.update(); // 重新计算高度;
        }, 1000);
      }else if(mySwiper.translate >= 0 && mySwiper.translate < 30){
        $(".init-loading").html('').hide(200);
      }
      else if(mySwiper.translate < 0) {
        mySwiper.update();
      }*/
      return false;
    }
  });
  var mySwiper2 = new Swiper('.swiper-container2',{
    onTransitionEnd: function(swiper){
      $('.w').css('transform', 'translate3d(0px, 0px, 0px)')
      $('.swiper-container2 .swiper-slide-active').css('height','auto').siblings('.swiper-slide').css('height','0px');
      mySwiper.update();
    }
  });
 /* window.onresize = function () {
    window.location.reload();
  };*/
 /*************酒店列表获取数据*************/
 var lineSku = GetQueryString('sku');
  var startNum ='';
  $('.starts').hide();
 $.ajax({
   type: "GET",
   url: interface + '/api/v1.0/line/' + lineSku + '/attr/hotel_info/',
   dataType: "json",
   success: function (data) {
     var dataList = data.data;
     console.log(dataList);
     var hotelListsParent = $('.hotelLists');
     var listChild = $('.list');
     if (data.code == 200) {
       $.each(dataList,function (i,value) {
         var listContainer = listChild.clone(true);
         listContainer.find('img').attr('src',value.cover);
         listContainer.find('.evaluate').find('h2').html(value.name);
         $('.starts').find('span').removeClass('start_fff');
         listContainer.on('click',function () {
           window.location.href='hotelDetail.html?attrId='+value.attrId;
         })
         hotelListsParent.append(listContainer);
         listChild.remove();
       })
       $.each(dataList,function (index,value) {
         startNum = Math.ceil(value.point/20);
         $('.list').eq(index).find('.starts').show();
        if (startNum < 5) {
         for(var i=startNum+1;i<6;i++){
             $('.list').eq(index).find('.starts').find('span:nth-child('+i+')').addClass('start_fff');
           }
        }
       })
     }
   }
 });
  //返回按钮
  $('.backBtn').on('click',function () {
    window.history.back(-1);
  });
});
