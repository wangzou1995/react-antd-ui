import { defineConfig } from 'umi';
import DynamicComponent from './src/pages/dynamicComponent';
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
