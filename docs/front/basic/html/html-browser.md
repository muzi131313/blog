---
title: 2. 浏览器
---

## 浏览器
### 主流浏览器内核
- 类型
    - Trident -> IE
    - Geck -> Firefox
    - Webkit -> Safari
    - Chromium/Blink -> Chrome
    - Presto -> Opera
- 移动端
    - iOS/iPad主要是Webkit
    - Android4.4之前是Webkit, Android4.4之后是Chromium，内核是Webkit的分支Blink

### 浏览器的组成？
- 用户界面
    - 地址栏
    - 前进/后退按钮
    - 书签菜单
- 呈现引擎：负责显示请求的内容
    - 如：解析 HTML 和 CSS 后，呈现到用户屏幕
- 浏览器引擎：在用户界面和呈现引擎之间传递指令
- 网络：网络调用
    - 如：HTTP 请求
- 用户界面后端：用于绘制基本窗口的小部件
    - 如：组合框和窗口
- JavaScript 解释器：解析和执行 JavaScript 代码
- 数据存储：持久层
    - 浏览器需要在硬盘上保存的各种数据，例如 Cookies

### 浏览器是如何渲染UI的？
- 解析 HTML 生成 DOM Tree
- 解析 CSS 生成 Style Rules
- 合并 HTML 和 CSS，生成 Render Tree
- 进入 layout 阶段，为每个节点在屏幕上分配相应的坐标
- 调用 GPU 进行绘制（Paint），遍历 Render Tree，将 DOM 呈现出来

### 浏览器如何解析 CSS 选择器？
- 按照 **从右向左** 的规则进行解析的
- Style Rules 和 DOM Tree 合并成 Render Tree 的过程
    - 合并的过程，需要遍历 DOM Tree，才能将相应的样式附着在 DOM 上
- 为什么不是 *从右向左*
    - *从右向左* 的话，遍历 DOM，会从根部开始从上至下进行遍历，会进行一些无用节点的遍历
    - *从右向左* 的话，遍历 DOM，会从最底部向上进行遍历，直接找到都是相关的父节点，没有无用的遍历，效率较高

### DOM Tree 如何构建的？
- 转码：浏览器将接受到的二进制数据转换成 HTML 字符串
- 生成 Tokens：根据 HTML 字符串，生成相应的 Tokens
    - Tokens 就是 startTag，或者 endTag
- 生成 Nodes：对 Node 添加相应的属性，通过指针找出 Node的父、子、兄弟节点，
- 生成 DOM Tree：通过指针确定的关系生成 DOM Tree

### 浏览器的重绘和重排的区别？
- 重排：部分/全部渲染树重新绘制，节点尺寸重新计算
    - 表现为：重新生成布局，重新排序列表
- 重绘：由于节点的几何属性发生改变、或样式发生改变
    - 表现为：某些元素的外观被改变。
        - 例如：改变背景颜色时，布局内容需要更新
- 关系
    - 重绘不一定重排，重排一定会发生重绘

### 触发重绘/重排的操作？
- 添加、删除或更改一个 DOM
- 通过 `display: none` 操作某一个 DOM
- 设置 `visiblity: none`，只会引起重绘
- 移动 DOM 节点，或添加动画
- 用户行为，滚动鼠标、缩放页面、改变浏览器窗口

### 如何避免重绘、或重排
- 通过 Class 集中更改样式
- 通过 DocumentFragment
    - 创建一个游离节点之外的，进行批量操作，最后一次插入到 DOM 树中，只触发一次重排
- 提升为合成层
    - 关于合成层
        - 更多见：[无线性能优化：Composite](https://fed.taobao.org/blog/2016/04/26/performance-composite/)
            > （讨论 translateZ(0) 进行 GPU 加速问题的讨论）

## 参考资料
- [前端面试题-主流浏览器内核](https://segmentfault.com/a/1190000013794163)
- [浏览器与新技术#cxymsg](https://www.cxymsg.com/guide/browser.html)
- [createDocumentFragment#mdn](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createDocumentFragment)
- [Reflow#mdn](https://developer.mozilla.org/zh-CN/docs/Glossary/Reflow)
