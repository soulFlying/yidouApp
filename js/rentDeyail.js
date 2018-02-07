$(function () {
  function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)return unescape(r[2]);
    return null;
  }
  var osType = GetQueryString('osType')
  var platForm = GetQueryString('platForm')
  if (osType == 'ios' && platForm == 'yidou') {

      $('.back,.use').css('top','');
      $('.backBtn,.useBtn').css('top','');
      $('.advant .buyNow').css('bottom','');
      $('.useInfo').css('margin-top','18px')
  }
  else {
    $('.back,.use').css('top','8px');
    $('.backBtn,.useBtn').css('top','0.05rem');
    $('.useInfo').css('margin-top','')
  }

  $('.backBtn').on('click',function () {
    window.location.href = 'goback://';
  });
  $('.useBtn').on('click',function () {
    window.location.href = 'user_info.html?osType='+osType+'&platForm='+platForm;
  })
  $('.rentNow').on('click',function () {
    window.location.href = 'ydd://rentTranslator'
  });
})
