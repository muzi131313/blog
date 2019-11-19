---
title: 1. 什么是前端
---

本文先整体介绍一下我所理解的前端状况。

# 什么是前端
- 最开始，
  - 是基于 HTML/CSS/JavaScript 进行页面开发的工程师
    - 有偏向于 HTML/CSS 主方向的开发
    - 有偏向于 JavaScript 主方向的开发
- 后来，出现了 NodeJS
  - 前端开始有偏向于 **服务端** 方向的开发
  - 这方面，有深远影响的是 Express、KOA 的作者 TJ，转向了 GoLang 领域
    - [如何看待 TJ 宣布退出 Node.js 开发，转向 Go？](https://www.zhihu.com/question/24373004)
- 再后来，基于 NPM ，前端有了蓬勃发展，更偏重于工程化
  - 出现了 React/Vue ，基于虚拟 DOM 的工程化方案
    - 带火了 Webpack/Babel/Typescript 等社区
- 同时，出现了更多领域的应用
  - 混合开发，超级App架构，桌面应用，新的编译体系，物联网应用
  - ReactNative/小程序/Electron/Flutter/IoT.js
- 不过，一直不变的是，前端的Web应用一直是主业务
  - H5/PC/SPA/MPA/SSR
  - H5/PC 适配方案
    - H5纯粹适配方案出现了
      - REM：[lib-flexible](https://github.com/amfe/lib-flexible)
      - VW：[vh,vw单位你知道多少？](https://juejin.im/entry/59b00e46f265da2491513bcc)
    - PC适配有
      - 静态布局
      - 响应式、流式布局等
  - SPA：适合于不需要SEO的业务场景
  - MPA：适合复杂且需要SEO的业务场景
  - SSR：服务端同构，适合SEO业务
- 关于发展路线的一些讨论
  > 知其所然、知其所以然，了解原理，是为了更好的使用，或者更好的解决业务问题

  - [关于框架源码的学习](https://www.zhihu.com/question/350289336/answer/873350617)
