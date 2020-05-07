import request from '@/utils/request';
import { history } from 'umi';
import React from 'react';
import { DefaultFooter } from '@ant-design/pro-layout';
import getDynamicMenu from '@/utils/menu';
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
};

// 运行时配置初始化state
export async function getInitialState() {
  return await request('/api/currentUser');
}

export function patchRoutes({ routes }: any) {
  if (extraRoutes) {
    getDynamicMenu(extraRoutes).forEach((e: any) => {
      routes[0].routes.push(e);
    });
  }
  console.log('patchRoutes', routes);
}
