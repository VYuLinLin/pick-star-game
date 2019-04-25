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
    xSpeed: 0, // 横向加速度值
    // 跳跃音效资源
    jumpAudio: {
      default: null,
      url: cc.AudioClip
    }
  },

  setJumpAction() {
    // 跳跃上升
    const jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut())
    // 下落
    const jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionOut())
    // 添加回调函数，用于在动作结束时调用我们定义的其他方法
    const callback = cc.callFunc(this.playJumpSound, this)
    // 不断重复,而且每次完成落地动作后调用回调来播放声音
    return cc.repeatForever(cc.sequence(jumpUp, jumpDown, callback))
  },

  playJumpSound() {
    // 调用声音引擎播放声音
    cc.audioEngine.playEffect(this.jumpAudio, false)
  },

  onKeyboard(event, b = true) {
    const code = event.keyCode
    const left = [cc.KEY.a, cc.KEY.left, cc.macro.KEY && cc.macro.KEY.a, cc.macro.KEY && cc.macro.KEY.left]
    const right = [cc.KEY.d, cc.KEY.right, cc.macro.KEY && cc.macro.KEY.d, cc.macro.KEY && cc.macro.KEY.right]
    left.filter(a => a).includes(code) && (this.accLeft = b)
    right.filter(a => a).includes(code) && (this.accRight = b)
  },

  onKeyUp(e) {
    this.onKeyboard(e, false)
  },
  // LIFE-CYCLE CALLBACKS: 生命周期回调函数
  startGame() {
    // 初始化跳跃动作
    this.node.runAction(this.setJumpAction())
    // 加速度方向开关
    this.accLeft = false
    this.accRight = false
    // 初始化键盘输入监听
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyboard, this)
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this)
  },

  onDestroy() {
    // 取消键盘输入监听
    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyboard, this)
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
