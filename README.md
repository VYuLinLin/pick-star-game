# pick-star-game
一个摘星星的小游戏，基于Cocos Creator 2.0.9版本, 兼容1.9.3版本。
目前只支持PC端，项目[预览地址](https://vyulinlin.github.io/pick-star-game/build/web-mobile/index.html)

# Cocos Creator note 2.0
##### 1. Cocos Creator 是游戏引擎吗？
Cocos Creator 是一个完整的游戏开发解决方案，包括了 cocos2d-x 引擎的 JavaScript 实现（不需要学习一个新的引擎），以及能让你更快速开发游戏所需要的各种图形界面工具
##### 2. 我使用 Cocos Creator 能开发面向哪些平台的游戏？
Cocos Creator 目前支持发布游戏到 Web、iOS、Android、各类"小游戏"、PC 客户端等平台，真正实现一次开发，全平台运行。
##### 3. 下载安装地址
[Cocos Creator 产品首页](https://www.cocos.com/creator)
##### 4. 项目结构
    ProjectName（项目文件夹）
    ├──assets
    ├──library
    ├──local
    ├──settings
    ├──temp
    └──project.json
- 资源文件夹（assets）
    assets 将会用来放置您游戏中所有本地资源、脚本和第三方库文件。只有在 assets 目录下的内容才能显示在 资源管理器 中。assets 中的每个文件在导入项目后都会生成一个相同名字的 .meta 文件，用于存储该文件作为资源导入后的信息和与其他资源的关联。一些第三方工具生成的工程或设计原文件，如 TexturePacker 的 .tps 文件，或 Photoshop 的 .psd 文件，可以选择放在 assets 外面来管理。
- 资源库（library）
    library 是将 assets 中的资源导入后生成的，在这里文件的结构和资源的格式将被处理成最终游戏发布时需要的形式。如果您使用版本控制系统管理您的项目，这个文件夹是不需要进入版本控制的。

    当 library 丢失或损坏的时候，只要删除整个 library 文件夹再打开项目，就会重新生成资源库。
- 本地设置（local）
    local 文件夹中包含该项目的本地设置，包括编辑器面板布局，窗口大小，位置等信息。您不需要关心这里的内容，只要按照您的习惯设置编辑器布局，这些就会自动保存在这个文件夹。一般 local 也不需要进入版本控制。
- 项目设置（settings）
    settings 里保存项目相关的设置，如 构建发布 菜单里的包名、场景和平台选择等。这些设置需要和项目一起进行版本控制。
- project.json
    project.json 文件和 assets 文件夹一起，作为验证 Cocos Creator 项目合法性的标志。只有包括了这两个内容的文件夹才能作为 Cocos Creator 项目打开。而 project.json 本身目前只用来规定当前使用的引擎类型和插件存储位置，不需要用户关心其内容。

    这个文件也应该纳入版本控制。

##### 5. 编辑器界面介绍
- 资源管理器
- 层级管理器
- 场景编辑器
- 动画编辑器
- 属性检查器
- 控件库
- 控制台
- 设置
- 项目设置
- 主菜单
- 工具栏

##### 6. 推荐使用VS Code作为代码编辑器
并在settings.json文件里面添加如下代码：
```
"search.exclude": {
    "**/node_modules": true,
    "**/bower_components": true,
    "build/": true,
    "temp/": true,
    "library/": true,
    "**/*.anim": true
},
"files.exclude": {
    "**/.git": true,
    "**/.DS_Store": true,
    "**/*.meta": true,
    "library/": true,
    "local/": true,
    "temp/": true
}
```
目的是[设置文件显示和过滤](https://docs.cocos.com/creator/manual/zh/getting-started/coding-setup.html#%E8%AE%BE%E7%BD%AE%E6%96%87%E4%BB%B6%E6%98%BE%E7%A4%BA%E5%92%8C%E6%90%9C%E7%B4%A2%E8%BF%87%E6%BB%A4)

##### 7. 字体资源
包括三种：系统字体、位图字体、动态字体（TrueTypeFont）

##### 8. 关于声音的加载模式
- WebAudio方式加载
    此种方式在引擎内是以一个buffer的形式缓存的，优点是兼容性好，问题比较少。缺点是占用的内存资源过多。
- DOM Audio方式加载
    通过生成一个标准的audio元素播放资源，在某些浏览器上可能遇到一些限制，比如只允许播放一个声音资源。

##### 9. 开发注意事项
- Cocos Creator 中脚本名称就是组件的名称，这个命名是大小写敏感的！如果组件名称的大小写不正确，将无法正确通过名称使用组件！
- 一个节点上只能添加一个渲染组件，渲染组件包括 Sprite（精灵）， Label（文字），Particle（粒子）等
- Cocos Creator 的坐标系和 cocos2d-x 引擎坐标系完全一致，而 cocos2d-x 和 OpenGL 坐标系相同，都是起源于笛卡尔坐标系。
- 笛卡尔坐标系中定义右手系原点在左下角，x 向右，y 向上，z 向外，我们使用的坐标系就是笛卡尔右手系。

##### 10. 敏捷开发
- 层级管理器 里选中一个节点，然后按 Cmd/Ctrl + F 就可以在 场景编辑器 里聚焦这个节点。
- 选中一个节点后按 Cmd/Ctrl + D 会在该节点相同位置复制一个同样的节点，当我们需要快速制作多个类似节点时可以用这个命令提高效率。
- 在 场景编辑器 里要选中多个节点，可以按住 Cmd/Ctrl 键依次点击你想要选中的节点，在 层级管理器 里也是一样的操作方式。