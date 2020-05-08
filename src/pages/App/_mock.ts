import { AppItem, AppParams, HistoryParams, PubHistory } from './data.d';
import { Request, Response } from 'express';
import { parse } from 'url';
import mockjs from 'mockjs';
let tableListDataSource: AppItem[] = [];
for (let i = 0; i < 10; i += 1) {
  tableListDataSource.push({
    appId: i,
    appCode: `appCode${i}`,
    appName: `应用${i}`,
    deviceType: i,
    dbType: i,
    version: `V.${i}`,
    versionType: i,
    publishDate: mockjs.Random.date('yyyy-MM-dd'),
    price: i,
    priceType: i,
    connectUrl: `http://localhost: ${i}`,
  });
}

let historyDataSource: PubHistory[] = [];
for (let i = 0; i < 10; i += 1) {
  historyDataSource.push({
    id: i,
    pubDate: mockjs.Random.date('yyyy-MM-dd'),
    version: `V.${i}`,
    versionType: i,
  });
}
function getAppMessage(req: Request, res: Response, u: string) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    // eslint-disable-next-line prefer-destructuring
    url = req.url;
  }
  const params = (parse(url, true).query as unknown) as AppParams;
  let pageSize = 10;
  if (params.pageSize) {
    pageSize = parseInt(`${params.pageSize}`, 0);
  }
  const result = {
    data: tableListDataSource,
    total: tableListDataSource.length,
    success: true,
    pageSize,
    current: parseInt(`${params.currentPage}`, 10) || 1,
  };
  return res.json(result);
}
function getAppPubHistory(req: Request, res: Response, u: string) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    // eslint-disable-next-line prefer-destructuring
    url = req.url;
  }
  const params = (parse(url, true).query as unknown) as HistoryParams;
  console.log('query history params appId: ', params.appId);
  const result = {
    data: historyDataSource,
    total: historyDataSource.length,
    success: true,
  };
  return res.json(result);
}
function addAppMessage(req: Request, res: Response, u: string, b: Request) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    // eslint-disable-next-line prefer-destructuring
    url = req.url;
  }
  const body = (b && b.body) || req.body;
  tableListDataSource.push({ ...body, appId: tableListDataSource.length });
  const result = {
    success: true,
  };
  return res.json(result);
}
export default {
  'GET /sys/get_app_message': getAppMessage,
  'GET /sys/get_app_pub_history': getAppPubHistory,
  'POST /sys/add_app_message': addAppMessage,
};
