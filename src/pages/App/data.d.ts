export interface AppItem {
  appId: number;
  appCode: string;
  appName: string;
  deviceType: number;
  dbType: number;
  version: string;
  versionType: number;
  publishDate: string;
  price: number;
  connectUrl: string;
  priceType: number;
}
export interface PubHistory {
  id: number;
  pubDate: string;
  version: string;
  versionType: number;
}
export interface AppParams {
  appCode?: string;
  appName?: string;
  dbType?: number;
  version?: string;
  pageSize?: number;
  currentPage?: number;
}
export interface HistoryParams {
  appId: number;
}
