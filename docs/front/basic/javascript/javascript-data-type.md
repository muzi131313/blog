---
title: 2. 数据类型基础
---

### js的数据类型都有哪些?
- 6种基本数据类型(`BigInt`: `es10`)
    - `null`
    - `undefined`
    - `Boolean`
    - `Number`
    - `String`
    - `Symbol`
- 引用类型
    - `Object`: 对象
    - 特殊 `Object`
        - 其他引用类型
            - `Function`
            - `Array`
            - `Date`
            - `RegExp`
        - 包装类型
            - `Boolean`
            - `String`
            - `Number`
### `Symbol` 的特点是什么?
- 实例是唯一的, 想创建两个一样的, 需要使用 `Symbol.for()`
- 不能使用构造函数去创建, 通过 `Symbol()` 函数生成
    > 生成的 `symbol` 为原始数据类型, 所以不能通过 `new` 来创建

- 作为 `Object` 对象属性时, 只能 `Object.getOwnPropertySymbols` 来获取, 使用 `for...in`, `Object.keys`, `Object.getOwnPropertyNames` 遍历不到
- 应用场景
    - 当做 `Object` 对象的私有属性
    - 用来替代常量
    - 用来作为类的私有属性和方法, 还能防止属性污染

### 装箱/拆箱
- 自动装箱: 需要时, 原始类型自动转换成相应的包装对象, 以便调用包装对象的方法
    ```
    '123'.substr(1) // => 23
    // 等同于
    var temp = new String('123')
    temp.substr(1)
    temp = null
    // 原始数据类型和装箱后的不同
    console.log('123') // => 123
    console.log(new String('123')) // => String {"123"}
    ```
- 自动拆箱: 需要时, 原始类型包装对象自动转换为原始类型
    ```
    var str = new String('123')
    console.log(typeof str) // => object
    str += 3
    console.log(typeof str) // => string
    ```

### 引用类型到基本类型的转换(拆箱)?
- 遵循 `toPrimitive` 原则
- ToPrimitive(input, [perferredType])
    - perferredType: **引用类型要转换的类型**
        - 不传
            - 如果 `input` 是内置的 `Date` 类型，`PreferredType` 视为 `String`
            - 否则为 `Number`
        - `Number`
            - 如果 `input` 是原始类型, 直接返回
            - 调用 `input.valueOf()`, 如果是原始类型就返回
            - 调用 `input.toString()`, 如果是原始类型就返回
            - 抛出 `TypeError`
        - `String`
            - 如果 `input` 是原始类型, 直接返回
            - 调用 `input.toString()`, 如果是原始类型就返回
            - 调用 `input.valueOf()`, 如果是原始类型就返回
            - 抛出 `TypeError`

### 发生类型转换的情况?
- `if` 语句和逻辑语句
    - 被转换为 `false` 的情况
        - `null`
        - `undefined`
        - `''`
        - `NaN`
        - `0`
        - `false`
- 各种数学运算符
    - `+`
        - 一侧为 `String`, 另外一侧为其他类型, 则优先转换为 `String`, 再进行拼接
        - 一侧为 `Number`, 另外一侧为原始类型, 则原始类型转换为 `Number` 之后, 再进行运算
        - 一侧为 `Number`, 另外一侧为引用类型, 则 `Number` 转换为字符串, 和引用类型相拼接
    - 其他符合
        - 会将非 `Number` 类型的数据转为 `Number` 之后再进行运算
- `==`
    - `NaN`: 和任何值比较都返回 `false`(包括它自己)
    - `Boolean`: 和其他值比较, 会先转换为 `Number`
    - `String`: 和 `Number` 比较, 会先转换为 `Number`
    - `null` 和 `undefined`: 两者比较(或相互各自比较)为 `true`, 两者和其他比较都为 `false`
    - 原始类型和引用类型, 对象会按照 `ToPrimitive` 转换为原始类型
        ```
        '[object Object]' == {} // => true
        '1,2,3' == [1, 2, 3]
        ```

### 数据转换相关的面试题
- 面试题: `[] == ![]` 结果是什么? 为什么?
    - 结果是 `true`
    - `!`的优先级最高, 所以 `![]` 转换为 `false`, `boolean` 和其他值比较, 先转换成数值, `false` 转换成数值是 `0`, `[]`转换成数值也是 `0`, 所以相等
- 面试题: `[undefined] == false`结果是什么? 为什么?
    - 结果是 `true`
    - `boolean` 和其他值比较, 两边会先转换成数值, 两边都为 `0`, 所以相等
- 面试题: 如何让 `a == 1 && a == 2 && a == 3`
    - <details>
        <summary>参考答案</summary>

        ```javascript
        var a = {
            value: [ 1, 2, 3 ],
            valueOf() {
                return this.value.shift()
            }
        }
        var d = a == 1 && a == 2 && a == 3
        console.log(d) // => true
        ```
      </details>
