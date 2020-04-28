import request from 'umi-request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}
export async function queryCurrent() {
  return await request('/api/currentUser');
}
