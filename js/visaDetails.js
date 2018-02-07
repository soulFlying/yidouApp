
$(function () {
  $('body,html').animate({scrollTop: 0}, 600);
  /*获取url*/
  function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)return unescape(r[2]);
    return null;
  }
  var osType = GetQueryString('osType')
  var platForm = GetQueryString('platForm')
  var ua = navigator.userAgent.toLowerCase();
  if (osType == 'ios' && platForm == 'yidou') {
      $('.header').css({'padding-top':'','height':''});
      $('.backBtn').css('top','');
      $('.visa').css('margin-top','');
      $('footer').css('padding','');
      $('.total').css('padding','');
  }
  else {
    $('.header').css('padding-top','19px');
    $('.backBtn').css('top','0.15rem');
  }
  /* if (platForm == 'yidou') {*/
     //导航条固定
     function isFixed() {
       var diffrence = ($('.visaLists').offset().top) - ($('body').scrollTop()) - $('.header').innerHeight();
       if (diffrence < 0) {
         if ($('.visaNav').position().top != $('.header').innerHeight()) {
           $('.visaNav').css({'position': 'fixed', 'top': $('.header').innerHeight()-1, 'left': '0'});
         }
       }
       else {
         $('.visaNav').css({'position': '', 'top': '', 'left': ''});
       }
     }
     $(window).scroll(function () {
       var totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
       //当前文档高度   小于或等于   滚动条所在位置高度  则是页面底部
       if(($(document).height()) > totalheight) {
         //页面未到达底部
         isFixed();
         var scroll_top = $('body').scrollTop() + $('.header').outerHeight()+$('.visaNav').outerHeight();
         var nav_top = $('.visaLists').offset().top;
         var mater_h = $('.visaMaterial').outerHeight();
         var flow_h = $('.visaFlow').outerHeight();
         var fee_h = $('.visaFee').outerHeight();
         var order_h = $('.visaOrder').outerHeight();
         var s = scroll_top - nav_top;
         if (s > 0 && s < mater_h) {
           $('.visaNav ul li').removeClass('navActive')
           $('.visaNav ul li').eq(0).addClass('navActive')
         }
         if (s - mater_h > 0 && s - mater_h < flow_h) {
           $('.visaNav ul li').removeClass('navActive')
           $('.visaNav ul li').eq(1).addClass('navActive')
         }
         if (s - mater_h - flow_h > 0 && s - mater_h - flow_h <fee_h) {
           $('.visaNav ul li').removeClass('navActive')
           $('.visaNav ul li').eq(2).addClass('navActive')
         }
         if (s - mater_h - flow_h - fee_h > 0 && s - mater_h - flow_h - fee_h <order_h) {
           $('.visaNav ul li').removeClass('navActive')
           $('.visaNav ul li').eq(3).addClass('navActive')
         }
       }
       else {
         $('.visaNav ul li').removeClass('navActive')
         $('.visaNav ul li').eq(3).addClass('navActive')
       }
     });

     //tab切换
     $('.visaNav ul li').on('click', function () {
       $(this).addClass('navActive').siblings('li').removeClass('navActive');
       var diffrence = ($('.visaNav').offset().top) - ($('body').scrollTop()) - $('.header').outerHeight();
       var top = $('.visaLists > div').eq($(this).index()).offset().top+2;
       var navHight = $('.visaNav').outerHeight();
       if (diffrence >= 0) {
         $('body,html').animate({scrollTop: (top - navHight*2 - $('.header').outerHeight())}, 0);
       }
       else {
         $('body,html').animate({scrollTop: (top - navHight - $('.header').outerHeight())}, 0);
       }
     })

 /*  } */
  /* else if (!platForm || ua.match(/MicroMessenger/i)=="micromessenger"){
       $('#hideFooter').hide();
       $('#shareDetail').show();
       $('#hideHeader').hide();
       $('#renderTop').css('margin-top','0');
       //导航条固定
       function isFixed() {
         var diffrence = ($('.visaLists').offset().top) - ($('body').scrollTop());
         if (diffrence < 0) {
           if ($('.visaNav').position().top != $('.header').innerHeight()) {
             $('.visaNav').css({'position': 'fixed', 'top': '0', 'left': '0'});
           }
         }
         else {
           $('.visaNav').css({'position': '', 'top': '', 'left': ''});
         }
       }
       $(window).scroll(function () {
         var totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
         //当前文档高度   小于或等于   滚动条所在位置高度  则是页面底部
         if(($(document).height()) > totalheight) {
           //页面未到达底部
           isFixed();
         }
       });

       //tab切换
       $('.visaNav ul li').on('click', function () {
         $(this).addClass('navActive').siblings('li').removeClass('navActive');
         var diffrence = ($('.visaNav').offset().top) - ($('body').scrollTop());
         var top = $('.visaLists > div').eq($(this).index()).offset().top;
         var navHight = $('.visaNav').outerHeight();
         if (diffrence > 0) {
           $('body,html').animate({scrollTop: (top - navHight*2)}, 600);
         }
         else {
           $('body,html').animate({scrollTop: (top - navHight)}, 600);
         }
       })
     }*/
  /***************************获取高度**********************************/

  var h = $('.materialList').height();
  $('.materialListWrap').css('height', h);
  $(window).resize(function () {
    var h = $('.materialList').height();
    $('.materialListWrap').css('height', h);

  });

  /***************************点击事件**********************************/
  //遮罩层

  $('#frameClose').click(function () {
    $('body,html').removeClass('ovfHiden');
    $('.visaFrameWrap').fadeOut(400);
    $('.visaMask').fadeOut(400);
    prevent();
  });
  function prevent() {
    if ($('.visaFrameWrap').is(':hidden') == false) {
      window.location.href = "ydd://nobounces";
    }
    else {
      window.location.href = "ydd://bounces";
    }
  };

  //选择时间
  $('.goDate').on('click', function () {
    $('#goDate').attr('type', 'button');
    window.location.href = 'ydd://startDate';
  });

  $('.yes').on('click', function () {
    $('.prompt').hide();
  })
  //返回按钮
  $('.backBtn').on('click',function () {
    window.location.href = 'goback://';
  });
  /***************************横向滑动**********************************/
  var imgs = document.getElementsByClassName('imgs')[0];
  var imgsWrap = document.getElementsByClassName('materialList')[0];
  var img_st = 0;
  var img_en = 0;
  var img_se = 0;
  var img_fla = false;
  var img_index = 0;
  var is_slide = true;
  var len = imgs.children.length;

  function slideLeft() {
    var imgWrap = $('.imgs').find('div').length
    if (imgWrap > 5 && imgWrap <= 7 && img_index < 1){
      img_index++;
      img_fla = true;
    }
    else if (imgWrap > 7 && img_index < 2) {
      img_index++;
      img_fla = true;
    }
    /*if (img_index < 2) {
      img_index++;
      img_fla = true;
    }*/
    imgs.style.transition = 0.3 + "s ease";
    imgs.style.webkitTransition = 0.3 + "s ease";
    imgs.style.transform = "translateX(" + (-img_index * 25) + "%)";
    imgs.style.transform = "webkitTranslateX(" + (-img_index * 25) + "%)";
  };
  function slideRight() {
    if (img_index > 0) {
      img_fla = true;
      img_index--;
    }
    imgs.style.transition = 0.3 + "s ease";
    imgs.style.webkitTransition = 0.3 + "s ease";
    imgs.style.transform = "translateX(" + (-img_index * 25) + "%)";
    imgs.style.transform = "webkitTranslateX(" + (-img_index * 25) + "%)";
  };
  imgs.addEventListener("webkitTransitionEnd", function () {
    img_fla = false;
    img_st = 0;
  });
  imgs.addEventListener("transitionEnd", function () {
    img_fla = false;
    img_st = 0;
  });
  imgsWrap.addEventListener('touchstart', function (e) {
    is_slide = false
    img_st = e.touches[0].clientX;
  })

  imgsWrap.addEventListener('touchmove', function (e) {
    img_en = e.touches[0].clientX;
    if (img_en < 40) {
      is_slide = false
    }
    else {
      is_slide = true
    }
  })
  /*console.log(imgs.length)*/
  window.addEventListener('touchend', function () {
    img_se = img_en - img_st;
    if (img_se > 20 && img_fla == false && is_slide == true) {
      slideRight();
    }
    else if (img_se < -20 && img_fla == false && is_slide == true) {
      slideLeft();
    }

  })

  /***************************纵向滑动**********************************/

  var box = document.getElementsByClassName('visaHidden')[0];
  var slide = document.getElementsByClassName('visaFrame')[0];
  var hh = 0;
  var st = 0;
  var en = 0;
  var se = 0;
  box.addEventListener("touchstart", function (e) {
    hh = $('.visaFrame').outerHeight() - $('.visaHidden').outerHeight();
    st = e.touches[0].clientY;
  })

  box.addEventListener("touchmove", function (e) {
    en = e.touches[0].clientY;
  })

  window.addEventListener("touchend", function () {
    se = en - st;
    if (se > 20) {
      slide.style.transition = 0.5 + "s ease";
      slide.style.webkitTransition = 0.5 + "s ease";
      slide.style.transform = "translateY(0px)";
      slide.style.transform = "webkitTranslateY(0px)";
    }
    else if (se < -20) {
      slide.style.transition = 0.5 + "s ease";
      slide.style.webkitTransition = 0.5 + "s ease";
      slide.style.transform = "translateY(-" + (hh - 13) + "px)";
      slide.style.transform = "webkitTranslateY(-" + (hh - 13) + "px)";
    }
  });

  /***************************获取数据**********************************/
