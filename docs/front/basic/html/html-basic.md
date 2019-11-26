---
title: 1. HTML基础
---

## HTML基础

### doctype的作用是什么？
- HTML5 标准文档声明，告诉浏览器以什么格式解析文档，必须放在页面第一行
- 模式有3种
    - 标准模式：按照 W3C 的标准解析渲染页面，会按照 HTML 和 CSS 定义渲染
    - 怪异模式：使用自己的怪异模式解析渲染页面，会模拟更古老的浏览器
        - 如果没有声明 doctype，就是使用怪异模式解析文档
    - 混杂模式：IE8的一种文档解析格式，模拟IE7之前单元格布局的怪异行为、其他接近标准的模式

### HTML，XML 和 XHTML 的区别？
- HTML：超文本标记语言
    - HTML4.0 之前现有实现后有标准，所以比较混乱和松散
- XML：可扩展标记语言
    - 用来传输数据的一种格式，另外一种有 JSON，相对体积更小，所以更受欢迎
- XHTML：可扩展超文本标记语言
    - 基于 XML 和 HTML 而来，W3C 用来解决混乱和松散问题而生，并诞生了 HTML5, 加 doctype 的做法就是由此而来，加了就是用标准模式，不加就是怪异模式，会兼容更古老浏览器

### HTML 语义化理解
- 开发者友好：清晰的文档结构，便于理解、维护
- 机器友好：方便爬虫爬取和理解，还有读屏软件读取，可以根据文章自动生成目录

### HTML5 和 HTML4 的区别?
- HTML5 文件类型声明，只有一个，`<!DOCTYPE html>`
- 新的解析顺序，不再基于 SGML
- 增加新的 HTML5 标签
    - header, footer, canvas
    - section, nav, aside
    - video, figure
- input新类型
    - email, url, date等
- 新的属性
    - charset（用于meta）, async（用于script）
- 移除元素
    - applet, big, font, frame

### 常用的 meta 标签
- charset：描述HTML文档的编码形式
    ```
    <meta charest="utf-8">
    ```
- http-equiv：http 的文件头作用
    - 如：设置过期时间
        ```html
        <meta name="http-equiv" content="Wed Nov 20 2019 11:48:54 GMT+0800">
        ```
- viewport：控制视口大小和比例
    ```html
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    ```
- apple-mobile-web-app-status-bar-style：设置 Safari 状态栏颜色

### src 和 link 区别
- 两者都支持跨域资源请求
- 不同
    - link: 主要用来加载 css，加载的同时、不会停止文档解析
    - src: 主要用来加载 JavaScript 外链资源和图片资源，对于 JavaScript 外链资源，加载时会停止其他资源的下载、处理，直到 JavaScript 加载、编译、执行完毕

### img的srcset作用是什么
- 用来设置不同屏幕下加载不同的图片尺寸

## 参考资料
- [HTML基础](https://www.cxymsg.com/guide/htmlBasic.html)
