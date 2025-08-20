import { defineConfig, type DefaultTheme } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/blog/',
  title: '我的博客',
  lastUpdated: true,
  // description: 'A VitePress Site',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: 'local',
      options: searchOptions(),
    },

    nav: nav(),

    sidebar: {
      '/vue/': sidebarVue(),
      '/typescript/': sidebarTypescript(),
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],

    outline: {
      level: 'deep',
      label: '页面导航',
    },

    docFooter: {
      prev: '← 上一页',
      next: '下一页 →',
    },

    lastUpdated: {
      text: '最后更新于',
    },

    notFound: {
      title: '页面未找到',
      quote:
        '但如果你不改变方向，并且继续寻找，你可能最终会到达你所前往的地方。',
      linkLabel: '前往首页',
      linkText: '带我回首页',
    },

    langMenuLabel: '多语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    skipToContentLabel: '跳转到内容',
  },
});

function searchOptions(): Partial<DefaultTheme.LocalSearchOptions> {
  return {
    translations: {
      button: {
        buttonText: '搜索',
        buttonAriaLabel: '搜索',
      },
      modal: {
        displayDetails: '显示详细列表',
        resetButtonTitle: '重置搜索',
        backButtonTitle: '关闭搜索',
        noResultsText: '没有结果',
        footer: {
          selectText: '选择',
          selectKeyAriaLabel: '输入',
          navigateText: '导航',
          navigateUpKeyAriaLabel: '上箭头',
          navigateDownKeyAriaLabel: '下箭头',
          closeText: '关闭',
          closeKeyAriaLabel: 'esc',
        },
      },
    },
  };
}

function nav(): DefaultTheme.NavItem[] {
  return [
    { text: '主页', link: '/' },
    { text: 'Vue 3', link: '/vue/reactivity' },
    { text: 'TypeScript 5.9', link: '/typescript/handbook/basics' },
  ];
}

function sidebarVue(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Vue 3',
      items: [
        { text: '响应式', link: '/vue/reactivity' },
        { text: '组件化', link: '/vue/component' },
        { text: '编译', link: '/vue/compile' },
      ],
    },
  ];
}

function sidebarTypescript(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'TypeScript 5.9',
      items: [
        {
          text: '指南',
          base: '/typescript/handbook/',
          collapsed: true,
          items: [
            { text: '基础', link: 'basics' },
            {
              text: '常见类型',
              link: 'everyday-types',
            },
            {
              text: '类型操作',
              collapsed: true,
              base: '/typescript/handbook/type-manipulation/',
              items: [
                {
                  text: '从类型创建类型',
                  link: 'create-types',
                },
                {
                  text: '泛型',
                  link: 'generics',
                },
              ],
            },
          ],
        },
      ],
    },
  ];
}
