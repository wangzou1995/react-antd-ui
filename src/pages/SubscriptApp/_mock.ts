import { Request, Response } from 'express';
import { SubscriptAppParams, SubscriptAppItem, VersionList } from './data.d';
import { parse } from 'url';
import mockjs from 'mockjs';

let tableListDataSource: SubscriptAppItem[] = [];
for (let i = 0; i < 10; i += 1) {
  tableListDataSource.push({
    id: i,
    appCode: `appCode${i}`,
    appName: `应用${i}`,
    subVersion: `V.${i}`,
    subVersionType: i,
    publishDate: mockjs.Random.date('yyyy-MM-dd'),
    subTime: mockjs.Random.date('yyyy-MM-dd'),
    lastVersion: `V.${i}`,
    lastVersionType: i,
    order: i,
  });
}

let VersionListDatasource: VersionList[] = [];
for (let i = 0; i < 10; i += 1) {
  VersionListDatasource.push({
    id: i,
    publishDate: mockjs.Random.date('yyyy-MM-dd'),
    version: `V.${i}`,
    versionType: i,
    currentVersion: mockjs.Random.boolean(),
  });
}

function getSubAppMessage(req: Request, res: Response, u: string) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    // eslint-disable-next-line prefer-destructuring
    url = req.url;
  }
  const params = (parse(url, true).query as unknown) as SubscriptAppParams;
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

function getAppVersionListMessage(req: Request, res: Response, u: string) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    // eslint-disable-next-line prefer-destructuring
    url = req.url;
  }
  const params = (parse(url, true).query as unknown) as { appId: number };
  console.log(params);
  const result = {
    data: VersionListDatasource,
    total: VersionListDatasource.length,
    success: true,
  };
  return res.json(result);
}

export default {
  'GET /sys/get_sub_app_message': getSubAppMessage,

  'GET /sys/get_app_version_list_message': getAppVersionListMessage,
};
