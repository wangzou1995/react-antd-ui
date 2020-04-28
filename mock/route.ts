export default {
  // 支持值为 Object 和 Array
  'GET /api/routes': {
    routes: [
      {
        path: '/sys/database',
        component: '@/pages/dynamicComponent',
        appId: '1',
        menu: {
          name: '数据库设计',
          icon: 'database',
        },
        exact: false,
        routes: [
          {
            path: '/sys/database/createdb',
            component: '@/pages/dynamicComponent',
            name: '数据库连接配置', // 兼容此写法
            exact: false,
            appId: '1',
            authority: ['root'],
          },
          {
            path: '/sys/database/createdb1',
            component: '@/pages/dynamicComponent',
            name: '数据库连接配置1', // 兼容此写法
            exact: false,
            appId: '1',
            authority: ['admin'],
          },
        ],
      },
      {
        path: '/sys/object',
        component: '@/pages/dynamicComponent',
        appId: '2',
        menu: {
          name: '对象设计',
          icon: 'tags',
        },
        exact: false,
        routes: [
          {
            path: '/sys/object/createobj',
            name: '对象属性配置', // 兼容此写法
            component: '@/pages/dynamicComponent',
            exact: false,
            authority: ['user'],
          },
        ],
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
