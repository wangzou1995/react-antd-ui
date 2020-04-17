import request from '@/utils/request';
import {history} from 'umi'
import React  from 'react';
import {
  DefaultFooter,
} from '@ant-design/pro-layout';
import getDynamicMenu from '@/utils/menu';


const defaultFooterDom = (
  <DefaultFooter
    copyright="2020 燕文物流"
    links={[]}
  />
);
let extraRoutes: {
  [key: string]: any;
}[];

// @ts-ignore
export async function render(oldRender) {
  extraRoutes = await request('/api/routes').then((res) => {
    return res.routes;
  });
  console.log('render');
  oldRender();
}



export function patchRoutes({ routes} : any) {

  getDynamicMenu(extraRoutes).forEach(
      (e: any) => {
      routes[0].routes.push(e);
    }
  );
  console.log(routes);
}

export const layout = {
  logout: () => {
    //todo 暂时转到404
    history.push('/404')
  }, // do something
  footerRender: () => {
    return defaultFooterDom;
  },
  fixSiderbar: true,
  fixedHeader: true,
};

// 运行时配置初始化state
export async function getInitialState() {
  console.log('初始化initialState');
  return await request('/api/getUserInfo');
}
