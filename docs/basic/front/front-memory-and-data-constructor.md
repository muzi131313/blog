---
title: 4. 内存以及数据结构
---

### `JavaScript`  中变量在内存中存储的形式是什么?
- `JavaScript` 分为栈内存和堆内存
    - 栈内存的特点
        - 存储值的大小固定
        - 内存小
        - 由系统自动分配内存空间
        - 可以直接操作其保存的变量, 运行效率高
    - 堆内存的特点
        - 存储值大小不固定, 可动态调整
        - 内存大
        - 通过代码分配内存空间
        - 不能直接操作其内部存储, 使用引用地址读取
- JavaScript 变量存储形式是什么?
    - 基础类型存储在栈中
    - 引用类型存储在堆中
- 堆栈的数据结构是什么?
    - 栈是 `LIFO`(后进先出)
    - 堆是 `FIFO`(先进先出)
- 引用访问是什么？
    - 从栈中找出引用数据类型的地址
    - 然后根据地址, 找到堆中引用数据的值，这种访问叫 *引用访问*
- JavaScript 的内存生命周期是什么?
    - 分配内存
    - 使用内存(读/写)
    - 不需要时, 释放内存
- 所有的基础数据类型都是存放在栈中的么?
    - 如果基础数据类型是被放在闭包中, 那么就会放在堆中

