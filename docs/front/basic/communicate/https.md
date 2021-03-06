---
title: 3. 通讯-HTTPS
---

## HTTPS
### 有 HTTP 了, 为什么还要有 HTTPS
- 安全版 HTTP，HTTP是明文传输的、不安全，HTTPS 信息传输是加密后的

### https 和 http 的区别
- http 内容是不加密的, 不安全
- https 内容是加密的

### 概念
- 对称加密
    - 概念: 双方用同一个私钥加密、解密
    - 问题: client 和 server 之间, 私钥无法传递
- 非对称加密
    - 概念:
        - 秘钥对，公钥 + 私钥
        - 公钥加密，可以使用私钥解密；私钥加密，可以使用公钥加密
        - 因为对方都有自己一套秘钥对，通信之前会把公钥发给对方
        - 对方再拿着公钥加密数据后发给对方，等到了对方那里，对方再用私钥解密
    - 问题:
        - 速度慢，影响性能
        - 中间人更换了公钥, 则能轻松获取到通讯信息
- CA证书
    - 目的: 用于证明身份，防止被中间人攻击
    - 证书包括
        - 签发者
        - 证书用途
        - 使用者公钥
        - 使用者私钥
        - 使用者的 `HASH` 算法
        - 证书到期时间 等
    - 证书防护:
        - 生成数字签名
            - 使用 CA 自带 HASH 算法对证书内容 HASH, 得到一个摘要, 再用 CA 私钥加密, 最终得到数字签名
        - 数字签名证明
            - 使用 **公钥** 对证书解密, 得到 CA 创建的证书摘要, 两者对比, 一样则未篡改, 不一样则是被篡改过

### 参考资料
- [一篇文章读懂HTTPS及其背后的加密原理](https://mp.weixin.qq.com/s/I32b0vdHJ9qkHaTHmZjU7w)
- [https是如何保证安全的?](https://www.cxymsg.com/guide/http.html#https%E6%98%AF%E5%A6%82%E4%BD%95%E4%BF%9D%E8%AF%81%E5%AE%89%E5%85%A8%E7%9A%84%EF%BC%9F)
