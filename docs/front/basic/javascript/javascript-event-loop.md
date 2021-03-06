---
title: 3. Event-Loop
---

### 概念
- 堆
    - 释义: 利用 **完全二叉树** 维护的一组数据
    - 性质: 线性数据结构, 相当于一维数据
- 栈
    - 释义: 仅在 **表尾** 进行增加/删除操作的 *受限线性表*
    - 性质: 先进后出(LIFO) - Last in first out
- 队列
    - 释义: 仅在 **表尾** 删除操作, **表头**增加的 *受限线性表*
    - 性质: 先进先出(FIFO) - Frist in first out
- EventLoop
    - MacroTask: 宏任务
        - script 全部代码
        - setTimeout/setInterval
        - setImmediate: 浏览器不支持(只有IE10支持, 见[setImmeidate#MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setImmediate))
        - I/O
        - UI Rendering
    - MicroTask: 微任务
        - Promise
        - [process.nextTick](https://nodejs.org/zh-cn/docs/guides/event-loop-timers-and-nexttick/#process-nexttick): NodeJS 独有
        - Object.observe: 废弃
        - [MutationObserve#mdn](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver)

### 浏览器中的EventLoop
- JavaScript 线程
    - main thread: 主线程
    - call-stack: 调用栈
        - 规则: **后进先出**
        - 所有任务都会被放到调用栈中, 等待主线程执行
- 单线程任务
    - 同步任务: 在调用栈中按照顺序, 等待主线程依次执行
    - 异步任务: 有结果返回、主线程空闲后，将注册的回调函数放入到 **任务队列** 中, 被读取到栈内, 等待主线程执行
- 任务队列
    - 规则: **先进先出** 的数据结构
- 事件循环机制模型
    - 选择当前要执行的任务队列
        - 如果任务队列不为空
            - 选择任务队列中最先进入的任务
            - 将 **事件循环** 的任务设置为 *已选择任务*
            - 执行任务
            - 将 *事件循环* 中的 **当前运行任务** 设置为 `null`
            - 将 *运行完成的任务* 从 *任务队列* 中删除
        - 如果任务队列为空
            - microtasks步骤: 进入 microtask 检查点
    - 更新界面渲染
    - 返回第一步
- 执行 microtask 检查点, 用户代理会执行以下步骤
    - 设置 microtask 检查点为 `true`
    - 当事件循环 microtask 不为空时
        - 选择一个 **最先进入** *microtask 队列* 中的 microtask
        - 将事件循环中的 microtask 设置为 *选择的 microtask*
        - 执行 microtask
        - 将事件循环中的 microtask 设置为 `null`
        - 删除 *microtask 队列* 中 **当前已执行** 的 microtask
    - 清理 *IndexDB* 事务
    - 将 microtask 检查点设置为 `false`

### NodeJS中的EventLoop
- timers: 定时器
    - 本阶段执行已经安排的 `setTimeout()` 和 `setInterval()` 的回调函数
- pending callbacks: 待定回调
    - 执行延迟到下一个循环迭代的 I/O 回调
- idle, prepare:
    - 仅系统内部使用
- poll: 轮询
    - 检索新的 I/O 事件; 执行 I/O 相关的回调, 其余情况 node 都将在此阻塞
- check: 检测
    - `setImmediate()` 回调函数在此执行
- close callbacks: 关闭回调的函数
    - 一些准备关闭的回调函数, 如 `socket.on('close', () => {})` 或 `http.server.on('close, fn)`

### 参考资料
- [做题学知识(3)之 Event Loop](https://juejin.im/post/5dc2635de51d452d6072f758)
- [一次弄懂Event Loop#光光同学](https://juejin.im/post/5c3d8956e51d4511dc72c200)
    - [EventLoop](https://www.cxymsg.com/guide/eventLoop.html)
- [EventLoop#mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop)
- [nodejs#event-loop-timers-and-nexttick](https://nodejs.org/zh-cn/docs/guides/event-loop-timers-and-nexttick/)
