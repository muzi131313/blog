---
title: 2. 通讯-HTTP缓存
---

## HTTP缓存
### HTTP 的缓存形成过程是什么?
- 客户端向服务端发起请求
- 服务端返回数据，并通过响应头决定缓存策略
- 浏览器根据缓存策略，来决定是否缓存资源
    - 如果是，就将响应头和资源缓存下来
- 下次浏览器再次访问资源的时候，此时客户端会检查上次返回的 **缓存策略**，根据策略的不同，浏览器决定是否读取缓存，还是与服务器 **协商缓存**

### 什么时候会触发强缓存或者协商缓存
- Progam: 权限最高，之后是 Cache-Control
- Expires: 过期时间，是一个绝对值，受限于本地时间，如果本地时间更改，则缓存策略可能失效
- Cache-Control: 缓存过期策略
    - `public`: 可以被中继缓存
    - `private`: 只能被本地缓存
    - `no-cache`: 先缓存本地, 但是必须与服务器验证缓存的**新鲜度**才能使用
    - `no-store`: 不会产生任何缓存
- 协商缓存
    - 触发条件
        - 服务器返回资源没有 Cache-Control 或 Expires 字段
        - 缓存资源过期
        - 缓存策略设置为 `no-cache`
    - 判断新鲜度
        - Last Modified/If-Modified-Since
            - 首次请求: 客户端收到服务器 `Last Modified/Fri Nov 15 2019 18:02:43 GMT` 响应部首
            - 再次请求: 客户端发送给服务 `If-Modified-Since/Fri Nov 15 2019 18:02:43 GMT` 给服务器
                - 服务器资源跟客户端请求的 **部首时间** 一致, 证明客户端资源是最新的, 就会返回 `403` 状态码
                    - `403` 状态码: 表示客户端直接使用缓存即可
                - 否则返回最新资源
        - ETag/If-None-Match
            - 流程: 同上
            - 不同点:
                - `ETag` 是根据服务器资源 **内容** 判断，是否是最新的
                    - 如果服务器资源内容发生变化，`ETag` 会发生巨变
                - `ETag` 比 `Last Modified` 更精准

## 参考资料
- [彻底搞懂浏览器缓存机制](https://juejin.im/post/5c4528a6f265da611a4822cc#heading-6)
- [进阶必备的网络基础（下）](https://juejin.im/post/5c7a9f8c518825640d1dd503)
- [写给后端程序员的HTTP缓存原理介绍](http://www.codeceo.com/article/http-cache-backend-programmer.html)
- [图解 HTTP 的缓存机制 | 实用 HTTP](https://juejin.im/post/5b30d05ee51d45587c51d276)
- [Web 开发后端缓存思路](https://cnodejs.org/topic/55210d88c4f5240812f55408)
- [Web静态资源缓存及优化](https://zhuanlan.zhihu.com/p/30780216)
- [一文搞懂浏览器缓存机制](https://mp.weixin.qq.com/s/OptZnaAhuX8eRnIesRrFwA)
- [深入理解浏览器的缓存机制](https://mp.weixin.qq.com/s/Q2h1EEKubAXkaM4g85Mkrw)
