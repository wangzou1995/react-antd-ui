export interface DataSourceItem {
  id: number;
  appName: string;
  dataSourceName: string;
  dataSourceDesc: string;
  dataSourceFrom: number;
  dataSourceType: number;
  dataConnectUrl: string;
  dataBaseName: string;
  dataSearchId?: number;
  dataUpdateId?: number;
  username?: string;
  password?: string;
}

export interface DataSourcceParams {
  appName: string;
  dataSourceFrom: number;
  dataSourceName: string;
  pageSize: number;
  currentPage: number;
}
