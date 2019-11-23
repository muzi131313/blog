## CSS基础
### 盒子模型是什么？
- W3C 标准盒子模型
    - IE8以上使用的是W3C标准盒子模型
    - 元素占据高度：border + margin + height
    - 元素占据宽度：border + marign + width
- IE 盒子模型（怪异盒模型）
    - 元素占据高度：margin + width
        - width: padding + border + content-width
            > 实际上的width，需要减去 padding 和 border 值
        - height: 同上
    - 元素占据宽度：margin + height
- box-sizing
    - context-box: width 不包括边框
        - 浏览器默认属性
        - 同：W3C 标准盒模型
    - border-box: width 包括边框
        - 同：IE 盒子模型

### CSS有几种定位方式？
- `static`：正常文档流定位，**DOM 元素默认定位**
    - 块级元素：从上到下
    - 行内元素：从左到右
- `relative`：相对定位
    - **相对** 正常文档流的位置
- `absolute`：相对于最近的非static定位父级元素定位，脱离文档流
- `fixed`：相对于viewport的位置来指定元素位置，脱离文档流，元素的位置在页面滚动时不受影响
- `sticky`：relative 和 fixed 的合体，
    - 元素可见时是 `relative`，不可见时是 `fixed` 定位

### CSS 选择器优先级是什么？
- 选择器优先级
    - 内联 > ID 选择器 > 类选择器 > 标签选择器
        - `!important` > 内联
- 具体到计算层次：A.B.C.D
    - A: 存在内联为 1，否则为0
    - B: ID 选择器出现的次数
    - C: 类选择器出现的次数
    - D: 标签选择器 和 伪类 出现的次数

### link 和 @import 的区别？
- link
    - XHTML 标签
    - HTML 加载的时候同时加载
    - 没有兼容问题
    - 样式权重高于@import
    - JavaScript 改变 DOM 时，可以使用 link 标签
- @import
    - CSS 标签
    - HTML 加载完毕之后才加载
    - IE5 以上才支持
    - ..
    - @import 则无法由 DOM 控制

### 有哪些元素可以隐藏 DOM
- `display: none`：隐藏后不会占据原来的空间
- `visiblity: hidden`：隐藏后悔占据原来的空间
- `opacity: 0`：隐藏后会占据原来的空间
- `z-index: -9999`：将 DOM 放置到顶级
- `transform: scale(0, 0)`：缩放到看不见
- `overflow: hidden`：隐藏超出容器的元素
- 把元素移动到屏幕外...

### px/em/rem 区别
- px: 元素像素
- em：基于相对父级元素字体元素大小，如果自身字体会用自身的
- rem：相对值，相对跟节点，是一个相对值, css3 新属性，支持 chrome/firefox/IE9+

### 如何理解 z-index？
- 控制重叠元素的垂直叠加顺序

### CSS 创建三角形的原理是什么？
- 原理
    - 元素高度、宽度为0
    - 给边框设置 border 为元素宽度/高度的一半时，会呈现四个三角形
    - 设置另外三边为透明，留下其中一边，则为三角形
- <details>
    <summary>三角形示例</summary>

    ```css
    .traingle {
        height: 0;
        width: 0;
        border: 10px solid;
        border-color: red transparent transparent transparent;
    }
    ```
    ```html
    <div class="traingle"></div>
    ```
  </details>

### 创建一个0.5px的细线
- 方法
    - 创建一个伪元素
    - 设置 `height: 1px; transform: scaleY(0.5); `
- <details>
    <summary>0.5px 细线示例</summary>
    ```css
    .line {
      position: relative;
    }
    .line::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 1px;
      transform: scaleY(0.5);
      background-color: #000;
    }
    ```
    ```html
    <div class="line"></div>
    ```
  </details>

### 清除浮动的方法？
- 空div：`<div style="clear: both;"></div>`
    - 或 `.clearfix` 全局类样式: `.clearfix: { clear: both }`
- 使用BFC，设置`overflow: hidden; overflow: auto`方法
- 通过伪元素，添加一个空格/点，设置不可见，兼容IE6/7的话，需要设置 `zoom: 1`
    ```
    .clearfix::after {
        content: '020',
        display: block;
        height: 0;
        visibility: none;
        clear: both;
    }
    .clearfix {
        /** 触发hasLayout */
        zoom: 1
    }
    ```

### 为什么会用 transform?
- transform 会创建一个 GPU 图层，不会引发重排或重绘，相对更高效，能缩短平滑动画绘制时间
- 改变绝对定位，使用 CPU，会引起重新定位

### 伪类和伪元素区别？
- 伪类：是一个冒号(:)，选择某一类元素，例如`:frist-child`
- 伪元素：是两个冒号(::)，创建一个不在文档树的元素，例如：`::before`

### CSS Sprite的理解好处
- 雪碧图，把多个图片合成一张图片，利用 `background-position` 进行访问的技术
- 好处
    - 减少 http 连接
    - 提前加载资源
- 不足
    - 维护成本高，少许变动，需要重新生成合并图片
    - HTTP/2，可以连接多路复用，加载速度优势也不存在了

### 对 Flex 的理解？
- 弹性盒子模型
    - 优势：只需要声明性盒子布局应该具有的行为，不需要给出具体的实现方式，浏览器完成具体的实现
    - 场景：不定宽度，分布对齐，可以优先考虑

## 居中布局
### 水平居中
- 行内元素：`text-align: center;`
- flex布局: `display: flex; justify-content: center;`
- table布局：`display: table; margin: 0 auto;`
- 块级元素：`margin: 0 auto; width: 100px;`
- 绝对定位和移动: `display: absolute; left: 50%; transform: translateX(-50px);`
- 绝对定位和负边距：`display: absolute; left: 50%; margin-left: -50px;`

### 垂直居中
- 子元素为单行文本：`height: 20px; line-height: 20px;`
- `absolute` + `transform`
- `flex` + `align-items: center`
- `display:table-cell` + `vertical-align: middle`
- 利用`position`、`top` + 负`margin`

### 水平垂直居中
- 已知元素宽高：绝对定位 + `margin: auto`
- 已知元素宽高：绝对定位 + 负`margin`
- `absolute` + `transform`
- `flex` + `justify-content` + `align-items`

## 参考资料
- [web前端面试中10个关于css高频面试题,你都会吗?](https://mp.weixin.qq.com/s/aavbmpMDy6J_9d90WLT2JA)
- [box-sizing | MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-sizing)
- [16种方法实现水平居中垂直居中](https://louiszhai.github.io/2016/03/12/css-center/)
- [层叠上下文-张鑫旭](https://www.zhangxinxu.com/wordpress/2016/01/understand-css-stacking-context-order-z-index/)
- [深入理解BFC](https://www.cnblogs.com/xiaohuochai/p/5248536.html)
- [伪类与伪元素](http://www.alloyteam.com/2016/05/summary-of-pseudo-classes-and-pseudo-elements/)
- [深入理解CSS Media媒体查询](https://www.cnblogs.com/xiaohuochai/p/5848612.html)
