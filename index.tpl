<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta content="black" name="apple-mobile-web-app-status-bar-style">
    <title>侦码管家</title>
    <script src="http://cdn.bootcss.com/jquery/1.12.2/jquery.min.js" charset="utf-8"></script>
    <!-- <script src="http://shinedata.chinaeid.cn/gw-img/cdfpds.client.js" charset="utf-8"></script> -->
    <!-- <script src="/cdfpds.client.js" charset="utf-8"></script> -->
  </head>
  <body>
    <div id="app"></div>
    <!--MOB SHARE BEGIN-->
    <div class="-mob-share-open"><span class="sr-only">分享</span></div>
    <div class="-mob-share-ui -mob-share-ui-theme -mob-share-ui-theme-slide-bottom" style="display: none">
        <ul class="-mob-share-list">
          <div class="row">
            <li class="-mob-share-weibo"><p>新浪微博</p></li>
            <li class="-mob-share-qzone"><p>QQ空间</p></li>
            <li class="-mob-share-qq"><p>QQ好友</p></li>
            <li class="-mob-share-weixin"><p>微信</p></li>
          </div>
          <div class="row">
            <li class="-mob-share-tencentweibo"><p>腾讯微博</p></li>
            <li class="-mob-share-douban"><p>豆瓣</p></li>
            <li class="-mob-share-renren"><p>人人网</p></li>
            <li class="-mob-share-youdao"><p>有道云笔记</p></li>
          </div>
        </ul>
    </div>
    <div class="-mob-share-ui-bg"></div>
    <!--MOB SHARE END-->
  </body>
  <style media="screen">
    /*shareSDK*/
    .sr-only{position: absolute;width: 1px;height: 1px;padding: 0;margin: -1px;overflow: hidden;clip: rect(0,0,0,0);border: 0;visibility: hidden;display: none;}
    .-mob-share-open{display: none;position: absolute;top:0;right:0;text-align: center;width: 0;height: 0;z-index: 9;}
    .-mob-share-open.show{display: block;width: 50px;height: 40px;line-height: 40px;}
    .-mob-share-ui ul.-mob-share-list .row{display: flex;justify-content: space-around;margin-bottom: 5px;}
    .-mob-share-ui ul.-mob-share-list li{height: 50px;width: 50px;}
  </style>
  <script id="-mob-share"
  src="http://f1.webshare.mob.com/code/mob-share.js?appkey=19ba70e55af40"></script>
</html>
