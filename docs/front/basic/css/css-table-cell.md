---
title: 5. table-cell应用
---

## table-cell
- [tabel-cell-layout](https://codepen.io/muzi131313/pen/LYYoGEb)
    - `table-cell`中`float: left`影响下一个元素布局，但是下一个元素设置 `vertical-align: top` 能消除影响
        - 为什么会影响？
        - 为什么能消除影响？

### 垂直居中
- 应用场景：不定宽图片水平垂直居中
- 需要 **设置宽度**
    - css
        ```css
        .table-cell {
            display: table-cell;
            width: 100px;
            height: 100px;
            vertical-align: middle;
            text-align: center;
        }
        ```
    - html
        ```html
        <div class="table-cell">
            <img referrerPolicy="no-referrer" src="http://ww1.sinaimg.cn/large/8c4687a3ly1g9br3gnk41j20dw0jraag.jpg"/>
        </div>
        ```
- [示例1.垂直居中](https://codepen.io/muzi131313/pen/LYYoGEb)

### 两列布局
- 应用场景：一边定宽、另外一边响应式宽度
- 响应式宽度需要**设置宽度100%**
    - <details>
        <summary>示例</summary>

        ```html
        <div class="two-column border">
          <div class="left">left</div>
          <div class="right bg-yellow">right</div>
        </div>
        ```
        ```css
        .two-column {
          display: table;
        }
        .two-column > .left {
          width: 100px;
          height: 30px;
          box-sizing: border-box;
        }
        .two-column > .right {
          width: 100%;
          display: table-cell;
        }
        ```
      </details>

### 多列平分布局
- 应用场景：多列平分、或者float布局
- 容器设置 `table`、同时**设置宽度100%**，子元素设置 `table-cell`
    - <details>
        <summary>多列平分示例</summary>

        ```html
        <div class="table">
            <div class="table-cell">one</div>
            <div class="table-cell">two</div>
            <div class="table-cell">three</div>
        </div>
        ```
        ```css
        .table {
            display: table;
            width: 100%;
        }
        .table-cell {
            display: table-cell;
        }
        ```
      </details>
- [示例3.三列平分，用来替换float布局](https://codepen.io/muzi131313/pen/LYYoGEb)

### 两边对齐
- 应用场景：两边对称
- 父元素`table`, 子元素`table-cell`, 子元素内设置 `inline-block`, 其位置受 `text-align` 影响
    - <details>
        <summary>示例</summary>

        ```html
        <div class="table border">
          <div class="table-cell">
            <div class="box bg-red">left</div>
          </div>
          <div class="table-cell right">
            <div class="box bg-red">right</div>
          </div>
        </div>
        ```
        ```css
        .table {
          display: table;
          height: 30px;
          width: 100vw;
          padding: 5px;
          box-sizing: border-box;
        }
        .table .table-cell {
          display: table-cell;
        }
        .table .table-cell.right {
          text-align: right;
        }
        .table .table-cell .box {
          display: inline-block;
          width: 50px;
          height: 20px;
        }
        ```
      </details>
- [示例4.table和inline-block](https://codepen.io/muzi131313/pen/LYYoGEb)

### 两边 Box 等高对齐
- 应用场景：一边是图片，另外一边是图片描述，两边对齐等高
- 父元素设置宽度100%、且`table`, 左侧设置`table-cell`和宽度，**和右侧等高**
    - <details>
        <summary>示例</summary>

        ```html
        <div class="box-same-height border">
          <div class="box-icon">icon</div>
          <div class="box-text">
             莫等闲，白了少年头，空悲切。——岳飞<br/>
             谬误越大，真理取得的胜利就越大。——席勒<br/>
             长风破浪会有时，直挂云帆济沧海。——李白
          </div>
        </div>
        ```
        ```css
        .box-same-height {
          display: table;
          width: 100%;
          min-width: 320px;
        }
        .box-same-height .box-icon {
          display: table-cell;
          vertical-align: middle;
          text-align: center;
          width: 100px;
        }
        ```
      </details>
- [示例5.两边box等高对齐](https://codepen.io/muzi131313/pen/LYYoGEb)

### 弹性、响应式布局
- 应用场景：左侧图片大小宽度不定, 右侧响应式
- 父元素设置 `table`, 子元素左侧设置宽度，右侧设置`table-cell`
    - <details>
        <summary>示例</summary>

        ```html
        <div class="responsive-table">
          <div class="r-t-icon">icon</div>
          <div class="r-t-text">
            天才不是为天才而生，而是为人类而生。——雨果 人的知识越广，人的本身也越臻完善。——高尔基 成功的秘诀，在永不改变既定的目的。——卢梭 从不浪费时间的人，没有工夫抱怨时间不够。——杰弗逊 对时间的慷慨，就等于慢性**。——奥斯特洛夫斯基
          </div>
        </div>
        ```
        ```css
        .responsive-table {
          display: table;
        }
        .responsive-table .r-t-icon {
          padding: 10px;
          width: 100px;
          text-align: center;
          box-sizing: border-box;
        }
        /* 模拟动态图片大小 */
        @media (max-width:800px) {
          .responsive-table .r-t-icon {
            width: 80px;
          }
        }
        @media (max-width:600px) {
          .responsive-table .r-t-icon {
            width: 60px;
          }
        }
        @media (max-width:400px) {
          .responsive-table .r-t-icon {
            width: 40px;
          }
        }
        .responsive-table .r-t-text {
          display: table-cell;
        }
        ```
      </details>

- [示例6.弹性、响应式布局](https://codepen.io/muzi131313/pen/LYYoGEb)

## 参考资料
- [我所知道的几种display:table-cell的应用 | 张鑫旭](https://www.zhangxinxu.com/wordpress/2010/10/%E6%88%91%E6%89%80%E7%9F%A5%E9%81%93%E7%9A%84%E5%87%A0%E7%A7%8Ddisplaytable-cell%E7%9A%84%E5%BA%94%E7%94%A8/)
- [CSS——布局布局神器display:table-cell](https://www.jianshu.com/p/2479665ee1f8)
- [css布局：table，table-cell](https://www.jianshu.com/p/47594ca109a8)
