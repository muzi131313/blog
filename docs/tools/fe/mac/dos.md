---
title: 1. 命令窗口
---

## 安装
### brew
- 安装brew
    ```
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    ```
### zsh
- 安装zsh
    ```
    brew install zsh zsh-completions
    ```
- 设置zsh为默认bash
    ```
    chsh -s /bin/zsh
    ```
- ncurses: 允许程序员编写独立终端基于文本的用户界面
    ```
    echo 'export PATH="/usr/local/opt/ncurses/bin:$PATH"' >> ~/.zshrc
    echo 'export LDFLAGS="-L/usr/local/opt/ncurses/lib"' >> ~/.zshrc
    echo 'export CPPFLAGS="-I/usr/local/opt/ncurses/include"' >> ~/.zshrc
    ```
- zsh-completions
    ```
    echo 'fpath=(/usr/local/share/zsh-completions $fpath)' >> ~/.zshrc
    ```
### oh-my-zsh
- 安装
    ```
    # 第一种安装curl
    sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
    # 第二种安装curl
    sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
    # 两种都不行
    git clone https://github.com/robbyrussell/oh-my-zsh
    sh tools/install.sh
    ```
- 主题配置
    - [oh-my-zsh/Themes](https://github.com/robbyrussell/oh-my-zsh/wiki/Themes): 主题列表
    - 配置
        ```
        vi ~/.zshrc
        # 更改主题: 默认robbyrussell
        ZSH_THEME="af-magic"
        # 更完毕
        source ~/.zshrc
        ```
- 插件配置
    - `zsh-git`: git相关(默认配置有设置git，但是git插件没有安装，需要安装一下)

    - `zsh-autosuggestions`: 自动推荐
        ```
        git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
        vi ~/.zshrc
        # 修改plugins, 注意: 没有逗号分隔，否则报错: `[oh-my-zsh] plugin 'git,' not found`
        plugins=(
            # 原来的
            git
            # 新增的
            zsh-autosuggestions
        )
        # 生效
        source ~/.zshrc
        ```
    - `zsh-syntax-highlighting`: 语法高亮
        ```
        git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
        vi ~/.zshrc
        # 修改plugins
        plugins=(zsh-syntax-highlighting)
        # 生效
        source ~/.zshrc
        ```

## 参考资料
- [brew.sh](https://brew.sh/index_zh-cn.html)
- [oh-my-zsh wiki](https://github.com/robbyrussell/oh-my-zsh/wiki)
- [安装oh my zsh插件](https://segmentfault.com/a/1190000018093021)