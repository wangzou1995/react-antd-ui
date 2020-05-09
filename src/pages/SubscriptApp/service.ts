import request from 'umi-request';
import { SubscriptAppItem } from './data.d';
export async function getSubAppMessage(params?: SubscriptAppItem) {
  return request('/sys/get_sub_app_message', {
    params,
  });
}

export async function getVersionListMessage(params?: { appId: number }) {
  return request('/sys/get_app_version_list_message', {
    params,
  });
}
