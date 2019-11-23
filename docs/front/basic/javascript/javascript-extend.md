---
title: 5. 继承基础
---

### 实现继承的几种方式都是什么?
- <details>
    <summary> 类继承 </summary>

    ```javascript
    function SuperClass() {
        this.superValue = true
        this.languages = [ 'js', 'css' ]
    }
    SuperClass.prototype.getSuperValue = function () {
        return this.superValue
    }
    function SubClass() {
        this.subValue = true
    }
    SubClass.prototype = new SuperClass()
    SubClass.prototype.getSubValue = function() {
        return this.subValue
    }
    var sub = new SubClass()
    console.log(sub instanceof SuperClass); // true
    console.log(sub instanceof SubClass);	// true
    console.log(SubClass instanceof SuperClass); // false
    console.log(SubClass.prototype instanceof SuperClass); // true

    console.log(sub.languages) // => ["js", "css"]
    sub.languages.push('html') // 改变继承父类的属性, 会污染再次实例化的子类所继承的父类属性
    var sub2 = new SubClass()
    console.log(sub2.languages) // => ["js", "css", "html"]
    ```
  </details>

    - 缺点: 改变父类的属性, **会污染再次实例化的其他子类继承到的父类属性**
- <details>
    <summary> 构造函数继承 </summary>

    ```javascript
    function SuperClass() {
        this.superValue = true
        this.languages = [ 'js', 'css' ]
    }
    SuperClass.prototype.getSuperValue = function () {
        return this.superValue
    }

    function SubClass(superValue, languages) {
        SuperClass.call(this, superValue, languages)
    }
    var sub = new SubClass()
    sub.languages.push('html') // 1.1.改变父类属性
    console.log(sub.superValue) // => true
    console.log(sub.languages) // => ["js", "css", "html"]
    var sub2= new SubClass()
    console.log(sub2.languages) // => ["js", "css"]  1.2.其他子类继承的父类的属性不会被污染
    console.log(sub2.getSuperValue()) // 不能直接继承父类原型, 只能继承父类构造函数内的属性和方法
    ```
  </details>

    - 缺点: **不能直接继承父类原型**, 只能继承父类构造函数内的属性和方法
- <details>
    <summary> 组合继承 </summary>

    ```javascript
    function SuperClass() {
        this.superValue = true
        this.languages = [ 'js', 'css' ]
    }
    SuperClass.prototype.getSuperValue = function () {
        return this.superValue
    }

    function SubClass(superValue, languages) {
        SuperClass.call(this, superValue, languages)
    }
    // 组合继承的要点
    SubClass.prototype = new SuperClass()
    var sub = new SubClass()
    sub.languages.push('html') // 1.1.改变父类属性
    console.log(sub.superValue) // => true
    console.log(sub.languages) // => ["js", "css", "html"]
    var sub2= new SubClass()
    console.log(sub2.languages) // => ["js", "css"]  1.2.其他子类继承的父类的属性不会被污染
    console.log(sub2.getSuperValue()) // 可以直接继承父类原型, 以及父类构造函数内的属性和方法
    ```
  </details>

    - 缺点: *每次创建子类, 要调用一下父类的构造函数*
- <details>
    <summary>原型继承</summary>

    ```javascript
    // 等同于Object.create
    function inheritObj(o) {
        // 声明一个过渡函数
        var F = function() {}
        // 过渡对象的原型继承父对象
        F.prototype = o
        return new F()
    }

    function SuperClass() {
        this.superValue = true
        this.languages = [ 'js', 'css' ]
    }

    var subClass = inheritObj(SuperClass)
    var sub = new SubClass()
    sub.languages.push('html')
    console.log(sub.languages) // ["js", "css", "html"]
    var sub2 = new SubClass()
    console.log(sub2.languages) // ["js", "css"]
    ```
  </details>

  - 缺点: **和组合继承一样, 每次创建子类, 要调用一下父类的构造函数**
  - 优点: *承载继承的是一个空函数, 所以内存开销较小*

- <details>
    <summary>寄生继承</summary>

    ```javascript
    // 等同于Object.create
    function inheritObj(o) {
        // 声明一个过渡函数
        var F = function() {}
        // 过渡对象的原型继承父对象
        F.prototype = o
        return new F()
    }
    function createAnother(original){
        var clone = Object.create(original);    //通过调用函数创建一个新对象
        clone.sayHi = function(){               //以某种方式来增强这个对象
            console.log("Hi");
        };

        // 返回这个对象
        return clone;
    }
    var person = {
        name: "Bob",
        friends: ["Shelby", "Court", "Van"]
    };
    var anotherPerson = createAnother(person);
    anotherPerson.sayHi();
    ```
  </details>
- <details>
    <summary>寄生组合继承</summary>

    ```javascript
    function inheritObject(o){
    	// 声明一个过渡函数
    	function F(){}
    	// 过渡对象的原型继承父对象
    	F.prototype = o;
    	return new F();
    }
    function inheritPrototype(subClass, superClass){
    	// 复制一份父类的原型副本保存在变量
    	var p = inheritObject(superClass.prototype);
    	// 修正因为重写子类原型导致子类的constructor指向父类
    	p.constructor = subClass;
    	// 设置子类的原型
    	subClass.prototype = p;
    }

    // 定义父类
    function SuperClass(name){
    	this.name = name;
    	this.colors = ['red','blue'];
    }
    // 定义父类原型方法
    SuperClass.prototype.getName = function(){
    	return this.name;
    }
    // 定义子类
    function SubClass(name, time){
    	// 构造函数继承
    	SuperClass.call(this,name);
    	// 子类新增属性
    	this.time = time;
    }
    // 寄生式继承父类原型
    inheritPrototype(SubClass, SuperClass);
    // 子类新增原型方法
    SubClass.prototype.getTime =function(){
    	return this.time;
    }

    var test1 = new SubClass('js book', 2014);
    var test2 = new SubClass('css book', 2013);
    test1.colors.push('black');
    console.log(test1.colors); //  => ['red','blue','black']
    console.log(test2.colors); // => ['red','blue']
    console.log(test1.getName()); // => js book
    console.log(test2.getName()); // => css book
    ```
  </details>

    - **通过借用构造函数来继承属性**
    - **通过原型链来继承方法**
