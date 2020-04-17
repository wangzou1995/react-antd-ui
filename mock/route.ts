export default {
  // 支持值为 Object 和 Array
  'GET /api/routes': {
    routes: [
      {
        path: '/database',
        component: '@/pages/dynamicComponent',
        menu: {
          name: '数据库设计',
          icon: 'database',
        },
        exact: false,
        routes: [
          {
            path: '/database/createdb',
            component:'@/pages/dynamicComponent',
            name: '数据库连接配置', // 兼容此写法
            exact: false,
            access: 'isAuthenticatedMenu',
            authority: ['root']
          },
          {
            path: '/database/createdb1',
            component:'@/pages/dynamicComponent',
            name: '数据库连接配置1', // 兼容此写法
            exact: false,
            access: 'isAuthenticatedMenu',
            authority: ['admin']
          },
        ]
      },
      {
        path: '/object',
        component:'@/pages/dynamicComponent',
        access: 'admin',
        menu: {
          name: '对象设计',
          icon: 'tags',
        },
        exact: false,
        routes: [
          {
            path: '/object/createobj',
            name: '对象属性配置', // 兼容此写法
            component: '@/pages/dynamicComponent',
            exact: false,
            access: 'isAuthenticatedMenu',
            authority: ['user'],
          },
        ]
      },
      {
        path: '/404',
        layout: false,
        component: '@/pages/404',
      },
      {
        path: '/pages/404',
        component: '@/pages/404',
      }
    ],
  },
};
