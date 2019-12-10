---
title: 1. github配置sshkey
---

- 生成本地 `ssh` 秘钥和公钥, [生成文档](https://help.github.com/cn/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
    ```bash
    cd ~/.ssh
    # gitlab: ssh-keygen -o -t rsa -b 4096 -C 'muzi131313@163.com'
    # rsa 方式生成公钥、私钥
    ssh-keygen -t rsa -b 4096 -C "muzi131313@163.com"
    // 输入文件名: ssh-rsa-github
    ```
    - `ssh-keygen` 配置参数详解
        - `-b` 采用长度1024bit的密钥对,b=bits,最长4096，不过没啥必要
        - `-t rsa` 采用rsa加密方式,t=type
        - `-f` 生成文件名,f=output_keyfiles
        - `-C` 备注，C=comment
        - `-o` 签名密钥时指定证书选项
        - 更多见 `man ssh-keygen`
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
        IdentityFile /Users/roastwind/.ssh/ssh-rsa-github
        User muzi131313
        ```
- 下载代码
    > 记得使用 **SSH** 仓库地址

    ```
    git clone git@github.com:muzi131313/deep-union.git
    ```
## 参考资料
- [ssh-keygen](https://yq.aliyun.com/articles/654813)
