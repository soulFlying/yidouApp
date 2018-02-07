browserRedirect();
function browserRedirect() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        var href = window.location.href;
        var hrefStr = String(href);
        var formIndex = hrefStr.indexOf("from");
        if(formIndex >= 0){
            $('footer').hide();
            $('#shareDetail').show();
        }
        else {
            $('footer').show();
            $('#shareDetail').hide();
        }
    }
}

    $('#shareDetail').on('click',function () {
        openApp();
    })
function openApp(){
    if(navigator.userAgent.match(/(iPhone|iPod|iPad);?/i) || navigator.userAgent.indexOf('iPhone') > -1){
        $('#shareDetail').css('color','#000');
         window.location.href ='https://itunes.apple.com/us/app/%E7%9A%AE%E7%9A%AE%E8%99%BE%E6%97%85%E8%A1%8C-%E6%9C%80%E6%9C%89%E8%B6%A3%E7%9A%84%E5%9B%A2%E8%B4%AD%E5%AE%9A%E5%88%B6%E5%A2%83%E5%A4%96%E6%B8%B8/id1230351020?mt=8';

   }else if(navigator.userAgent.match(/android/i)){
      $('#shareDetail').css('color','red');
        window.location.href = 'http://sj.qq.com/myapp/detail.htm?apkName=com.easyto.ppx.easytoppx';
    }
};
