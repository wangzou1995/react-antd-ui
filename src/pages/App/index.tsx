import React, { useRef, useState } from 'react';
import { ProColumns } from '@ant-design/pro-table/lib/Table';
import { Button, Tooltip, message } from 'antd';
import { AppItem, HistoryParams, PubHistory } from './data';
import {
  PlusOutlined,
  DeleteRowOutlined,
  EditOutlined,
  PushpinOutlined,
  AppstoreAddOutlined,
  HistoryOutlined,
} from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ActionType } from '@ant-design/pro-table';
import { getAppMessage, getHistoryMessage, addAppMessage } from './service';
import UpdateApp from './components/UpdateApp';
import { FormValueType } from './components/UpdateApp';
import PubHistoryTable from './components/PublishHistory';
import CreateApp from './components/CreateApp';
const handleUpdate = (value: FormValueType): boolean => {
  console.log('edit app values: {}', value);
  return true;
};
const handleAdd = async (fields: FormValueType) => {
  const hide = message.loading('正在添加');
  try {
    console.log('add app:', fields);
    await addAppMessage(fields);
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};
const App: React.FC<{}> = () => {
  const [updateModelView, handleUpdateModelView] = useState(false);
  const [addModelView, handleAddModelView] = useState(false);
  const [historyModelView, handleHistoryModelView] = useState(false);
  const [editAppMessage, handleEditAppMessage] = useState<AppItem>();
  const [historyData, handleHistoryData] = useState<PubHistory[]>();
  const actionRef = useRef<ActionType>();

  /**
   * 查询应用发布历史
   * @param params 应用id
   */
  const handleGetHistory = async (params: HistoryParams) => {
    try {
      const resp = await getHistoryMessage(params);
      if (resp.success) {
        handleHistoryData(resp.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const columns: ProColumns<AppItem>[] = [
    {
      title: '应用编号',
      dataIndex: 'appId',
      hideInSearch: true,
    },
    {
      title: '应用代码',
      dataIndex: 'appCode',
    },
    {
      title: '应用名称',
      dataIndex: 'appName',
    },
    {
      title: '设备类型',
      dataIndex: 'deviceType',
    },
    {
      title: '数据库类型',
      dataIndex: 'dbType',
      valueEnum: {
        1: { text: 'mysql' },
        2: { text: 'sqlServer' },
      },
    },
    {
      title: '最新发布版本',
      dataIndex: 'version',
      hideInSearch: true,
    },
    {
      title: '版本类型',
      dataIndex: 'versionType',
      hideInSearch: true,
    },
    {
      title: '发布日期',
      dataIndex: 'publishDate',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_: any, record: AppItem) => (
        <>
          <Tooltip placement="topLeft" title={'删除应用'}>
            <Button
              style={{ marginLeft: '10px' }}
              size="small"
              icon={<DeleteRowOutlined />}
              shape="circle"
              onClick={() => {}}
            />
          </Tooltip>
          <Tooltip placement="topLeft" title={'编辑应用'}>
            <Button
              style={{ marginLeft: '10px' }}
              size="small"
              icon={<EditOutlined />}
              shape="circle"
              onClick={() => {
                handleEditAppMessage(record);
                handleUpdateModelView(true);
              }}
            />
          </Tooltip>
          <Tooltip placement="topLeft" title={'发布应用'}>
            <Button
              style={{ marginLeft: '10px' }}
              size="small"
              icon={<PushpinOutlined />}
              shape="circle"
              onClick={() => {}}
            />
          </Tooltip>
          <Tooltip placement="topLeft" title={'发布历史'}>
            <Button
              style={{ marginLeft: '10px' }}
              size="small"
              icon={<HistoryOutlined />}
              shape="circle"
              onClick={() => {
                handleGetHistory({ appId: record.appId });
                handleHistoryModelView(true);
              }}
            />
          </Tooltip>
          <Tooltip placement="topLeft" title={'生成UI'}>
            <Button
              style={{ marginLeft: '10px' }}
              size="small"
              icon={<AppstoreAddOutlined />}
              shape="circle"
              onClick={() => {}}
            />
          </Tooltip>
        </>
      ),
    },
  ];
  return (
    <PageHeaderWrapper>
      <ProTable<AppItem>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="appId"
        request={(params: any) => getAppMessage(params)}
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
            新建
          </Button>,
        ]}
        search
        bordered
      ></ProTable>
      {editAppMessage && (
        <UpdateApp
          appMessage={editAppMessage}
          onSubmit={async value => {
            const success = await handleUpdate(value);
            if (success) {
              handleUpdateModelView(false);
              handleEditAppMessage(undefined);
            }
          }}
          onCancel={() => {
            handleUpdateModelView(false);
            handleEditAppMessage(undefined);
          }}
          modalVisible={updateModelView}
        />
      )}
      {historyData && (
        <PubHistoryTable
          modalVisible={historyModelView}
          onCancel={() => {
            handleHistoryModelView(false);
          }}
          datasource={historyData}
        />
      )}
      <CreateApp
        onSubmit={async value => {
          const success = handleAdd(value);
          if (success) {
            handleAddModelView(false);
          }
        }}
        onCancel={() => {
          handleAddModelView(false);
        }}
        modalVisible={addModelView}
      />
    </PageHeaderWrapper>
  );
};
export default App;
