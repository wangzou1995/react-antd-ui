export default {
  'GET /api/apps':
    [
      {
        name: 'app1', // 唯一 id
        entry: '//localhost:7001', // html entry
        base: '/app1', // app1 的路由前缀，通过这个前缀判断是否要启动该应用，通常跟子应用的 base 保持一致
        history: 'browser', // 子应用的 history 配置，默认为当前主应用 history 配置
      },
      {
        name: 'app2',
        entry: {
          // TODO 支持 config entry
          scripts: [],
          styles: [],
        },
        base: '/app2',
      },
    ],
};
