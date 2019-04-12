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
    // 引用预制资源星星
    starPrefab: {
      default: null,
      type: cc.Prefab
    },
    // 星星产生后消失时间的随机范围
    maxStarDuration: 0,
    minStarDuration: 0,
    // 地面节点，用于确定星星生成的高度
    ground: {
      default: null,
      type: cc.Node
    },
    // Player 节点，用于获取主角跳跃的高度，和控制主角行动开关
    player: {
      default: null,
      type: cc.Node
    },
    // score label 的引用
    scoreDisplay: {
      default: null,
      type: cc.Label
    }
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad () {
    // 获取地平面的 y 轴坐标
    this.groundY = this.ground.y + this.ground.height / 2
    // 初始化计时器
    this.timer = 0
    this.starDuration = 0
    // 生成一个新的星星
    this.spawnNewStar()
    // 初始化积分
    this.score = 0
  },
  update(dt) {
    // 毎帧更新计时器，超过限度还没有生成新的星星就会调用游戏失败逻辑
    if (this.timer > this.starDuration) {
      this.gameOver()
    } else {
      this.timer += dt
    }
  },
  spawnNewStar() {
    // 使用给定的模板在场景中生成一个新节点
    let newStar = cc.instantiate(this.starPrefab)
    // 讲新增的节点添加到Canvas节点下面
    this.node.addChild(newStar)
    // 为星星设置一个随机位置
    newStar.setPosition(this.getNewStarPosition())
    // 在星星组件上暂存Game对象的引用
    newStar.getComponent('Star').game = this
    // 重置计时器，根据消失时间范围随机取一个值
    this.starDuration = this.minStarDuration + Math.random() * (this.maxStarDuration - this.minStarDuration)
    this.timer = 0
  },
  getNewStarPosition() {
    // 根据屏幕宽度，随机生成星星的x坐标
    const randX = (Math.random() - .5) * 2 * this.node.width / 2
    // 根据地平面位置和主角跳跃高度，随机生成星星的y轴坐标
    const randY = this.groundY + Math.random() * this.player.getComponent('Player').jumpHeight + 50
    // 返回星星坐标
    return cc.v2(randX, randY)
  },
  gainScore() {
    // 更新scoreDisplay Label 的文字
    this.scoreDisplay.string = `Score: ${++this.score}`
  },
  gameOver() {
    this.player.stopAllActions() // 停止 player 节点的跳跃动作
    cc.director.loadScene('game')
  }
});
