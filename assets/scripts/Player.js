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
    jumpHeight: 0, // 主角跳跃高度
    jumpDuration: 0, // 主角跳跃持续时间
    maxMoveSpeed: 0, // 最大移动速度
    accel: 0, // 加速度
    accLeft: false, // 是否左边加速
    accRight: false, // 是否右边加速
    xSpeed: 0 // 横向加速度值
  },

  setJumpAction() {
    // 跳跃上升
    let jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut())
    // 下落
    let jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionOut())
    // 不断重复
    return cc.repeatForever(cc.sequence(jumpUp, jumpDown))
  },

  onKeyDown(event) {
    console.log(cc.macro.KEY)
    switch (event.keyCode) {
      case cc.macro.KEY.a:
      case cc.macro.KEY.left:
        this.accLeft = true
        break
      case cc.macro.KEY.d:
      case cc.macro.KEY.right:
        this.accRight = true
        break
    }
  },

  onKeyUp(event) {
    switch(event.keyCode) {
      case cc.macro.KEY.a:
      case cc.macro.KEY.left:
        this.accLeft = false
        break
        case cc.macro.KEY.d:
        case cc.macro.KEY.right:
        this.accRight = false
        break
    }
  },
  // LIFE-CYCLE CALLBACKS: 生命周期回调函数
  onLoad () {
    // 初始化跳跃动作
    this.node.runAction(this.setJumpAction())
    // 加速度方向开关
    this.accLeft = false
    this.accRight = false

    // 初始化键盘输入监听
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this)
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this)
  },

  onDestroy() {
    // 取消键盘输入监听
    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this)
    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this)
  },

  update(dt) {
    // 根据当前加速度方向毎帧更新速度
    if (this.accLeft) {
      this.xSpeed -= this.accel * dt
    } else if (this.accRight) {
      this.xSpeed += this.accel * dt
    }
    // 限制主角的速度不能超过最大值
    if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
      // 如果速度达到极限，使用最大速度与电流方向
      this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed)
    }
    // 根据当前速度更新主角的位置
    this.node.x += this.xSpeed * dt
  }
});
