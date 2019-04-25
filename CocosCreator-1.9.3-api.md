# Cocos Creactor 1.9.3 常用api
cc.sys
cc.game
cc.NodePool 节点对象池的构造函数
#### 加载或切换场景
```js
cc.director.loadScene('SceneName', callback) // 加载或切换场景
cc.director.preloadScene('SceneName', callback) // 预加载场景
cc.game.addPersistRootNode(myNode) // 增加常驻节点
cc.game.removePersistRootNode(myNode) // 删除常驻节点
```
#### 资源加载
```js
// 动态加载预制资源
cc.loader.loadRes("test assets/prefab", (err, prefab) => {
    var newNode = cc.instantiate(prefab);
    cc.director.getScene().addChild(newNode);
});
// 动态加载 SpriteFrame
cc.loader.loadRes("test assets/image", cc.SpriteFrame, (err, spriteFrame) => {
    this.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
});

cc.url.raw("resources/test assets/image.png") // 返回Raw Asset资源路径
// 加载 test assets 目录下所有资源
cc.loader.loadResDir("test assets", (err, assets) => {});
// 加载 sheep.plist 图集中的所有 SpriteFrame
cc.loader.loadResDir("test assets/sheep", cc.SpriteFrame, (err, assets) => {
    // assets 是一个 SpriteFrame 数组，已经包含了图集中的所有 SpriteFrame。
    // 而 loadRes('test assets/sheep', cc.SpriteAtlas, function (err, atlas) {...}) 获得的则是整个 SpriteAtlas 对象。
});
```
#### 资源释放
```js
// 在加载完资源之后，所有的资源都会临时被缓存到 cc.loader中，所有不需要的资源必须释放掉以减少内存占用
cc.loader.releaseRes("test assets/image", cc.SpriteFrame);
cc.loader.releaseRes("test assets/anim");
// 释放spriteFrame实例
cc.loader.releaseAsset(spriteFrame);
// 直接释放某个贴图
cc.loader.release(texture);
// 释放一个 prefab 以及所有它依赖的资源
var deps = cc.loader.getDependsRecursively('prefabs/sample');
cc.loader.release(deps);
// 如果在这个 prefab 中有一些和场景其他部分共享的资源，你不希望它们被释放，有两种方法：
// 1. 显式声明禁止某个资源的自动释放
cc.loader.setAutoRelease(texture2d, false);
// 2. 将这个资源从依赖列表中删除
var deps = cc.loader.getDependsRecursively('prefabs/sample');
var index = deps.indexOf(texture2d._uuid);
if (index !== -1)
    deps.splice(index, 1);
cc.loader.release(deps);
```
#### 加载远程资源和设备资源
```js
// 远程 url 带图片后缀名
var remoteUrl = "http://unknown.org/someres.png";
cc.loader.load(remoteUrl, (err, texture) => {
    // Use texture to create sprite frame
});

// 远程 url 不带图片后缀名，此时必须指定远程图片文件的类型
remoteUrl = "http://unknown.org/emoji?id=124982374";
cc.loader.load({url: remoteUrl, type: 'png'}, () => {
    // Use texture to create sprite frame
});

// 用绝对路径加载设备存储内的资源，比如相册
var absolutePath = "/dara/data/some/path/to/image.png"
cc.loader.load(absolutePath, () => {
    // Use texture to create sprite frame
});
```
#### 事件系统
- 节点系统事件
```js
this.node.on(type, callback, target)
// 示例
this.node.on(cc.Node.EventType.MOUSE_UP, this.startGeme, this); // 监听
this.node.off(cc.Node.EventType.MOUSE_UP, this.startGeme, this) // 取消监听
```
- 全局系统事件
```js
cc.systemEvent.on(type, callback, target)
// 可选的type类型有：
cc.SystemEvent.EventType.KEY_DOWN (键盘按下)
cc.SystemEvent.EventType.KEY_UP (键盘释放)
cc.SystemEvent.EventType.DEVICEMOTION (设备重力传感)
// 示例
cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyboard, this) // 监听
cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyboard, this) // 取消监听
```
#### 动作系统
- 基础动作
    - cc.moveTo(duration, x, y) // 移动到指定位置
    - cc.moveBy(duration, x, y) // 移动指定的距离
    - cc.rotateBy // 旋转节点
    - cc.scaleTo // 缩放节点
    - cc.callFunc // 调用回调函数
    - cc.hide    // 隐藏节点
    - cc.fadeOut(opt) // 淡出
