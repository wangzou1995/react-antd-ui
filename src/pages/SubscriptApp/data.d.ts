export interface SubscriptAppItem {
  id: number;
  appCode: string;
  appName: string;
  publishDate: string;
  subVersion: string;
  subVersionType: number;
  subTime: string;
  lastVersion: string;
  lastVersionType: number;
  order: number;
}

export interface SubscriptAppParams {
  appCode?: string;
  appName?: string;
  subVersion?: string;
  pageSize?: number;
  currentPage?: number;
}

export interface VersionList {
  id: number;
  publishDate: string;
  version: string;
  versionType: number;
  currentVersion: boolean;
}
