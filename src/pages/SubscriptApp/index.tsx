import React, { useRef, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Tooltip } from 'antd';
import ProTable, { ActionType } from '@ant-design/pro-table';
import { SubscriptAppItem, VersionList } from './data';
import {
  PlusOutlined,
  DeleteRowOutlined,
  UploadOutlined,
  InteractionFilled,
  LinkedinFilled,
} from '@ant-design/icons';
import { ProColumns } from '@ant-design/pro-table/lib/Table';
import { getSubAppMessage, getVersionListMessage } from './service';
import VersionTable from './components/VersionTable';

const SubscriptApp: React.FC<{}> = () => {
  const [addModelView, handleAddModelView] = useState<boolean>(false);
  const [versionTableView, handleVersionTableView] = useState<boolean>(false);
  const [versionList, handleVersionList] = useState<VersionList[]>([]);
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<SubscriptAppItem>[] = [
    {
      title: '应用代码',
      dataIndex: 'appCode',
    },
    {
      title: '应用名称',
      dataIndex: 'appName',
    },
    {
      title: '订阅版本',
      dataIndex: 'subVersion',
    },
    {
      title: '订阅版本类型',
      dataIndex: 'appCode',
      hideInSearch: true,
    },
    {
      title: '订阅时间',
      dataIndex: 'subTime',
      hideInSearch: true,
    },
    {
      title: '新版本',
      dataIndex: 'subVersion',
      hideInSearch: true,
    },
    {
      title: '新版本类型',
      dataIndex: 'appName',
      hideInSearch: true,
    },
    {
      title: '排序',
      dataIndex: 'subVersion',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_: any, record: SubscriptAppItem) => (
        <>
          <Tooltip placement="topLeft" title={'删除订阅'}>
            <Button
              style={{ marginLeft: '10px' }}
              size="small"
              icon={<DeleteRowOutlined />}
              shape="circle"
              onClick={() => {}}
            />
          </Tooltip>
          <Tooltip placement="topLeft" title={'升级订阅'}>
            <Button
              style={{ marginLeft: '10px' }}
              size="small"
              icon={<UploadOutlined />}
              shape="circle"
              onClick={() => {}}
            />
          </Tooltip>
          <Tooltip placement="topLeft" title={'初始化订阅'}>
            <Button
              style={{ marginLeft: '10px' }}
              size="small"
              icon={<InteractionFilled />}
              shape="circle"
              onClick={() => {}}
            />
          </Tooltip>
          <Tooltip placement="topLeft" title={'版本列表'}>
            <Button
              style={{ marginLeft: '10px' }}
              size="small"
              icon={<LinkedinFilled />}
              shape="circle"
              onClick={async () => {
                getVersionListMessage({ appId: record.id })
                  .then(resp => {
                    if (resp.success) handleVersionList(resp.data);
                    handleVersionTableView(true);
                  })
                  .catch(err => {
                    console.log(err);
                  });
              }}
            />
          </Tooltip>
        </>
      ),
    },
  ];
  return (
    <PageHeaderWrapper>
      <ProTable<SubscriptAppItem>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        request={(params: any) => getSubAppMessage(params)}
        columns={columns}
        rowSelection={{}}
        toolBarRender={(action, { selectedRows }) => [
          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => {
              handleAddModelView(true);
            }}
          >
            新增订阅
          </Button>,
        ]}
        search
        bordered
      ></ProTable>
      <VersionTable
        modalVisible={versionTableView}
        onCancel={() => {
          handleVersionTableView(false);
        }}
        versionList={versionList}
      />
    </PageHeaderWrapper>
  );
};
export default SubscriptApp;
