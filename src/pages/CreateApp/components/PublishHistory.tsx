import React from 'react';
import { PubHistory } from '../data';
import { Table, Modal, Tooltip, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

export interface PubHistoryProps {
  datasource: PubHistory[];
  modalVisible: boolean;
  onCancel: () => void;
}
const PubHistoryTable: React.FC<PubHistoryProps> = props => {
  const { modalVisible, onCancel, datasource } = props;

  const columns = [
    {
      title: '版本编号',
      dataIndex: 'id',
    },
    {
      title: '发布日期',
      dataIndex: 'pubDate',
      valueType: 'date',
    },
    {
      title: '版本',
      dataIndex: 'version',
    },
    {
      title: '版本类型',
      dataIndex: 'versionType',
      valueEnum: {
        1: { text: 'mysql' },
        2: { text: 'sqlServer' },
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_: any, record: PubHistory) => (
        <>
          <Tooltip placement="topLeft" title={'查看发布说明'}>
            <Button
              style={{ marginLeft: '10px' }}
              size="small"
              icon={<SearchOutlined />}
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
      destroyOnClose
      title="应用发布历史"
      visible={modalVisible}
      onCancel={() => onCancel()}
      width={800}
      okText="确认"
      cancelText="取消"
      afterClose={() => onCancel()}
      // footer={footerRender()}
      footer={false}
    >
      <Table
        columns={columns}
        bordered
        dataSource={datasource}
        pagination={{ pageSize: 5 }}
        rowKey="id"
      ></Table>
    </Modal>
  );
};
export default PubHistoryTable;