- <details>
    <summary>class继承</summary>

    ```javascript
    class Polygon {
      constructor(height, width) {
        this.height = height;
        this.width = width;
      }
    }

    // 通过extends, 以及构造函数中调用super, 实现继承
    class Square extends Polygon {
      constructor(sideLength) {
        // super关键字将单独出现，并且必须在使用this关键字之前使用
        super(sideLength, sideLength);
      }
      get area() {
        return this.height * this.width;
      }
      set sideLength(newLength) {
        this.height = newLength;
        this.width = newLength;
      }
    }

    var square = new Square(2);
    console.log(square) // => Square {height: 2, width: 2}
    ```
  </details>

### 涉及到的知识点
- `new` 所做的事情
    ```
    var obj = {} // 1.初始化一个对象
    obj.__proto__ = Parent.prototype // 2.将obj的__proto__原型指针指向父类Parent的prototype
    Parent.call(obj) // 3.初始化父类构造函数
    ```
    - [new#mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)
    - <details>
        <summary>自定义实现new</summary>

        ```javascript
        function myNew() {
          // 创建一个实例对象
          var obj = new Object();
          // 取得外部传入的构造器
          var Constructor = Array.prototype.shift.call(arguments);
          // 实现继承，实例可以访问构造器的属性
          obj.__proto__ = Constructor.prototype;
          // 调用构造器，并改变其 this 指向到实例
          var ret = Constructor.apply(obj, arguments);
          // 如果构造函数返回值是对象则返回这个对象，如果不是对象则返回新的实例对象
          return typeof ret === 'object' && ret !== null ? ret : obj;
        }
        ```
      </details>
    - <details>
        <summary>测试myNew</summary>

        ```javascript
        // ========= 无返回值 =============
        const testNewFun = function(name) {
          this.name = name;
        };

        const newObj = myNew(testNewFun, 'foo');

        console.log(newObj); // { name: "foo" }
        console.log(newObj instanceof testNewFun); // true
        // ========= 有返回值 =============
        const testNewFun = function(name) {
          this.name = name;
          return {};
        };

        const newObj = myNew(testNewFun, 'foo');

        console.log(newObj); // {}
        console.log(newObj instanceof testNewFun); // false
        ```
      </details>
- `new function` 和 `function` 的区别
    ```javascript
    function Show() {
        this.name = 'test'
        console.log(this)
    }
    var s = new show() // var obj = {}; obj.__proto__ = Show.prototype; Show.call(obj); s = obj
    var s2 = show() // s2 = Show.call(null) s2为undefined, 且this.name中this指向window
    ```
- [instanceof#mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof): 检测构造函数的 `prototype` 属性是否会出现在某个实例对象的原型链
    - <details>
        <summary>自定义实现</summary>

        ```javascript
        function my_instance(object, aObject) {
          var oPrototype = aObject.prototype
          while (object = object.__proto__) {
            if (object === oPrototype) { return true }
          }
          return false
        }
        var a = {}
        var b = 1
        console.log(a instanceof Object) // => true
        console.log(a.__proto__ === Object.prototype) // => true
        console.log(my_instance(a, Object)) // => true
        ```
      </details>
    - <details>
        <summary>使用用例</summary>

        ```javascript
        function C(){}
        var o = new C();
        o instanceof C; // true，因为 Object.getPrototypeOf(o) === C.prototype
        o instanceof Object; // true，因为 Object.prototype.isPrototypeOf(o) 返回 true
        C.prototype instanceof Object // true，同上
        C.constructor.prototype === Function.prototype
        C.__proto__ === Function.prototype
        ```
      </details>
- [Object.create#mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create): 创建一个新对象，使用现有的对象来提供新创建的对象的__proto__
    - <details>
        <summary>polyfill: 由于ECMAScript5以前版本限制, 不支持第一个参数为null</summary>

        ```javascript
        if (typeof Object.create !== "function") {
            Object.create = function (proto, propertiesObject) {
                if (typeof proto !== 'object' && typeof proto !== 'function') {
                    throw new TypeError('Object prototype may only be an Object: ' + proto);
                }
                // 不支持第一个参数为null
                else if (proto === null) {
                    throw new Error("This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument.");
                }

                // 不支持第二个参数
                if (typeof propertiesObject != 'undefined') throw new Error("This browser's implementation of Object.create is a shim and doesn't support a second argument.");

                function F() {}
                F.prototype = proto;

                return new F();
            };
        }
        ```
      </details>
- `.`属性访问
    - 先从自身上查找
    - 查找不到, 从自定义属性（`prototype`）查找
    - 再查找不到, 从上级属性（`__proto__`）上查找, 直到最顶层层级

### 参考资料
- [第一弹之浅析JavaScript继承](https://my.oschina.net/qiangdada/blog/745061?nocache=1573107598201)
- [JS继承 -- 寄生式继承 & 寄生组合式继承](https://www.cnblogs.com/PrajnaParamita/p/5773783.html)
- [javascript 类与继承](https://caelumtian.github.io/2015/05/03/javascript-%E7%B1%BB%E4%B8%8E%E7%BB%A7%E6%89%BF/)
