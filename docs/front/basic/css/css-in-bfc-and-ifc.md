---
title: 3. CSS BFC/IFC
---

## FC
- 全称：Formating Context
    - 格式化上下文
- 页面中的一块渲染区域，拥有一套规则，决定了子元素在这块区域的定位规则，以及与其他元素的相互关系和作用

## BFC
- 全称：Block Formating Context

### 谈谈对 BFC 的理解？
- 块级格式化上下文，独立的渲染区域，只有 *块级BOX* 参与，内部规定 *块级BOX* 如何布局，与外部元素毫不相干
- 作用：
    - 一块独立的区域，让处于 BFC 的元素和外部元素相互隔离

### BFC 约束规则
- 内部的 BOX 会在垂直方向一个接一个放置
- 元素之间的高度由 margin 决定。
    - 同一个 BFC 内的元素，相邻的 margin 会发生重叠
- 每个元素的左边界和包裹元素的右边界相接触
- BFC 区域不会与浮动元素区域重叠
- 计算 BFC 高度时，浮动高度也会计算
- BFC 是一个独立的区域，内外的元素相互不影响

### BFC 作用
- 防止 margin 发生重叠
- 两栏布局，防止文字环绕
- 防止因浮动导致的高度塌陷

### BFC 触发
- 根元素，即：HTML
- `display` 为 `inline-block、table-cell、table-caption`
    - [示例-2.水平垂直居中-BFC](https://codepen.io/muzi131313/pen/QWWPdLa)
    - `display: table` 也会产生BFC？
        - table布局会产生一个匿名的 `table-cell`，从而形成BFC
- `overflow` 不为 `visible`
- `float` 值不为 `none`
- `position: abosolute/fixed`

### BFC和普通块框的区别？
> 详情见: [深入理解BFC](https://www.cnblogs.com/xiaohuochai/p/5248536.html)
- 阻止元素被浮动元素所覆盖
- 包含浮动元素
- 同属于一个BFC的相邻子元素margin会发生重叠

## IFC
- Inline Formating Context: 内联格式化上下文

### IFC 的特性
- IFC 中的 **line box** 一般左右贴紧整个 IFC，但是会因为 float 而扰乱。
    - float 位于 IFC 和 **line box** 之间，使得 **line box**宽度变小
    - **line-box**
        - 包含形成一条线的盒子的矩形区域
        - [w3#inline-formatting#line box](https://www.w3.org/TR/CSS2/visuren.html#inline-formatting)
        - [what-does-mean-line-box-in-css | stackoverflow](https://stackoverflow.com/questions/32022042/what-does-mean-line-box-in-css)
- IFC 中不可能有块级元素
    - 有的话，会被块级元素分开，形成两个IFC，与块级元素上下并列排放
        - <details>
            <summary>块级元素分隔IFC示例</summary>

            ```html
            <span>one ifc<span>
            <div>block div</div>
            <span>two ifc</span>
            ```
          </details>

### IFC 的应用
- 水平居中：
    - 块级元素设置 `inline-block` 在外层产生一个 IFC，然后设置容器 `text-align: center` 使其水平居中
- 垂直居中：
    - 创建一个 IFC，使用一个元素把容器给撑开、并设置其 `vertial-align: middle`，**其他行内元素** 则可以 **在此父元素** 垂直居中
- [示例-1.水平垂直居中-IFC](https://codepen.io/muzi131313/pen/QWWPdLa)

## GFC
- Grid Formating Context: 网格布局格式化上下文

### GFC作用
- 从一维布局改为二维布局

## FFC
- Flex Formting Context: 自适应布局格式化上下文

### FFC的组成部分？
- 伸缩容器
- 伸缩项目
    - 伸缩容器内的每一个子元素都是一个伸缩容器

## 区别
### BFC 和 FFC 的区别？
- Flexbox 不支持 `::first-line` 和 `::after-line` 这两种伪元素
- Flexbox 中的子元素使用 `vertical-align: middle` 无效
- Flexbox 中的子元素使用 `float` 和 `clear` 无效，也不会使文档脱离文档流
- Flexbox 环境中，多栏布局(column-*)也失效的
- Flexbox 下的子元素不会继承父级的宽高

## 参考资料
- [w3#block-formatting](https://www.w3.org/TR/CSS2/visuren.html#block-formatting)
- [css布局的各种FC简单介绍：BFC，IFC，GFC，FFC](https://segmentfault.com/a/1190000014886753)
- [格式化上下文](https://wy1009.github.io/2017/03/29/%E6%A0%BC%E5%BC%8F%E5%8C%96%E4%B8%8A%E4%B8%8B%E6%96%87/)
- table-cell
    - [我所知道的几种display:table-cell的应用 | 张鑫旭](https://www.zhangxinxu.com/wordpress/2010/10/%E6%88%91%E6%89%80%E7%9F%A5%E9%81%93%E7%9A%84%E5%87%A0%E7%A7%8Ddisplaytable-cell%E7%9A%84%E5%BA%94%E7%94%A8/)
    - [CSS——布局布局神器display:table-cell](https://www.jianshu.com/p/2479665ee1f8)
    - [css布局：table，table-cell](https://www.jianshu.com/p/47594ca109a8)
