import React, { useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { DataSourceItem } from './data';
import { ProColumns } from '@ant-design/pro-table/lib/Table';
import {
  getDataSourceMessage,
  addDataSource,
  updateDataSource,
} from './service';
import { Tooltip, Button, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import AddDataSourceFrom from './components/AddDataSource';
import UpdateDataSource from './components/UpdateDataSource';

const handleUpdate = (value: any): boolean => {
  console.log('edit app values: {}', value);
  return true;
};
const handleAdd = async (fields: any) => {
  const hide = message.loading('正在添加');
  try {
    console.log('add app:', fields);
    await addDataSource(fields);
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};
const DataSource: React.FC<{}> = () => {
  const [addModalView, handleAddModalView] = useState<boolean>(false);
  const [updateModalView, handleUpdateModalView] = useState<boolean>(false);
  const [dataSourceMessage, handleDataSourceMessage] = useState<
    DataSourceItem
  >();
  const columns: ProColumns<DataSourceItem>[] = [
    {
      title: '应用',
      dataIndex: 'appName',
      align: 'center',
    },
    {
      title: '数据源名称',
      dataIndex: 'dataSourceName',
      align: 'center',
    },
    {
      title: '数据源描述',
      dataIndex: 'dataSourceDesc',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '数据源来源',
      dataIndex: 'dataSourceFrom',
      align: 'center',
    },
    {
      title: '数据库类型',
      dataIndex: 'dataSourceType',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '数据库地址',
      dataIndex: 'dataConnectUrl',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '数据库名',
      dataIndex: 'dataSourceName',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      align: 'center',
      valueType: 'option',
      render: (_: any, record: DataSourceItem) => (
        <>
          <Tooltip placement="topLeft" title={'删除数据源'}>
            <Button
              style={{ marginLeft: '10px' }}
              size="small"
              icon={<DeleteOutlined />}
              shape="circle"
              onClick={() => {}}
            />
          </Tooltip>
          <Tooltip placement="topLeft" title={'编辑数据源'}>
            <Button
              style={{ marginLeft: '10px' }}
              size="small"
              icon={<EditOutlined />}
              shape="circle"
              onClick={() => {
                handleDataSourceMessage(record);
                handleUpdateModalView(true);
              }}
            />
          </Tooltip>
        </>
      ),
    },
  ];
  return (
    <PageHeaderWrapper>
      <ProTable<DataSourceItem>
        rowKey="id"
        headerTitle="查询表格"
        columns={columns}
        request={(params: any) => getDataSourceMessage(params)}
        toolBarRender={(action, { selectedRows }) => [
          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => {
              handleAddModalView(true);
            }}
          >
            新建
          </Button>,
        ]}
        bordered
      />

      <AddDataSourceFrom
        modalVisible={addModalView}
        onSubmit={async value => {
          const success = handleAdd(value);
          if (success) {
            handleAddModalView(false);
          }
        }}
        onCancel={() => {
          handleAddModalView(false);
        }}
      />
      {dataSourceMessage && (
        <UpdateDataSource
          modalVisible={updateModalView}
          onSubmit={async value => {
            const success = handleUpdate(value);
            if (success) {
              handleUpdateModalView(false);
              handleDataSourceMessage(undefined);
            }
          }}
          onCancel={() => {
            handleUpdateModalView(false);
            handleDataSourceMessage(undefined);
          }}
          initValues={dataSourceMessage}
        />
      )}
    </PageHeaderWrapper>
  );
};

export default DataSource;
