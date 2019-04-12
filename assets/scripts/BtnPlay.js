// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
  extends: cc.Component,

  properties: {
    showBtn: true
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad () {
    cc.systemEvent.on(cc.Event.MOUSE, this.start, this)
  },
  onDestroy() {
    cc.systemEvent.off(cc.Event.MOUSE, this.start, this)
  },
  start() {
    // this.game.player.initJump()
    // console.log(this.game)
  },

  // update (dt) {},
});
