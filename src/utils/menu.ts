const BASE_COMPONENT = '@';

// @ts-ignore
const getDynamicMenu = (datasource: { [key: string]: any; }[])=> {
  return (
    datasource.map((route, index) => {
        let component: string = route.component;
        let albPath: string = component&&component.substring(component.indexOf(BASE_COMPONENT) + BASE_COMPONENT.length + 1, component.length);

        if (route.routes && route.routes.length > 0) {
          return  { ...route, component: !route.component ? null : require(`@/${albPath}`).default,routes:  getDynamicMenu(route.routes)};
        } else {
          // require 不能直接为参数 必须是一个字符串，否则 cannot find module
          return { ...route, component: !route.component ? null : require(`@/${albPath}`).default };
        }
      },
    ));
};
export default getDynamicMenu

