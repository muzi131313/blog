---
title: 1. github配置sshkey
---

- 生成本地 `ssh` 秘钥和公钥, [生成文档](https://help.github.com/cn/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
    ```
    cd ~/.ssh
    ssh-keygen -t rsa -b 4096 -C "muzi131313@163.com"
    // 输入文件名: ssh-rsa-github
    ```
- 把本地公钥添加 *github*, [设置文档](https://help.github.com/cn/github/authenticating-to-github/adding-a-new-ssh-key-to-your-github-account)
    - 查看公钥并复制
        ```
        cat ~/.ssh/ssh-rsa-github.pub
        ```
    - 登录 github: [设置](https://github.com/settings/keys) -> SSH and GPG keys -> New SSH key/Add SSH key -> 公钥名称, 例如 `feng-computer` -> 粘贴公钥
- 配置 *config*
    - 打开配置文件
        ```
        vi ~/.ssh/config
        ```
    - 粘贴配置
        ```
        #
        # Main github.com github.com
        # 
        Host github.com
        HostName github.com
        PubkeyAuthentication yes
        IdentityFile /Users/liyanfeng/.ssh/ssh-rsa-github
        User muzi131313
        ```
- 下载代码
    > 记得使用 **SSH** 仓库地址

    ```
    git clone git@github.com:muzi131313/deep-union.git
    ```