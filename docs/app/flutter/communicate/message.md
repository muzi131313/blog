---
title: 1. Flutter-消息通知
---

## 事件机制
### 概念
- 通知冒泡: Widget 树从下层往上层传递事件的机制

### 系统事件监听与触发
- 通知事件监听
    ```
    NotificationListener(
        // 此处能够收到各种各样的事件
        onNotification: (notify) {
          switch (notify.runtimeType) {
            case ScrollStartNotification:
              print("ScrollStart");
              break;
          }
        },
        child: MyWidget(),
    )
    ```
- 事件触发
    - 系统自动触发
        - (Scrollable Widget) 滑动时，会分发 **滚动通知** (ScrollNotification)
            - Scrollbar 是根据 ScrollNotification 确定滚动条位置

### 自定义事件监听与触发
- 自定义 Notification
    ```
    class MyNotification extends Notification {
      MyNotification(this.msg);
      final String msg;
    }
    ```
- 监听与触发
    ```
    class NotificationRouteState extends State<NotificationRoute> {
        String _msg="";
        @override
        Widget build(BuildContext context) {
            //监听通知
            return NotificationListener<MyNotification>(
              onNotification: (notification) {
                setState(() {
                  _msg+=notification.msg+"  ";
                });
               return true;
              },
              child: Center(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: <Widget>[
                    Builder(
                      builder: (context) {
                        return RaisedButton(
                          // 按钮点击时分发通知
                          // 节点的 context，需要使用 builder
                          onPressed: () => MyNotification("Hi").dispatch(context),
                          child: Text("Send Notification"),
                        );
                      },
                    ),
                    Text(_msg)
                  ],
                ),
              ),
            );
        }
    }
    ```
### Notification 和 EventBus 的区别
- 相同点
    - 都可以发送通知
- 不同点
    - 实现机制不一样
        - Notification 是包裹 widget，通过【事件冒泡机制原理】实现的
        - EventBus 是通过 【观察者设计模式】实现的
    - 耦合程度不一样
        - Notification 是和 builder 耦合到一块
        - EventBus 则无耦合

## 参考资料
- [天呐！你竟然不知道Flutter中的"通知冒泡" | juejin](https://juejin.im/post/5cb46a75e51d456e586640b9)
- [8.4 通知(Notification) | 《Flutter实战》](https://book.flutterchina.club/chapter8/notification.html)
