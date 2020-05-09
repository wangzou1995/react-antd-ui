import React from 'react';
import { VersionList } from '../data';
import { Modal, Table, Switch, Tooltip, Button } from 'antd';
import { SearchOutlined, ForwardOutlined } from '@ant-design/icons';

export interface VersionListProps {
  modalVisible: boolean;
  onCancel: () => void;
  versionList: VersionList[];
}
const VersionTable: React.FC<VersionListProps> = props => {
  const { modalVisible, onCancel, versionList } = props;
  const columns = [
    {
      title: '版本编号',
      dataIndex: 'id',
    },
    {
      title: '发布日期',
      dataIndex: 'publishDate',
    },
    {
      title: '版本',
      dataIndex: 'version',
    },
    {
      title: '版本类型',
      dataIndex: 'versionType',
    },
    {
      title: '是否当前版本',
      dataIndex: 'currentVersion',
      render: (_: any, record: VersionList) => (
        <>
          <Switch checked={record.currentVersion} />
        </>
      ),
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_: any, record: VersionList) => (
        <>
          <Tooltip placement="topLeft" title={'查看订阅说明'}>
            <Button
              style={{ marginLeft: '10px' }}
              size="small"
              icon={<SearchOutlined />}
              shape="circle"
              onClick={() => {}}
            />
          </Tooltip>
          <Tooltip placement="topLeft" title={'切换到此版本'}>
            <Button
              style={{ marginLeft: '10px' }}
              size="small"
              icon={<ForwardOutlined />}
              shape="circle"
              onClick={() => {}}
            />
          </Tooltip>
        </>
      ),
    },
  ];
  return (
    <Modal
      visible={modalVisible}
      destroyOnClose
      title="应用版本列表"
      onCancel={() => onCancel()}
      width={800}
      afterClose={() => onCancel()}
      footer={false}
    >
      <Table
        rowKey="id"
        pagination={{ pageSize: 5 }}
        columns={columns}
        dataSource={versionList}
        bordered
      />
    </Modal>
  );
};
export default VersionTable;
