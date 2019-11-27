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

### 层叠等级的顺序?
- 层叠元素按照特定的顺序规则在 **Z轴** 上垂直显示(是一种规则)
    - “层叠上下文`background`/`border`” 是指层叠上下文背景和边框
    - `inline`/`inline-block` 层叠顺序高于 `float`/`block` 元素
        - 网页设计初衷是展示文字内容，发生重叠时会优先展示文字内容, `border`/`background` 属于装饰属性
    - 单纯考虑层叠等级，`z-index: auto` 和 `z-index: 0` 是一样的，但是两者是有区别的
        - todo??

## 参考资料
- [彻底搞懂CSS层叠上下文、层叠等级、层叠顺序、z-index](https://mp.weixin.qq.com/s/16-Ubn2dNqa0vLNqlO1x3w)
- [深入理解CSS中的层叠上下文和层叠顺序 | 张鑫旭](https://www.zhangxinxu.com/wordpress/2016/01/understand-css-stacking-context-order-z-index/)
- [CSS层叠 | mdn](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Cascade)
- [css2#x43](https://drafts.csswg.org/css2/visuren.html#x43)
