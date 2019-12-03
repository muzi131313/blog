---
title: 6. 层叠上下文
---

## 概念
### 什么是层叠上下文?
- 元素发生堆叠，产生表示层叠关系的 **Z轴**，即产生了层叠上下文；相应的元素，则成为层叠上下文元素

### 什么是层叠等级?
- 在同一个层叠上下文中，层叠元素在**Z轴**上的上下顺序
- 非层叠上下文中，普通元素在**Z轴**上的上下顺序

### 层叠等级的比较原则？
- 普通元素的层叠优先等级是由其层叠上下文决定
- 层叠等级的比较只有在当前层叠上下文元素中才有意义

### 怎么产生层叠上下文？
- 根元素 `html` 自带层叠上下文，成为根层叠上下文
- `position` 设置为非 `static` 且 `z-index` 有值
- CSS3 新属性
    - 父元素 `display: flex`, 子元素 `z-index` 不为 `auto`, 子元素为层叠上下文
    - 元素的 `opacity` 不为 `1`
    - `transform` 属性不为 `none`
    - `mix-blend-mode` 不为 `normal`
    - `filter` 不为 `none`
    - `isolation` 为 `isolate`
    - `will-change` 值为上面的任意一个
        ```
        will-change: isolation | filter | mix-blend-mode | transform | opacity | diplay
        ```
    - `-webkit-overflow-scrolling` 属性值为 `touch`

### 层叠上下文的特性？
- 层叠上下文元素的的层叠水平要比普通元素的高
- 层叠上下文可以阻断元素的混合模式
- 层叠上下文可以嵌套，内层的层叠上下文受制于外层层叠上下文
- 每个层叠上下文和兄弟元素独立，即：当发生层叠变化或渲染、只需考虑后代元素
- 每个层叠上下文自成体系，当元素发生层叠时，整个元素被认为在父级层叠顺序中

### 层叠等级的顺序?
- 层叠元素按照特定的顺序规则在 **Z轴** 上垂直显示(是一种规则)
    - “层叠上下文`background`/`border`” 是指层叠上下文背景和边框
        - `border`/`background` 属于装饰属性，所以在最下层
    - `inline`/`inline-block` 层叠顺序高于 `float`/`block` 元素
        - 网页设计初衷是展示文字内容，发生重叠时会优先展示文字内容
    - 单纯考虑层叠等级，`z-index: auto` 和 `z-index: 0` 是一样的，但是两者是有区别的
        - **谁大谁上**: 有层叠标识时，是谁大谁在上面
            - `z-index: auto` 的元素是个普通元素
                - IE6/7中，`z-index: auto` 会产生层叠上下文
        - **后来居上**: 层叠标识水平一致时，是谁在后面，就谁在上面
            - `z-index: 0` 会产生一个层叠上下文

### 层叠等级的详细顺序?
- 层叠上下文 background/border
- 负 z-index
- block 块状盒子
- float 浮动盒子
- inline/inline-block 水平盒子
- `z-index: auto`，或看成 `z-index: 0` 不依赖 `z-index` 的层叠上下文
    - 层叠上下文不依赖 `z-index`，层叠顺序是 `z-index: auto`
- 正 `z-index`
    - 层叠上下文依赖 `z-index`，层叠顺序由 `z-index` 值决定

![顺序图示](http://ww1.sinaimg.cn/large/8c4687a3ly1g9eip3gk5pj20g50ajglt.jpg)

## 参考资料
- [彻底搞懂CSS层叠上下文、层叠等级、层叠顺序、z-index](https://mp.weixin.qq.com/s/16-Ubn2dNqa0vLNqlO1x3w)
- [深入理解CSS中的层叠上下文和层叠顺序 | 张鑫旭](https://www.zhangxinxu.com/wordpress/2016/01/understand-css-stacking-context-order-z-index/)
- [CSS层叠 | mdn](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Cascade)
- [css2#x43](https://drafts.csswg.org/css2/visuren.html#x43)
