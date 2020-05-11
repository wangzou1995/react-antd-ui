import request from 'umi-request';
import { DataSourcceParams } from './data.d';
export async function getDataSourceMessage(params?: DataSourcceParams) {
  return request('/sys/get_datasource_message', {
    params,
  });
}

export async function addDataSource(params?: any) {
  return request('/sys/add_dataSource_message', {
    data: params,
    method: 'POST',
  });
}

export async function updateDataSource(params?: any) {
  return request('/sys/update_dataSource_message', {
    data: params,
    method: 'POST',
  });
}
