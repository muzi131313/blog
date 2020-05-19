---
title: 1. Flutter-pub包引用与开发
---

## 引用三方包
> 依赖管理文件 `pubspec.yaml`

- 本地添加
    ```
    dependencies:
    // 包名
    pkg1:
        // 本地包路径
        path: ../../code/pkg1
    ```
- git添加
    ```
    dependencies:
      pkg_name:
        git:
          // 远程仓库 url
          url: git://github.com/flutter/packages.git
          // 远程仓库中的包的相对路径
          path: packages/package1
    ```
- pub仓库添加
    ```
    dependencies:
      flutter:
        sdk: flutter
      // 三方包
      english_words: ^3.1.3
    ```

## flutter之pub包开发
### 创建flutter安装包
- dart 包初始化: `flutter create --template=package signlib`
- plugin 包初始化
    - 默认初始化: `flutter create --org com.lanhuapp.hello --template=plugin hello`
        - `-org`: 指定 Android 源码包路径
    - 指定语言初始化: `flutter create --template=plugin -i swift -a kotlin --org com.lanhuapp.hello hello`
        - `-i`: 指定 iOS 平台语言
            - `objc`: ObjectC
            - `swift`: swift
        - `-a`: 指定 Android 平台语言
            - `java`: java
            - `kotlin`: kotlin
- 完整命令
    ```
    flutter create --template=plugin --org com.lanhuapp -i objc -a java batterylevel
    ```

### 开发 dart 包
- `pubspec.yaml` 配置注意
    - 配置 `version: 1.5.1`
    - 不使用 material-ui
        ```
        flutter:
          uses-material-design: false
        ```
    - <details>
        <summary>pubspec.yaml 的 dart 完整配置</summary>

        ```yaml
        name: fluro
        description: >
          Fluro is a Flutter routing library that adds flexible routing options like wildcards, named
          parameters and clear route definitions.
        version: 1.5.1
        author: Yakka, LLC <apps@theyakka.com>
        homepage: https://github.com/theyakka/fluro

        environment:
          sdk: ">=2.1.0 <3.0.0"
          flutter: ">=1.2.0"

        dependencies:
          flutter:
            sdk: flutter

        dev_dependencies:
          flutter_test:
            sdk: flutter
          test: ^1.6.0

        flutter:
          uses-material-design: false
        ```
      </details>

- 输出文件 `lib/fluro.dart`
    - 指定 library 名称: `library fluro;`
    - 对外暴露的 api 进行 export: `export 'src/common.dart';`

### 开发 plugin 包
- `pubspec.yaml` 配置注意
    - 配置 plugin(简写版)
        ```
        flutter:
          plugin:
            androidPackage: com.lanhuapp.batterylevel
            pluginClass: BatterylevelPlugin
        ```
    - 配置 plugin(完整版)
        ```
        flutter:
          plugin:
            platforms:
              android:
                package: com.lanhuapp.batterylevel
                pluginClass: BatterylevelPlugin
              ios:
                pluginClass: BatterylevelPlugin
        ```
    - <details>
        <summary> pubspec.yaml 的 plugin 完整配置 </summary>

        ```yaml
        name: batterylevel
        description: A new flutter plugin project.
        version: 0.0.1
        author:
        homepage:

        environment:
          sdk: ">=2.1.0 <3.0.0"

        dependencies:
          flutter:
            sdk: flutter

        dev_dependencies:
          flutter_test:
            sdk: flutter

        flutter:
          plugin:
            androidPackage: com.lanhuapp.batterylevel
            pluginClass: BatterylevelPlugin
        ```
      </details>

- 输出文件 `lib/batterylevel.dart`
    - 输出需要对外的 api 类
        - 关于函数: 一般是静态函数，发送对应的 原生的 通讯方法
        - 关于对外api:
            - 需要进行错误处理
            - 需要有完整的测试用例
    - <details>
        <summary>完整的plugin对外api示例</summary>

        ```dart
        import 'dart:async';

        import 'package:flutter/services.dart';

        class Batterylevel {
          static const MethodChannel _channel =
              const MethodChannel('com.lanhuapp.flutter/battery');

          static Future<String> get platformVersion async {
            final String version = await _channel.invokeMethod('getPlatformVersion');
            return version;
          }

          static Future<String> get batteryLevel async {
            String batteryLevel;
            try {
              final int result = await _channel.invokeMethod('getBatteryLevel');
              batteryLevel = '$result';
            } on PlatformException catch (e) {
              batteryLevel = "Failed to get battery level:'${e.message}";
            }
            return batteryLevel;
          }
        }
        ```
      </details>
- 开发环境注意事项
    - Android 包开发
        - 需要使用 Android Sutdio 打开 Android 项目
            - `example/android`: android 插件开发示例入口文件
                - 在示例中引用 `android` 下的 api
    - iOS 包开发
        - 需要使用 Xcode 打开 iOS 项目
            - `example/ios/Runner.xcodeproj`: iOS 项目管理目入口
                - 会引用 `ios` 源码文件
            - `example/ios/Runner.xcworkspace`: 命名空间
                - 选择团队
                - 设置 iOS 包唯一认证，类似 Android 中的 `com.lanhuapp.batteryLevel`

### 包的发布
- 发布前: `flutter packages pub publish --dry-run`
- 发布: `flutter packages pub publish`

## 参考资料
- 基础
    - [开发Packages和插件 | flutterchina](https://flutterchina.club/developing-packages/)
    - [使用平台通道编写平台特定的代码 | flutterchina](https://flutterchina.club/platform-channels/)
    - [developing-packages | flutter.dev](https://flutter.dev/docs/development/packages-and-plugins/developing-packages)
- [plugins | github](https://github.com/flutter/plugins): 官方包
    - [battery | github](https://github.com/flutter/plugins/tree/master/packages/battery)
- dart包开发
    - [fluro](https://pub.dartlang.org/packages/fluro): 官方推荐学习
- 博客
    - [12.1 开发Package | 《Flutter实战》](https://book.flutterchina.club/chapter12/develop_package.html)
        - [iOS 获取手机电量 电量变化通知 | jianshu](https://www.jianshu.com/p/0b23d16f8d8a)
    - [Flutter 插件开发：以微信SDK为例 | juejin](https://juejin.im/post/5d25a5cb6fb9a07ea71338f0)
- [包发布 | pub docs](https://dart.dev/tools/pub/publishing)