- 面试题: `0.1+0.2=0.3`对不对? 为什么?
    - 不对
    - 转换成二进制时, 精度丢失, 所以相加后再转换10进制时, 导致结果不正确
    - IEEE 754
        - 符号位: 标识正负的
        - 指数位: 存储科学计数法的指数
        - 尾数位: 存储科学计数法后的有效数字
    - [0.30000000000000004.com](http://0.30000000000000004.com/)
    - 推荐
        - [number-precision](https://github.com/nefe/number-precision)
        - [mathjs](https://github.com/josdejong/mathjs/)
- 面试题: JavaScript 表示最大数字
    - `Number.MAX_VALUE`: 1.111...X 2<sup>1023</sup>, 转换成十进制 `1.7976931348623157e+308`
    - IEEE 754
        - 指数位: 能表示最大的数字 `1023`(十进制)
        - 尾数位: 尾数位都是 `1` 的情况
- 面试题: 最大安全数字
    - `Number.MAX_SAFE_INTEGER`: 1.111...X 2<sup>52</sup>
    - 推荐
        - [node-bignum](https://github.com/justmoon/node-bignum)
        - [node-bigint](https://github.com/substack/node-bigint)
- 面试题: 操作运算符的优先级是什么？
    - [优先级汇总表#mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)
- 面试题:
    ```
    {} + 123 // => 123
    123 + {} // => 123[object Object]
    ```
    - `{} + 123`, 会认为 `{}`是个代码块, 先执行了, 改成`let o = {}; console.log(o + 123)`就行了
    - `123 + {}`: 引用类型 `{}` 会先执行 `ToPrimitive`, 第二个参数是 `Number`, 会先执行 `toString`, 返回 `[object Object]`, `123` 数字和字符串相加, 就返回 `123[object Object]`

### 几种常见的(隐式类型)转换规则?
- toBoolean
    - <details>
        <summary>转换规则</summary>

        | Argument Type | Result |
        | - | - |
        | Undefined | false |
        | Null | false |
        | Boolean | 原值 |
        | Number | +0、-0、NaN 为 false, 1 为 true |
        | String | '' 为 false, 非 '' 为true |
        | Symbol | true |
        | Object | true |
      </details>
- toNumber
    - <details>
        <summary>转换规则</summary>

        | Argument Type | Result |
        | - | - |
        | Undefined | NaN |
        | Null | +0 |
        | Boolean | true 为 1, false 为 +0 |
        | Number | 原值 |
        | String | '1' 为 数字, 非 '1' 为NaN |
        | Symbol | TypeError |
        | Object | 先primValue = toPrimitive(argument, Number), 再toNumber(primValue) |
      </details>
- toString
    - <details>
        <summary>转换规则</summary>

        | Argument Type | Result |
        | - | - |
        | Undefined | 'undefined' |
        | Null | 'null'' |
        | Boolean | true 为 'true', false 为 'false' |
        | Number | '1' |
        | String | 原值 |
        | Symbol | TypeError |
        | Object | 先primValue = toPrimitive(argument, String), 再toString(先primValue) |
      </details>

- 举例: `new String({a: 1})`的转换是什么?
    - object => string
    - `toPrimtive(input, hint String)`, 调用 `input.toString()`, 返回 `[object Object]`
    - 再调用 `toString('[object Object]')` // => `String {"[object Object]"}`
- 参考: [tc39#ecma262#sec-toprimitive](https://tc39.es/ecma262/#sec-toprimitive)

### `null` 和 `undefined` 的区别
- `null` 是空值, 是已经赋值过的, 转换为 `number` 为0
- `undefined` 是没有赋值时的值,  转换为 `number` 为NaN

### 参考资料
- [你真的掌握变量和类型了吗#CornardLi](https://juejin.im/post/5cec1bcff265da1b8f1aa08f)
- [JavaScript类型转换](https://juejin.im/post/5dc431a0e51d4504be09ca8c)
- [【JS迷你书】类型转换之装箱操作](https://juejin.im/post/5cbaf130518825325050fb0a)
- [JS最新基本数据类型：BigInt](https://juejin.im/post/5d3f8402f265da039e129574)
- [JavaScript 浮点数陷阱及解法](https://github.com/camsong/blog/issues/9)
- [加减危机 —— 为什么会出现这样的结果？](https://mp.weixin.qq.com/s/nWacVMwTpGBlMquZhRAvYg)
- 文档类
    - [非严格相等](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness#%E9%9D%9E%E4%B8%A5%E6%A0%BC%E7%9B%B8%E7%AD%89)
    - [ecma-262#sec-11.9.3](http://ecma-international.org/ecma-262/5.1/#sec-11.9.3)
    - [指数记数法与十的次方](https://www.shuxuele.com/index-notation-powers.html)
