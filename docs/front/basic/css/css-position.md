---
title: 7. CSS定位
---

## position
- static
    - position 的默认属性
    - 浏览器按照源码的位置，决定每个元素的位置
    - top/bottom/left/right 属性无效
- relative
    - 相对于某个基点定位，不会其他元素的位置产生影响
    - 相对于 **static** 元素产生偏移
    - 必须搭配 top/bottom/left/right 四个属性一起使用
- absolute
    - 相对于某个基点定位，不会其他元素的位置产生影响
    - 相对于 **上级** 元素产生偏移
    - 必须搭配 top/bottom/left/right 四个属性一起使用
    - 正常页面流中，该元素所占空间为零，周边元素不受影响
- fixed
    - 相对于某个基点定位，不会其他元素的位置产生影响
    - 相对于 **视窗（viewport）** 产生偏移
    - 搭配 top/bottom/left/right 元素使用时，初始位置是视窗
    - 否则，则初始位置是元素默认位置
- sticky
    - 生效前提是，搭配 top/bottom/left/right 使用
        - 且 **目标元素** 中需要有 relative 定位
    - 否则，等同于 relative 定位

## sticky 应用
- 吸顶
    ```
    .up-to-top {
      position: -webkit-sticky; /* safari 浏览器 */
      position: sticky; /* 其他浏览器 */
      top: 0px;
    }
    ```
- 堆叠效果
    - html 代码
        ```
        <div class="img-wrap"><img src="pic1.jpg"></div>
        <div class="img-wrap"><img src="pic2.jpg"></div>
        <div class="img-wrap"><img src="pic3.jpg"></div>
        ```
    - css 代码
        ```
        .img-wrap {
            position: sticky;
            top: 0px;
        }
        ```

- 表格表头锁定
    - `<thead` 和 `<tr>` 没有 `relative` 定位
    - <details>
        <summary> html代码 </summary>

        ```html
        <table>
          <thead>
            <tr> <th>Name</th> <th>Favorite Color</th> </tr>
          </thead>
          <tbody>
            <tr> <td>Bob</td> <td>Yellow</td> </tr>
            <tr> <td>Michelle</td> <td>Purple</td> </tr>
            <tr> <td>Bob</td> <td>Yellow</td> </tr>
            <tr> <td>Michelle</td> <td>Purple</td> </tr>
            <tr> <td>Bob</td> <td>Yellow</td> </tr>
            <tr> <td>Michelle</td> <td>Purple</td> </tr>
            <tr> <td>Bob</td> <td>Yellow</td> </tr>
            <tr> <td>Michelle</td> <td>Purple</td> </tr>
            <tr> <td>Bob</td> <td>Yellow</td> </tr>
            <tr> <td>Michelle</td> <td>Purple</td> </tr>
            <tr> <td>Bob</td> <td>Yellow</td> </tr>
            <tr> <td>Michelle</td> <td>Purple</td> </tr>
            <tr> <td>Bob</td> <td>Yellow</td> </tr>
            <tr> <td>Michelle</td> <td>Purple</td> </tr>
            <tr> <td>Bob</td> <td>Yellow</td> </tr>
            <tr> <td>Michelle</td> <td>Purple</td> </tr>
            <tr> <td>Bob</td> <td>Yellow</td> </tr>
            <tr> <td>Michelle</td> <td>Purple</td> </tr>
            <tr> <td>Bob</td> <td>Yellow</td> </tr>
            <tr> <td>Michelle</td> <td>Purple</td> </tr>
            <tr> <td>Bob</td> <td>Yellow</td> </tr>
            <tr> <td>Michelle</td> <td>Purple</td> </tr>
            <tr> <td>Bob</td> <td>Yellow</td> </tr>
            <tr> <td>Michelle</td> <td>Purple</td> </tr>
            <tr> <td>Bob</td> <td>Yellow</td> </tr>
            <tr> <td>Michelle</td> <td>Purple</td> </tr>
            <tr> <td>Bob</td> <td>Yellow</td> </tr>
            <tr> <td>Michelle</td> <td>Purple</td> </tr>
            <tr> <td>Bob</td> <td>Yellow</td> </tr>
            <tr> <td>Michelle</td> <td>Purple</td> </tr>
            <tr> <td>Bob</td> <td>Yellow</td> </tr>
            <tr> <td>Michelle</td> <td>Purple</td> </tr>
            <tr> <td>Bob</td> <td>Yellow</td> </tr>
            <tr> <td>Michelle</td> <td>Purple</td> </tr>
            <tr> <td>Bob</td> <td>Yellow</td> </tr>
            <tr> <td>Michelle</td> <td>Purple</td> </tr>
            <tr> <td>Bob</td> <td>Yellow</td> </tr>
            <tr> <td>Michelle</td> <td>Purple</td> </tr>
          </tbody>
        </table>
        ```
      <details>
    - css 代码
        ```
        th {
          position: sticky;
          background-color: black;
          color: white;
          top: 0;
        }
        ```

## 参考资料
- [CSS 定位详解](http://www.ruanyifeng.com/blog/2019/11/css-position.html)
