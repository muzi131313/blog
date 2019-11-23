module.exports = {
  title: 'blog',
  description: 'record my learning road',
  // 基础目录
  base: '/blog/',
  // webpack配置
  configureWebpack: {
    resolve: {
      alias: {
        // 静态资源放置目录
        '@alias': './public'
      }
    }
  },
  shouldPrefetch: () => false,
  // 主题配置
  themeConfig: {
    // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
    repo: 'muzi131313/blog',
    // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
    // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
    repoLabel: 'Github',
    // 自动生成侧边栏
    // sidebar: 'auto',
    // ==== 可选配置 ===

    // 假如你的文档仓库和项目本身不在一个仓库：
    // docsRepo: 'vuejs/vuepress',
    // 假如文档不是放在仓库的根目录下：
    docsDir: 'docs',
    // 假如文档放在一个特定的分支下：
    // docsBranch: 'sourcecode',
    // 默认是 false, 设置为 true 来启用
    editLinks: true,
    // 默认为 "Edit this page"
    editLinkText: '帮Roast Wind改善此页面！',
    // 菜单栏
    nav: [
      { text: '概述', link: '/' },
      { text: '前端基础', link: '/front/' }
    ],
    // 侧边栏
    sidebar: {
      '/front/': [
        {
          title: 'JavaScript',
          collapsable: true,
          children: [
            '/front/basic/javascript/javascript-info.md',
            '/front/basic/javascript/javascript-data-type.md',
            '/front/basic/javascript/javascript-memory-and-data-constructor.md',
            '/front/basic/javascript/javascript-event-loop.md',
            '/front/basic/javascript/javascript-extend.md',
            '/front/basic/javascript/javascript-deep-clone.md',
          ]
        },
        {
          title: 'CSS',
          collapsable: false,
          children: [
            '/front/basic/css/css-basic.md'
          ]
        }
      ]
    }
  }
}
