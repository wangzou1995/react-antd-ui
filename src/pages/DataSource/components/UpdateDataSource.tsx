import React from 'react';
import { Form, Modal, Row, Col, Select, Input } from 'antd';
import { DataSourceItem } from '../data';
const FromItem = Form.Item;
export interface AddDataSourceProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: any) => void;
  onCancel: () => void;
  initValues: DataSourceItem;
}
/**
 * 更新数据源信息
 */
const UpdateDataSourceFrom: React.FC<AddDataSourceProps> = props => {
  const [form] = Form.useForm();
  const { modalVisible, onSubmit: handleAdd, onCancel, initValues } = props;
  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    form.resetFields();
    handleAdd(fieldsValue);
  };
  return (
    <Modal
      destroyOnClose
      title="更新数据源信息"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
      width={800}
      okText="确认"
      cancelText="取消"
      afterClose={() => onCancel()}
      // footer={footerRender()}
    >
      <Form form={form} initialValues={initValues}>
        <Row gutter={24}>
          <Col span={8}>
            <FromItem
              label="应用"
              name="appId"
              rules={[{ required: true, message: '请选择应用' }]}
            >
              <Select />
            </FromItem>
          </Col>
          <Col span={8}>
            <FromItem
              label="数据源名称"
              name="dataSourceName"
              rules={[{ required: true, message: '请输入数据源名称' }]}
            >
              <Input />
            </FromItem>
          </Col>
          <Col span={8}>
            <FromItem
              label="数据源描述"
              name="dataSourceDesc"
              rules={[{ required: true, message: '请输入数据源描述' }]}
            >
              <Input />
            </FromItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <FromItem
              label="数据来源"
              name="dataSourceFrom"
              rules={[{ required: true, message: '请选择数据来源' }]}
            >
              <Select />
            </FromItem>
          </Col>
          <Col span={8}>
            <FromItem
              label="数据查询服务"
              name="dataSeachId"
              rules={[{ required: true, message: '请选择数据查询服务' }]}
            >
              <Input />
            </FromItem>
          </Col>
          <Col span={8}>
            <FromItem
              label="数据更新服务"
              name="dataUpdateId"
              rules={[{ required: true, message: '请选择数据更新服务' }]}
            >
              <Input />
            </FromItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={16}>
            <FromItem
              label="数据库地址"
              name="dataConnectUrl"
              rules={[{ required: true, message: '请输入数据库地址' }]}
            >
              <Input />
            </FromItem>
          </Col>
          <Col span={8}>
            <FromItem
              label="数据库类型"
              name="dataSourceType"
              rules={[{ required: true, message: '请选择数据库类型' }]}
            >
              <Select />
            </FromItem>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            <FromItem
              label="数据库名"
              name="databaseName"
              rules={[{ required: true, message: '请输入数据库名称' }]}
            >
              <Select />
            </FromItem>
          </Col>
          <Col span={8}>
            <FromItem
              label="数据库用户名"
              name="username"
              rules={[{ required: true, message: '请输入数据库用户名称' }]}
            >
              <Input />
            </FromItem>
          </Col>
          <Col span={8}>
            <FromItem
              label="数据库密码"
              name="password"
              rules={[{ required: true, message: '请输入数据库密码' }]}
            >
              <Input type="password" />
            </FromItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
export default UpdateDataSourceFrom;
