$(function () {
  var ua = navigator.userAgent.toLowerCase();
  var yidou = GetQueryString('platForm')
  if (!yidou || ua.match(/MicroMessenger/i)=="micromessenger"){
    $('#hideFooter').hide();
    $('#shareDetail').show();
    $('#hideHeader').hide();
    $('#renderTop').css('margin-top','0');
    $('#renderTop2').css('margin-top','0.2rem')
    $('#paddingTop').css('padding','0')
    $('.back,.share,.backBtn,.shareBtn,.title').hide();
  }
});

function route(i,p,t) {
  window.location.href = 'ydd://share?url=http://demo.easyto.com/page/app/'+i+'&pic='+p+'&title='+t;
  return window.location.href
}
function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null)return unescape(r[2]);
  return null;
}

$('#shareDetail').on('click',function () {
  openApp();
})
function openApp(){
  if(navigator.userAgent.match(/(iPhone|iPod|iPad);?/i) || navigator.userAgent.indexOf('iPhone') > -1){
    window.location.href ='http://itunes.apple.com/cn/app//id1284379229?mt=8';

  }else if(navigator.userAgent.match(/android/i)){
    window.location.href = 'http://sj.qq.com/myapp/detail.htm?apkName=com.easyto.ppx.easytoppx';
  }
};

