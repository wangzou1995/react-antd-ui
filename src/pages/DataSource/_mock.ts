import { Request, Response } from 'express';
import { DataSourcceParams, DataSourceItem } from './data.d';
import { parse } from 'url';
import mockjs from 'mockjs';

const tableListDataSource: DataSourceItem[] = [];
for (let i = 0; i < 10; i++) {
  tableListDataSource.push({
    id: i,
    appName: `appName ${i}`,
    dataSourceName: `dataSourceName ${i}`,
    dataSourceDesc: `desc ${i}`,
    dataSourceFrom: i,
    dataSourceType: i,
    dataConnectUrl: `URL: ${i}`,
    dataBaseName: `dataBaseName ${i}`,
  });
}

function getDataSourceMessage(req: Request, res: Response, u: string) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    // eslint-disable-next-line prefer-destructuring
    url = req.url;
  }
  const params = (parse(url, true).query as unknown) as DataSourcceParams;
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
function addDataSourceMessage(
  req: Request,
  res: Response,
  u: string,
  b: Request,
) {
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
function updateDataSourceMessage(
  req: Request,
  res: Response,
  u: string,
  b: Request,
) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    // eslint-disable-next-line prefer-destructuring
    url = req.url;
  }
  const body = (b && b.body) || req.body;
  // tableListDataSource.push({ ...body, appId: tableListDataSource.length });
  const result = {
    success: true,
  };
  return res.json(result);
}
export default {
  'GET /sys/get_datasource_message': getDataSourceMessage,
  'POST /sys/add_dataSource_message': addDataSourceMessage,
  'POST /sys/update_dateSource_message': updateDataSourceMessage,
};
