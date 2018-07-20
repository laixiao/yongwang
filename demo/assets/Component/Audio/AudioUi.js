// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },   
        key: "xx_audio",            //key 遵守规范加前缀
        audioSprite: cc.Sprite,
        onSprite: cc.SpriteFrame,
        offSprite: cc.SpriteFrame,

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        //.key,遵守规范加前缀
        this.initAudio();

    },

    // update (dt) {},

    initAudio(){
        var status = cc.sys.localStorage.getItem(this.key);
        if(status){
            if(status == "on"){
                this.audioSprite.spriteFrame = this.onSprite;
            }else{
                this.audioSprite.spriteFrame = this.offSprite;
            }
        }else{
            this.audioSprite.spriteFrame = this.onSprite;
        }
    },
    //.音乐开关
    switchAudio(){
        var status = cc.sys.localStorage.getItem(this.key);
        if(status){
            if(status == "on"){
                cc.sys.localStorage.setItem(this.key, "off");
                this.audioSprite.spriteFrame = this.offSprite;
            }else{
                cc.sys.localStorage.setItem(this.key, "on");
                this.audioSprite.spriteFrame = this.onSprite;
            }
        }else{
            cc.sys.localStorage.setItem(this.key, "off");
            this.audioSprite.spriteFrame = this.offSprite;
        }
        cc.game.emit("switchAudio");
    },

});
