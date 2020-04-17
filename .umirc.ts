import { defineConfig } from 'umi';
export default defineConfig({
 // base: '/#/',
  nodeModulesTransform: {
    type: 'none',
  },
  layout: {
    title: '后台管理系统',
    showBreadcrumb: true,
  },
  routes: [
    {
      path: '/',
      component: '@/pages/DashboardWorkplace/index',
      menu: {
        name: '工作台',
        icon: 'home',
      },
      exact: true,
    },

  ],
  title: '后台管理',
  dva: {},
});