example
```js
// 创建一个移动动作
var action = cc.moveTo(2, 100, 100)
// 执行动作
node.runAction(action)
// 停止一个动作
node.stopAction(action)
// 停止所有动作
node.stopAllActions()

通过tag动作
// 给 action 设置 tag
var ACTION_TAG = 1;
action.setTag(ACTION_TAG);
// 通过 tag 获取 action
node.getActionByTag(ACTION_TAG);
// 通过 tag 停止一个动作
node.stopActionByTag(ACTION_TAG);

var actionTo = cc.moveBy(2, cc.p(windowSize.width - 40, windowSize.height - 40));
```
- 容器动作(一般都支持链式调用)
    - cc.sequence 顺序动作，可以让一系列子动作按顺序一个个执行
    - cc.spawn 同步动作，可以同步执行对一系列子动作，子动作的执行结果会叠加起来修改节点的属性
    - cc.repeat 重复动作，用来多次重复一个动作
    - cc.repeatForever 永远重复动作
    - cc.speed 速度动作，可以改变目标动作的执行速率
example
```js
// 让节点左右来回移动
var seq = cc.sequence(cc.moveBy(0.5, 200, 0), cc.moveBy(0.5, -200, 0));
node.runAction(seq);
// 让节点在向上移动的同时缩放
var spawn = cc.spawn(cc.moveBy(0.5, 0, 50), cc.scaleTo(0.5, 0.8, 1.4));
node.runAction(spawn);
// 让节点左右来回移动，并重复5次
var seq = cc.repeat(
            cc.sequence(
                cc.moveBy(2, 200, 0),
                cc.moveBy(2, -200, 0)
            ), 5);
node.runAction(seq);
// 让节点左右来回移动并一直重复
var seq = cc.repeatForever(
            cc.sequence(
                cc.moveBy(2, 200, 0),
                cc.moveBy(2, -200, 0)
            ));
// 让目标动作速度加快一倍，相当于原本2秒的动作在1秒内完成
var action = cc.speed(
                cc.spawn(
                    cc.moveBy(2, 0, 50),
                    cc.scaleTo(2, 0.8, 1.4)
                ), 0.5);
node.runAction(action);
```
- 动作回调
    - cc.callFunc(callback, context, option)
示例
```js
// 一连串动作完成后会给玩家加100分
var finished = cc.callFunc(function(target, score) {
    this.score += score;
}, this, 100);
var myAction = cc.sequence(cc.moveBy(1, cc.p(0, 100)), cc.fadeOut(1), finished);
```
- 缓动动作
缓动动作不可以单独存在，它永远是为了修饰基础动作而存在的，它可以用来修改基础动作的时间曲线，让动作有快入、缓入、快出或其它更复杂的特效。需要注意的是，只有时间间隔动作才支持缓动：
```js
var action = cc.scaleTo(0.5, 2, 2);
action.easing(cc.easeIn(3.0));
```
#### 组件计时器
schedule：开始一个计时器
scheduleOnce：开始一个只执行一次的计时器
unschedule：取消一个计时器
unscheduleAllCallbacks：取消这个组件的所有计时器
```js
component.schedule(callback, interval, repeat, delay)
// 示例
// 以秒为单位的时间间隔
var interval = 5;
// 重复次数
var repeat = 3;
// 开始延时
var delay = 10;
component.schedule(function() {
    // 这里的 this 指向 component
    this.doSomething();
}, interval, repeat, delay);
```
- 只执行一次的计时器
```js
component.scheduleOnce(function() {
    // 这里的 this 指向 component
    this.doSomething();
}, 2);
```
- 利用回调函数本身取消计时器
```js
this.count = 0;
this.callback = function () {
    if (this.count === 5) {
        // 在第六次执行回调时取消这个计时器
        this.unschedule(this.callback);
    }
    this.doSomething();
    this.count++;
}
component.schedule(this.callback, 1);
```