//详情页面1
  var visa_id = GetQueryString('id');
  var token = GetQueryString('token');
  var device_id = GetQueryString('device_id');
  var user_id = GetQueryString('user_id');
  getDateOne();
  function getDateOne() {
    $.ajax({
      type: "GET",
     url: interface + "/api/v1.0/visa/" + visa_id + '/detail',
      dataType: "json",
      success: function (data) {
        console.log(data);
        var flowContent = $('.flowList');
        var flowTemplate = $('.flowList > div');
        var imgsContent = $('.imgs');
        var imgsTemplate = $('.imgs > div');
        if (data.code == 200) {
          var visaList = data.data;
          var materialsBill = visaList.materialsBill;
          var process = visaList.purchaseProcess;
          $('.banner > img').attr('src', visaList.img);
          $('#infoTitle').html(visaList.title);
          $('.frameTitle > h1').html(visaList.title);
          $('#orgPrice').html('￥' + visaList.orgPrice + '/人起');
          $('#minPrice').html('￥' + visaList.minPrice + '/人起');
          $('.visaInfo ul li:nth-child(2) span').html(visaList.entryCount);
          $('.visaInfo ul li:nth-child(3) span').html(visaList.stopCount);
          $('.visaInfo ul li:nth-child(4) span').html(visaList.validDay);
          $('.visaInfo ul li:nth-child(5) span').html(visaList.signOff);
          $('.visaInfo ul li:nth-child(6) span').html(visaList.handleTime);
          $('.visaInfo ul li:nth-child(7) span').html(visaList.isInterview);
          $('.feeList p').html(visaList.costDescription);
          $('.orderList p').html(visaList.booking_limit);
          $.each(materialsBill, function (i, imgValue) {
            var imgsContainer = imgsTemplate.clone(true);
            imgsContainer.find('em').addClass(imgValue.clazz);
            imgsContainer.find('p').html(imgValue.type);
            imgsContent.append(imgsContainer);
            imgsTemplate.remove();
          })
          $.each(process, function (index, contents) {
            var flowContainer = flowTemplate.clone(true);
            flowContainer.find('.flowTitle span').html(contents.order);
            flowContainer.find('.flowTitle h1').html(contents.title);
            flowContainer.find('p').html(contents.content);
            flowContent.append(flowContainer);
            flowTemplate.remove();
          })
          $('.imgs').find('div:nth-child(1)').addClass('imgPink');
          $('.imgs > div').on('click', function () {
            $('.imgs > div').find('em').css('background-image', '');
            $(this).addClass('imgPink').siblings('div').removeClass('imgPink');
            position();
            materialClick();
          });
          function materialClick() {
            $.each(visaList.materialsBill, function (j, material) {
              if (material.type == $('.imgPink').find('p').html()) {
                $('.words p').html(this.content);
              }
            });
          }

          materialClick();
        }
        $('.imgSign > img').attr('src', $('.banner > img').attr('src'));
        // 材料清单
        position();
        //向客户端传参数
        $('.service').on('click', function () {
          window.location.href = 'ydd://contactService?icon=' + $('.banner > img').attr('src') + '&title=' + $('#infoTitle').html() + '&price=' + $('#minPrice').html() +
            '&oldPrice=' + $('#orgPrice').html() + '&visaId=' + visa_id;
        })
        // 分享
        $('.share').on('click',function () {
          var i ='visaDetails.html?id='+data.data.id;
          var p = data.data.img;
          var t = data.data.title;
          route(i,p,t)
        });
      }

    });
  }

