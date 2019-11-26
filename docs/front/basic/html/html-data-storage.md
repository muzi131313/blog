---
title: 3. 数据存储
---

## web 几种数据存储的异同
### cookie
- HTML5之前的本地存储方案
- 优点
    - 兼容性好
- 缺点
    - 大小限制为4kb
    - 每个 domain 限制为 20 个cookie
    - 请求头自动加入 cookie，浪费流量
    - 使用麻烦，需要自己封装使用

### localStorage
- HTML5 加入的键值对（Key-Value）的本地存储方案
- 优点
    - 永久存储，不删除数据会一直存在
    - 操作简单
    - 兼容 IE8+
    - 大小为 5M

### sessionStorage
- 类似 localStorage，会话级的本地存储方案，关闭窗口后数据会被删除
- 特点
    - 与 cookie 和 sessionStorage 不同， 不支持同源窗口的数据共享

### WebSQL
- 被 W3C 废弃的本地数据存储库方案
- 特点：
    - 类似SqlLite，一个真正意义上的关系性数据库
    - 已经被各大主流浏览器支持
- 缺点：
    - 操作繁琐，不适合 Web 场景

### IndexDB
- W3C 标准通过的本地数据库存储方案
- 特点
    - 类似noSQL，非关系型数据库，键值存储
    - 操作简单，适合 Web 场景

## Session
- HTTP 协议是无状态协议，所以服务器需要一个标示识别用户
    - 这个标示一般放在 Cookies 中
    - 如果用户禁用了 Cookies，则可以通过 URL 重写，把 sid 放到 URL 中
- Session：服务端保存的一种数据结构，用来跟踪用户状态
    - 一般放在内存（如 Redis）或数据库中
- Cookies：保存用户信息的一种机制
    - 应用场景：用户记住密码

### 参考资料
- [localStorage、sessionStorage、cookie、session几种web数据存储方式对比总结](https://juejin.im/post/5dc2415e6fb9a04a5d586590)
- [COOKIE和SESSION有什么区别？(知乎)
](https://www.zhihu.com/question/19786827)
- [Cookie 与 Session 的区别](https://juejin.im/entry/5766c29d6be3ff006a31b84e)
