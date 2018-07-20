var yw = require("yw");
cc.Class({
    extends: cc.Component,


    properties: {

    },

    // use this for initialization
    onLoad: function () {
        cc.director.setDisplayStats(false);

        // //.初始化游戏
        // yw.init({
        //     debug: true,        //.是否开启调试
        //     app_name: "xiao_xiao_yu_tang",     //.游戏唯一标识
        //     version: "1.0.0",   //.游戏版本
        // })
        
        // //.初始化腾讯统计
        // yw.initmta({
        //     "appID": '500618042',
        //     "eventID":"500618044",
        // });
        
        //.请求测试
        // yw.Get(yw.ip1 + yw.common, { app_name: yw.app_name, version: yw.version }, function (data) {
        //     console.log(data)
        // });

        //.获取后台配置信息测试
        // yw.getConfig((d)=>{
        //     console.log(d)
        // })

        //.获取分享信息测试
        // yw.getShare((d)=>{
        //     console.log(d)
        // })
        
        //.获取广告信息
        // yw.getAdv((d)=>{
        //     console.log(d)
        // })


        yw.onMessage((d)=>{
            console.log(d)
        })


    },

    // called every frame
    update: function (dt) {

    },

    

});
