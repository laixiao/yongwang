
var md5 = require("md5");
var mta = require("mta");
var yw = { 
    md5: md5,
    mta: mta,
    ip1: "https://game.zuiqiangyingyu.net",
    ip2: "https://api.zuiqiangyingyu.net",
    debug: false,                            //是否开启调试
    app_name: "",
    version: "",

    common: "/common/config/info",
    gameshare_list: "/common/game/share_list",
    gameads: "/common/game/ads",
    config: {"share":1,"shop":1,"gift":1},
    share_list: [],
    gameadsInfo: [],

    /**
     * @apiGroup Get Start
     * @apiName init
     * @api {初始化sdk} 使用勇往sdk前，必须先初始化一次才能使用 init（初始化sdk）
     *
     * @apiParam {Boolean} [debug=false] 是否开启调试
     * @apiParam {String} app_name 游戏标识
     * @apiParam {String} version 版本
     * 
     * @apiSuccessExample {json} 示例:
     * yw.init({
     *     debug: true,        //.是否开启调试
     *     app_name: "yt",     //.游戏唯一标识
     *     version: "1.0.0",   //.游戏版本
     * })
     */
    init(args){
        if(args.debug){
            this.debug = args.debug;
        }
        if(args.app_name){
            this.app_name = args.app_name;
        }
        if(args.version){
            this.version = args.version;
        }
        if(args.mta_appid){
            this.mta_appid = args.mta_appid;
        }

        if(this.debug){
            console.log("勇往sdk初始化参数：", args)
        }
        this.checkUpdate();

    },
    /**
     * @apiGroup yw
     * @apiName Get
     * @api {Get} 发起网络请求 Get
     * 
     * @apiParam {String} url 请求地址
     * @apiParam {Object} reqData 请求参数
     * @apiParam {Object} callback 不存在返回null
     * @apiSuccessExample {json} 示例:
     * yw.Get("https://xxx.xxx", { user_id: user_id }, function (d) {
     *     console.log(d)
     * });
     */
    Get(url, reqData, callback) {
        var self = this;
        url += "?";
        for (var item in reqData) {
            url += item + "=" + reqData[item] + "&";
        }
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 400) {
                    var response = xhr.responseText;
                    if (response) {
                        var responseJson = JSON.parse(response);
                        callback(responseJson);
                    } else {
                        if(self.debug){
                            console.log("返回数据不存在",url)
                        }
                        callback(null);
                    }
                } else {
                    if(self.debug){
                        console.log("请求失败",url)
                    }
                    callback(null);
                }
            }
        };
        xhr.open("GET", url, true);
        xhr.send();
    },
    /**
     * @apiGroup yw
     * @apiName Post
     * @api {Post} 发起网络请求 Post
     * 
     * @apiParam {String} url 请求地址
     * @apiParam {Object} reqData 请求参数
     * @apiParam {Object} callback 不存在返回null
     * @apiSuccessExample {json} 示例:
     * yw.Post(yw.ip1 + yw.common, { user_id: user_id }, function (d) {
     *     console.log(d)
     * });
     */
    Post: function (url, reqData, callback) {
        var self = this;
        //1.拼接请求参数
        var param = "";
        for (var item in reqData) {
            param += item + "=" + reqData[item] + "&";
        }
        //2.发起请求
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 400) {
                    var response = xhr.responseText;
                    // console.log(response)
                    if (response) {
                        var responseJson = JSON.parse(response);
                        callback(responseJson);
                    } else {
                        if(self.debug){
                            console.log("返回数据不存在")
                        }
                        callback(null);
                    }
                } else {
                    if(self.debug){
                        console.log("请求失败",xhr)
                    }
                    callback(null);
                }
            }
        };
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(param);//reqData为字符串形式： "key=value"
    },
    /**
     * @apiGroup yw
     * @apiName checkUpdate
     * @api {检测版本更新} 微信小游戏 checkUpdate（版本更新）
     * 
     * @apiSuccessExample {json} 示例:
     * yw.checkUpdate();
     */
    checkUpdate() {
        if (cc.sys.platform === cc.sys.WECHAT_GAME && typeof wx.getUpdateManager === 'function') {
            const updateManager = wx.getUpdateManager()
            updateManager.onCheckForUpdate(function (res) {
                if(self.debug){
                    console.log("请求完新版本信息的回调", res.hasUpdate)
                }
            })
            updateManager.onUpdateReady(function () {
                if(self.debug){
                    console.log("新的版本已经下载好，调用 applyUpdate 应用新版本并重启")
                }
                updateManager.applyUpdate()
            })
            updateManager.onUpdateFailed(function () {
                if(self.debug){
                    console.log("新的版本下载失败")
                }
            })
        }
    },
    /**
     * @apiGroup yw
     * @apiName getConfig
     * @api {游戏配置信息} 游戏配置信息 getConfig（获取配置）
     * @apiParam {Object} callback 不存在返回null
     * 
     * @apiSuccessExample {json} 示例:
     * yw.getConfig(function (data) {
     *     console.log(data)
     * });
     */
    getConfig(callback){
        var self = this;
        this.Get(this.ip1 + this.common, { app_name: this.app_name, version: this.version }, function (d) {
            if (d && d.code == 0) {
                callback(d.data);
            }else{
                if(self.debug){
                    console.log("操作失败",d)
                }
                callback(null);
            }
        });
    },
    /**
     * @apiGroup yw
     * @apiName getShare
     * @api {游戏分享信息} 游戏分享信息 getShare（获取分享）
     * @apiParam {Object} callback 不存在返回null
     * 
     * @apiSuccessExample {json} 示例:
     * yw.getShare(function (data) {
     *     console.log(data)
     * });
     */
    getShare(callback){
        this.Get(this.ip1 + this.gameshare_list, { app_name: this.app_name }, function (d) {
            if (d && d.code == 0) {
                callback(d.data.list);
            } else {
                if(self.debug){
                    console.log("操作失败",d)
                }
                callback(null);
            }
        });
    },
    /**
     * @apiGroup yw
     * @apiName getAdv
     * @api {游戏广告信息} 游戏广告信息 getAdv（获取广告）
     * @apiParam {Object} callback 不存在返回null
     * 
     * @apiSuccessExample {json} 示例:
     * yw.getAdv(function (data) {
     *     console.log(data)
     * });
     */
    getAdv(callback){
        this.Get(this.ip1 + this.gameads, { app_name: this.app_name }, function (d) {
            if (d && d.code == 0) {
                callback(d.data.list);
            }else{
                if(self.debug){
                    console.log("操作失败",d)
                }
                callback(null);
            }
        });
    },
    /**
     * @apiGroup yw
     * @apiName getShareByWeight
     * @api {根据权重获取分享语句} 根据权重获取分享语句 getShareByWeight
     * @apiParam {Array} share_list 分享数组
     * @apiParam {int} type 1 => '发起挑战', 2 => '群分享续命', 3 => '普通分享', 4 => '分享得金币'
     * 
     * @apiSuccessExample {json} 示例:
     * var data = yw.getShareByWeight(share_list, type);
     */
    getShareByWeight(share_list, type) {
        var info = {};
        var tArray = [];
        var tCount = 0;
        var tRandom = Math.random() * tCount;
        for (var i = 0; i < share_list.length; i++) {
            if (type == share_list[i].position) {
                share_list[i].weight = parseInt(share_list[i].weight);
                tArray.push(share_list[i]);
            }
        }
        var iArray = [];
        for (var i = 0; i < tArray.length; i++) {
            for (var j = 0; j < tArray[i].weight; j++) {
                iArray.push(i);
            }
        }
        var rI = iArray[parseInt(Math.random() * iArray.length)];
        if(tArray[rI]){
            info.title = tArray[rI].title;
            info.imageUrl = tArray[rI].image;
        }else{
            info.title = "小小鱼塘";
            info.imageUrl = "";
        }
        //.正则替换昵称
        if(info.title.indexOf("&nick") != -1){
            info.title = info.title.replace(/&nick/g, this.getUser().nickname);
        }
        return info;
    },
    /**
     * @apiGroup yw
     * @apiName getAdvByWeight
     * @api {根据权重获取分享语句} 根据权重获取分享语句 getAdvByWeight
     * @apiParam {Array} share_list 广告数组
     * 
     * @apiSuccessExample {json} 示例:
     * var data = yw.getAdvByWeight(advs);
     */
    getAdvByWeight(advs) {
        var tArray = [];
        var tCount = 0;
        var tRandom = Math.random() * tCount;
        for (var i = 0; i < advs.length; i++) {
            advs[i].weight = parseInt(advs[i].weight);
            tArray.push(advs[i]);
        }
        //.随机数组
        var iArray = [];
        for (var i = 0; i < tArray.length; i++) {
            for (var j = 0; j < tArray[i].weight; j++) {
                iArray.push(i);
            }
        }
        var rI = iArray[parseInt(Math.random() * iArray.length)];
        return tArray[rI];
    },
    /**
     * @apiGroup yw
     * @apiName createImage
     * @api {微信小游戏跨域加载图片} 微信小游戏跨域加载图片 createImage（显示图片）
     * @apiParam {cc.Sprite} sprite 显示图片的Sprite
     * @apiParam {String} url 需要加载的图片地址
     * 
     * @apiSuccessExample {json} 示例:
     * var data = yw.createImage(advs);
     */
    createImage(sprite, url) {
        let image = wx.createImage();
        image.onload = function () {
            let texture = new cc.Texture2D();
            texture.initWithElement(image);
            texture.handleLoadedTexture();
            sprite.spriteFrame = new cc.SpriteFrame(texture);
        };
        image.src = url;
    },
    /**
     * @apiGroup Get Start
     * @apiName initmta
     * @api {初始化腾讯统计sdk} 参考链接http://mta.qq.com/wechat_mini/manage/ctr_sdk_help?app_id=500625714 initmta（初始化统计）
     * @apiParam {Object} args 参数
     * 
     * @apiSuccessExample {json} 示例:
     * //.简单
     * mta.App.init({
     *     "appID":"500618042",
     *     "eventID":"500618044"
     * });
     * //.高级
     * mta.App.init({
     *     "appID":"500618042",
     *     "eventID":"500618044", // 高级功能-自定义事件统计ID，配置开通后在初始化处填写
     *     "lauchOpts":options, //渠道分析,需在onLaunch方法传入options,如onLaunch:function(options){...}
     *     "statPullDownFresh":true, // 使用分析-下拉刷新次数/人数，必须先开通自定义事件，并配置了合法的eventID
     *     "statShareApp":true, // 使用分析-分享次数/人数，必须先开通自定义事件，并配置了合法的eventID
     *     "statReachBottom":true // 使用分析-页面触底次数/人数，必须先开通自定义事件，并配置了合法的eventID
     * });
     */
    initmta(args){
        mta.App.init(args);
        // 功能组件
        // App id: 500625714
        // App Secret key: 9b0fd6393ca10f5eebe0d1c659a460ab
    },
    /**
     * @apiGroup Get Start
     * @apiName setmta
     * @api {统计埋点} 统计埋点 setmta（统计埋点）
     * @apiParam {String} name 腾讯后台查询
     * @apiParam {String} value 腾讯后台查询
     * 
     * @apiSuccessExample {json} 示例:
     * yw.setmta("click","p003")
     */
    setmta(name, value){
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            mta.Event.stat(name, { value: 'true' })
        }
    },
    /**
     * @apiGroup yw
     * @apiName setItem
     * @api {set} 数据存储 setItem（存）
     * @apiParam {String} key 键
     * @apiParam {String} value 值
     * 
     * @apiSuccessExample {json} 示例:
     * yw.setItem("nick","hello")
     */
    setItem(key, value){
        cc.sys.localStorage.setItem(this.app_name + key, value);
    },
    /**
     * @apiGroup yw
     * @apiName getItem
     * @api {get} 数据存储 getItem（取）
     * @apiParam {String} key 键
     * @apiParam {String} value 值
     * 
     * @apiSuccessExample {json} 示例:
     * var nick = yw.getItem("nick")
     */
    getItem(key){
        return cc.sys.localStorage.getItem(this.app_name + key);
    },
    /**
     * @apiGroup yw
     * @apiName onMessage
     * @api {主域监听子域发送的消息} 主域监听子域发送的消息 onMessage（监听消息）
     * @apiParam {callback} callback 回调函数
     * 
     * @apiSuccessExample {json} 示例:
     * yw.onMessage((d)=>{
     *     console.log(d)
     * })
     */
    onMessage(callback){
        wx.onMessage(function(d){
            // if(d.message == "common_back"){//.子域: 返回双双大厅
            //     cc.director.loadScene("common_children")
            // }
            d.message = d.message.replace(this.app_name, "");
            callback(d)
        });
    },
    /**
     * @apiGroup yw
     * @apiName postMessage
     * @api {主域向子域发送消息} 主域向子域发送消息 postMessage（发送消息）
     * @apiParam {String} msg 发送给子域的消息
     * 
     * @apiSuccessExample {json} 示例:
     * yw.postMessage("hello")
     */
    postMessage(msg){
        wx.postMessage({ message: this.app_name + msg });
    },

    /**
     * @apiGroup yw
     * @apiName sortList
     * @api {对子域数据进行排序} 对子域数据进行排序 sortList（子域排序）
     * @apiParam {String} ListData 要排序的微信子域数据
     * @apiParam {String} field 排序字段
     * @apiParam {String} order 正序：true  ； 倒序：false
     * 
     * @apiSuccessExample {json} 示例:
     * wx.getFriendCloudStorage({
     *       keyList: ["yw_score"],
     *       success(res){
     *           var ListData = yw.sortList(res.data, 'yw_score', true));
     *       },
     *       fail(){
     *           console.log(res)
     *       }
     *})
     */
    sortList(ListData, field, order){
        ListData.sort(function(a,b){
            var AMaxScore = 0;
            var KVDataList = a.KVDataList;
            for(var i=0; i<KVDataList.length; i++){
                if(KVDataList[i].key == field){
                    AMaxScore = KVDataList[i].value;
                }
            }

            var BMaxScore = 0;
            KVDataList = b.KVDataList;
            for(var i=0; i<KVDataList.length; i++){
                if(KVDataList[i].key == field){
                    BMaxScore = KVDataList[i].value;
                }
            }

            if(order){
                return parseInt(AMaxScore) - parseInt(BMaxScore);
            }else{
                return parseInt(BMaxScore) - parseInt(AMaxScore);
            }
        });
        return ListData;
    },
    /**
     * @apiGroup yw
     * @apiName getMyRank3
     * @api {排名与我相邻的3位玩家信息} 排名与我相邻的3位玩家信息 getMyRank3（Top3）
     * @apiParam {String} ListData 要排序的微信子域数据
     * @apiParam {String} me 我的子域信息
     * 
     * @apiSuccessExample {json} 示例:
     * wx.getUserInfo({
     *       openIdList: ['selfOpenId'],
     *       lang: 'zh_CN',
     *       success(res){
     *          //.Top3
     *          var dList = yw.getMyRank3(dataList,res.data[0]);
     *          console.log(dList)
     *       },
     *       fail(error) {
     *          console.log(error)
     *       }
     * })
     * 
     * 
     */
    getMyRank3(ListData,me){
        var dataList = [];
        for(var i=0; i<ListData.length; i++){
            if(ListData.length <= 3){
                //.只有3个人或以下
                if(ListData[i].avatarUrl == me.avatarUrl && ListData[i].nickname == me.nickName){
                    ListData[i].isSelf = true;//.标记自己
                }
                dataList = ListData;
                for(var i=0; i<dataList.length; i++){
                    dataList[i].rank = i;
                }                 
            }else{
                if(ListData[i].avatarUrl == me.avatarUrl && ListData[i].nickname == me.nickName){
                    ListData[i].isSelf = true;//.标记自己
                    if(i == ListData.length-1){
                        //.自己分数最低
                        ListData[i].rank = i;
                        ListData[i-1].rank = i-1;
                        ListData[i-2].rank = i-2;
                        dataList.push(ListData[i-2])
                        dataList.push(ListData[i-1])
                        dataList.push(ListData[i])
                    }else if(i==0){
                        //.自己分数最高
                        ListData[i].rank = i;
                        ListData[i+1].rank = i+1;
                        ListData[i+2].rank = i+2;
                        dataList.push(ListData[i])
                        dataList.push(ListData[i+1])
                        dataList.push(ListData[i+2])
                    }else{
                        //.居中
                        ListData[i-1].rank = i-1;
                        ListData[i].rank = i;
                        ListData[i+1].rank = i+1;
                        dataList.push(ListData[i-1])
                        dataList.push(ListData[i])
                        dataList.push(ListData[i+1])
                    }
                    break;        
                }
            }
               
        }
        return dataList;
    }




};
module.exports = yw;