//详情页面2
  var productType = '';
  var people_ar = {"data": []};
  var priceAttr;
  var goodsIndex = 0;

  function getDateTwo() {
    $.ajax({
      type: "GET",
      url: interface + "/api/v1.0/visa/" + visa_id + "/goods", /*?device_id=" + device_id + "&token=" + token + "&user_id=" + user_id*/
      dataType: "json",
      success: function (data) {
        var typeTemplate = $('#types > span');
        var typeContent = $('#types');
        var peopleContent = $('.persons');
        var peopleTemplate = $('.peopleType');
        if (data.code == 200) {
          var lists = data.data;
          priceAttr = lists;
          $.each(lists, function (i, list) {
            var typeContainer = typeTemplate.clone(true);
            typeContainer.html(list.productType);
            typeContent.append(typeContainer);
            typeTemplate.remove();
            $('#types > span:first-child').addClass('tyBg');
            if (list.productType == $('.tyBg').html()) {
              $.each(this.peopleType, function (j, peopleList) {
                var peopleContainer = peopleTemplate.clone(true);
                peopleContainer.find('div:first-child').html(peopleList.type + '：(￥' + peopleList.price + ')');
                peopleContent.append(peopleContainer);
                peopleTemplate.remove();
                if (peopleList.stock < 1) {
                  $('.peopleType').eq(j).find('.quantity').html('0');
                }
              })
              return;
            }
          });
          $(document).on('click', '.peopleType .add', function () {
            var adultCount = parseInt($(this).siblings('.quantity').html());
            var stock = lists[$('.tyBg').index()].peopleType[$(this).parents('.peopleType').index()-1].stock;
            if (adultCount < stock) {
              $(this).siblings('.quantity').html(adultCount + 1);
              calculateMoney();
            }
            else {
              $('.prompt p').html('库存有限，不能再多啦！');
              $('.prompt').show();
            }
          })
        }
        //选择种类
        $(document).on('click', '#types span', function () {
          $(this).addClass('tyBg').siblings('span').removeClass('tyBg');
          peopleContent.find('.peopleType').remove();
          people_ar.data = [];
          $.each(lists, function (i, list) {
            if (list.productType == $('.tyBg').html()) {
              goodsIndex = i;
              $.each(this.peopleType, function (j, peopleList) {
                var peopleContainer = peopleTemplate.clone(true);
                peopleContainer.find('div:first-child').html(peopleList.type + '：(￥' + peopleList.price + ')');
                peopleContent.append(peopleContainer);
                peopleTemplate.remove();
                if (peopleList.stock < 1) {
                  $('.peopleType').eq(j).find('.quantity').html('0');
                }
              })
              return;
            }
          });
          hh = $('.visaFrame').outerHeight() - $('.visaHidden').outerHeight();
          if (hh > 13) {
            slide.style.transition = 0.5 + "s ease";
            slide.style.webkitTransition = 0.5 + "s ease";
            slide.style.transform = "translateY(0px)";
            slide.style.transform = "webkitTranslateY(0px)";
          }
          calculateMoney();
        });
        //加减人数
        $(document).on('click', '.peopleType .reduce', function () {
          var quantities = parseInt($(this).siblings('.quantity').html());
          if (quantities > 0) {
            $(this).siblings('.quantity').html(quantities - 1);
          }
          calculateMoney();
        });
        //统计总额
        calculateMoney();
        function calculateMoney() {
          var peopleTypes = $('.peopleType');
          var priceQuantity = [];
          $.each(peopleTypes, function (index, type) {
            var size = parseInt($(type).find('.quantity').html());
            priceQuantity.push(size);
          });
          var priceItem = priceAttr[goodsIndex].peopleType;
          var total = 0;
          people_ar.data = [];
          $.each(priceItem, function (index, obj) {
            var price = obj.price * 100;
            total += (price * priceQuantity[index]);
            if (priceQuantity[index] != 0) {
              people_ar.data.push({'peopleType': obj.type, 'id': obj.id, 'number': priceQuantity[index]});
            }
          });
          $('#rmb').html('￥' + total / 100);
        }

        /*立即购买*/
        $('#butNow').click(function () {
          if ($('#goDate').val() == '') {
            $('.prompt p').html('请选择出行时间！');
            $('.prompt').show();
            return;
          }
          else if ($('#rmb').html().slice('￥')[1] <= 0) {
            $('.prompt p').html('请选择出行人数！');
            $('.prompt').show();
            return;
          }
          else {
            /* console.log('ydd://goBuy?productType='+$('.tyBg').html()+'&startDate='+startDate+'&price='+$('#rmb').html()+'&jsonArr='+JSON.stringify(people_ar));*/
            window.location.href = 'ydd://visaBuy?productId=' + visa_id + '&productType=' + $('.tyBg').html() + '&startDate=' + $('#goDate').val() + '&price=' + $('#rmb').html() + '&title=' + $('.frameTitle h1').html() + '&jsonArr=' + JSON.stringify(people_ar);
          }
        });
      }
    });
  }

  /***************************点击事件**********************************/
  //遮罩层
  getDateTwo();
  $('.visaBuy').click(function () {
    $('body,html').animate({scrollTop: 0}, 600);
    setTimeout(function () {
      $('body,html').addClass('ovfHiden');
    }, 600);
    $('.visaMask').show();
    $('.visaFrameWrap').show();
    hh = $('.visaFrame').outerHeight() - $('.visaHidden').height();
    prevent();
  });

  function position() {
    if ($('.imgPink').find('em').hasClass('indentity_bj')) {
      $('.imgPink').find('em').css('background-image','url("images/materia11.png")')
    }
    else if ($('.imgPink').find('em').hasClass('indentity_empty')) {
      $('.imgPink').find('em').css('background-image','url("images/materia22.png")')
    }
    else if ($('.imgPink').find('em').hasClass('indentity_retire')) {
      $('.imgPink').find('em').css('background-image','url("images/materia55.png")')
    }
    else if ($('.imgPink').find('em').hasClass('indentity_work')) {
      $('.imgPink').find('em').css('background-image','url("images/materia44.png")')
    }
    else if ($('.imgPink').find('em').hasClass('indentity_free')) {
      $('.imgPink').find('em').css('background-image','url("images/materia66.png")')
    }
    else if ($('.imgPink').find('em').hasClass('indentity_student')) {
      $('.imgPink').find('em').css('background-image','url("images/materia33.png")')
    }
    else if ($('.imgPink').find('em').hasClass('indentity_child')) {
      $('.imgPink').find('em').css('background-image','url("images/materia77.png")')
    }
  }

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

});
//日历
function onjscall(x) {
  $('#goDate').val(x);
  console.log(x);
}
