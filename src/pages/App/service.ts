import { AppItem, HistoryParams } from './data.d';
import request from 'umi-request';
export async function getAppMessage(params?: AppItem) {
  return request('/sys/get_app_message', {
    params,
  });
}

export async function getHistoryMessage(params?: HistoryParams) {
  return request('/sys/get_app_pub_history', {
    params,
  });
}

export async function addAppMessage(params?: AppItem) {
  return request('/sys/add_app_message', {
    data: params,
    method: 'POST',
  });
}
