---
title: 4. CSS Float详解
---

## float

### float的特性是什么？
- 包裹性
    - 包裹
        - `float`元素会携带元素内的子元素，一块脱离文档流，这种携带特性称为 **包裹**
    - 自适应
        - `float`内子元素的宽度，会自动适应 `float` 父元素的宽度
- 高度塌陷
    - 子元素设置 `float`，导致父元素高度没有被撑开，称之位 **高度塌陷**
- 块状化
    - 释义：可以像块级元素设置宽度和高度
    - 一旦 `float` 值不为 `none`，则 `display` 的计算属性就是 `block`/`table`
- 没有任何 `margin` 重叠
    - `float` 元素的 `margin` 值不会重叠
        - 和普通元素表现不同

### float的应用
- 左右环绕
    - <details>
        <summary>左右环绕示例</summary>

        ```html
        <div class="title">
            <a class="left">左标题</a>
            <a class="right">右标题</a>
            <h3 class="middle">标题</h3>
        </div>
        ```
        ```css
        .left { float: left; }
        .right { float: right; }
        .middle {  }
        ```
      </details>
- 宽度自适应布局
    - 左侧固定、右侧自适应
    - <details>
        <summary>宽度自适应布局示例</summary>

        ```html
        <div class="section">
            <img class="img" src="girl.jpeg"/>
            <p class="img-desc">图片描述</p>
        </div>
        ```
        ```css
        .img { float: left; width: 100px; }
        .img-desc { margin-left: 120px; }
        ```
      </details>

### float的清除
- `clear`的值有哪些？
    - `none`
    - `left`
    - `right`
    - `both`
- `clear`的作用？
    - 清除值相关的浮动带来的影响
- `clear`的特性？
    - 元素盒子不能和前面的浮动元素相邻
        - 只清除自身，不影响其他元素
- `clear`属性的不足？
    - `clear: both;` 前的元素是浮动元素，则设置 `margin-top` 无效
        - [示例1.clear:both设置margin-top无效](https://codepen.io/muzi131313/pen/bGGyeqo)
    - `clear: both;` 后的元素依旧有可能发生文字环绕
        - [示例2.clear:both后元素依旧会环绕](https://codepen.io/muzi131313/pen/bGGyeqo)
- BFC能解决 `float` 的哪些影响？
    - `margin` 重叠问题
        - `margin` 重叠，只有在同一个 BFC 中才会发生
        - [示例3.bfc解决margin重叠示例](https://codepen.io/muzi131313/pen/bGGyeqo)
    - 高度塌陷
        - 利用 **BFC 内部元素不会影响到外部元素** 的特性
        - [示例4.BFC解决高度塌陷示例](https://codepen.io/muzi131313/pen/bGGyeqo)
            - BFC 解决高度没有问题
            - `overflow: hidden` 带来的问题: 子元素是`margin: -10px`/`position: absolute; left: -10px;`, 相应的元素会被截取掉
            - 优化方法, 使用一个`height`/`line-height`为0且不可见的伪类解决
                ```css
                .clear {zoom: 1;}
                .clear::after { content: '';display: block; clear: both;line-height: 0;visiblity: hidden; }
                ```
    - 自适应布局中 *文本换行*
        - <details>
            <summary>BFC自适应示例</summary>

            ```html
            <div class="section">
                <img class="img" src="girl.jpeg"/>
                <p class="img-desc">图片描述</p>
            </div>
            ```
            ```css
            .img { float: left; width: 100px; }
            .img-desc {
                margin-left: 120px;
                // 形成BFC
                overflow: hidden;
            }
            ```
          </details>
        - [示例2](https://codepen.io/muzi131313/pen/bGGyeqo)：*放开其中的overflow可见效果*
        - 使用BFC的流式布局和纯流式布局区别？
            - 更加健壮、容错性更强
            - 会自动填满浮动元素以外的区域，不用关系浮动元素宽度

## 参考资料
- [CSS float浮动的深入研究、详解及拓展一 | 张鑫旭](https://www.zhangxinxu.com/wordpress/2010/01/css-float%e6%b5%ae%e5%8a%a8%e7%9a%84%e6%b7%b1%e5%85%a5%e7%a0%94%e7%a9%b6%e3%80%81%e8%af%a6%e8%a7%a3%e5%8f%8a%e6%8b%93%e5%b1%95%e4%b8%80/)
- [CSS-float浮动的深入研究、详解及拓展二 |  张鑫旭](https://www.zhangxinxu.com/wordpress/2010/01/css-float%e6%b5%ae%e5%8a%a8%e7%9a%84%e6%b7%b1%e5%85%a5%e7%a0%94%e7%a9%b6%e3%80%81%e8%af%a6%e8%a7%a3%e5%8f%8a%e6%8b%93%e5%b1%95%e4%ba%8c/)
- [【前端Talkking】CSS系列——CSS深入理解之float浮动](https://segmentfault.com/a/1190000014554601)
