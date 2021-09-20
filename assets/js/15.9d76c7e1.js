(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{361:function(t,v,_){"use strict";_.r(v);var l=_(43),r=Object(l.a)({},(function(){var t=this,v=t.$createElement,_=t._self._c||v;return _("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[_("h2",{attrs:{id:"https"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#https"}},[t._v("#")]),t._v(" HTTPS")]),t._v(" "),_("h3",{attrs:{id:"有-http-了-为什么还要有-https"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#有-http-了-为什么还要有-https"}},[t._v("#")]),t._v(" 有 HTTP 了, 为什么还要有 HTTPS")]),t._v(" "),_("ul",[_("li",[t._v("安全版 HTTP，HTTP是明文传输的、不安全，HTTPS 信息传输是加密后的")])]),t._v(" "),_("h3",{attrs:{id:"https-和-http-的区别"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#https-和-http-的区别"}},[t._v("#")]),t._v(" https 和 http 的区别")]),t._v(" "),_("ul",[_("li",[t._v("http 内容是不加密的, 不安全")]),t._v(" "),_("li",[t._v("https 内容是加密的")])]),t._v(" "),_("h3",{attrs:{id:"概念"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#概念"}},[t._v("#")]),t._v(" 概念")]),t._v(" "),_("ul",[_("li",[t._v("对称加密\n"),_("ul",[_("li",[t._v("概念: 双方用同一个私钥加密、解密")]),t._v(" "),_("li",[t._v("问题: client 和 server 之间, 私钥无法传递")])])]),t._v(" "),_("li",[t._v("非对称加密\n"),_("ul",[_("li",[t._v("概念:\n"),_("ul",[_("li",[t._v("秘钥对，公钥 + 私钥")]),t._v(" "),_("li",[t._v("公钥加密，可以使用私钥解密；私钥加密，可以使用公钥加密")]),t._v(" "),_("li",[t._v("因为对方都有自己一套秘钥对，通信之前会把公钥发给对方")]),t._v(" "),_("li",[t._v("对方再拿着公钥加密数据后发给对方，等到了对方那里，对方再用私钥解密")])])]),t._v(" "),_("li",[t._v("问题:\n"),_("ul",[_("li",[t._v("速度慢，影响性能")]),t._v(" "),_("li",[t._v("中间人更换了公钥, 则能轻松获取到通讯信息")])])])])]),t._v(" "),_("li",[t._v("CA证书\n"),_("ul",[_("li",[t._v("目的: 用于证明身份，防止被中间人攻击")]),t._v(" "),_("li",[t._v("证书包括\n"),_("ul",[_("li",[t._v("签发者")]),t._v(" "),_("li",[t._v("证书用途")]),t._v(" "),_("li",[t._v("使用者公钥")]),t._v(" "),_("li",[t._v("使用者私钥")]),t._v(" "),_("li",[t._v("使用者的 "),_("code",[t._v("HASH")]),t._v(" 算法")]),t._v(" "),_("li",[t._v("证书到期时间 等")])])]),t._v(" "),_("li",[t._v("证书防护:\n"),_("ul",[_("li",[t._v("生成数字签名\n"),_("ul",[_("li",[t._v("使用 CA 自带 HASH 算法对证书内容 HASH, 得到一个摘要, 再用 CA 私钥加密, 最终得到数字签名")])])]),t._v(" "),_("li",[t._v("数字签名证明\n"),_("ul",[_("li",[t._v("使用 "),_("strong",[t._v("公钥")]),t._v(" 对证书解密, 得到 CA 创建的证书摘要, 两者对比, 一样则未篡改, 不一样则是被篡改过")])])])])])])])]),t._v(" "),_("h3",{attrs:{id:"参考资料"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#参考资料"}},[t._v("#")]),t._v(" 参考资料")]),t._v(" "),_("ul",[_("li",[_("a",{attrs:{href:"https://mp.weixin.qq.com/s/I32b0vdHJ9qkHaTHmZjU7w",target:"_blank",rel:"noopener noreferrer"}},[t._v("一篇文章读懂HTTPS及其背后的加密原理"),_("OutboundLink")],1)]),t._v(" "),_("li",[_("a",{attrs:{href:"https://www.cxymsg.com/guide/http.html#https%E6%98%AF%E5%A6%82%E4%BD%95%E4%BF%9D%E8%AF%81%E5%AE%89%E5%85%A8%E7%9A%84%EF%BC%9F",target:"_blank",rel:"noopener noreferrer"}},[t._v("https是如何保证安全的?"),_("OutboundLink")],1)])])])}),[],!1,null,null,null);v.default=r.exports}}]);