### 垃圾回收
- 垃圾回收(garbage collecation)的方法有哪些？
    - 标记清除(**javascript中常用的清除方式**)
        - 当变量离开执行环境, 就会被 *垃圾收集器* 标记为 *"离开环境"*
    - 引用计数(*现代浏览器不再使用*)
        - 语言引擎有一张表, 保存内存中所有资源(*通常是各种值*)的引用次数, 引用次数为 `0` 的变量会被回收
        - <details>
            <summary>正常引用回收举例</summary>

            ```javascript
            // [1, 2, 3] 不再需要, 引用计数为0, 会被回收掉
            var array = [1, 2, 3]; array = [4, 5]
            ```
          </details>
        - <details>
            <summary>引用计数最大问题: 循环引用</summary>

            ```javascript
            function func() {
                var a = {}
                var b = {}
                a.b = b // b 的引用次数不为 0, 无法被回收
                b.a = a // a 的引用次数不为 0, 无法被回收
            }
            func()
            ```
          </details>
        - 历史
            - <details>
                <summary>IE9 之前循环引用示例</summary>

                ```javascript
                // dom#id 和 click 相互引用, 导致了循环引用
                function setHandler() {
                    // dom#id 通过onclick事件保持了对click函数的引用
                    const ele = document.getElementById('id');
                    // click函数通过外部的词法环境引用了dom+id这个对象, 能访问到
                    ele.onclick = function click() {};
                }
                ```
              </details>
            - Firefox 低版本(Firefox3.0), 使用XPCOM, 基于引用技术策略
            - IE9 之前, 部分对象不是原生 JavaScript 对象
                - `DOM`/`BOM` 使用 c++ 的组合模型对象(`COM`)
                - IE8 采用 *标记清除策略*, c++ 使用 *引用计数*
                - IE6~IE7 使用 *引用计数* 策略
                    - [Memory_Management#mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Memory_Management)
            - IE9 之后, `DOM`/`BOM` 转换成了真正的 JavaScript 对象
                - [IE<8循环引用导致的内存泄露#zhansingsong](https://github.com/zhansingsong/js-leakage-patterns/blob/master/IE%3C8%E5%BE%AA%E7%8E%AF%E5%BC%95%E7%94%A8%E5%AF%BC%E8%87%B4%E7%9A%84%E5%86%85%E5%AD%98%E6%B3%84%E9%9C%B2/IE%3C8%E5%BE%AA%E7%8E%AF%E5%BC%95%E7%94%A8%E5%AF%BC%E8%87%B4%E7%9A%84%E5%86%85%E5%AD%98%E6%B3%84%E9%9C%B2.md)
- 垃圾回收机制什么?
    - 分代回收机制
        - 来源: **世代假说**
            - 新生的倾向于死亡
            - 不死的对象, 会活的更久
- V8 的内存分代
    - 新生代: 对象存活时间较短。只经历过一次垃圾回收
    - 老生代: 对象存活时间较长。经历过一次或多次垃圾回收
        - 特点
            - 存活对象多
            - 存活时间长
- 全停顿
    - 垃圾回收执行前, 需要将逻辑暂停, 等垃圾回收执行后, 再继续执行应用逻辑, 这种行为称为 **全停顿**
    - 原因: 避免应用逻辑和垃圾回收期看到的不一样
- Scavenge 算法
    - 主要依靠 Cheney 算法实现
- Cheney 算法
    - 释义
        - 垃圾回收方式: 复制
        - 做法: 将堆空间一分为二, 每一块成为 semispace
        - FROM 空间: 使用中的 semispace
        - TO 空间: 闲置的 semispace
    - 过程
        - 从 From 空间分配内存, 如果内存分配完毕, 则执行 Scavenge 算法, 进行垃圾回收
        - 检查 From 空间的存活对象
            - 若对象存活, 则检查是否符合对象晋升, 符合的话, 晋升到老生代, 否则将对象从 From 空间拷贝到 To 空间
            - 若对象不存活的话, 则释放不存活对象的空间
        - 检查完毕, 则进行 From 空间和 To 空间进行角色反转(flip)
    - 对象晋升
        - 对象是否经历过 Scavenge 回收
            - 经历过的话, 直接放到老生代
            - 没有经历过的话, 复制到 To 空间
        - 检测 To 空间占比是否超过限制
            - 超过 25% 的话, 直接晋升到老生代
                - 设置 25% 的原因, 是因为完成 scavenge 回收后, 要进行 semispace 反转, From 空间转换成 To 空间
- Mark-Sweep: 标记-清除
    - 遍历堆中的所有对象, 标记所有的存活对象
    - 清理没有标记的对象
- Mark-Compact: 标记-整理
    - 把堆中所有对象, 移动到另外一边
    - 然后清理在边界外的对象
- Mark-Sweep 和 Mark-Compact 的比较
    - Mark-Sweep 因为不移动对象, 所以清理后的空间是不连续的
        - 弊端: 分配一个较大的对象, 如果没有单个内存空间能承载住, 将会触发一次垃圾回收(*没有必要*)
    - Mark-Compact 因为要移动对象, 所以效率较低, 一般在内存不够的时候使用
- Incremental Marking(增量标记)
    - V8 将一次停顿的标记过程, 分成很多小段, 执行一会标记, 就让程序逻辑执行一会, 交替多次后完成标记
        - 原因: 老生代中存活对象多, 垃圾回收时间长, 全停顿影响较大
- lazy sweeping(延迟清理)
    - 发生在增量标记后
    - 确切知道多少空间被释放
    - 延迟清理被允许, 页面清理可以根据实际需要进行
    - 延迟清理之后, 增量标记将重新开始

### 内存泄露
- 意外的全局变量
    - <details>
        <summary>举例</summary>

        ```javascript
        function foo() {
            bar = "this is a hidden global variable";
            // or
            this.variable = "potential accidental global"
        }
        foo()
        ```
      </details>
    - 解决方法: 使用 `use strict` 启用 JavaScript 严格模式
- 被遗忘的定时器/回调函数
    - <details>
        <summary>举例</summary>

        ```javascript
        var someResource = getData();
        setInterval(function() {
            var node = document.getElementById('node');
            if(node) {
                // 处理 node 和 someResource
                node.innerHTML = JSON.stringify(someResource));
            }
        }, 1000);
        document.getElementById('node').remove()
        // 节点被删除, 但是定时器保持这对someResource的引用, 定时器和someResource不会被销毁
        ```
      </details>
- 闭包
    - 内部函数引用外部函数, 形成的闭包
    - <details>
        <summary>闭包举例</summary>

        ```javascript
        function bindEvent() {
          var obj = document.getElementById('id')
          obj.onclick = function() {}
        }
        ```
      </details>
    - <details>
        <summary>解决举例</summary>

        ```javascript
        // 1.将事件处理函数定义在外面
        var onclickHandler = function() {}
        function bindEvent() {
          var obj = document.getElementById('id')
          obj.onclick = onclickHandler
        }
        // 2.或者在定义事件处理函数的外部函数中，删除对dom的引用
        function bindEvent() {
          var obj = document.getElementById('id')
          obj.onclick = function() {
            // Even if it is a empty function
          }
          obj = null
        }
        ```
      </details>
- 删除了 DOM, 却没有清理对 DOM 元素的引用变量
    - <details>
        <summary>举例</summary>

        ```javascript
        var button = document.getElementById('button')
        // DOM 元素被删除, 但是 button 变量对 DOM 元素仍有引用, 不能被 GC 回收
        document.body.removeChild(document.getElementById('button'))
        // 解决方法: 删除DOM时, 同时清理引用DOM
        // button = null
        ```
      </details>

### 内存泄露的识别与避免
- 浏览器中识别
    - 方法
        - 打开 Chrome 的 Performance
        - 勾选 Screenshots 和 Memory
        - 左上角小圆点开始录制
        - 停止录制
    - 如果内存使用稳定, 则不存在内存泄露; 反之, 则存在
- Node 中识别
    - 方法
        - [process.memoryUsage](https://nodejs.org/api/process.html#process_process_memoryusage)
            - rss（resident set size）：所有内存占用，包括指令区和堆栈。
            - heapTotal："堆"占用的内存，包括用到的和没用到的。
            - heapUsed：用到的堆的部分。
            - external： V8 引擎内部的 C++ 对象占用的内存。
        - `node --expose-gc`
            - `--expose-gc`: 允许手动调用 `gc` 回收 `global.gc()`
            - `WeakMap`: 弱引用
- 避免
    - 方法
        - 减少全局变量、或者生命周期长的对象, 对无用的数据进行垃圾回收
        - 注意程序逻辑, 避免“死循环”
        - 避免创建对象
            - <details>
                <summary>函数返回一个函数的示例</summary>

                ```javascript
                function func() {
                    return function() {};
                }
                ```
              </details>
    - 准则: 及时清理不用的变量

### 垃圾回收场景优化
- 数组复用: 一个数组变量尽可能的重用, 删除数组时使用 `array.length = 0`
    - <details>
        <summary>数组复用</summary>

        ```javascript
        const arr = [1, 2, 3, 4];
        console.log('浪里行舟');
        arr.length = 0  // 可以直接让数字清空，而且数组类型不变。
        // arr = []; 虽然让a变量成一个空数组,但是在堆上重新申请了一个空数组对象。
        ```
      </details>
- 对象复用: 尤其在循环的地方, 能复用就复用, 不用的时候设置为 `null`
    - <details>
        <summary>对象复用</summary>

        ```javascript
        var t = {} // 每次循环都会创建一个新对象。
        for (var i = 0; i < 10; i++) {
          // var t = {};// 每次循环都会创建一个新对象。
          t.age = 19
          t.name = '123'
          t.index = i
          console.log(t)
        }
        t = null //对象如果已经不用了，那就立即设置为null；等待垃圾回收。
        ```
      </details>
- 循环中的函数表达式: 最好放到外面, 不用的时候设置为 `null`
    - <details>
        <summary>函数放到循环外(推荐)</summary>

        ```javascript
        // 推荐用法
        function t(a) {
          console.log(a)
        }
        for (var k = 0; k < 10; k++) {
          t(k)
        }
        t = null

        ```
      </details>
    - <details>
        <summary>函数放到循环中(不推荐)</summary>

        ```javascript
        // 在循环中最好也别使用函数表达式。
        for (var k = 0; k < 10; k++) {
          var t = function(a) {
            // 创建了10次  函数对象。
            console.log(a)
          }
          t(k)
        }
        ```
      </details>
### 参考资料
- [JavaScript中的垃圾回收和内存泄漏](https://juejin.im/post/5cb33660e51d456e811d2687)
- [JavaScript内存管理](https://www.cxymsg.com/guide/memory.html)
