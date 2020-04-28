import request from '@/utils/request';
import { history } from 'umi';
import React from 'react';
import { DefaultFooter } from '@ant-design/pro-layout';
import getDynamicMenu from '@/utils/menu';
import { InitialState } from 'umi';
let extraRoutes: {
  [key: string]: any;
}[];

// @ts-ignore
export async function render(oldRender) {
  extraRoutes = await request('/api/routes').then(res => {
    return res.routes;
  });
  oldRender();
}

const defaultFooterDom = <DefaultFooter copyright="2020 燕文物流" links={[]} />;
export const layout = {
  logout: () => {
    //todo 暂时转到404
    history.push('/404');
  }, // do something
  footerRender: () => {
    return defaultFooterDom;
  },
  fixSiderbar: true,
  fixedHeader: true,
  patchRoutes: (val: any) => {
    console.log('layout.patchRoutes', val);
  },
  patchMenus: (menus: any, initialInfo: InitialState) => {
    console.log('patchMenus', menus.appId);
    if (initialInfo?.initialState?.currentProjectId === '1') {
      return [
        ...menus,
        {
          name: '自定义',
          path: 'https://bigfish.alipay.com/',
        },
      ];
    }
    return menus;
  },
};

// 运行时配置初始化state
export async function getInitialState() {
  console.log('getInitialState');
  return await request('/api/currentUser');
}

export function patchRoutes({ routes }: any) {
  if (extraRoutes) {
    getDynamicMenu(extraRoutes).forEach((e: any) => {
      routes[0].routes.push(e);
    });
  }
  console.log(routes);
}
