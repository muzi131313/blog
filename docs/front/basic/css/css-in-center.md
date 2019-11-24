---
title: 2. CSS居中布局
---

## 居中布局
### 水平居中
- 行内元素：父元素设置 `text-align: center;`
    - [示例1.行内元素，设置父级 text-align: center;](https://codepen.io/muzi131313/pen/XWWQGGW)
- 块级元素：`width: 100px; margin: 0 auto;`
    - **需要设置容器宽度**
    - [示例2.1.块级元素，设置 margin: 0 auto;](https://codepen.io/muzi131313/pen/XWWQGGW)
- table布局：`display: table; margin: 0 auto;`
    - [示例2.2.块级元素，设置 margin: 0 auto;](https://codepen.io/muzi131313/pen/XWWQGGW)
- 子元素包含浮动元素：父级元素设置 `width: fit-content;margin: 0 auto;`
    - [示例3.子元素包含float,父元素设置fit-content,配合margin: auto，实现水平居中](https://codepen.io/muzi131313/pen/XWWQGGW)
- flex布局: `display: flex; justify-content: center;`
    - [示例4.flex+justify-content](https://codepen.io/muzi131313/pen/XWWQGGW)
- 绝对定位和移动: `display: absolute; left: 50%; transform: translateX(-50px);`
    - [示例5.1.子元素absolute+transform](https://codepen.io/muzi131313/pen/XWWQGGW)
- 绝对定位和负边距：`display: absolute; left: 50%; width: 100px; margin-left: -50px;`
    - **需要设置子元素宽度**
    - [示例5.2.子元素absolute+margin-left](https://codepen.io/muzi131313/pen/XWWQGGW)
- 绝对定位和left/right、margin：`display: absolute; left: 0; right; 0; margin: 0 auto;`
    - **需要设置子元素宽度**
    - [示例5.3.子元素absolute+left+right+margin-left](https://codepen.io/muzi131313/pen/XWWQGGW)

### 垂直居中
- 子元素为单行文本：`height: 20px; line-height: 20px;`
    - [示例1.单行文本，设置line-height等同于父元素高度](https://codepen.io/muzi131313/pen/bGGyGPj)
- `display:inline-block` + `vertical-align: middle`
    - [2.1.元素是行内块级元素，设置同级别伪类为行内块级、高度100%、垂直居中，则其他行内块级元素也会垂直居中](https://codepen.io/muzi131313/pen/bGGyGPj)
- `display:table-cell` + `vertical-align: middle`
    - [2.2.元素是table-cell，设置vertical-align: middle](https://codepen.io/muzi131313/pen/bGGyGPj)
- `flex` + `align-items: center`
    - [3.flex+align-items(不支持IE9+)](https://codepen.io/muzi131313/pen/bGGyGPj)
- `box` + `box-align: center`
    - [4.box(需要浏览器厂商前缀，不兼容IE)](https://codepen.io/muzi131313/pen/bGGyGPj)
    - [box-align | mdn](https://developer.mozilla.org/en-US/docs/Web/CSS/box-align)
- `absolute` + `transform`
    - [5.1.absolute+transform(IE8不支持)](https://codepen.io/muzi131313/pen/bGGyGPj)
- 利用`position`、`height` + 负`margin`
    - [5.2.absolute+height+margin-top(缺点：子元素如果设置ovflow: auto, 容器空间不够，容易出现滚动条)](https://codepen.io/muzi131313/pen/bGGyGPj)
- `absolute`、`height` + `margin:auto`
    - [5.3.absolute+height+margin:auto(子元素空间不够，会被截断)](https://codepen.io/muzi131313/pen/bGGyGPj)

### 水平垂直居中
- `flex` + `justify-content` + `align-items`
    - [示例1.flex](https://codepen.io/muzi131313/pen/qBBGEYX)
- `absolute` + `transform`
    - [示例2.absolute+transform](https://codepen.io/muzi131313/pen/qBBGEYX)
- 已知元素宽高：绝对定位 + `margin: auto`
    - [示例3.1.absolute+margin:auto](https://codepen.io/muzi131313/pen/qBBGEYX)
- 已知元素宽高：绝对定位 + 负`margin`
    - [示例3.2.absolute+-margin](https://codepen.io/muzi131313/pen/qBBGEYX)
- `table-cell`
    - [示例4.table-cell+text-align+vertical-align](https://codepen.io/muzi131313/pen/qBBGEYX)
- `IFC` + `text-align`
    - [示例5.IFC+text-align](https://codepen.io/muzi131313/pen/qBBGEYX)

## 参考资料
- [16种方法实现水平居中垂直居中](https://louiszhai.github.io/2016/03/12/css-center/)
- [使用CSS让一个元素水平垂直居中](https://github.com/YvetteLau/Step-By-Step/issues/42)
- [CSS布局之-水平垂直居中](https://div.io/topic/1155)
