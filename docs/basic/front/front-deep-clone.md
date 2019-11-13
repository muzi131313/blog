---
title: 5. 深拷贝
---

### 引用数据类型的判断？
- 通过 `typeof`, 判断是 `object` 或 `function`, 并且不为 `null`

### 深拷贝怎么实现?
- 深拷贝和浅拷贝的区别
    - 浅拷贝对基本数据类型是值拷贝, 对引用数据类型是地址引用拷贝
    - 深拷贝对基本数据类型和引用数据类型，都是值拷贝
- 深拷贝简单实现
    - `JSON.parse(JSON.stringify(obj))`
    - 优劣
        - 无法实现特殊对象(RegExp、函数等)的copy
        - 会抛弃对象的 constructor, 所有构造函数都指向 Object
        - 对象循环引用, 会报错
- 深拷贝深入实现
    - 对基本数据类型直接返回
    - 引用类型的初始化, 通过 `Object.create(target.constructor.prototype)` 创建一个新对象
        - `new target.constructor()`: 这种会调用父类构造函数
    - 通过递归, 处理 `Object` 类型的数据, 并赋值给新创建的 `Object`
    - 处理可遍历的数据
        - 判断如果值是数组, 则赋值给新创建的 `Array`
        - 对于循环引用, 设置第二个参数为 `WeakMap`, 用来缓存记录某个值是否拷贝过, 拷贝就直接返回这个值
        - 对于 `Set` 数据, 则通过 `Set.prototype.add` , 赋值给新创建的 `Set`
        - 对于 `Map` 数据, 则通过 `Map.prototype.set`, 赋值给新创建的 `Map`
        - 对于 `Function` 拷贝
            - 通过对象的 `prototype` 判断是否是箭头函数, 是的话直接 `eval(target.toString())` 返回
            - 不是的话, 则通过 `toString()` 获取到函数内容
                - 通过正则解析到函数体和参数, 然后通过 `new Function` 返回新函数
                    - bodyReg: `/(?<={)(.|\n)*(?=})/m`
                    - paramReg: `/(?<=\().*(?=\)\s*{)/`
                    - 新函数: `new Function(...paramReg, bodyReg)`
                - 解析不到, 返回一个空函数 `new Function`
    - 处理不可遍历的数据
        - 对于 `Date` 拷贝
            - `Object.create(target.constructor.prototype)`
        - 对于 `Boolean` 拷贝
            - 拷贝
                - `new Object(String.prototype.valueOf.call(target))`
            - 有一个小问题
                ```
                const target = new Boolean(false);
                const Ctor = target.constructor;
                new Ctor(target); // 结果为 Boolean {true} 而不是 false。
                ```
        - 对于 `String` 拷贝
            - `new Object(String.prototype.valueOf.call(target))`
        - 对于 `Number` 拷贝
            - `new Object(String.prototype.valueOf.call(target))`
        - 对于 `RegExp` 拷贝
            ```
            var reg = /\w*$/.exec(target)
            var cloneReg = new RegExp(target.source, reg)
            cloneReg.lastIndex = target.lastIndex
            ```
        - 对于 `Symbol` 拷贝
            ```
            Symbol(target.description)
            ```
    - <details>
        <summary>深拷贝实现</summary>

        ```javascript
        // 另外一种获取对象类型的方法
        // Object.prototype.toString.call({}).slice(8, -1)
        var objType = obj => Object.prototype.toString.call(obj).match(/\[(?:[\w]+)\s([\w]+)\]/)[1]
        // 可循环引用
        var arrayTag = 'Array'
        var mapTag = 'Map'
        var setTag = 'Set'
        var argTag = 'Argument'
        var objTag = 'Object'

        // 不可循环引用
        var booleanTag = 'Boolean'
        var dateTag = 'Date'
        var numberTag = 'Number'
        var bigIntTag = 'BigInt'
        var stringTag = 'String'
        var symbolTag = 'Symbol'
        var errorTag = 'Error'
        var regExpTag = 'RegExp'
        var functionTag = 'Function'

        var deepTags = [ arrayTag, mapTag, setTag, argTag, objTag ]

        // 判断是否是引用数据类型
        function isObject(obj) {
          const objType = typeof obj
          return obj !== null && ~[ 'object', 'function' ].indexOf(objType)
        }

        // 可循环引用对象
        function getInit(obj) {
          var Ctor = obj.constructor
          // return Object.create(obj.constructor.prototype)
          return new Ctor()
        }

        /** 和上面的 getInit 是一样的
        function getInit2(obj) {
          // 处理对象原型
          var proto = Object.getPrototypeOf(obj)
          return Object.create(proto)
        }
        */

        /**
         * Function拷贝: 没有应用场景
         * 1. 作用域、上下文
         * 2. 有些函数toString出来的是native code
         */
        function copyFunc(func) {
          // ?<= 正向后行断言
          // ?= 正向先行断言
          // m: 多行匹配符
          const bodyReg = /(?<={)(.|\n)+(?=})/m
          const paramReg = /(?<=\().+(?=\)\s*{)/
          // TODO: 有些函数toString出来的是native code
          const funcString = func.toString()
          if (func.prototype) {
            const param = paramReg.exec(funcString)
            const body = bodyReg.exec(funcString)
            if (body) {
              if (param) {
                const paramArr = param[0].split(',')
                // eslint-disable-next-line
                return new Function(...paramArr, body[0])
              }
              else {
                // eslint-disable-next-line
                return new Function(body[0])
              }
            }
            else {
              // eslint-disable-next-line
              return new Function()
            }
          }
          // 箭头函数没有prototype属性
          else {
            if (funcString.includes('{ [native code] }')) {
              return func
            }
            else {
              // eslint-disable-next-line
              return eval(funcString)
            }
          }
        }

        /**
         * @name cloneSymbol
         * @param {Symbol} target symbol数据
         * @created 2019年11月11日00:02:45
         */
        function cloneSymbol(target) {
          return Object(Symbol.prototype.valueOf.call(target))
        }

        /**
         * @name cloneRegExp
         * @param {RegExp} target 正则
         * @created 2019年11月11日00:03:24
         */
        function cloneRegExp(target) {
          const regFlags = /\w*$/
          const result = new target.constructor(target.source, regFlags.exec(target))
          result.lastIndex = target.lastIndex
          return result
        }

        // clone其他类型的数据
        function cloneOtherType(target, targetType) {
          switch (targetType) {
            case booleanTag:
            case numberTag:
            case bigIntTag:
            case stringTag:
            case errorTag:
            case dateTag:
              return new target.constructor(target)
            case symbolTag:
              return cloneSymbol(target)
            case regExpTag:
              return cloneRegExp(target)
            case functionTag:
              return copyFunc(target)
            default:
              return target
          }
        }

        /**
         * @todolist 未实现copy
         *  1. getter setter拷贝
         *  2. 类实例copy
         *  3. dom copy
         */
        module.exports = function deepClone(target, map = new WeakMap()) {
          // 简单数据类型直接返回
          if (!isObject(target)) {
            return target
          }

          const targetType = objType(target)
          let cloneTarget
          if (deepTags.includes(targetType)) {
            cloneTarget = getInit(target)
          }
          else {
            return cloneOtherType(target, targetType)
          }
          // 处理循环应用
          if (map.has(target)) {
            return target
          }
          map.set(target, true)

          // 处理Map
          if (targetType === mapTag) {
            target.forEach(key => {
              cloneTarget.set(key, target[key])
            })
            return cloneTarget
          }

          // 处理Set
          if (targetType === setTag) {
            target.forEach(key => {
              cloneTarget.add(target[key])
            })
            return cloneTarget
          }

          // 处理对象和数组
          cloneTarget = targetType === arrayTag ? [] : {}
          for (const key in target) {
            var val = target[key]
            // TODO: 递归爆栈问题?
            cloneTarget[key] = deepClone(val, map)
          }
          return cloneTarget
        }
        ```
      </details>
### `WeakMap` 和 `Map` 的区别
- `WeakMap` 对key是弱引用, `Map`对key是强引用

### 参考资料
- [如何写一个惊艳面试官的深拷贝](http://www.conardli.top/blog/article/JS%E8%BF%9B%E9%98%B6/%E5%A6%82%E4%BD%95%E5%86%99%E5%87%BA%E4%B8%80%E4%B8%AA%E6%83%8A%E8%89%B3%E9%9D%A2%E8%AF%95%E5%AE%98%E7%9A%84%E6%B7%B1%E6%8B%B7%E8%B4%9D.html#%E5%AF%BC%E8%AF%BB): conardli
- [进阶4-3期】面试题之如何实现一个深拷贝](https://github.com/yygmind/blog/issues/29): yygmind(木易杨)
