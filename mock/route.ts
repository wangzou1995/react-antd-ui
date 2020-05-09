export default {
  // 支持值为 Object 和 Array
  'GET /api/routes': {
    routes: [
      {
        path: '/design',
        appId: '1',
        menu: {
          name: '系统设计',
        },
        routes: [
          {
            path: '/design/createApp',
            menu: {
              name: '创建应用',
            },
            component: '@/pages/CreateApp',
            exact: false,
            authority: ['user'],
          },
          {
            path: '/design/subscribeApp',
            menu: {
              name: '订阅应用',
            },
            component: '@/pages/dynamicComponent',
            exact: false,
            authority: ['user'],
          },
          {
            path: '/design/database',
            menu: {
              name: '数据库维护',
            },
            component: '@/pages/dynamicComponent',
            exact: false,
            authority: ['user'],
          },
          {
            path: '/design/table',
            menu: {
              name: '数据库表',
            },
            component: '@/pages/dynamicComponent',
            exact: false,
            authority: ['user'],
          },
          {
            path: '/design/object',
            component: '@/pages/dynamicComponent',
            menu: {
              name: '对象管理',
            },
            exact: false,
          },
        ],
      },
      {
        path: '/sys',
        appId: '1',
        menu: {
          name: '系统管理',
        },
      },

      {
        path: '/404',
        layout: false,
        component: '@/pages/404',
      },
      {
        path: '/pages/404',
        component: '@/pages/404',
      },
    ],
  },
};
