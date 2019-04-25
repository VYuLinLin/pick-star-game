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
  onLoad () {
    cc.sys.isMobile
      ? this.node.on(cc.Node.EventType.TOUCH_END, this.startGeme, this)
      : this.node.on(cc.Node.EventType.MOUSE_UP, this.startGeme, this)
    ;
  },
  onDestroy() {
    cc.sys.isMobile
      ? this.node.off(cc.Node.EventType.TOUCH_END, this.startGeme, this)
      : this.node.off(cc.Node.EventType.MOUSE_UP, this.startGeme, this)
  },
  startGeme(e) {
    this._startStatus = true
    this.game.startGeme()
    this.node.destroy()
  }
});
