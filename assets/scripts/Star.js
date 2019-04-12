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
    // 星星和主角之间的距离小于这个数值时，就会完成收集
    pickRadius: 0
  },
  getPlayerDistance() {
    // 根据player节点位置判断距离
    let playerPos = this.game.player.getPosition()
    // 根据两点位置计算两点之间距离
    let dist = this.node.position.sub(playerPos).mag()
    return dist
  },
  onPicked() {
    // 当星星被收集时，调用Game脚本中的接口，生成一个新的星星
    this.game.spawnNewStar()
    // 然后销毁当前星星节点
    this.node.destroy()
  },
  update(dt) {
    // 毎帧判断和主角之间的距离是否小于收集距离
    if (this.getPlayerDistance() < this.pickRadius) {
      // 调用收集行为
      this.onPicked()
    }
  }
});
